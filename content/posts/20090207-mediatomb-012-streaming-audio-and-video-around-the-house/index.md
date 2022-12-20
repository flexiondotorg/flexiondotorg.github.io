---
title: Mediatomb 0.12 - Streaming audio and video around the house
aliases: /posts/2009-02-mediatomb-012-streaming-audio-and-video-around-the-house
date: 2009-02-07 16:23:39
tags: [Linux,Mediatomb,MP3,MP4,DLNA,uPNP ]
summary: In home streaming via UPnP with Mediatomb
sidebar: true
images: hero.webp
hero: hero.webp
---

[Mediatomb](http://mediatomb.cc/) is an open source (GPL) UPnP MediaServer
with a nice web user interface, it allows you to stream your digital media
through your home network and listen to/watch it on a variety of UPnP
compatible devices, such as the PlayStation in my case.

Mediatomb 0.12 is not yet released as final yet but it is certainly stable
enough for general use, so I spent the last week migrating from Mediatomb 0.11
to Mediatomb 0.12.

I've recently finished ripping my entire CD collection (344 CDs) to MP3 and I
am currently ripping my DVD collection (85 done so far) to MP4 with AAC 5.1
audio. The 'Music' and 'Video' folders in our home directories are mounted via
NFS. The Mediatomb server uses the same data sources so any playlists or new
music/videos we might import are immediately reflected in Mediatomb.

Our entire CD library is now available at the click of a button, automatically
organised by genre, artist and date. We have also created some playlists
in .m3u or .pls format.

New to Mediatomb 0.12 is the ability to scrobble your music to
[Last.fm](http://www.last.fm), this a killer feature for me and why I chose to
migrate to 0.12 before it goes final.

I ripped the CDs using [SoundJuicer](http://www.burtonini.com/blog/computers/sound-juicer),
since I can configure it to use [LAME presets](http://lame.cvs.sourceforge.net/viewvc/lame/lame/doc/html/presets.html).
I then used the [Music Brainz Picard Tagger](http://musicbrainz.org/doc/PicardTagger) to
add additional tagging and embed cover art and then applied ReplayGain.

Finally my wife and I use [Banshee](http://banshee-project.org/) to manage the
music library on our computers, including the creation of playlists and syncing
to our iPods.

I am using [Handbrake](http://handbrake.fr/) to rip the DVDs to MP4. I've created a
new PS3 compatible profile which is focused on quality, I'll post details
about that in the future. Mediatomb 0.12 has some experimental features to
stream video content from .ISO images of DVDs. I've yet to play with that but
it sounds very cool. I've also created a script which queries IMDB to
categorise our film library by genre and create summary information about
each film in the library. I'll be posting more about that soon. I haven't
finalised how we will integrate Photo management with Mediatomb yet, but that
is that final piece in the puzzle.

