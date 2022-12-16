---
title: Powerbook G3 (Old World) Ubuntu Install
aliases: /posts/2006-01-powerbook_g3_old_world_ubuntu_install
date: 2006-01-09 11:28:54
tags: [ Linux,Ubuntu,PowerBook G3,Mac ]
summary: Installing UBuntu on a PowerBook G3 for hack value
sidebar: true
images: hero.png
hero: hero.png
---

James bought a PowerBook G3 to the January 2006 [HantsLUG](http://www.hants.lug.org.uk/)
meeting and wanted to have Ubuntu installed on it. I used to be familiar with
Apple Mac computers in the mid to late 90's because the company I worked for used
Macs exclusively on the desktop, so I decided to give it a whirl.

The bottom line is that this old PowerBook G3 is now running Ubuntu Hoary 5.04
quite happily and I will soon be phone James to arrange for him to pick up his
computer.

The article is largely based on the [OldWorldsMac Ubuntu Wiki](https://wiki.ubuntu.com/Installation/OldWorldMacs),
I have included the specifics of James setup here so he has a record of how his
computer was configured.

I quickly realised that simply inserting the Ubuntu Hoary 5.04 PowerPC install
CD and rebooting while holding down the 'C' key wasn't going to work. It seems
that James computer is old enough to be a right pain in the arse to get working
with Linux, but that just makes me want to get it working all the more `:-)`

By the end of the HantsLUG meeting Ubuntu Hoary 5.04 was just completing the
final setup steps and would have been ready to use, but someone pulled the power
block out of the mains and James battery is dead, so the computer shutdown `:-(`
I took the PowerBook G3 home with me to fix/complete the installation but when
I got home I decided to download Ubuntu Breezy and install that instead. Sadly,
James PowerBook only has a 2GB hard disk (1.9GB available for Linux) and this
wasn't sufficient for the Breezy installation to complete so I reverted to Hoary.

## Identifying the PowerBook G3

After some Googling I soon discovered that there are two classes of PowerBook G3,
OldWorld and NewWorld, and that each of the classes have a number of slightly
different models in the range. I took a guess that James was an OldWorld
PowerBook based on the fact it had no USB ports. It turns out this was a good
guess.

Making the assumption that James PowerBook was OldWorld meant that I should use
[BootX](http://penguinppc.org/bootloaders/bootx/) to boot into Linux from MacOS
as opposed to using yaboot which is for NewWorld PowerPCs.

 * [PowerBook G3 Computers: How to Identify Different Models](http://docs.info.apple.com/article.html?artnum=24604)

## Doing the MacOS Installation

The first job was to erase the hard disk and install MacOS in a small parition
and leave the rest of the drive unallocated for installing Ubuntu later on.

 * Insert MacOS 8.1 CD
 * Reboot
 * Hold down 'C' as the computer boots to get it to boot from CD
 * Erase the Hard Disk
 * Use Drive Setup to make a 150MB HFS partition.
 * Install MacOS, leaving off all the optional components. The only thing you need is Stuffit and a browser which are both part of the minimal MacOS8.1 install.

After the install I delete some odds and ends I didn't need and also used
Extensions Manager to deselect a lot of components that were not required.
Finally, I configured TCP/IP to use DHCP.

### Tools Update

James wanted to be able to use MacOS for basic web surfing, so that meant
finding an more modern alternative to Netscape 3.0.3 which was installed be
default. Sadly The only (relatively) upto date browser I could find which would
install on MacOS 8.1 was Internet Explorer 5.1.7. I also needed an updated
version of Stuffit Expander to extract BootX 1.2.2. I used Netscape 3.0.3 to
download IE and Stuffit from the URL's below...

 * [Internet Explorer 5.1.7 for Mac OS 8.1 to 9.x](http://www.microsoft.com/mac/downloads.aspx?pid=download&amp;location=/mac/DOWNLOAD/IE/ie5_classic.xml&amp;secid=30&amp;ssid=11&amp;flgnosysreq=True)
 * [Stuffit Expander 5.5 for MacOS Classic](http://www.sfsu.edu/ftp/mac/utils/aladdin_exp55.hqx)

...and installed them. Once they were working a deleted Netscpae 3.0.3 and the
old version of Stuffit.

## BootX

Older versions of Stuffit will only extract BootX 1.1.3 which I why I updated
Stuffit Expander as explained earlier. Download BootX 1.2.2.

 * [BootX](http://penguinppc.org/bootloaders/bootx/)

Open it with Stuffit and extract it the the Desktop then open the resulting
BootX 1.2.2 folder on the desktop. Drag each of the following...

 * BootX
 * BootX Extension
 * Linux Kernels

...onto the "System Folder" one at a time to install BootX correctly. Insert the
Ubuntu PPC install CD and navigate to the `/install/powerpc` folder.

 * Copy `vmlinux` to (the Linux kernel) `System Folder/Linux Kernels`
 * Copy `initrd.gz` (the init ramdisk image) to `System Folder/` and rename it to `ramdisk.image.gz`

BootX should appear on the apple menu and also run on every reboot during the
boot process, meaning that you can choose to boot Linux without having to wait
for the entire MacOS to load `:-)` When you run BootX it should show 'vmlinux'
as an available kernel, now add the following to "More kernel arguments" to make
sure the correct video mode is used for Linux.

```text
video=atyfb:vmode:14,cmode:32,mclk:71
```

Now click the "Options" button, check "Use Specified RAM disk" and select
`System Folder/ramdisk.image.gz`. Click on the "Save to prefs" button and then
click on the "Linux" button and in a short while you should be looking at the
regular Ubuntu install dialogs.

### Other Video Mode Suggestions

I didn't test these, but my understanding is the 'cmode' choose the bit depth 8
for 8bit, 16, for 16bit and so one. 'mclk' controls the graphics/monitor refresh
rate I think, I was lucky that I the video mode suggested in the BootX README
worked first go.

```text
video=atyfb:vmode:14,cmode:32,mclk:65
video=atyfb:vmode:14,cmode:8,mclk:63
```

## Doing the Ubuntu Installation

The installer will display an error message that "Configure a multiseat system"
failed. You can ignore this...

 * Select 'Continue'
 * Select 'Detect Hardware' and press Enter

...and the install will continue normally.

### Partitioning

When it gets to partitioning the drive Ubuntu will suggest using the entire disk
for Linux. Don't do that because you still need MacOS to run BootX to bootstrap
Linux. Select the "Use Free Space" option or partition manually.

### Copying /boot to the HFS System Folder

The rest of the install is fairly straight forward until you get to the part
where Ubuntu tries to install a bootloader. GRUB and Lilo don't work on OldWorld
Macs, so Ubuntu will warn you that no bootloader can be installed. Switch to a
second console at this point (Option-F2) and use `df` to see where things are
currently mounted. In my case the newly installed ubuntu was on `/dev/hda8`
mounted as `/target` and the HFS filesystem was `/dev/hda7`. Make a mountpoint
and mount the HFS filesystem.

```bash
cd /target
mkdir hfs
mount /dev/hda7 hfs -t hfs
```

You might also want to add an entry to `/etc/fstab` so it will be mounted when
you reboot. This makes updating kernels easier in the future.

```bash
echo '/dev/hda7 /hfs hfs defaults' >> etc/fstab
```

Now copy the kernel and boot image over;

```bash
cp boot/vmlinux hfs/System\ Folder/Linux\ Kernels/vmlinux
cp boot/initrd.img hfs/System\ Folder/ramdisk.image.gz
```

Option-F1 to get back to the installer, and tell it to go ahead and reboot.

When the machine reboots the BootX dialog should come up straight away, just
click "Linux" and Ubuntu should proceed through the rest of the install as usual.

#### References

  * <http://ubuntuforums.org/showthread.php?t=73689>
  * <http://ubuntuforums.org/showthread.php?t=36431>
  * <https://wiki.ubuntu.com/Installation/OldWorldMacs>
  * <http://penguinppc.org/>
  * <http://gonz.wordpress.com/2006/03/22/installing-ubuntu-510-breezy-badger-on-an-old-world-powerbook-g3-wallstreet/>
