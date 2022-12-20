---
title: DVD to MPEG2-PS Ripper for Linux
aliases: /posts/2009-04-dvd-mpeg2ps-ripper-linux
date: 2009-04-23 16:50:31
tags: [Linux,MPEG2-PS,DVD,Ripper,M2VRequantiser,Bash]
summary: Ripping DVDs to MPEG2-PS for streaming via UPnP
sidebar: true
images: hero.webp
hero: hero.webp
---

Every so often I find myself in looking through the ex-rental DVD _"bargain
bin"_. Quite often I find something I consider a bargain. However, the
experience of watching an ex-rental DVD is typically ruined by the various
trailers and marketing guff at the start which you can't skip. My wife hates
that stuff, and I love my wife, so I routinely rip the main feature of newly
acquired ex-rental DVD movies so we can avoid that crap.

I run a Mediatomb DLNA server and I want to load it with all my DVDs. Ripping
them helps reduce the amount of storage I require. MPEG2-PS files are
compatible with my PlayStation 3 which is the client to my Mediatomb DLNA server.
As a solution to the above I created a script, which can extract the main feature
from a DVD video, allowing the user to select one audio stream and one subtitle
stream. Optionally the video can be requantised, using M2VRequantiser, and an ISO
image created. If creating an ISO image the chapters are also preserved from
the original DVD. I've lobbed my code into GitHub.

  * [DVD-to-MPG](https://github.com/flexiondotorg/DVD-to-MPG)
