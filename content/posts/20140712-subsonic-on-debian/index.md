---
title: subSonic on Debian
aliases: /posts/2014-07-subsonic-on-debian
date: 2014-07-12 12:00:00
categories: [ "Linux", "Open Source", "Tutorial", "Self Hosting" ]
tags: [ "Debian", "subSonic", "Android", "UltraSonic", "Clementine", "Tomcat" ]
summary: Setting up subSonic music streaming on Debian
sidebar: true
images: hero.webp
hero: hero.webp
---

Last year I removed all my music from Google Play Music and created my own
[subSonic](http://www.subsonic.org/) server. I really like subSonic but don't
use it a huge amount, mostly for syncing some music to my phone prior to going
on holiday or business. Therefore, I've made a single one time donation to the
project rather than the ongoing monthly usage fee.

# Installing subSonic on Debian

This is how I install subSonic on Debian Wheezy.

## Install Tomcat.

```bash
sudo apt-get install tomcat7
```

## Install subSonic.

```bash
apt-get install ffmpeg
sudo mkdir /var/subsonic
sudo chown tomcat7: /var/subsonic
sudo wget -c https://github.com/KHresearch/subsonic/releases/download/v4.9-kang/subsonic.war
sudo cp subsonic.war /var/lib/tomcat7/webapps
```

Restart Tomcat.

```bash
sudo service tomcat7 restart
```

Login to subSonic by visiting <http://server.example.org:8080/subsonic> and
login with the credentials `admin` and `admin`. Make sure you change the
password straight away.

Right, that is it. You can stop here and start filling subSonic with your
music.

# subSonic clients

On the rare occasions that I listen to music via subSonic I use
[UltraSonic](https://play.google.com/store/apps/details?id=com.thejoshwa.ultrasonic.androidapp)
for Android and [Clementine](https://www.clementine-player.org/) on my Arch Linux
workstations.

#### References

  * <http://www.subsonic.org/pages/installation.jsp>
  * <https://github.com/KHresearch/subsonic/>
