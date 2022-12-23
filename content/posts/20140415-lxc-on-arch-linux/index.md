---
title: LXC on Arch Linux
aliases: /posts/2014-04-lxc-on-arch-linux
date: 2014-04-15 02:44:11
categories: [ "Linux", "Open Source", "Tutorial" ]
tags: [ "Arch Linux", "Containers", "LXC", "Debian" ]
summary: A rough guide to running Debian containers on Arch Linux with LXC
sidebar: true
images: hero.webp
hero: hero.webp
---

At some point last year I was experimenting with Linux Containers (LXC) on
Arch Linux. **I never finished the blog post but somehow it was briefly published
and then unplublished**. I have no idea how accurate this blog post is but someone
did see it and bookmarked it. **They recently emailed me to ask where the blog has
disappeared to, so here it is in all its unfinished glory**.

# Install LXC

```bash
sudo pacman -Syy --needed --noconfirm arch-install-scripts bridge-utils lxc netctl
```

# netctl Bridge

The guest containers will connect to the LAN via a bridged network deviced.

```bash
sudo nano /etc/netctl/bridge
```

Add the following.

```bash
Description="Bridge"
Interface=br0
Connection=bridge
BindsToInterfaces=(eth0)
IP=dhcp
## sets forward delay time
FwdDelay=0
## sets max age of hello message
#MaxAge=10
```

Enable and start the bridge.

```bash
sudo netctl enable bridge
sudo netctl start bridge
```

# Creating Containers

I'm only interested in running Arch Linux or Debian containers.

## Container Configurations

Each container should have a matching configuration file, they look something like this.

```text
lxc.arch = i686
lxc.utsname = myhostname
lxc.network.type = veth
lxc.network.flags = up
lxc.network.link = br0
lxc.network.ipv4 = 0.0.0.0
lxc.network.name = eth0
```

  * `lxc.arch` Architecture for the container, valid options are `x86`, `i686`, `x86_64`, `amd64`.
  * `lxc.utsman` Container name, should also be used when naming the configuration file
  * `lxc_network.type` Type of network virtualization to be used for the
  container. The option `veth` defines a peer network device. It is created
  with one side assigned to the container and the other side is attached to a
  bridge by the `lxc.network.link` option.
  * `lxc_network.flags` Network actions. The value `up` in this case activates the network.
  * `lxc.network.link` Host network interface to be used for the container.
  * `lxc.network.ipv4` IPv4 address assigned to the virtualized interface. Use
  the address 0.0.0.0 to make use of DHCP. Use `lxc.network.ipv6` if you need
  IPv6 support.
  * `lxc.network.name` Dynamically allocated interface name. This option will
  rename the interface in the container.

More example files can be found in `/usr/share/doc/lxc/examples/`.
Find details about all options via `man lxc.conf`.

## Arch Linux

```bash
sudo lxc-create -t archlinux -n arch-01 -f ~/arch-01.conf -- --packages netctl
```

I am unable to get DHCP to work for a Arch Linux LXC container, therefore
my dirty hack is to alway use a statis IP address in the `netctl` profile. There
is also a bug ([#35715](https://bugs.archlinux.org/task/35715)) was helpful in
narrowing down the problem, but wasn't the solution in my case. Use
`/var/lib/lxc/CONTAIN_NAME/rootfs/etc/netctl/example/ethernet-static` as a template.

```bash
sudo cp /var/lib/lxc/CONTAIN_NAME/rootfs/etc/netctl/example/ethernet-static /var/lib/lxc/CONTAIN_NAME/rootfs/etc/netctl/static
```

Modify `/var/lib/lxc/CONTAIN_NAME/rootfs/etc/netctl/static` accordingly. Now
create a hook, with the same name as the `netctl` profile.

```bash
sudo nano /var/lib/lxc/CONTAIN_NAME/rootfs/etc/netctl/hooks/static
```

Add the following.

```bash
#!/usr/bin/env bash

if [[ $(systemd-detect-virt) != none ]]; then
    BindsToInterfaces=()
    ForceConnect=yes
fi
```

Start the container and enable the `netctl` profile.

```bash
netctl enable static
netctl start static
```

## Debian Containers.

Install `debobootstrap` and `dpkg` so that Debian containers can be created.

```bash
packer -S --noedit dpkg debootstrap
```

### Squeeze

Create a Debian container, `squeeze` is the default.

```bash
sudo lxc-create -t debian -n squeeze-01 -f ~/squeeze-01.conf
```

Change the `root` password.

```bash
chroot /var/lib/lxc/squeeze/rootfs/ passwd
```

### Wheezy

Much the same as the Squeeze exaple above but use the following template.

  * <https://github.com/simonvanderveldt/lxc-debian-wheezy-template>

# Using containers

Start a container

```bash
sudo lxc-start -d -n CONTAINER_NAME
```

Connect to the container and log in:

```bash
sudo lxc-console -n CONTAINER_NAME
```

To halt a container cleanly by the containers initv-system:

```bash
sudo lxc-halt -n CONTAINER_NAME
```

Stop and remove your container always with the two steps:

```bash
sudo lxc-stop -n CONTAINER_NAME
sudo lxc-destroy -n CONTAINER_NAME
```
#### References

  * <http://nurupoga.org/articles/archlinux-on-lxc-with-netctl/>
  * <https://bbs.archlinux.org/viewtopic.php?id=164753>
  * <http://andyortlieb.wordpress.com/2013/03/15/practical-use-of-lxc-in-arch-linux-in-march-of-2013/>
  * <https://wiki.archlinux.org/index.php/Linux_Containers>
  * <https://wiki.archlinux.org/index.php/Lxc-systemd>
  * <https://wiki.archlinux.org/index.php/Netctl>
  * <https://www.suse.com/documentation/sles11/singlehtml/lxc_quickstart/lxc_quickstart.html>
  * <http://wiki.gentoo.org/wiki/LXC>
