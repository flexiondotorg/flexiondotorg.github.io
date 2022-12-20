---
title: Arch Linux on Raspberry Pi with F2FS
aliases: /posts/2013-11-15-arch-linux-on-raspberry-pi-with-f2fs
date: 2013-11-15 23:19:09
tags: [ Arch Linux,Raspberry Pi,F2FS ]
summary: Convert Arch Linux ARM for Raspberry Pi from Ext4 to F2FS
sidebar: true
images: hero.webp
hero: hero.webp
draft: true
---

Right now my two favourite file systems for Linux workstations are btrfs and f2fs.

I've seen huge performance benefits using both these filesystem of solid state
media and was interested to see if the Raspberry Pi could benefit too. btrfs
really excels when the `compress=lzo` mount option is used, but because
this will tax the Pi's CPU it is not suitable. f2fs is designed for use on solid
state media, including SDHC, which sounds ideal.

What follows is an overview of how I converted the `archlinux-hf-2013-07-22.img`
from Ext4 to F2FS.



Prerequisite: to have a PC with Linux OS (lol)

- Install on the PC at least a kernel of version 3.8 (f2fs is only supported by 3.8 and later) and make sure it is compiled with support for f2fs (in case it should be compiled from source code)

- Compile and install the kernel 3.8 on Raspberry, also with support f2fs (included in the kernel and not as a separate module!) For instructions refer you to http://elinux.org/RPi_Kernel_Compilation (I highly recommend the Cross-compiling to save A LOT OF time). Therefore, make sure that the Raspberry start up properly with the new kernel.
EDIT: there is already a precompiled 3.8 kernel with f2fs support (thanks to portets)
CODE: SELECT ALL
sudo rpi-update 2c4e92c01ff14d8f3e1ee35b995d430b4e6d1e1b

- Insert the SD card into the PC and maintain a backup of your entire root partition of the SD:
CODE: SELECT ALL
sudo cp -a /mnt/* ~/backup_sd
where /mnt is the path where you mounted the root of the SD (the -a option is IMPORTANT)

- Install the f2fs-tools package on the PC:
CODE: SELECT ALL
sudo apt-get install f2fs-tools

- Format the root partition of the SD in f2fs (you can also use gparted 0.16 version or later):
CODE: SELECT ALL
sudo mkfs.f2fs /dev/sdb2

- Ubuntu (and I imagine any other distribution) does not yet support auto-mount f2fs partitions, then:
CODE: SELECT ALL
sudo mount -t f2fs /dev/sdb2 /mnt

- Re-copy the entire contents of the backup on that partition:
CODE: SELECT ALL
sudo cp -a ~/backup_sd/* /mnt


- Edit the /etc/fstab file in the root of the SD. The row corresponding to / should be like this:
CODE: SELECT ALL
/dev/mmcblk0p2   /    f2fs defaults,noatime,discard 0 0


- Lastly, modify the cmdline.txt file in the boot partition of the SD:
CODE: SELECT ALL
rootfstype=ext4
must become
CODE: SELECT ALL
rootfstype=f2fs


- Remove all:
CODE: SELECT ALL
sudo umount /mnt


- Enjoy (I hope I did not forget some step :))

Obviously I do not take any responsibility in case of damage (however very unlikely unless of human carelessness in the execution of all the steps).

The process is quite elaborate and not exactly proof beginner, but it's worth it. Let me know the results :)
