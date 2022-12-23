---
title: Setting up Open Media Vault on the HP MicroServer N54L
aliases: /posts/2013-08-setting-up-open-media-vault-on-the-N54L
date: 2013-08-07 21:21:09
categories: [ "Linux", "Open Source", "Tutorial", "Self Hosting" ]
tags: [ "Debian", "Open Media Vault", "HP MicroServer", "N54L", "BIOS", "Transmission", "Plex", "Hacking" ]
summary: Open Media Vault on the HP ProLiant MicroServer G7 N54L
sidebar: true
images: hero.webp
hero: hero.webp
---

I've installed [Open Media Vault](http://www.openmediavault.org/) (OMV)
on my new [HP ProLiant MicroServer G7 N54L](http://www8.hp.com/uk/en/products/proliant-servers/product-detail.html?oid=5336624)
to replace my aging, and lackluster, [ReadyNAS](http://www.readynas.com) NV.

OpenMediaVault (OMV) is a network attached storage (NAS) solution based on
[Debian](http://www.debian.org) Linux. At the time of writing OMV 0.5.x is
based on Debian 6.0 (Squeeze).

This blog post is not going to cover the extremely simple OMV installation
procedure, it assumes OMV 0.5.x is already installed. This post explains
how to upgrade the kernel, install some addtional plugins and some hackery
to update [Transmission](http://www.transmissionbt.com/).

This blog post is basically the essential notes I need to recreate my server setup.

# N54L Custom BIOS

I've installed one of the custom BIOS mods for the N54L.

  * [HP N36L/N40L/N54L Microserver Updated AHCI BIOS Support](http://www.avforums.com/forums/networking-nas/1521657-hp-n36l-n40l-n54l-microserver-updated-ahci-bios-support.html)

I selected the BIOS mod above because the guy who created was an HP engineer and
this BIOS mod only enables additional features that the N54L can actually support.
Using this BIOS mod I've been able to:

  * Enable AHCI for the Optical Disk Drive (ODD) port.
  * Enable AHCI and port multiplier for the the e-SATA port.
  * Make all drives hot-pluggable.

The 250GB hard drive that came with N54L is now relocated in the optical drive day
and being used as the OS drive, leaving all 4 bays for data.

As some point in the future I may want to hook up a 4 bay e-SATA enclosure and this
BIOS mod makes that possible.

# Open Media Vault

Once Open Media Vault is installed, I do the following.

## Enable SSH

OMV actually has a really good WebUI that can be used to accomplish most
update/upgrade tasks but I can't help myself. I must have shell access. From
the OMV WebUI:

  * `Services -> SSH`
    * Put a tick in `Enable` and click the `OK` button.

## Shell Tools

Things crave when at the a shell.

Login to your OMV server as `root` using SSH and then do the following.

```bash
apt-get install less lsb-release rsync screen tree
```

# OMV Plugins

OMV has a number of built-in plugins and a [third party repository of plugins](http://omv-plugins.org).

## Built-in Plugins

Update the built-in plugins.

  * `System -> Plugins`
    * Click the `Check` icon.

### Logical Volume Manager

I use LVM. There, I said it. Enable the LVM2 plugin as follows from the OMV WebUI.

  * `System -> Plugins`
    * Highlight the `openmediavault-lvm2` plugin.
    * Click the `Install` icon and then `Yes`.
    * When the install is `Done ...`, click `Close`.

## 3rd Party OMV-Plugins

Follow the instructions on the following page to enable the OMV-Extras plugin repository.

 * <http://omv-extras.org/simple/index.php?id=how-to-install-omv-extras-plugin>

### Backports 3.2 Kernel

I updated the Kernel to 3.2 because it better supports the N54L hardware, in
particular the embedded graphics controller. The Linux 3.2 kernel can be
installed via OMV-Extras.

  * `System -> OMV-Extras.org -> Install Backports 3.2 kernel`

### Plex Media Server

Plex Media Server is available as a plugin once the OMV-Extras plugin
repository is enabled. Plex is managed via the OMV WebUI.

  * `Services -> Plex`

### Transmission

Transmission is available as a plugin once the OMV-Extras plugin repository is
enabled. Transmission is managed via the OMV WebUI.

  * `Services -> BitTorrent -> Server`.

It's all very straight forward. I use the following block list.

  * <http://list.iblocklist.com/?list=bt_level1&fileformat=p2p&archiveformat=gz>

That pretty much covers the stuff I won't remember in the future. I'm considering
adding LXC and Dropbox in the coming that will require some manual steps.

#### References
  * <http://thekentishman.wordpress.com/guides-2/open-media-vault-set-up/>
  * <http://myhpmicroserver.com/wiki/Main_Page>
