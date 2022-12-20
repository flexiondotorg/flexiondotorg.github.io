---
title: Mediatomb vs. MiniDLNA
aliases: /posts/2009-12-mediatomb-minidlna
date: 2009-12-18 15:34:12
tags: [Linux,DLNA,UPnP,Mediatomb,MiniDLNA,PlayStation 3 ]
summary: Comparing Mediatomb and MiniDLNA streaming servers
sidebar: true
images: hero.webp
hero: hero.webp
---

I've been using [Mediatomb](http://mediatomb.cc/) for nearly two years now but
decided to give [MiniDLNA](http://sourceforge.net/projects/minidlna/) a whirl
since it is a fully fledged DLNA server whereas Mediatomb is UPnP only. I'm
currently running both Mediatomb SVN and MiniDLNA CVS. So, how does MiniDLNA
compare to Mediatomb?

 * MiniDLNA is easier to compile, configure, uses less RAM and has less software
    dependencies than Mediatomb.
 * MiniDLNA doesn't currently support music play lists or Last.fm scrobbling.
   Mediatomb supports `.m3u` and `.pls` playlists but requires a 3rd party patch
   to add Last.fm scrobbling.
 * MiniDLNA doesn't support dynamic video thumbnail creation, which would be
   nice to have but is not essential, cover images are supported. Mediatomb
   supports video thumbnailing via `ffmpegthumbnailer`.
 * MiniDLNA doesn't currently have any transcoding support. This is of little
   consequence for me since I import video content into my library in a format
   natively supported by the PS3, either MP3, MPEG-2 TS or MPEG-4. Mediatomb
   does support transcoding but it is somewhat fiddly to setup and you can't
   pause transcoded content.
 * MiniDLNA works _"out of the box"_ with the PS3 (and other DLNA clients)
   while Mediatomb requires some tweaking.
 * Mediatomb's default video import script doesn't suit how I organise my
   video library, but MiniDLNA suits my video library perfectly.

So, as of today I am running both Mediatomb and MiniDLNA. Mediatomb is
exclusively handling audio since playlist and Last.fm support are essential
for me. MiniDLNA is now handling video exclusively. I'm very happy with the
results but should MiniDLNA add .m3u/.pls play lists and Last.fm support I
will switch everything to MiniDLNA.

## 2 years later...

Since writing this post MiniDLNA added support for playlists. It still doesn't
support Last.fm scrobbling though. Despite that I switched to MiniDLNA and it
has been streaming audio and video around the house for that last couple of
years.
