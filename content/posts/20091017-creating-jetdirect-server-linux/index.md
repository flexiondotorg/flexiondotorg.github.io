---
title: Creating a JetDirect Server with Linux
aliases: /posts/2009-10-creating-jetdirect-server-linux
date: 2009-10-17 11:41:21
tags: [Linux,Ubuntu,NSLU2,JetDirect,Printing ]
summary: Using the NSLU2 as a JetDirect print server
sidebar: true
images: hero.webp
hero: hero.webp
---

I created JetDirect compatible server on my NSLU2 running Ubuntu Jaunty 9.04
using [p910nd](http://p910nd.sourceforge.net/), which is a small printer daemon
that does not spool to disk but passes the job directly to the printer. It is
particularly useful for disk less Linux workstations and embedded devices that
have a printer hanging off them.
