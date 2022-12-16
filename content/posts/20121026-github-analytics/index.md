---
title: GitHub Analytics
aliases: /posts/2012-10-github-analytics
date: 2012-10-26 16:39:00
tags: [ Git,GitHub ]
summary: How to add Google Analytics to GitHub projects.
sidebar: true
images: hero.png
hero: hero.png
---

As I mentioned in a previous post we are prepairing to [migrate our Bazaar
repositories to Git](2012-10-migrating-bzr-to-git.html), or more
precisely to [GitHub](https://github.com). This migration also heralds the
Open Source releases of many of the core technologies we've been developing at
[Flight Data Services](http://www.flightdataservices.com) for the last few years.

I want to track visits for our GitHub projects. A bit of Googling turned up
[githalytics](http://githalytics.com/) which enables you to track visits and
page views for your GitHub projects using
[http://www.google.com/analytics/](Google Analytics).

To use it, create a new Google Analytics property ID for your GitHub project,
head over to <http://githalytics.com/> and complete the web form. You'll be
provided a [Markdown](http://daringfireball.net/projects/markdown/) snippet to
insert in your projects `README.md`. It will look something like this:

```markdown
[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f "githalytics.com")](http://githalytics.com/YourGitHubName/YourGitHubProject)
```

Add the snippet to `README.md` and push the changes. When someone visits your
GitHub project page, the visit will be tracked. Great!

However, we write all our documentation using
[reStructuredText](http://docutils.sourceforge.net/rst.html). But after a
quick Twitter and email exchange with Dimitrios from githalytics and I had
a reStructuredText snippet. It looks something like this:

```rest
image:: https://cruel-carlota.pagodabox.com/0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f
    :alt: githalytics.com
    :target: http://githalytics.com/YourGitHubName/YourGitHubProject
```

Same drill, except add this snippet to `README.rst` and push the changes.

So there you have it, Google Analytics tracking of your GitHub project landing
page. If you have more than one project, create a Google Analytics property ID
and githalytics tracking snippet for each project.

#### References
* <http://githalytics.com/>
* <http://githalytics.tumblr.com/>
* <http://coderwall.com/team/githalytics>
* <http://stackoverflow.com/questions/4376560/add-google-analytics-to-github-wiki-pages>
