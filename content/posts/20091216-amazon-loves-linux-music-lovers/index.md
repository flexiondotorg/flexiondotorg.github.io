---
title: Amazon Loves Linux Music Lovers
aliases: /posts/2009-12-amazon-loves-linux-music-lovers
date: 2009-12-16 22:30:48
tags: [Amazon,Linux,MP3,Ubuntu ]
summary: Amazon treats Linux users like 1st class citizens
sidebar: true
images: hero.png
hero: hero.png
---

I've no idea when Amazon.co.uk launched their MP3 store and I've no idea when
they released their Linux client for downloading the MP3s you purchased. I
don't care, I just want to say I'm really impressed Amazon have considered us
Linux users. Well done Amazon!

Not only that but the MP3s are DRM free, encoded using variable bit rates aiming
at an average of 256 kilobits per second (kbps), album cover art is included with
each song and the tracks are typically cheaper than iTunes. Well done again.

Doubtless some would want an Open Source client and unencumbered formats such as
Ogg and FLAC, but I'm pretty happy with what Amazon have on offer so long as it
works. Which it does.

However, the Linux MP3 downloader client is 32-bit only. Not so good, but
it can be successfully installed in 64-bit Ubuntu. Here's how I did in on
Ubuntu Jaunty 9.04 64-bit.

```bash
wget -c http://frozenfox.freehostia.com/cappy/getlibs-all.deb
dpkg -i getlibs-all.deb    
wget "http://www.amazon.co.uk/gp/dmusic/help/amd-installer-redirect.html/ref=dm_amd_linux_ubuntu?ie=UTF8&forceos=LINUX&callingPage=%2Fgp%2Fdmusic%2Fhelp%2Famd.html&linux_Ubuntu.x=1" -O amazonmp3.deb
dpkg -i --force-architecture amazonmp3.deb
getlibs /usr/bin/amazonmp3
```
