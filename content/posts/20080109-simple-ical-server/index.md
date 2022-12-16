---
title: Simple iCal Server
aliases: /posts/2008-01-simple-ical-server
date: 2008-01-09 23:20:28
tags: [iCal,Lighttpd,Thunderbird,PHP ]
summary: Creating a self-hosted shared calendar
sidebar: true
images: hero.png
hero: hero.png
---

For the longest time I have been meaning to setup a shared calendar for my
wife I and to use. You see, like most men I have no idea when and where I am
supposed to be. This is because my wife keeps all this information in her
filofax and that lives in her handbag, somewhere I never venture. So I have
spent this evening setting up [PHP iCalendar](http://phpicalendar.net/) on
[Lighttpd](http://www.lighttpd.net/), and I am very happy with the results.

I have opted to use the `publish.php` add-on provided with PHP iCalendar, rather
than add the WebDAV module to Lighty. For our modest requirements it works
very well. We now have full read/write access to our calendar by using the
[Lightning](http://www.mozilla.org/projects/calendar/) extension for
Thunderbird and read only access via the PHP iCalendar web interface. Viewing
the calendar via the web interface requires a login first and the calendar
publishing is protected by Lighty authentication using htdigest.

Lastly, because our calendar is a nice open standard I have options as to how I
might sync it with my mobile phone. More on that when I figure it out.
