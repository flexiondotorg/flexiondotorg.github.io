---
title: Converting Matroska to M2TS for PS3 and Mediatomb
aliases: /posts/2009-04-converting-matroska-mkv-m2ts-ps3-mediatomb
date: 2009-04-15 16:19:24
categories: [ "Linux", "Open Source", "Home Cinema", "Self Hosting", "Gadgets", "Development" ]
tags: [ "Matroska", "MP4", "M2TS", "PlayStation 3", "DLNA", "UPnP", "Bash" ]
summary: Fast conversion of Matroska video to MPEG2-TS
sidebar: true
images: hero.webp
hero: hero.webp
---

It has been a while since I last posted, mainly due to not having Internet
access at home for a month. Anyway, I'm online again and I have been tinkering
with various projects the most recent of which is Matroska conversion (again).

## Matroska to MP4

For sometime I have been converting Martoska files to MPEG-4 with AAC 5.1 audio
so I can stream them via Mediatomb to my PlayStation 3. The conversion process
works well although there is some overhead in transcoding the audio and the
AAC 5.1 audio is not as good quality as the original AC3 or DTS.

If you are interested I've put my code in GitHub, the script automates the
whole process.

 * [MPV-to-MP4](https://github.com/flexiondotorg/MKV-to-MP4)

## Matroska to M2TS

A little while back I read it was possible to convert those same Matroska file
to M2TS files which, so long as the audio is AC3, so takes much less time to
convert. As the PlayStation 3 can't play DTS audio streams inside a M2TS container
there is still a requirement to transcode DTS to AC3. That said the conversion to
M2TS requires less file I/O than converting to MPEG-4 and is therefore it is
generally a quicker conversion method, typically just 2 or 3 minutes on my
workstation at home.

Plus the audio quality of the AC3 or transcoded DTS is better than that of
transcoded AAC 5.1. I've created my own script to fully automate the conversion
process. The script has been tested on Ubuntu 8.10 64-bit but there is an
outside chance it will work on Mac OS X if you can get the required tools
installed. Again, you can find my script on GitHub.

 * [MPV-to-M2TS](https://github.com/flexiondotorg/MKV-to-M2TS)
