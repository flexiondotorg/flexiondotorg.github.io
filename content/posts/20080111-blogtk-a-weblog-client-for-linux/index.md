---
title: BloGTK, a weblog client for Linux
aliases: /posts/2008-01-blogtk-a-weblog-client-for-linux
date: 2008-01-11 13:44:07
categories: [ "Linux", "Open Source", "Content Creation", "Tutorial" ]
tags: [ "Content Management", "Wordpress", "GNOME", "xmlrpc", "BloGTK", "Debian", "Ubuntu" ]
summary: Graphical blogging client for GNOME
sidebar: true
images: hero.webp
hero: hero.webp
---

I have been meaning to setup a weblog client for a while now. I have tested a
couple of blog clients and have settled on [BloGTK](http://blogtk.sourceforge.net/).

It has a simple user interface but comprehensive features, although I did need
to define a few Custom Tags before the editor supported all the formatting
options I wanted. Setting up BloGTK is very simple for Ubuntu and Debain users
requiring an `aptitude install blogtk` to get it installed and the following
settings will connect to a Wordpress blog.

  * Server URL: `http://blog.example.org/xmlrpc.php`
  * Account: *Your Username*
  * Password: *Your Password*
  * Blogging System: *Moveable Type*

Now I can blog directly from my desktop, I am hoping it will encourage me to
post more often.
