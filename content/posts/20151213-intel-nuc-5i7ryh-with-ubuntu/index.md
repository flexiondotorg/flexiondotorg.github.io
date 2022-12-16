---
title: Intel NUC5i7RYH with Ubuntu
aliases: /posts/2015-12-intel-nuc5i7ryh-with-ubuntu
date: 2015-12-13 13:18:00
tags: [ Intel,NUC,NUC5i7RYH,Samsung SM951,M.2,NVME,Ubuntu,Linux ]
summary: My Intel NUC5i7RYH part list and build
sidebar: true
images: hero.png
hero: hero.png
---

I've just bought my first *brand new* computer since 2008. Thanks to
the [Black Friday](https://en.wikipedia.org/wiki/Black_Friday_(shopping))
and [Cyber Monday](https://en.wikipedia.org/wiki/Cyber_Monday) sales on
[Amazon.co.uk](http://www.amazon.co.uk) and [Scan.co.uk](http://www.scan.co.uk)
this year I was able to put together a pretty sweet Intel NUC which is
now running [Ubuntu MATE 15.10](https://ubuntu-mate.org).

I spoke about this new system on [LINUX Unplugged Episode 122](http://www.jupiterbroadcasting.com/91276/thunderclouds-around-thunderbird-lup-122/) and have been contacted by people
wanting more details. Hopefully this blog post will answer any outstanding
questions. Press play below to hear to what I said on the podcast.

<div align="center">
<iframe id="ytplayer" type="text/html" width="853" height="480" src="https://www.youtube.com/embed/qBoxqO1zFgI?start=5996&amp;html5=1&amp;rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>

## The NUC

I purchased an Intel Next Unit of Computing (NUC) Kit
[NUC5I7RYH](http://www.intel.com/content/www/us/en/nuc/nuc-kit-nuc5i7ryh.html).

  * Barebones mini PC
  * 1 x [Core i7 5557U](http://ark.intel.com/products/84993/Intel-Core-i7-5557U-Processor-4M-Cache-up-to-3_40-GHz) / 3.1 GHz
  * [Iris Graphics 6100](http://www.intel.com/content/www/us/en/support/graphics-drivers/intel-iris-graphics-6100-for-5th-generation-intel-core-processors.html)
  * Gigabit Ethernet
  * Bluetooth 4.0 LE
  * 802.11a/b/g/n/ac WiFi

Everything works out of the box with Ubuntu MATE 15.10 including sending
audio to the monitor over HDMI and DisplayPort.

## The RAM

The [Core i7 5557U](http://ark.intel.com/products/84993/Intel-Core-i7-5557U-Processor-4M-Cache-up-to-3_40-GHz)
specs state that DDR3L 1866 Mhz RAM is supported. The arstechnica
[Mini-review: Intel’s powered-up Core i7 Broadwell mini PC](http://arstechnica.com/gadgets/2015/03/mini-review-intels-powered-up-core-i7-broadwell-mini-pc/)
has some benchmarks that show a performance improvement when using 1866
Mhz clocked RAM, so I purchased:

  * [HyperX Impact SODIMM - 16GB Kit*(2x8GB) - DDR3L 1866MHz CL11 SODIMM](http://www.hyperxgaming.com/us/memory/impact)

## The SSDs

I have two SSDs in the NUC.

  * Samsung MZVPV256HDGL-00000 - SM951 256GB M.2 PCI-e 3.0 x 4 [NVMe](https://en.wikipedia.org/wiki/NVM_Express) Solid State Drive
  * [SanDisk Ultra II SSD 960 GB Sata III 2.5-inch Internal SSD](https://www.sandisk.co.uk/home/ssd/ultra-ii-ssd)

**This is where you might need to do some more research.** At the
time of writing, it is not possible to boot directly from the Samsung
SM951 NVMe SSD. Although other quad channel NVMe SSDs do appear to be
supported as the boot device. It is possible that the [Samsung SSD 950 Pro](http://www.samsung.com/global/business/semiconductor/minisite/SSD/global/html/ssd950pro/overview.html),
which is also NVMe, can be used as the boot device in Linux, but *don't
take my word for it*. Do your research.

My work around was make the SanDisk Ultra II the boot device by putting
`/boot` and the MBR on it. I have put `/` and `swap` (swap because I
want to experiment with suspend and hibernate) are on the Samsung SM951
and `/home` is on the SanDisk Ultra II.

There are faster SSDs than the SanDisk Ultra II but this was 50% off
during Black Friday and just too good a deal to pass by. I did
sacrifice a little performance on this component, so if absolute
performance is your goal look at alternative SSDs, the [Samsung 850 EVO](http://www.samsung.com/global/business/semiconductor/minisite/SSD/global/html/ssd850evo/overview.html)
seems to benchmark favourably.

## The Monitor

A week after I purchased the NUC I noticed [ebuyer.com](http://www.ebuyer.com/)
were selling the monitor I wanted with a £100 discount. So I snapped one up.

  * [Samsung S27D850T](http://www.samsung.com/uk/business/business-products/business-monitor/professional/LS27D85KTSN/XU) 27" WQHD LED DVI HDMI Monitor

The NUC is connected via mini Display Port and my Dell Precision T7400
is connected via HDMI. The Samsung S27D850T has an audio out and a 2.1
speaker set is connected to it.

## Conclusion

I'm extremely happy with the [NUC5I7RYH](http://www.intel.com/content/www/us/en/nuc/nuc-kit-nuc5i7ryh.html).
Linux compatibility is first class, it's fast and has relatively low
power consumption. You can even charge a mobile phone using one of the
front USB ports (the yellow one) when the NUC is powered off. It is my
principle workstation and is able to handle everything I demand from it,
with ease:

  * mp3 and ogg audio encoding
  * h.264 video encoding (~1 min of video @480p encodes in 1 second)
  * running multiple virtual machines
  * compiling large applications
  * creating xz compressed images of Ubuntu flavours for the Raspberry Pi 2

I've not tried gaming on it yet, but the holidays are approaching and
[GRID Autosport](http://www.gridgame.com/) was released for
[SteamOS](http://store.steampowered.com/steamos/) this week. So I know
what I'll be doing in a couple of weeks time `:-D`
