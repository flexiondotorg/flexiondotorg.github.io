---
title: Microsoft Office 2010 on Arch Linux and Ubuntu
aliases: /posts/2013-01-microsoft-office-on-arch-linux-and-ubuntu
date: 2013-01-29 16:16:47
tags: [ Linux,Wine,Microsoft Office,Arch Linux,Ubuntu ]
summary: Install Microsoft Office 2010 on Arch Linux and Ubuntu
sidebar: true
images: hero.webp
hero: hero.webp
---

We have a mix of Linux and Windows users at work. My department use Linux
and the rest of the business use Windows. We been running a mixture of
[LibreOffice](http://www.libreoffice.org/) and [Microsoft Office](http://office.microsoft.com/en-GB),
which works pretty well until you start trying to collaborate, then it gets
messy pretty quickly.

So, it was decided at the end of 2012 to migrate everyone, including the
Linux users, to Microsoft Office 2010.

What follows is an installation guide for [Wine](http://www.winehq.org/) and
the [60 day trial version of Office Home and Business 2010](http://office.microsoft.com/en-gb/try/)
on Arch Linux and Ubuntu. Most of this information was sourced from the Wine AppDB

  * <http://appdb.winehq.org/objectManager.php?sClass=version&iId=17336>

# Wine for Ubuntu 12.04 LTS (or better)

Install Wine on Ubuntu as follows.

```bash
sudo apt-add-repository ppa:ubuntu-wine/ppa
sudo apt-get update
sudo apt-get install ttf-mscorefonts-installer samba wine1.5 wine-gecko1.8 wine-mono
```

For 64-bit also install the following.

```bash
sudo apt-get install ia32-libs
```

# Wine for Arch Linux

<div class="alert alert-info"><strong>Update</strong> I updated this section on August 8th 2013 to reflect recent changes in Arch Linux</div>

Install Wine on Arch Linux as follows.

```bash
sudo pacman -S --needed icoutils libwbclient libxslt lib32-mpg123 p11-kit lib32-p11-kit samba wine winetricks wine-mono wine_gecko
sudo packer -S --noedit --noconfirm ttf-ms-fonts
```

For 64-bit also install the following.

```bash
sudo packer -S --noedit --noconfirm lib32-libwbclient lib32-libxslt
```

# Installing Office 2010

Once Wine is installed, installing Office 2010 is the same for Arch Linux and Ubuntu.

Create a clean wine prefix.

```bash
export WINEPREFIX="${HOME}/.msoffice2010"
export WINEARCH="win32"
winecfg
```

Click the `Libraries` tab, select `riched20` and click `Add`. The default entry
should read `riched20 (native, builtin)`. Click `Apply`, then click `OK`. This will
ensure that PowerPoint starts and selection boxes display correctly.

Install `libxml6` and `corefonts` with `winetricks`

```text
winetricks msxml6 corefonts
```

Start the Office 2010 setup. In the example below `X17-75058.exe` is the name of the
60 day trial version of Office Home and Business 2010 that I downloaded.

```bash
wine X17-75058.exe
```

Follow the installation wizard, we are only interested in running the essentials,
Word, Excel and PowerPoint. This is what I selected during the install.

  * Enter your serial number.
  * Leave ticked `Attempt to automatically activate my product online.`
  * Click `Continue`
  * Tick `I accept the terms of this agreement`
  * Click `Continue`
  * Click `Customise`
    * Microsoft Access (Trial)    [Not Available]
    * Microsoft Excel             [Run all from My Computer]
    * Microsoft OneNote           [Not Available]
    * Microsoft Outlook           [Not Available]
    * Microsoft PowerPoint        [Run all from My Computer]
    * Microsoft Publisher (Trial) [Not Available]
    * Microsoft Visio Viewer      [Run from My Computer]
    * Microsoft Word              [Run all from My Computer]
    * Office Shared Features      [Defaults]
    * Office Tools                [Defaults]
  * Click `Instal Now`.
  * Click `Close`.

That's it. Office 2010 is installed and should be associated with the appropriate
file types.

## Some Issues

Here are some of the issues we noticed running Office 2010 under Wine.

  * Always install Office 2010 into it's own `WINEPREFIX`. You are less likely to run into problem that way.
  * Online updates do not work. Fortunately, the trial installer has SP1 integrated.
  * If you purchase Office 2010 licenses you can still use the trial installer with your purchased license key(s).
  * We did test a trial of [CrossOver](http://www.codeweavers.com/). However, it wouldn't activate Office 2010 on Arch Linux but did activate on Ubuntu.
  * Files saved to `cifs` mounts are set read-only. This might be a Wine issue or due to the unusual way we have our file server configured, we are still investigating.

## Uninstalling Office 2010

Should you ever need to, you can uninstall Office 2010 as follows.

```bash
rm -rfv ${HOME}/.msoffice2010/
rm -rfv ~/.local/share/applications/wine-extension-*
rm -rfv ~/.local/share/applications/wine/Programs/Microsoft\ Office/
```
