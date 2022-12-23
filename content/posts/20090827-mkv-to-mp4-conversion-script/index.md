---
title: MKV to MPEG-4 conversion script
aliases: /posts/2009-08-mkv-to-mp4-conversion-script
date: 2009-08-27 20:48:58
categories: [ "Linux", "Open Source", "Home Cinema", "Self Hosting", "Gadgets" ]
tags: [ "Matroska", "H.264", "Bash", "AAC 5.1", "AC3", "DTS", "PlayStation 3", "Xbox 360", "faac", "neroAacEnc", "MP4Box" ]
summary: Creating PlayStation 3 and Xbox 360 compatible MPEG-4 videos
sidebar: true
images: hero.webp
hero: hero.webp
---

The PlayStation 3 can't play MKV files. Therefore I've written a script that
creates a PlayStation 3 or Xbox 360 compatible MPEG-4 from Matroska providing
the video is H.264 and audio is AC3 or DTS.

Xbox 360 compatibility requires that audio is forcibly downmixed to stereo
with `--stereo`. AAC 5.1 audio will have the correct channel assignments when
transcoding from AC3 5.1 and DTS 5.1. If `neroAacEnc` is installed then it is
used in preference to `faac` for encoding the AAC audio, as it produces better
quality output. `neroAacEnc` is optional.

The script does as little re-encoding as possible, only the audio and
subtitles are re-encoded or converted. The script can detect profile 5.1 H.264
and patch it to 4.1 in under a second. Any subtitles in the Matroska are
preserved. If `mp4creator` is used the subtitles are extracted stored in a
seperate file. If `MP4Box` is used (default) the subtitles are converted to
GPAC Timed Text and muxed into the resulting MPEG-4. The PlayStation 3 can't
display these subtitles but some software players can.

The script can optionally split the Matroska if it is greater than 4GB to ensure
PlayStation 3, Xbox 360 and FAT32 compatibility. This script works on Ubuntu and
should work on any other Linux/Unix flavour and possibly Mac OS X providing you
have the required tools installed.

  * [MKV-to-MP4](https://github.com/flexiondotorg/MKV-to-MP4)

