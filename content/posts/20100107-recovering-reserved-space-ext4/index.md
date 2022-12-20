---
title: Recovering reserved space from ext4
aliases: /posts/2010-01-recovering-reserved-space-ext4
date: 2010-01-07 20:42:04
tags: [Linux,Ext3,Ext4,Reserved space ]
summary: Reclaim the 5% of disk space Ext4 reserves by default
sidebar: true
images: hero.webp
hero: hero.webp
---

The Ext4 file system, like Ext3, reserves 5% of the blocks on the file system
for the root user. The reserved blocks are there for root's use as a safe
guard if the filesystem gets full, it provides some wiggle room to enable the
really important programs to still function. But in some cases there's not
much point in having space reserved for root. I've recently upgrade my
workstation with a 6TB internal RAID 0 array for data storage (music, videos,
photos, etc) and an external 6TB RAID 0 array as a backup. My OS boot from a
1TB drive. For my 6TB arrays I want the maximum available storage and was
interested to see what effect removing the reserved space would have. So, this
is what I did. First I made the Ext4 file system, mounted it and queried how
much space was available.

```bash
sudo mkfs.ext4 /dev/sdh1
sudo mount /dev/sdh1 /mnt
df -h
```

Looks like I have 5.1TB of available space.

```bash
/dev/sdh1             5.4T  186M  5.1T   1% /mnt
```

Then I unmounted the file system, removed the reserved blocks, checked the
consistency of the file system, mounted it and queried how much space was
available.

```bash
sudo umount /mnt
sudo tune2fs -m 0 /dev/sdh1
sudo e2fsck /dev/sdh1
df -h
```

Looks like I have 5.4TB available now, a saving of 300GB.

```bash
/dev/sdh1             5.4T  186M  5.4T   1% /mnt
```

Now, I could have simply created the files system without the reserved blocks
in the first place, but I was interested to see the comparison.

```bash
sudo mkfs.ext4 -m 0 /dev/sdh1
```

Before you start removing the reserved blocks from your ext3/ext4 file systems
do a bit a research first.

  * [Disk capacity, free space, and Ext3 reserved blocks](http://ubuntuforums.org/showthread.php?t=215177)
  * [Ext3 Filesystem Tips](http://wiki.archlinux.org/index.php/Ext3_Filesystem_Tips)
