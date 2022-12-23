---
title: NetworkManager and Ubuntu Dapper Drake 6.04
aliases: /posts/2006-03-networkmanager_and_ubuntu_dapper_drake_604
date: 2006-03-02 11:26:39
categories: [ "Linux", "Open Source" ]
tags: [ "Ubuntu", "NetworkManager" ]
summary: Fixing NetworkManager applet on Ubuntu 6.04
sidebar: true
images: hero.webp
hero: hero.webp
---

A week or so ago the
[NetworkManager](http://www.gnome.org/projects/NetworkManager/) package was
changed so that `nm-applet` (the system tray application) was separated into
it's own package. After I updated and installed `nm-applet`, I noticed that it
didn't startup anymore. I didn't have time to investigate until this morning and
found the answer in the following forum posting...

  * [NetworkManager broken after last update](http://www.ubuntuforums.org/showthread.php?t=134251)

Here is the pearl of wisdom, from that forum discussion, that helped me make
my system to be NetworkManager compatible again.

_"Network Manager has been installed on your system, however it will not
immediately be able to manage your network interfaces. To avoid problems with
important configuration being ignored, or strange behaviours, the Ubuntu version
will not manage any network interface configured in the /etc/network/interfaces file._

_To allow interfaces to be managed with Network Manager either edit the
/etc/network/interfaces file and remove (or comment out) the "auto" and "iface"
lines for those interfaces you wish it to manage, or use the "Networking"
administration tool (found under the "System" menu) to disable the interfaces."_
