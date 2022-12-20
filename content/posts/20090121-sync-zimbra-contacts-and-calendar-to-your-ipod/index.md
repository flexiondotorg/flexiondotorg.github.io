---
title: Sync Zimbra Contacts, Calendar and Tasks to your iPod
aliases: /posts/2009-01-sync-zimbra-contacts-and-calendar-to-your-ipod
date: 2009-01-21 13:41:51
tags: [Zimbra,iPod,Linux ]
summary: Push Zimbra contacts, calendars & tasks to your iPod using Linux
sidebar: true
images: hero.webp
hero: hero.webp
---

We use [Zimbra](http://www.zimbra.com/) at work for email, contacts,
calendaring, etc. I have Zimbra syncing with Thunderbird and my phone, I love it.

At the weekend I was updating the music library on my iPod Nano (2nd Gen) and
noticed I had hidden the Contact and Calendar menu entries. I decided to see if
I could get my iPod Contacts and Calendar synced with Zimbra, it turned out to
be very simple. In the examples below replace `username` and `password` with
your Zimbra user credentials. Obviously use the URL to your Zimbra server and
replace `/media/IPOD` with where your Linux distribution has mounted your iPod.

```bash
wget https://username:password@your.zimbraserver.tld/zimbra/home/username/contacts.vcf -O /media/IPOD/Contacts/contacts.vcf
wget https://username:password@your.zimbraserver.tld/home/username/Calendar -O /media/IPOD/Calendars/calendar.ics
wget https://username:password@your.zimbraserver.tld/home/username/Tasks -O /media/IPOD/Calendars/tasks.ics
```
