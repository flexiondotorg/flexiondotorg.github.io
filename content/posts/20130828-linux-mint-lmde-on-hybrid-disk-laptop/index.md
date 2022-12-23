---
title: Linux Mint LMDE on Hybrid Disk Laptop
aliases: /posts/2013-08-linux-mint-lmde-on-hybrid-disk-laptop
date: 2013-08-28 20:10:09
categories: [ "Linux", "Open Source", "Tutorial", "Computer Hardware" ]
tags: [ "Linux Mint", "Debian", "LMDE", "MATE Desktop", "Python", "btrfs", "F2FS", "ThinkPad T43p" ]
summary: Installing Linux Mint Debian Edition (LMDE) on a Laptop with Hybrid Disk
sidebar: true
images: hero.webp
hero: hero.webp
---

I have an old Thinkpad T43p that I am trying to extend the life of. So I  recently
fitted a cheap 60GB IDE Solid State Drive (SSD) and put a 320GB SATA Hard Disk
Drive (HDD) in the Ultrabay. This is not a true hybrid disk, but the principles
are similar. The root partition will go on the SDD (for performance) and the
home partition will be located on the HDD (for capacity).

I've been running [Arch Linux](http://www.archlinux.org) on the T43p and the SDD
improves system responsiveness and boot time considerably, especially when using
[F2FS](http://en.wikipedia.org/wiki/F2FS) or
[btrfs](https://btrfs.wiki.kernel.org/index.php/Main_Page) (with LZO
compression and SSD mount options) on the root filesystem.

I am also testing [Linux Mint Debian Edition](http://www.linuxmint.com/download_lmde.php) (LMDE)
with the [MATE Desktop](http://mate-desktop.org/) desktop to determine if this
is a suitable operating system for my family to use. It appears they find
[GNOME 3](http://www.gnome.org/gnome-3/) confusing and would prefer a familiar
desktop experience.

While testing LMDE 201203 I ran into a few issues, so I've decided to capture
my notes here for future reference.

# Fix the installer

In order to install LMDE using partitions on multiple drives you must
use the ADVANCED USER install mode. However, the ADVANCED USER install mode
has a bug that prevents the installer from completing, so that needs to be
fixed first.

```bash
sudo nano /usr/lib/live-installer/frontend/gtk_interface.py
```

Find the following on line 1765.

```python
self.wTree.get_widget("button_next").show()
```

After it add the following line, making sure the indentation is correct.

```python
self.wTree.get_widget("button_next").set_sensitive(True)
```

# Installing LMDE

  * Double click the `Install Linux Mint` icon on the desktop.
  * Select your *Language* and click `Forward`.
  * Select your *Timezone* and click `Forward`.
  * Select your *Keyboard layout* and click `Forward`.
  * Enter your *User info* and click `Forward`.
  * From the *Hard drive* window Select `Manually mount partitions (ADVANCED USERS ONLY)` and click `Forward`.

The *Please make sure you wish to manually manage partitions* window will
appear. On my system the SSD is detected on `/dev/sda` and the HDD is detected
on `/dev/sdb`. Start `GParted` and partition and format the drives as follows.

```text
    /dev/sda1
      Size: 256MiB
      Create as: Primary Partition
      File system: ext4
      Label: boot

    /dev/sda2
      Size: 2048MiB (or the size you prefer)
      Create as: Primary Partition
      File system: linux-swap
      Label: swap

    /dev/sda3
      Size: Remainder
      Create as: Primary Partition
      File system: btrfs
      Label: root

    /dev/sdb1
      Size: All
      Create as: Primary Partition
      File system: ext4
      Label: home
```

Apply the changes and close GParted.

I use ext4 for the `/boot` partition because GRUB can't currently boot from btrfs
in LMDE. I use ext4 for `/home` because it offers the best performance on rotational
drives on my Thinkpad T43p. I use btrfs on the `/root` partition because performs
best (by some margin) on solid state drives in my Thinkpad T43p.

The filesystems need mounting under `/target` so the installer can install the
OS. Open a Terminal and do the following.

```bash
sudo mkdir /target
sudo mount -t btrfs -o compress=lzo,ssd /dev/disk/by-label/root /target
sudo mkdir /target/{boot,home}
sudo mount -t ext4 /dev/disk/by-label/boot /target/boot
sudo mount -t ext4 /dev/disk/by-label/home /target/home
```

Return to the Linux Mint Debian Installer.

  * Click `Forward`.
  * From the *Advanced options* check `Install GRUB` and select `/dev/sda`. Click `Forward`.
  * Confirm the *Summary* is correct and click `Install`.

Time for a cup of tea while the install runs. A pop-up, titled *Installation
Paused*, will appear. Click `OK`.

## Create `/target/etc/fstab`

Do as the installer says and create `/target/etc/fstab`. Open a Terminal.

```bash
sudo nano /target/etc/fstab
```

The following `fstab` works for my T43p.

```text
# /etc/fstab: static file system information.
#
# <file system> <mount point>   <type>      <options>                           <dump>  <pass>
proc            /proc           proc        defaults                            0       0
LABEL=root      /               btrfs       defaults,noatime,compress=lzo,ssd   0       1
LABEL=boot      /boot           ext4        defaults,noatime                    0       2
LABEL=home      /home           ext4        defaults,relatime                   0       2
LABEL=swap      none            swap        sw                                  0       0
```

## Upgrade MATE 1.6 and remove legacy MATE 1.4 packages

MATE 1.6 has been released for LMDE 201203 so it is a good idea to upgrade
and remove legacy packages before the first boot to ensure a clean
configuration. Open a Terminal.

```bash
sudo chroot /target
apt-get update
apt-get install apt-show-versions
apt-get dist-upgrade
```

Some MATE 1.4 packages will be left behind that are no longer required. The
following can help identify them.

```bash
apt-show-versions | grep 1\.4\.[0-9]\-[0-9]\+wheezy | cut -f1 -d' '
```

Purge the old MATE 1.4 packages.

```bash
PKGS=`apt-show-versions | grep 1\.4\.[0-9]\-[0-9]\+wheezy | cut -f1 -d' '`
apt-get purge ${PKGS}
```

Exit the `chroot`.

```bash
exit
```

## Finish the install

Return to the Linux Mint Debian Installer.

  * Click `Forward`.
  * Some final installation steps will now complete.
  * A pop-up, titled *Installation finished*, will appear. Click `Yes`.

Your computer will reboot and start LMDE.

#### References
  * <http://forums.linuxmint.com/viewtopic.php?f=189&t=129381>
  * <http://forums.linuxmint.com/viewtopic.php?f=185&t=143547>
