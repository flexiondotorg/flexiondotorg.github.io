---
title: Lumagen Video Processor Bug Hunting
aliases: /posts/2005-11-lumagen_video_processor_bug_hunting/
date: 2005-11-22 12:02:37
categories: [ "Home Cinema", "Entertainment" ]
tags: [ "Lumagen", "VisionDVI", "FPGA", "Scaler", "Freeview" ]
summary: Hunting for bugs in an FPGA video processor
sidebar: true
images: hero.webp
hero: hero.webp
---

I have spent the last few weeks tweaking and improving my home cinema setup,
most of my time has been spent learning how to fully exploit my
[Lumagen](http://www.lumagen.com) video processor. I am extremely impressed
with the huge improvements in image quality the [Lumagen VisionDVI](http://www.lumagen.com/testindex.php?module=dvi_details)
provides as opposed to sending video sources direct to the plasma screen, but something
isn't right with the de-interlacing of DVB-T (or Freeview as we call it in the
UK). I have isolated the exact issue and posted a problem report in the
[Lumagen forums](http://www.convergent-av.co.uk/forum/index.php).
