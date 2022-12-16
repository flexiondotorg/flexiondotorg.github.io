---
title: LXC on Debian 6.0
#slug: 2013-07-lxc-on-debian-squeeze
date: 2013-07-16 21:21:09
tags: [ Linux,Debian,LXC ]
#link:
summary: Installing LXC on a Debian (Squeeze) 6.0
sidebar: true
images: hero.png
hero: hero.png
draft: true
---

I am going to install [Open Media Vault](http://www.openmediavault.org/)
on my new [HP ProLiant MicroServer G7 N54L](http://www8.hp.com/uk/en/products/proliant-servers/product-detail.html?oid=5336624)
to replace my aging, and lackluster, [ReadyNAS](http://www.readynas.com) NV.

At the time of writing Open Media Vault runs on top of [Debian](http://www.debian.org)
6.0 (Squeeze). I am also planning to install [Plex](http://www.plexapp.com), and
possibly some other services but want to isolate them from the core Open Media
Vault OS. Enter [LXC](http://lxc.sourceforge.net/).

# What is LXC?

LXC is a light weight virtualization implemented in the Linux kernel. LXC containers
can be thought of as really sexy `chroot`s.

Linux Containers run under the same kernel as the host operating system. LXC is just
one implementation, similar container-like implementations are [OpenVZ](http://openvz.org),
[BSD jails](http://en.wikipedia.org/wiki/FreeBSD_jail) and
[Solaris Zones](http://en.wikipedia.org/wiki/Solaris_Containers). 

Some pros and cons of LXC are:

  * Containers are very efficient in terms of performance because there is no need to
  virtualize devices resulting in a very low overhead and near native performance.

  * LXC can only run guest Linux distributions that are compatible with the host
  kernel. For example, you will not be able to run Windows in a container. That may
  well be considered benefit for many though :-)

The main benefit of LXC in my opinion is service isolation as it is possible to host
complex services, possibly using a different Linux distribution, in containers
without fear of poluting the core OS.

# Installing LXC on Debian 6.0

Sadly, the LXC package in the Squeeze repositories is very old. Fortunately, the
[Debian Backports](http://backports-master.debian.org/)
has a fairly current version, 0.8.0 at the time of writing.

To enable the backports repository add the following line to
`/etc/apt/sources.list.d/backports.list`.

    deb http://backports.debian.org/debian-backports squeeze-backports main contrib non-free

Update the repositories.

    sudo apt-get update

# Kernel

LXC 0.8.0 requires newer kernel, so install it from the backports.

    sudo apt-get install -t squeeze-backports \
    linux-image-$(dpkg --print-architecture) \
    linux-headers-$(dpkg --print-architecture) \
    firmware-linux-free firmware-linux-nonfree

Reboot.

    sudo reboot

## LXC

Install LXC from the backports.

    sudo apt-get -t squeeze-backports install lxc

## Control Groups

LXC make use of [control groups](www.kernel.org/doc/Documentation/cgroups/). The
cgroups filesystem allows managment of control groups which provide a mechanism for
aggregating/partitioning sets of tasks, and all their future children, into
hierarchical groups with specialized behaviour. This is the base of the container
implementation used by LXC.

    sudo nano /etc/fstab

Add the following.

    cgroup        /sys/fs/cgroup        cgroup        defaults    0    0

Now make the `/sys/fs/cgroup` directory and mount it.

    sudo mount cgroup

Check if your kernel has everything that LXC requires.

    lxc-checkconfig

Everything should check out correctly.

## Network Bridge

A network bridge is used to connect the guest containers to the host.

    sudo apt-get install bridge-utils

Add the bridge is `/etc/network/interfaces` to declare your bridge interface `br0`
and comment out your ethernet card `eth0`.

    sudo nano /etc/network/interfaces

It should look something like this.

    # The primary network interface
    ##allow-hotplug eth0
    ##iface eth0 inet dhcp

    # Setup bridge
    auto br0
    iface br0 inet dhcp
      bridge_ports eth0
      bridge_fd 0

Restart networking.

    sudo /etc/init.d/networking restart

# Using LXC on Debian 6.0

What follows is a quick how to for deploying some containers and how to perform
some basic management.

## Creating a container

I am only interested in deploying Debian distrobution into my containers, so
`debootstrap` is required.

    sudo apt-get install -t squeeze-backports debootstrap

## Debian containers

    wget http://freedomboxblog.nl/wp-content/uploads/lxc-debian-wheezy.gz
    gunzip lxc-debian-wheezy.gz

In the `download_debian()` function I change the `pacakges` as follow:

        packages=\
    ifupdown,\
    locales,\
    libui-dialog-perl,\
    dialog,\
    isc-dhcp-client,\
    netbase,\
    net-tools,\
    iproute,\
    nano,\
    wget,\
    tree,\
    iputils-ping,\
    openssh-server

Copy the template and set the permissions.

    sudo cp lxc-debian-wheezy /usr/share/lxc/templates/
    sudo chown root:root /usr/share/lxc/templates/lxc-debian-wheezy
    sudo chmod 755 /usr/share/lxc/templates/lxc-debian-wheezy

Create a Wheezy container.

    sudo lxc-create -n vm01 -t debian-wheezy

Start the container.

    sudo lxc-start -n vm01 -d

Connect to the console.

    sudo lxc-console -n vm01

Network.

auto eth0
iface eth0 inet static
  address 192.168.64.253
    netmask 255.255.255.0
      gateway 192.168.64.1
        dns-nameservers 192.168.64.10

Stop the container.

    sudo lxc-stop -n vm01

#### References

  * <http://backports-master.debian.org/>
  * <http://packages.debian.org/squeeze-backports/lxc>
  * <http://cblog.burkionline.net/lxc-linux-container/>
  * <http://www.wallix.org/2011/09/20/how-to-use-linux-containers-lxc-under-debian-squeeze/>
  * <http://foaa.de/old-blog/2010/05/lxc-on-debian-squeeze/trackback/index.html>
  * <http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=700921>
  * <http://forums.openmediavault.org/viewtopic.php?f=8&t=1135>
