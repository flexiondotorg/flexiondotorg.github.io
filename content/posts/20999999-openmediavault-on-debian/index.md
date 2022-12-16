---
title: OpenMediaVault on Debian
#slug: 2014-05-openmediavault-on-debian
date: 2014-05-31 21:21:09
tags: [ Linux,Debian,OpenMediaVault,OMV ]
#link:
summary: Setting up OpenMediaVault on Debian
sidebar: true
images: hero.png
hero: hero.png
draft: true
---

At the time of writing OpenMediaVault 0.6 is pre-release. But it is possible 
to install OpenMediaVault on Debain Wheezy in order to get some testing done.

Install Debian Wheezy on your target VM or test server. Go with the defaults 
until the 'Software selection' dialogue. Make sure everything is unselected, 
like this:

    [ ] Debian desktop environment
    [ ] Web server
    [ ] Print server
    [ ] SQL database
    [ ] DNS Server
    [ ] File server
    [ ] Mail server
    [ ] SSH server
    [ ] Laptop
    [ ] Standard system utilities

After the install is complete, reboot and login to the new Debian system as 
`root`.

Update the repository sources and add the `contrib` and `non-free` 
repositories.

    nano /etc/apt/sources.list

It should look something like this:

    deb http://ftp.uk.debian.org/debian/ wheezy main contrib non-free
    deb-src http://ftp.uk.debian.org/debian/ wheezy main contrib non-free
    
    deb http://security.debian.org/ wheezy/updates main contrib non-free
    deb-src http://security.debian.org/ wheezy/updates main contrib non-free
    
    # wheezy-updates, previously known as 'volatile'
    deb http://ftp.uk.debian.org/debian/ wheezy-updates main contrib non-free
    deb-src http://ftp.uk.debian.org/debian/ wheezy-updates main contrib non-free

Now add the OpenMediaVault repository.

    echo "deb http://packages.openmediavault.org/public kralizec main" > /etc/apt/sources.list.d/openmediavault.list

Update.

    apt-get update

Install the OpenMediaVault repository key and Postfix.

    apt-get install openmediavault-keyring postfix

  * When the 'Postfix Configuration' dialogue is displayed choose `No 
  configuration'.

Update again and install OpenMediaVault.

    apt-get update
    apt-get install openmediavault

  * When the 'Configuring mdadm' dialogue is displayed enter `none`.
  * Do you want to start MD arrays automatically? YES
  * When the 'ProFTPD configuration' dialogue is displayed choose 
  `standalone`.

Initialise OpenMediaVault and reboot.

    omv-initsystem
    reboot

After the reboot you should be able to connect to the OpenMediaVault WebUI and 
login as `admin` with the password of `openmediavault`.

That's it. Get testing.

# Post install tweaks

Here are some tweaks reduce power consumption and improve network performance.

## Power Saving

    apt-get install amd64-microcode firmware-linux firmware-linux-free \
    firmware-linux-nonfree

## Performance Tuning

#### References

  * <http://www.wgdd.de/2013/08/hp-n54l-microserver-energy-efficiency.html?m=1>
  * <http://gareth.halfacree.co.uk/2014/02/tuning-an-hp-proliant-microserver>
  * <http://www.scottalanmiller.com/linux/2011/06/20/working-with-nic-ring-buffers/>
  * <https://gist.github.com/dstroot/2785263>
