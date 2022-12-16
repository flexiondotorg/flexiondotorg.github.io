---
title: Headless cloudprint server on Debian for MFC-7360N
aliases: /posts/2014-07-headless-cloudprint-server-for-mfc-7360n-on-debian
date: 2014-07-05 12:00:00
tags: [ Linux,Cloudprint,Debian,MFC-7360N,Android,Chrome ]
summary: Create a headless Cloudprint server on Debian for MFC-7360N
sidebar: true
images: hero.png
hero: hero.png
---

I have a Brother MFC-7360N printer at home and there is also one at work.
I wanted to to get [Cloudprint](http://www.google.co.uk/cloudprint/learn/)
working with Android devices rather than use the Android app Brother
provide, which is great when it works but deeply frustrating (for my wife)
when it doesn't.

What I describe below is how to Cloudprint enable "Classic printers" using
Debian Wheezy.

# Install CUPS

Install CUPS and the Cloudprint requirements.

```bash
sudo apt-get install cups python-cups python-daemon python-pkg-resources
```

# Install the MFC-7360N Drivers

I used the URL below to access the `.deb` files required.

  * <http://support.brother.com/g/b/downloadlist.aspx?c=gb&lang=en&prod=mfc7360n_all&os=128>

If you're running a 64-bit Debian, then install `ia32-libs` first.

```bash
sudo apt-get install ia32-libs
```

Download and install the MFC-7360N drivers.

```bash
wget -c http://download.brother.com/welcome/dlf006237/mfc7360nlpr-2.1.0-1.i386.deb
wget -c http://download.brother.com/welcome/dlf006239/cupswrapperMFC7360N-2.0.4-2.i386.deb
sudo dpkg -i --force-all mfc7360nlpr-2.1.0-1.i386.deb
sudo dpkg -i --force-all cupswrapperMFC7360N-2.0.4-2.i386.deb
```

## Configure CUPS

Edit the CUPS configuration file commonly located in `/etc/cups/cupsd.conf`
and make the section that looks like this...

```text
# Only listen for connections from the local machine.
Listen localhost:631
Listen /var/run/cups/cups.sock
```

...is changed to look like this:

```text
# Listen on all interfaces
Port 631
Listen /var/run/cups/cups.sock
```

Modify the Apache specific directives to allow connections from everywhere as
well. Find the follow section in `/etc/cups/cupsd.conf`:

```apacheconf
<Location />
# Restrict access to the server...
  Order allow,deny
</Location>

# Restrict access to the admin pages...
<Location /admin>
  Order allow,deny
</Location>

# Restrict access to the configuration files...
<Location /admin/conf>
  AuthType Default
  Require user @SYSTEM
  Order allow,deny
</Location>
```

Add `Allow All` after each `Order allow,deny` so it looks like this:

```apacheconf
<Location />
# Restrict access to the server...
  Order allow,deny
  Allow All
</Location>

# Restrict access to the admin pages...
<Location /admin>
  Order allow,deny
  Allow All
</Location>

# Restrict access to the configuration files...
<Location /admin/conf>
  AuthType Default
  Require user @SYSTEM
  Order allow,deny
  Allow All
</Location>
```

## Add the MFC-7360N to CUPS

If your MFC-7360N is connected to your server via USB then you should be
all set. Login to the CUPS administration interface on <http://yourserver:631>
and modify the MFC7360N printer (if one was created  when the drivers where installed)
then **make sure you can print a test page via CUPS before proceeding.**

# Install Cloudprint and Cloudprint service

```bash
wget -c http://davesteele.github.io/cloudprint-service/deb/cloudprint_0.11-5.1_all.deb
wget -c http://davesteele.github.io/cloudprint-service/deb/cloudprint-service_0.11-5.1_all.deb
sudo dpkg -i cloudprint_0.11-5.1_all.deb
sudo dpkg -i cloudprint-service_0.11-5.1_all.deb
```

## Authenticate

Google accounts with 2 step verification enabled need to use an
application-specific password.

  * <http://www.google.com/support/accounts/bin/static.py?page=guide.cs&guide=1056283&topic=1056286>

Authenticate `cloudprintd`.

```bash
sudo service cloudprintd login
```

You should see something like this.

```text
Accounts with 2 factor authentication require an application-specific password
Google username: you@example.org
Password:
Added Printer MFC7360N
```

Start the Cloudprint daemon.

```bash
sudo service cloudprintd start
```

If everything is working correctly you should see your printer the
following page:

  * <https://www.google.com/cloudprint#printers>

# Printing from mobile devices

## Android

Add the [Google Cloud Print](https://play.google.com/store/apps/details?id=com.google.android.apps.cloudprint)
app to Android devices and you'll be able to configure your printer
preferences and print from Android..

## Chrome and Chromium

When printing from within Google Chrome and Chromium you can now select
Cloudprint as the destination and choose your printer.

#### References

  * <https://github.com/armooo/cloudprint>
  * <http://davesteele.github.io/cloudprint-service/>
  * <https://github.com/davesteele/cloudprint-service>
  * <http://injustfiveminutes.com/2013/11/07/remote-access-to-cups-admin-inter/>
  * <http://ubuntuforums.org/showthread.php?t=1794179>
  * <https://support.google.com/a/answer/2906017?hl=en>
