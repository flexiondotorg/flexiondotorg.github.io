---
title: StarTech S354UER Review
aliases: /posts/2010-01-startech-s354uer-review
date: 2010-01-02 16:00:25
categories: [ "Linux", "Computer Hardware", "Self Hosting" ]
tags: [ "StarTech S354UER", "RAID", "Ext4" ]
summary: Creating a 4x 1.5TB storage array with the StarTech S354UER
sidebar: true
images: hero.webp
hero: hero.webp
---

*** UPDATE: The StarTech S354UER completely died after less than one year. Not recommended! ***

I've ripped my entire CD collection to MP3 and I'm in the process of ripping
my entire DVD, Blu-Ray and HD-DVD collection to MPEG-2 TS files so that I can
stream everything to my PS3 using [MiniDLNA](http://sourceforge.net/projects/minidlna/).
I currently have this data stored on an internal 2TB volume and backed up to
an external 2TB volume. I currently have just 360GB remaining capacity and
I've only imported half my DVD collection and one Blu-Ray. I need more storage.

I wanted to keep the same backup method, large internal volume backed up to a
large external volume of the same size. I opted for Samsung Spinpoint F2
EcoGreen (HD154UI) drives because they are relatively inexpensive, low power
(therefore lower heat) and quiet.

  * [Samsung Spinpoint F2 EcoGreen (HD154UI)](http://www.samsung.com/global/business/hdd/productmodel.do?type=61&subtype=78&model_cd=441)
  * [Samsung Spinpoint F2 EcoGreen (HD154UI) Review](http://www.tomshardware.com/reviews/1.5tb-hdd-caviar,2331-3.html)

I decided to get 4x 1.5TB drives for the internal volume and stripe them to
give 6TB of storage and I went looking for an external box in which I could
install 4x 1.5TB drives and also stripe or span them. That meant a multi
disk external enclosure, with some kind of RAID, supported by Linux and that
isn't too expensive. A tall order as it turns out.

After lots of research I finally found the
[StarTech S354UER](http://www.startech.com/item/S354UFER-35in-4-Drive-eSATA-USB-FireWire-External-SATA-RAID-Enclosure.aspx)
which on paper appears to do what I required and a good deal more.

  * Compatible with Windows, Mac, and Linux operating systems
  * Fan control button to enable manual control of the fan and
    switch between the three fan speeds
  * Internal three speed 80mm fan with automatic or manual controls
  * Multiple LED indicators to provide RAID information, hard drive
    activity, HDD Status, RAID rebuild status, fan settings, and interface
    in use
  * No software required
  * Package includes 1x USB, 1x eSATA, 1x FireWire 400, 1x FireWrie 800 cable,
    Power adapter and cord, and the manual
  * Plug-and-Play and Hot swap supported with USB 2.0, eSATA, and FireWire
  * Push button raid configuration eliminated the need to disassemble the
    enclosure to upgrade your raid configurations
  * Removable front cover for easy access to hard drive
  * Rugged aluminum chassis
  * Supported File Systems:NTFS, FAT, FAT32, and ext3
  * Supports four 3.5in hard drives up-to 2.0 TB each in size
  * Supports RAID 0, RAID 1, RAID 3, RAID 5, RAID 10 (RAID 1+0), and
    Spanning

Normally, I will read reviews of different products and select something with
a proven track record particularly when Linux support is required. I couldn't
find much in the way of reviews for the StarTech S354UER so I took a gamble
and decided to buy one. Eeek!

In short it works and it is quiet. It is currently sitting no more than 50cm
from me initialising a stripped array of 4x1.5Tb disks as Ext4. I can't hear
it but I have manually set the fan speed to low using the fan control buttons
on the front on the chassis.

The build quality is not great, but not awful either, but once the drives are
installed and clamped in place they are very secure. It is impossible to tell
if you've pushed the power button you have to wait and see if the device powers
up/down to be sure. The fan speed controls work, but are inverted from what is
documented in manual. Fan1 is documented as LOW in the manual but is actually HIGH.

Setting up the device was not quiet plug and play either but the issues
I ran into may not be entirely the fault of the StarTech S354UER. My plan was
to connect the enclosure via Firewire and as yet I've not been able to get the
enclosure to be recognised via Firewire using Ubuntu Jaunty 9.04. However, I
am a Firewire newbie so maybe more research required. I don't have eSATA (yet)
so I have the device connected via USB 2.0. Which does work.

One of my new hard disks turned out to be DOA. It took me a while to figure out
what was wrong here. The StarTech drive failure light on the front of the chassis
was illuminated, but I didn't know how to tell which drive had actually failed.
After some trial and error I found that there are four internal LEDs, one for
each disk. Starting the StarTech with the chassis door open you can see the
internal LEDs blinking as each disk is spun up and tested. If the drive
failure LED on the front of chassis is illuminated look at the internal LEDs,
the drive LED which is off denotes the failed drive. This information is not
in the user manual!

I replaced the drive and was able to select my RAID level. Selecting the RAID
level is done though a combination of DIP switches under a panel at the back
of the unit and buttons on the front. It is a slightly fiddly process, but it
does have the advantage that you can't accidentally change your RAID levels and
re-initialise the array.

In order to create a partition greater than 2TB you have to use GPT. I'd not
encountered GPT before, but I found everything I needed to know on the page
below.

  * [Make the most of large drives with GPT and Linux](http://www.ibm.com/developerworks/linux/library/l-gpt/)

I used `gparted` to create my partition and format with Ext4 with the
enclosure connected via USB 2.0. The whole process took ~1 hour. As you will
see from the link the quoted price makes this enclosure pretty expensive.
Search around though, because I got mine of 50% less than the price quoted on
the StarTech.com website. You do get a healthy selection of RAID levels, all
the cables, screws, screwdriver and drive handles you require.

Would I recommend the StarTech S354UER? Time will tell, but it does work with
Linux via USB 2.0 and I will continue investigate FireWire and I may add eSATA
in the future to see what the performance benefits are. But for what I bought
it for, secondary storage for backups, it is a pretty cheap way to add a multi
terrabyte array to your system.
