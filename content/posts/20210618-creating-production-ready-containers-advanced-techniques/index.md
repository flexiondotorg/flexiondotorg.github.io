---
title: "Creating Production-Ready Containers - Advanced Techniques"
slug: "creating-production-ready-containers-advanced-techniques"
date: 2021-06-18T12:18:15Z
lastmod: 2023-04-28T16:34:15Z
categories: [ "Linux", "Development", "Tutorial", "Cloud Native" ]
tags: [ "Docker", "DevOps", "docker-slim", "SlimToolKit", "Alpine", "Docker Compose", "Distroless", "Buildpacks", "Multi-Stage Builds" ]
summary: "Advanced techniques for production-ready container best practice"
sidebar: true
hero: "hero.webp"
---

Creating production-ready containers for use in commercial-grade apps can be a far cry from the "get started with Node.js and Docker"-type of tutorials that are common around the Internet. Those guides are great for introducing all the advantages of Docker containers in modern cloud-native development, but creating a container that passes muster in a large-scale application in production is a different story.

For production-ready containers, there are three key things you want to optimise for when creating a container:

1. Image Size 📦
2. Build Speed 🐢
3. Security 🔐

Image size and build speed ensure that your containers can move through CI/CD and test pipelines easily and efficiently. Security is critical in today's software supply chain, and containers have their own set of security issues. Thankfully, reducing container image size actually can alleviate some security issues in containers.

[In my Basics article](/posts/creating-production-ready-containers-the-basics), I showed you some easy techniques to improve your `Dockerfile` using a sample "Hello World" Node.js application.

These basics address all three optimisations, though they only scratch the surface.

Let's look at some more advanced techniques for Container Optimisation.

## Alpine Images

The very first thing you'll encounter when looking for techniques to create smaller containers is [Alpine Linux](https://alpinelinux.org/). Alpine Linux is an open-source project whose goal is to create a bare-bones 🦴 version of Linux that lets developers "build from the ground up."

### Pros: Transitioning to Alpine can be an easy way to get a smaller container

Reducing image size with Alpine can be incredibly simple - under the right circumstances. For some apps, it's as easy as changing the base image in your `Dockerfile`:

#### FROM

```dockerfile
FROM node:16.2.0
```

#### TO

```dockerfile
FROM node:16.2.0-alpine
```

When we build the new image, we see that the old image was 856MB and the new one is 114MB 🎉

```text
REPOSITORY         	TAG    	IMAGE ID        CREATED     	SIZE
cotw-node-alpine    latest 	2cc7b4a7b09c    2 minutes ago   114MB
cotw-node           latest 	873fb9fca53a    3 days ago  	856MB
```

Easy, right? Not so fast.

### Cons: Using Alpine images can lead to build problems, now and in the future

There are some not-so-obvious gotchas with using Alpine images that don't crop up in our super simple example application, such as:

#### You have to install everything

Those tiny base images have to sacrifice something, right? Alpine users will be installing everything they need, right down to time-zone data or development tools. You won't need your development tools for your production image, most likely, but for most developers, the thought of a server without `curl` or `vim` is a bridge too far.

#### Different compilers and package managers

You'll also be installing any dependencies with the Alpine Package Keeper tool (`apk`) instead of the more familiar `apt` or `rpm`. The differences are small but can trip up unsuspecting developers.

#### Fewer examples; less documentation

Finally, while Alpine has been around for nine-plus years, it is and likely always will be a smaller and more specialised user base than established Linux distributions such as Ubuntu and Debian. To wit, at the time of this writing the `alpine` tag on StackOverflow has just [1,280 questions](https://stackoverflow.com/questions/tagged/alpine), compared with [over 54,000 for Ubuntu](https://stackoverflow.com/questions/tagged/ubuntu).

## Multi-stage builds

The next tactic you are likely to encounter when searching for ways to reduce Docker image sizes is multi-stage 🏗 builds. This tactic, [recommended by Docker and many in the Docker community](https://docs.docker.com/develop/develop-images/multistage-build/), is essentially building the image twice. The first set of commands builds your base application image, all things included. The second set of commands builds an image off of that base image, taking only what's needed and leaving out anything that's not.

With a multi-stage build, our `Dockerfile` would look like this. Notice the two `FROM` statements. The first builds the application image; the second copies the necessary files from that image into the second, more production-ready version.

```dockerfile
FROM node:16.2.0-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY app.js ./

FROM node:16.2.0-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
EXPOSE 3000
USER node
CMD ["node","app.js"]
```

### Pros: Dev and Prod images can be built separately

When combined with [Docker Compose](https://docs.docker.com/compose/), this approach gives developers a flexible development environment while reducing bloat in the production images. You can simply use your initial image for dev/test and the final version for production. Multi-stage builds work especially well for Go containers, significantly reducing image size, but also work well for static Node.js and React-type applications.

### Cons: Added complexity; use-case specific

Multi-stage builds are still relatively new 🌱 on the scene. For most developers still new to containers, knowing what to copy over to the final production image and what to leave behind is a major barrier to entry. Further, this pattern can run into challenges.

Since we're already using an Alpine image, the size savings are relatively minor for our "Hello World" example. You'd expect to see greater gains in a full-blown React or Vue application.

```text
REPOSITORY            TAG     IMAGE ID   	CREATED        SIZE
cotw-node-multistage  latest  52bc33d14a87  3 minutes ago  114MB
cotw-node-alpine      latest  2cc7b4a7b09c  4 days ago     114MB
cotw-node             latest  873fb9fca53a  7 days ago     856MB
```

## Development tools and Distroless

There are several tools - and new ones emerging every day - that look to bypass or automate `Dockerfile` authoring to make image creation easier. [*Buildpacks*](https://buildpacks.io/) are the most mature of these technologies and can be used through tools like [Pack](https://buildpacks.io/docs/tools/pack/) or [Waypoint](https://www.waypointproject.io/plugins/pack).

There are builder options from multiple sources - Heroku, Google, and Paketo are common favourites - and each gives you a slightly different developer experience and final image when used.

```bash
$ pack build cotw-node-bp-google --builder gcr.io/buildpacks/builder:v1
$ pack build cotw-node-bp-heroku --builder heroku/buildpacks:18
$ pack build cotw-node-bp-pb-base --builder paketobuildpacks/builder:base
$ pack build cotw-node-bp-pb-full --builder paketobuildpacks/builder:full
```

### Pros: When they work, they work

In certain instances, Buildpacks can take the pain out of `Dockerfile` authoring and just create container images of your application with no fuss. The pack tool is looking for "app-like" files in your source directory, and automatically figuring out what kind of application is there and how to containerize it. In the case of our Node sample, it sees `package.json` and correctly assumes we have a Node.js application.

### Cons: When they don't…

Given the relative newness of this approach for Docker containers, there are a lot of gotchas with Buildpacks. Non-standard applications or operating systems can struggle, and we've had issues running them successfully on the new Silicon Macbook Pros. The resulting images vary a lot - we saw a range of 200MB to 800MB in our examples - and the results tend to be lower than what you'd get with other techniques.

## Automate it with SlimToolKit

The [SlimToolKit](https://slimtoolkit.org/) (<em>formerly DockerSlim</em>) open-source project was created by [Slim.AI](https://slim.ai) CTO [Kyle Quest](https://twitter.com/kcqon) in 2015 as a way to automate container optimisation. Simply download and run `slim build <myimage>` and SlimToolKit will examine the image, rebuild it with only the required dependencies, and give you a new image that can be run just like the original.

### Pros: It's automatic

SlimToolKit means you can work with whatever base image you'd like (say, Ubuntu or Debian) and let SlimToolKit worry about removing unnecessary tools and files en route to production. The best part is that SlimToolKit can be used alongside any of these other techniques. Once tested, it can be integrated into your CI/CD pipeline for automatic container minification, and the reduction in size leads to faster build times and better security.

### Cons: Steep learning curve

As with any open-source software, SlimToolKit can take some time to get working, especially for non-trivial applications. It works best for web-style applications, micro-services and APIs that have defined HTTP/HTTPS ports which the sensor can find and use to observe the container internals.

For best results, spend some time getting to know the various command flags available to tune your image, and [take a look at the examples for whatever framework you're using](https://github.com/slimtoolkit/examples).

## Connecting with SlimToolKit

There's an [active Slim.AI Discord channel](https://discord.gg/uBttmfyYNB) full of experts who can help you triage issues as they arise.
