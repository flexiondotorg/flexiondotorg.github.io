---
title: "Creating Production-Ready Containers - The Basics"
slug: "creating-production-ready-containers-the-basics"
date: 2021-06-03T12:18:15Z
lastmod: 2023-04-28T16:34:15Z
categories: [ "Linux", "Development", "Tutorial", "Cloud Native" ]
tags: [ "Docker", "Node", "DevOps", "Dockerfile", "docker-slim", "SlimToolKit" ]
summary: "Beginners guide to container best practices"
sidebar: true
hero: "hero.webp"
---

So you've coded an awesome app and you are ready to deploy it to the cloud. You've heard a lot about [Docker](https://www.docker.com/) and completed a few online tutorials to containerise your app. All set, right? But what do you need to know if you're going to move that app to a production environment on the public Internet? What if you're using it for your job and need to pass security scans and DevOps checks?

In this series, I introduce some basic concepts for making production-ready containers. I also introduce the concept of "slimming" a container. **Slimming** refers to both optimising and minifying your Docker containers, reducing them in size by up to 80-percent while also making them more secure by decreasing the attack surface. Slimming your container is also a great way to implement [container best practices](https://www.slim.ai/blog/why-dont-we-practice-container-best-practices) without re-engineering your entire workflow.

There are many ways to slim a container, from basic security to fully automated open-source tools like [SlimToolKit](https://slimtoolkit.org/) (formerly [DockerSlim](https://dockersl.im/)). _Full disclosure_: I used work for [Slim.AI](https://slim.ai), a company founded on the SlimToolKit open source project. Let's look at some of the common ways developers create production-ready container images today.

I'll explore each of these in a separate article using a simple "Hello World" Node.js example that can be found in many online tutorials.

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
 res.send('Hello World!')
})

app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`)
})
```

Let's get started by simply improving your `Dockerfile` to build a better Docker image.

## Creating a Better Dockerfile

Most `Dockerfile` examples you'll find are not "production ready" and they aren't meant to be. They are for instructional purposes to help developers successfully build an image. But when one gets into production scenarios, there are several "good-to-know" and a few "have-to-know" techniques that will improve build times, security, and reliability.

Let's look at a typical example that you might run into if you're a Node.js developer looking to get "Hello World" running with Docker. I won't go through building an actual app - there are a lot of great examples out there to show you how to do this - but rather focus on what to do if you were going to ship this to production.

The typical `Dockerfile` in a "Hello World" example might look something like this:

```docker
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
```

It uses the latest version of the official Node.js image, sets a directory and copies your app into the container image, installs dependencies, exposes port 3000, and runs the app via `CMD`.

While this will run no problem on your local machine, and is great for learning the ropes, this approach is almost certainly going to run into issues when you ship it to production. Let's take a look at some of these in order of severity.

### Major issues

#### Running as Root

Since this example doesn't set a `USER` explicitly in the `Dockerfile`, Docker runs the build and all commands as the `root` user. While not an issue for local development, your friendly neighbourhood SysAdmin will tell you the myriad of issues that come with running applications as root on a server in production. And with Docker, a [new set of attack methods](https://medium.com/jobteaser-dev-team/docker-user-best-practices-a8d2ca5205f4) can arise.

Thankfully, most major languages and frameworks have a predefined user for running applications. In Node.js, the user is just `node` and can be invoked in the `Dockerfile` explicitly.

```docker
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install

USER node

EXPOSE 3000
CMD ["node", "app.js"]
```

#### Using `latest` version

Choosing a version number for your container is often called *pinning*. While many tutorials - and even some experts - will counsel newcomers to pin their images to the `latest` tag, which means you get whatever the most recently updated version is, using the `latest` tag can cause issues in production.

Containers are meant to be ephemeral, meaning they can be created, destroyed, started, stopped, and reproduced with ease and *reliability*. Using the `latest` tag means there isn't a single source of truth for your container's "bill of materials". A new version or update of a dependency could introduce a breaking change, which may cause the build to fail somewhere in your CI/CD pipeline.

**Example `Dockerfile`**

```docker
FROM node:latest
```

**Production `Dockerfile`**
```docker
FROM node:16.2.0
```

Other tutorials I've seen pin only the major version. For example, using `node:14`. This carries the same risks as using `latest`, as minor versions can change dependencies as well.

Now, pinning a specific major and minor version in your `Dockerfile` is a trade-off decision - you're choosing to not automatically receive security, fixes or performance improvements that come via new updates - but most DevSecOps teams prefer to employ security scanning and container management software as a way to control updates rather than dealing with the unpredictability that comes with container build failures in production CI/CD pipelines.

### Performance improvements

#### Better layer caching

Docker works on the concept of *layer caching*. It builds images sequentially. Layering dependencies on top of each other and only rebuilding them when something in the layer has changed.

Layer 0 in a Docker image is often the base operating system, which rarely changes significantly; although commercial Linux vendors often publish new base images to incorporate security fixes.

Application code, however, is highly likely to change during the software development cycle, as you iterate on features, refactor, and fix bugs. Dependencies in our core system, installed here by `npm install`, change more often than the base OS, but less often than the application code.

In our example `Dockerfile`, we simply need to break the installation of the dependencies into separate instructions on their own lines.

```docker
FROM node:16.0.2
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

USER node

COPY app.js ./

EXPOSE 3000
CMD ["node", "app.js"]
```

We actually end up creating another layer by now having two `COPY` commands. While adding layers is typically a no-no for build times and image sizes, the tax we pay on this optimisation is going to save us in the long run as we cycle through the QA process, since we aren't reinstalling dependencies if we don’t have to.

We also opt for the `npm ci` command instead of `npm install`, which is preferred for automated environments, such as CI/CD, and will help prevent breaking changes from dependencies. Read [more about `npm ci` here](https://docs.npmjs.com/cli/v7/commands/npm-ci).

#### Use `ENTRYPOINT` instead of `CMD`

At a surface level, there isn't a big difference between using `ENTRYPOINT` with your app file versus running `CMD` using the shell plus your app file. However, web- and API-type containers like Node.js applications are often running as executables in production, and there, proper signal handling - such as graceful shutdowns - are important.

`CMD` provides some flexibility for calling executables with flags or overwriting them, which is common in development. But that generally won't be relevant to production instances and `ENTRYPOINT` will likely provide better signal processing.

```docker
FROM node:16.0.2
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

USER node

COPY app.js ./

EXPOSE 3000
ENTRYPOINT ["node", "app.js"]
```

### Cleaning up cached files

Most package managers have the ability to clean up their own cache. If you don’t do this, you'll just be moving a bunch of unused files into your container for no reason. It might not save a lot of space depending on your application, but think of it as dropping your unused items at the charity shop *before* you move rather than loading them in the moving van. It's not a lot of effort and it's the right thing to do. We do this by adding `&& npm cache clean --force` to our `RUN` instruction.

```docker
FROM node:16.0.2
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci && npm cache clean --force

USER node

COPY app.js ./

EXPOSE 3000
ENTRYPOINT ["node", "app.js"]
```

### Conclusions

Improving your `Dockerfile` is the first step towards creating a slimmed and optimised container. It closes some major security loopholes that are likely to raise flags with downstream checks and adds baseline optimisations for build time and docker image size.

If this is all you do to improve your containers prior to shipping to production, you won't be in a bad spot, but there's more - *way more* - that you can do to optimise images. We'll [explore those techniques in the next article](/posts/creating-production-ready-containers-advanced-techniques/).
