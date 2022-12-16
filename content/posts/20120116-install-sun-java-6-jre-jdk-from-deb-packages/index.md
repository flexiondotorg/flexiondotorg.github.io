---
title: Install Sun Java 6 JRE and JDK from .deb packages
aliases: /posts/2012-01-install-sun-java-6-jre-jdk-from-deb-packages
date: 2012-01-16 13:20:05
tags: [Linux,Ubuntu,Debian,Java,JDK,JRE,Bash ]
summary: An alternative approach to install Sun Java 6 on Ubuntu
sidebar: true
images: hero.png
hero: hero.png
---

Canonical disabled my Java PPA at the end of last week. So I've developed
another solution for installing Java on Ubuntu which doesn't infringe any
copyrights, licenses, terms of use or CoC's. However, by running this script
to download Java you acknowledge that you have read and accepted the terms of
the Oracle end user license agreement.

  * <http://www.oracle.com/technetwork/java/javase/terms/license/>

My script is an automated wrapper for [Janusz Dziemidowicz Debian packaging
scripts for Java 6](https://github.com/rraptorr/sun-java6). My new script
simply downloads the Java binary installers from Oracle, builds the .deb
packages locally on your computer and creates a local 'apt' repository for
them. Once my script has been executed you can then 'apt-get' install/upgrade
Java 6 from your local repository. Packages are compatible with "official"
Ubuntu ones and pre-existing Java 6 packages will upgrade cleanly. You can
find the script and full usage instructions on github.

<iframe src="http://ghbtns.com/github-btn.html?user=flexiondotorg&repo=oab-java6&type=watch&count=true&size=large"
allowtransparency="true" frameborder="0" scrolling="0" width="260px" height="30px"></iframe>
<iframe src="http://ghbtns.com/github-btn.html?user=flexiondotorg&repo=oab-java6&type=fork&count=true&size=large"
allowtransparency="true" frameborder="0" scrolling="0" width="260px" height="30px"></iframe>

Please read the [README](https://github.com/flexiondotorg/oab-java6/blob/master/README.rst)
file for a more detailed explanation of how the script works and how to use it.
If anyone has any problems, then please submit a ticket on my
[Issue Tracker](https://github.com/flexiondotorg/oab-java6/issues).
