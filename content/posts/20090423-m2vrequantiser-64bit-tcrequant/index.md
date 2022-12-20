---
title: M2VRequantiser for 32-bit and 64-bit Linux
aliases: /posts/2009-04-m2vrequantiser-64bit-tcrequant
date: 2009-04-23 16:47:20
tags: [Linux,M2VRequantiser,tcrequant,MPEG-2,C ]
summary: Finding a MPEG-2 video requantising solution for Linux
sidebar: true
images: hero.webp
hero: hero.webp
---

I recently discovered that `tcrequant` (part of the
[transcode](http://http://www.transcoding.org/) suite of tools) has been
deprecated. Worst still I found that when I ran `tcrequant` on my 64-bit Linux
workstation is was corrupting the video. See the links below for details.

  * [transcode 1.1.0 Final Release](http://tcforge.berlios.de/archives/2009/01/18/transcode_1_1_0_final_release/index.html)
  * [[transcode-users] tcrequant status](http://www.mail-archive.com/transcode-users@exit1.org/msg01773.html)

Therefore I decided to get the [M2VRequantiser](http://www.metakine.com/products/dvdremaster/developers.html)
code  from [Metakine](http://www.metakine.com/) working on both 32-bit and 64-bit
Linux as a replacement for `tcrequant`. M2VRequantiser accepts the raw MPEG2 video
data (not VOB) from the standard input and writes the recompressed frames to
the standard output. M2VRequantiser takes two arguments. The first one is a
floating point value specifying the ratio of compression. The second is the
size of the M2V, since the data is streamed to M2VRequantiser it cannot know
the M2V size. The following command would recompress 'original.m2v', whose
size is 1024000 bytes, by a factor of 1.25.

```bash
M2VRequantiser 1.25 1024000 < original.m2v > requantised.m2v
```

I've only tested on 32-bit and 64-bit Linux, specifically Ubuntu 8.10. It works
for me but I'd be interested to get your feedback.

  * [M2VRequantiser](https://code.launchpad.net/~flexiondotorg/m2vrequantiser/trunk)
