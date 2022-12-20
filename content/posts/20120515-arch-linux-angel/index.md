---
title: Arch Linux Angel
aliases: /posts/2012-05-arch-linux-angel
date: 2012-05-15 11:12:13
tags: [ Arch Linux,GNOME,Linux,Bash ]
summary: Automated scripted installs of Arch Linux
sidebar: true
images: hero.webp
hero: hero.webp
---

I've been working a shell script for Arch Linux that automatically configures
my preferred GNOME 3 setup on my netbook, laptops and workstations. The main
features are:

  * Quickly deploys Arch Linux to my specifications
  * Supports i686 and x64_64.
  * Detects ATI/AMD, Intel and Nvidia chipsets and configures the Open Source video drivers and enables early KMS.
  * Hardware and location aware. Installation and configuration can be different for Home vs Work or Desktop vs Netbook.
  * Detects and correctly configures some device specific hardware, such as touch screens and wireless drivers.
  * Automatically configures DAEMONS array.
  * Includes custom power management hooks for pm-utils.
  * Designed to safely run multiple times so that it can be used as a tool for keeping all systems consistent.

I've dubbed this script Arch Angel. I'm undecided if I'll release it publicly
since it is very much my personal preferences and to some extent my colleagues
at work. I suppose the real reason for this post is that I've been wanting to
take [Shelr](http://shelr.tv/) for a test drive, so click the Play button
below to see an example run of Arch Angel.

<iframe border='0' height='684'
id='shelr_record_4fb2223c96608047be00010e' scrolling='no'
src='http://shelr.tv/records/4fb2223c96608047be00010e/embed' style='border: 0'
width='634' />
