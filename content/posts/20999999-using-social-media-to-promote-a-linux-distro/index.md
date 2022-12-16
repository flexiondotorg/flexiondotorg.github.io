---
title: Using social media to promote a Linux distro
aliases: /posts/2015-11-using-social-media-to-promote-a-linux-distro
date: 2015-11-17 11:00:00
tags: [ Social Media,Linux,Marketing,draft ]
#link:
summary: Using social media to effectively promote a Linux distribution
sidebar: true
images: hero.png
hero: hero.png
draft: true
---

During [Ubuntu Online Summit 15.11](http://summit.ubuntu.com/uos-1511/)
the [Community Round Table II](http://summit.ubuntu.com/uos-1511/meeting/22620/community-roundtable-ii/)
discussed the Ubuntu community flavours promiting their distributions
and Ubuntu MATE (a project that I run) was used as an example of a
project that was attempting to maximise the promotion of the
distribution. I was contacted after the fact and volunteered to write a
blog artcile to outline how Ubuntu MATE manages it's marketing, and this
is it.

## TL;DR

A website and community forum is not enough. Mailing lists are not a
marketing tool. Meet your potential users where they are and interact
with them, frequently. Don't expect them to come to you, they won't.

## This is not a HOW-TO

I've been fortunate to attend to marketing, product placement and
social media workshops in the past. My approach to promoting/marketing
Ubuntu MATE is a mish-mash of what I've picked up. This is not intended
to be a tutorial, it is just what works for Ubuntu MATE and maybe you
can incorporate some of what I outline below to improve your distro's
publicity.

### Branding

Create a brand. Use consistent artwork and messaging everywhere. Write
a tag line for the project and also a short introduction, that
anyone can understand. Use the tag line and introductory text everywhere.

As best as you can, protect your brand. A few simple things to do are:

  * Own all the domains relevant to your project.
  * Create slide templates so team members can prepare consistently branded presentations
  * Make the project artwork/logos available with usage guide lines (something we still haven't done for Ubuntu MATE)

#### Press Kits

For milestone releases prepare a press kit and send it to Open Source
jounalists, bloggers, podcasts and YouTubers in advance (7 to 10 days)
of the release date. A press kit can help set the tone of your
messaging, highlight the features you want covering and to provide
screenshots and artwork you'd like used. A journalist friend of mine
has said if you provide copy, you're more likely to get something
written about your project.

### Websites

The project website must be easy to navigate, must communicate
credibility and every page should have an obvious [call to
action](https://en.wikipedia.org/wiki/Call_to_action_(marketing)).

An increasing number of people, some would argue the majority, browse
the web using mobile devices. Your website has to use a [responsive
design](https://en.wikipedia.org/wiki/Responsive_web_design).
[Bootstrap](http://getbootstrap.com) and
[Bootswatch](https://bootswatch.com/) provide a great set of resources
to get started.

Slow websites are a turn off. Make use of a Content Delivery Network
(CDN), such as [CloudFlare](https://www.cloudflare.com/) and consider
using a static website generator. Ubuntu MATE uses
[Nikola](http://getnikola.com) which includes a number of content
optimisation filters for Javascript, HTML, CSS and bitmap images.

Consider making your site available via TLS only, it points to
credibility. "Free" SSL/TLS certificate can be obtained from [Let's
Encrypt](https://letsencrypt.org/),
[StartSSL](https://www.startssl.com/) and CloudFlare can act as a free
TLS/SSL terminator if you use their services. However, Ubuntu MATE was
originally only available via HTTPS and we discovered that Windows XP
users (one of our target audiences) were unable
to access the site, at all. So plain http access is also available now.

### Forums

Ubuntu MATE has a website and community forum. The community forum was
requested by the Ubuntu MATE community because many community members
didn't want to participate in social networks to engage with the project.

Traditional forums suck, IMHO. [Discourse](https://www.discourse.org/)
provides many of the features you'll find in the social network platforms
such tagging, mentioning, up voting and threaded discussion. It is also,
largely, self-moderating and has a responsive design. It can has
integrated authentication for many popular social networks that work
along side self hosted signup.

### Social Networks

Ubuntu MATE has a Twitter account, Google+ community (not a page), a
Facebook page and a LinkedIn group is being added soon. I was skeptical
about adding a Facebook Page but it has attracted more followers than
Google+ and Twitter in a shorter space of time.

#### Google+

Google+ is double edged sword. At the time of writing the is no API to
post content to a Google+ Community but an API to post to Google+ Pages.

  * Google+ Pages allow only you (the owner of the page) to post and share content but allows anyone to comment on the posts.
  * Google+ Communities allow any user to share content on a discussion forum.

Google+ Communities tend to have better engagement, but also require some
moderation to prevent spam. Use which ever you find more appealing, Pages
to automate publishing or Communities to have been user engagement.

### Telegram Groups and Broadcasts

[Telegram](https://telegrm.org) is an alternative to Whatsapp that is
growing in popularity, particularly within the Open Source community.

Consider creating a Telegram Group, as an alternative to forums/IRC,
and a Telegram Broadcast as an alternative to Twitter/RSS. [Telegram
has APIs](https://core.telegram.org/) so posting can be automated.

While Whatsapp has groups they are limited to 100 users so are of
limited value.

### Post news frequently

I try to post something to the Ubuntu MATE social networks everyday, or
every other day at a minimum. This can be a simple as an update on new
developments, or a poll about a decision the project needs to take or
a question to generate some discussion about

If you have scheduled alpha and/or beta beta releases, these are a
marketing opportunity. Prepare a blog post that outlines whats new, send
a link to your release blog post to Open Source jounalists, bloggers,
podcasts and YouTubers.

Google Alerts

Buffer

dlvr.it

IFTTT

Youtube

Own videos

Youtubers

Distrowatch

Online Press

Printed Press

Open Source Events

Press Kits

Email

mandrill

Analytics

If you're not measuring it, it's not worth doing.

Escaping the echo chamber

Present at non-opensource events.
