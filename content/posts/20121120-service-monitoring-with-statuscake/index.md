---
title: Service Monitoring with StatusCake
aliases: /posts/2012-11-service-monitoring-with-statuscake
date: 2012-11-20 17:14:47
tags: [ Server Monitoring ]
summary: Service availability monitoring using StatusCake
sidebar: true
images: hero.webp
hero: hero.webp
---

We use two server monitoring services at work, one that does external
availability checks of critical services and another agent based monitor that
reports various system metrics. Neither of these monitoring tools offer
sensible free plans.

I recently setup [monitor.us](http://monitor.us) to do external monitoring of
my VPS hosts. It's very good and offers many tests (internal and external),
smartphone apps and reports. All are available on the free plan. However, the
user interface is cumbersome, the reports are ugly and it feels too formal for
my personal use. Therefore I no longer use it, but it does a job, so give it a
try.

I don't require agent based systems monitoring. Simple external availability
monitoring is all I need for the few personal websites and services I run.
So I went off to find and alternative and after some _google-fu_ I found
[StatusCake](https://www.statuscake.com/?aff=1963).

[StatusCake](https://www.statuscake.com/?aff=1963) is easy to configure, offers
monitoring of http(s), TCP ports and ICMP Ping. Notifications can be delivered via
Boxcar, Pushover, NotiApp, Skype, Twitter, email and SMS. [StatusCake](https://www.statuscake.com/?aff=1963)
also looks beautiful and their [Real Browser Testing](https://www.statuscake.com/at-statuscake-we-like-real-website-testing/)
feature is very interesting.

Several plans are available at attractive prices and the free plan supports
unlimited sites. Brilliant! Perfect for personal use. [StatusCake](https://www.statuscake.com/?aff=1963)
has only been around since August 2012 (as far as I can tell) but is already
shaping up to be real contender to [Pingdom](https://www.pingdom.com/).

What monitoring services are you using?
