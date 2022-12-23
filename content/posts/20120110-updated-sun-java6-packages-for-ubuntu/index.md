---
title: Sun Java 1.6.0.30 packages for Ubuntu
aliases: /posts/2012-01-updated-sun-java6-packages-for-ubuntu
date: 2012-01-10 10:53:50
lastmod: 2012-01-16
categories: [ "Linux", "Open Source", "Development" ]
tags: ["Ubuntu", "Debian", "Java", "JDK", "JRE", "PPA" ]
summary: Get Sun Java 1.6.0 packages from a PPA
sidebar: true
images: hero.webp
hero: hero.webp
---

## Update Friday 13th January 2012

**My Java PPA has been disabled by Canonical, possibly because they violate the Ubuntu CoC and PPA terms of use, as Jef Spaleta noted in the comments below, although I've had no communication from Canonical at this time. I'm preparing an alternative solution, for those of you who need Sun Java 6, that doesn't violate and copyrights, CoCs or terms of use. A new blog post will be made when that alternate solution is available.**

## Update Monday 16th January 2012

**I've developed another solution for installing Java 6u30 on Ubuntu which
doesn't infringe any copyrights, licenses, terms of use or CoC's.**

  * **[Install Sun Java 6 JRE and JDK from .deb packages](2012-01-install-sun-java-6-jre-jdk-from-deb-packages.html)**

~~Sun Java 6 packages are being removed from Ubuntu in the near future for the
following reasons:~~

  * ~~As of August 24th 2011, Canonical no longer have permission to redistribute
    new Java packages as Oracle has retired the "Operating System Distributor
    License for Java".~~
  * ~~Oracle has published an advisory about security issues in the version of
    Java currently in the partner archive. Some of these issues are currently
    being exploited in the wild.~~
  * ~~Due to the severity of the security risk, **Canonical released a security
    update for the Sun JDK browser plugin which disables the plugin on all machines**.~~
  * ~~In the near future, **Canonical will remove all Sun JDK packages from the
    Partner archive**. This will be accomplished by pushing empty packages to
    the archive, so that the Sun JDK will be removed from all users machines
    when they do a software update. **Users of these packages who have not
    migrated to an alternative solution will experience failures after the
    package updates have removed Oracle Java from the system**.~~

~~See the full Canonical notice below.~~

  * ~~<https://lists.ubuntu.com/archives/ubuntu-security-announce/2011-December/001528.html>~~

~~My personal motivations for creating this PPA are as follows:~~

  * ~~I require Sun Java 6 for two enterprise applications we use at work. OpenJDK is not fully compatible.~~
  * ~~I require Sun Java 6 for two desktop applications at home (so does my father-in-law). OpenJDK not compatible in one instance and not fully compatible in the other.~~
  * ~~I require Sun Java 6 browser plugin for a web applications I use at home. OpenJDK is not compatible.~~
  * ~~A friend of mine requires Sun Java 6 for building AOSP from source. OpenJDK is not compatible.~~
  * ~~Some friends of mine play Minecraft, apparently this will help ;-)~~
  * ~~Janusz Dziemidowicz made it easy for me - [https://github.com/rraptorr/sun-java6](https://github.com/rraptorr/sun-java6)~~
~~The PPA currently publishes Sun Java 6 1.6.0.30 for:~~

  * ~~Lucid i386/amd64~~
  * ~~Maverick i386/amd64~~
  * ~~Natty i386/amd64~~
  * ~~Oneiric i386/amd64~~
  * ~~Precise i386. However, amd64 is failing to build on Precise. I will try and fix this in due course.~~

~~To Sun Java 6 , previously installed via packages, do the following.~~

```bash
sudo apt-add-repository ppa:flexiondotorg/java
sudo apt-get update
sudo apt-get dist-upgrade
```

~~To install Sun Java 6 JRE do the following:~~

```bash
sudo apt-add-repository ppa:flexiondotorg/java
sudo apt-get update
sudo apt-get install sun-java6-jre
```

~~To install Sun Java 6 browser plugin do the following:~~

```bash
sudo apt-add-repository ppa:flexiondotorg/java
sudo apt-get update
sudo apt-get install sun-java6-plugin
```

~~To install Sun Java 6 JDK do the following:~~

```bash
sudo apt-add-repository ppa:flexiondotorg/java
sudo apt-get update
sudo apt-get install sun-java6-jdk
```

~~You can take a look a round my PPA from the URL below:~~

  * ~~[https://launchpad.net/~flexiondotorg/+archive/java](https://launchpad.net/~flexiondotorg/+archive/java)~~
