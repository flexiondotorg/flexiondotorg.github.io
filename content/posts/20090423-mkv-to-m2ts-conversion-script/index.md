---
title: MKV to M2TS conversion script
aliases: /posts/2009-04-mkv-to-m2ts-conversion-script
date: 2009-04-23 17:00:58
tags: [Linux,Matroska,M2TS,Bash,AC3,DTS,PlayStation 3 ]
summary: Convert Matroska file to MPEG2-TS for PlayStation 3 compatibility
sidebar: true
images: hero.webp
hero: hero.webp
---

The PlayStation 3 can't play MKV files. Therefore I've written a
script that creates a PlayStation 3 compatible M2TS from a MKV,
assuming video is H.264 and audio is AC3 or DTS with as little
re-encoding as possible. Any subtitles in the MKV are preserved
in the M2TS although the PlayStation 3 can't display subtitles in M2TS
containers. Optionally splits the M2TS, if it is greater than 4GB,
to maintain FAT32 compatibility. Unlike other MKV to M2TS solutions,
this script doesn't create any intermediate files during the conversion.

The PlayStation 3 can't play DTS audio streams in M2TS containers, therefore
DTS audio is transcoded to AC3.

This script works on Ubuntu, should work on any other Linux/Unix flavour and
possibly Mac OS X providing you have the required tools installed.

* [MKV-to-M2TS](https://github.com/flexiondotorg/MKV-to-M2TS)
