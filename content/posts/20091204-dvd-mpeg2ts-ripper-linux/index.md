---
title: DVD to MPEG2-TS Ripper for Linux
aliases: /posts/2009-12-dvd-mpeg2ts-ripper-linux
date: 2009-12-04 07:53:58
categories: [ "Linux", "Open Source", "Home Cinema", "Self Hosting", "Gadgets" ]
tags: [ "MPEG2-PS", "MPEG2-TS", "DVD", "H.264", "Ripper", "M2VRequantiser", "Bash", "PlayStation 3", "C", "DLNA"]
summary: Ripping DVDs to MPEG-2 Transport Streams for DLNA streaming
sidebar: true
images: hero.webp
hero: hero.webp
---

A while back I released a script that rips a DVD to MPEG-2 PS allowing the
user to select one audio stream and one subtitle stream. Optionally the video
can be requantised, using M2VRequantiser and an ISO image created. If creating
an ISO image the chapters are also preserved from the original DVD. You can
see the original post below.

  * [DVD to MPEG-2 PS Ripper for Linux](2009-04-dvd-mpeg2ps-ripper-linux.html)

I've just released an update to that original script which fixes subtitles in
the original MPEG-2 PS mode but now adds the capability to rip MPEG-2 TS. The
video stream can still be shrunk and in MPEG-2 PS mode the video is still
requantised but in MPEG-2 TS mode the video is re-encoded as H.264.

Requantising is faster but can introduce artifacting. H.264 encoding is
slower, but produces very good quality. I am currently re-importing my entire
DVD collection, using this script, to my DLNA server using MPEG-2 TS and
re-encoding the video to H.264. This gives me high quality rips at relatively
small size (~3Gb) whilst preserving Dolby Digital 5.1 audio. Perfect for
playback via DLNA on the PS3. Some things to be aware of:

  * Subtitles are only supported in MPEG-2 PS mode.
  * MPEG-2 PS files created by this script are DVD compliant.
  * ISO files created by this script will preserve the chapters from the original DVD.
  * The PS3 can only play DTS audio in MPEG-2 PS streams when they have been authored to DVD.
  * The PS3 can only play subtitles in MPEG-2 PS streams when they have been authored to DVD.
  * The PS3 can't play DTS audio in MPEG-2 TS streams therefore this script will transcode DTS to AC3 when in MPEG-2 TS mode.

To download the script and find out how to make full use of it visit the
release page below.

  * [DVD-to-MPG](https://github.com/flexiondotorg/DVD-to-MPG)
