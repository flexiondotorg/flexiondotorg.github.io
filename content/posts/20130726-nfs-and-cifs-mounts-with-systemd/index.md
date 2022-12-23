---
title: NFS and CIFS mounts with systemd
aliases: /posts/2014-07-nfs-and-cifs-mounts-with-systemd
date: 2013-07-26 12:00:00
categories: [ "Linux", "Open Source", "Tutorial", "Self Hosting" ]
tags: [ "systemd", "CIFS", "NFS" ]
summary: Wait for network when mounting NFS and CIFS volumes
sidebar: true
images: hero.webp
hero: hero.webp
---

I have an NFS server at home and at work we have Windows (not Samba) servers.
When I first switched to `systemd` I noticed that boot and shutdown were
seriously delayed while NFS and CIFS were mounted/unmounted. `systemd` was
designed to eliminate those kinds of delays, so I did some research to find
out how to correctly mount NFS and CIFS using `systemd`.

# systemd friendly fstab

Below are some example `/etc/fstab` entries for NFS and CIFS mounts that are
`systemd` friendly, the pertinent mount options are:

  * `noauto,x-systemd.automount,_netdev`

I found that `noauto,x-systemd.automount` improved the boot performance and
`_netdev` improved the shutdown performance.

## NFS

This is typically what I have use for mounting my home NAS.

```text
nfs-server:/SomeData /media/SomeData nfs defaults,noauto,x-systemd.automount,_netdev,noatime 0 0
```

## CIFS

This is what I use at work to work correctly with Windows Server.

```text
//cifs-server/MoreData /media/MoreData cifs defaults,noauto,x-systemd.automount,_netdev,rw,noperm,credentials=/home/username/.smb-credentials 0 0
```

The contents of the credentials file looks something like this.

```ini
username=yourusername
password=yourpassword
domain=COMPANYDOMAIN
```

### References

  * <https://wiki.archlinux.org/index.php/Systemd#Filesystem_mounts>
