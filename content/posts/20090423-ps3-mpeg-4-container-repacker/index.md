---
title: PlayStation 3 compatible MPEG-4 container repacker
aliases: /posts/2009-04-ps3-mpeg-4-container-repacker
date: 2009-04-23 17:09:11
tags: [Linux,MPEG-4,iPlayer,PlayStation 3,Bash ]
summary: Automatically repack MPEG-4 video files for PlayStation 3 compatibility
sidebar: true
images: hero.webp
hero: hero.webp
---

Some of my mobile phones have been able to record video clips in MPEG-4
format. Sadly some of these clips don't play on the PlayStation 3 and those
that do stutter terribly. I use [iplayer-dl](http://po-ru.com/projects/iplayer-downloader/)
to download content from BBC iPlayer. Sadly the files are in a Quicktime
container and are not playable on the PlayStation 3.

In order to address both these issues I created a script which extracts the
audio and video from an existing MPEG-4 or ISO Media Apple QuickTime container
and repacks them in a new MPEG-4 container with optional splitting of the
resulting MPEG-4 to maintain FAT32 compatibility. The new MPEG-4 files play
just fine on my PlayStation 3. This script works on Ubuntu, should work on any
other Linux/Unix flavour and possibly Mac OS X providing you have the required
tools installed.

  * [MP4-Repacker](https://github.com/flexiondotorg/MP4-Packer)

