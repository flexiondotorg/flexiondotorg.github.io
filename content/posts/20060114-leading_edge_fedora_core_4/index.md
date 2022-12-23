---
title: Leading edge Fedora Core 4
aliases: /posts/2006-01-leading_edge_fedora_core_4
date: 2006-01-14 11:32:31
categories: [ "Linux", "Open Source" ]
tags: [ "Debian", "Fedora", "Ubuntu", "Slackware", "Crux" ]
summary: Taking a look at Fedora Core 4
sidebar: true
images: hero.webp
hero: hero.webp
---

Having spent all of 2005 using [Ubuntu](http://www.ubuntu.com) I have learnt a
lot about [Debian](http://www.debian.org) and even started using Debian for my
servers.

Despite using Linux for over 10 years I had never previously used Debian and had
even avoided using it. I was surprised by how much I liked using Ubuntu and
Debian and decided that I give [Fedora](http://fedoraproject.org/) another try
as I have never warmed to [redhat](http://www.redhat.com/) in the same way I had
never previously warmed to Debian. For the longest time I used [Slackware](http://www.slackware.com/)
and then switched to [Crux](http://crux.nu/).

This week I have installed Fedora Core 4 on my home computer and been hugely
impressed, but this is mostly down to finding the nrpms.net repository. I was
already using the RPMforge.net group of repositories and nrpms.net is striving
for RPMforge compatibility, so far I haven't experienced any package or
dependency breakage so they must be doing something right. Thanks to nrpms.net
I have effortlessly upgraded FC4 to GNOME 2.12.1, Firefox 1.5, mono 1.1.12 plus
numerous other GNOME applications I regularly use which aren't available
elsewhere. The real bonus was to get NetworkManager 0.5.1 from nrpms.net which
actually works, and works reliably!

As a result, this is a Linux distribution I can install on my wifes laptop
without fear of reprisals. I have found that installing proprietary
hardware drivers and software has been much simpler for Fedora than Ubuntu,
most notable are VMWare Player, Linuxant HSF modem drivers, ATI drivers, Opera
and Skype.

I have been able to get my Smartphone and PocketPC working under Ubuntu
the amount of tweaking and constant manual intervention is cumbersome. So I
was staggered when after installing the SynCE packages on Fedora both devices
just worked when connected via USB, the whole process was completely seamless.

So, after a few days tinkering I have everything I need installed, configured
and working reliably. Fedora is not perfect thought, `yum` is still lagging
behind `apt` and even that even after enabling a number of the excellent 3rd
party repositories the number and variety of packages available
to FC4 isn't that great. Installing software is just so slow, what the bloody
hell is `yum` doing? Using `yumex` is coma inducing and `up2date` just doesn't
work.

That said, there is some work being done in these areas for FC5 so maybe
the gap will be closed on `apt` a little in the coming months. I do like the
fact that the official Fedora repositories update packages past the
final release date, something which Ubuntu doesn't do. This means that on my
first `yum update` OpenOffice was upgrade from 1.9.140 Beta to 2.0.1 final and
many other essential applications were also upgraded. Just when I thought it
couldn't get any better I discovered the "Early Login" feature which is new to
Fedora Core 4. It is simply brilliant and I can not get from power button to
GNOME desktop in 20 seconds. I so wanted to not like Fedora but I have to say
I think I might be converted. I will have to see how long this enthusiasm for
Fedora will last, but I am already looking forward to FC5.
