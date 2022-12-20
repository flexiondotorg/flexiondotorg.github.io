---
title: Humax Foxsat HDR Custom Firmware
aliases: /posts/2014-06-humax-foxsat-hdr-custom-firmware
date: 2014-06-29 12:00:00
tags: [ Humax Foxsat HDR,Linux,Firmware,Hacking ]
summary: Hard disk upgrades and custom firmware on the Humx Foxsat HDR
sidebar: true
images: hero.webp
hero: hero.webp
---

I've had these notes kicking around for absolutely ages. I haven't checked to
see if this stuff is still accurate because during the last 12 months or so our
viewing habits have changed and we almost exclusively watch streamed content now.

That said, my father-in-law gave us a [Humax Foxsat HDR](http://www.amazon.co.uk/Humax-FOXSAT-HDR-Freesat-Digital-Recorder/dp/B001L5YU36)
Freesat digital recorder as a thank you for some work I did for him. It turns
out the Humax Foxsat HDR is quite hackable.

# Hard Disk Upgrade

I contributed to the topic below. The Humax firmware only supports disks up to
1TB but the hackers method works for 2TB drives, possibly bigger but I haven't
tried. I've upgraded mine and my father-in-laws to 2TB without any problems.

  * <http://www.avforums.com/forums/pvrs-vcrs/1336395-humax-foxsat-hdr-upgrade-hdd-2tb.html>

# Custom Firmware

These are the topics that discuss the custom firmware itself and includes the
downloads. Once the custom firmware is installed and it's advanced interface has
been enabled you can enable several add-ons such as Samba, Mediatomb, ssh, ftp, etc.

  * <http://www.avforums.com/threads/media-file-server-bundle-for-the-foxsat-hdr-release-4-part-5.1829374/>
  * <http://www.avforums.com/forums/freesat/1747997-media-file-server-bundle-foxsat-hdr-release-4-0-part-4-a.html>
  * <http://www.avforums.com/forums/freesat/1661195-media-file-server-bundle-foxsat-hdr-release-4-0-part-3-a.html>
  * <http://www.avforums.com/forums/freesat/1599048-media-file-server-bundle-foxsat-hdr-release-4-0-part-2-a.html>
  * <http://www.avforums.com/forums/freesat/1517610-media-file-server-bundle-foxsat-hdr-release-4-0-part-1-a.html>

## Web Interface

This is the topic about the web interface. No download required it is
bundled in the custom firmware above.

  * <http://www.avforums.com/forums/freesat/1601205-web-interface-channel-editor-plug-foxsat-hdr.html>

## Channel Editor

The channel editor is installed and configured via the web interface and
is one of my favourite add-ons. It also allows you to enable non-freesat
channels in the normal guide.

  * <http://www.avforums.com/forums/freesat/1601205-web-interface-channel-editor-plug-foxsat-hdr.html>

# Non Freesat channels

We get our broadcasts from Astra 2A / Astra 2B / Astra 2D / Eurobird 1 (28.2°E).
Other free to air channels are available and KingOfSat lists them all.
These channels can only be added via the Humax setup menus, but can then
be presented in the normal EPG using the Channel Editor above.

  * <http://en.kingofsat.net/pos-28.2E.php>

# Decrypt HD recordings

I never actually tried this, but what follows might be useful.

  * <http://www.avforums.com/forums/pvrs-vcrs/1721573-can-i-install-auto-unprotect-foxsat-hdr-if-so-how.html>
  * <http://www.avforums.com/forums/18051843-post715.html>
  * <http://www.avforums.com/forums/18057417-post732.html>
  * <http://www.avforums.com/forums/18061024-post740.html>
  * <http://www.avforums.com/forums/18085731-post768.html>

# OTA updates

**This is not so relevant now, since Humax haven't released an OTA update for some time.**

I have not yet found a way to prevent automatic over the air updates from being
automatically applied. When an over the air update is applied the Humax still
works, but the web interface and all the add-ons stop working. The can be solved
by waiting for the custom firmware to be updated (which happen remarkably quickly)
and then re-flashing the custom firmware. All the add-ons should start working again.
