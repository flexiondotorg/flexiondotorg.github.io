---
title: Memory consumption of Linux desktop environments
aliases: /posts/2014-03-memory-consumption-of-linux-desktop-environments
date: 2014-03-23 13:30:27
lastmod: 2014-06-03
tags: [ Linux,Arch Linux,MATE Desktop,Xfce,GNOME,KDE,Enlightment,LXDE,LXQt,Unity,ps_mem ]
summary: Comparing desktop environment memory usage with ps_mem
sidebar: true
images: hero.webp
hero: hero.webp
---

<div class="alert alert-info">
  <strong>Note</strong> Updated on June 3rd 2014 and now includes LXQt and Unity.
</div>

For the last 9 months or so I've spent my spare time working with the
[MATE Desktop Team](http://mate-desktop.org). Every so often, via the various
on-line MATE communities, the topic of how *"light weight"* MATE is when
compared to other desktop environments crops up and quite often
[Xfce](http://www.xfce.org/) is suggested as a lighter alternative. After all
MATE and Xfce both provide a traditional desktop environment based on GTK+ so
this suggestion is sensible. But is Xfce actually *"lighter"* than MATE?

I've found MATE to be (subjectively) more responsive that Xfce and there have
been two recent blog posts that indicate MATE has lower memory requirements than
Xfce.

  * [Four Lightweight Desktops for openSUSE 13.1](https://l3net.wordpress.com/2013/12/17/four-lightweight-desktops-for-opensuse-13-1/)
  * [A Memory Comparison of Light Linux Desktops – Part 3](https://l3net.wordpress.com/2014/02/15/a-memory-comparison-of-light-linux-desktops-part-3/)

Given that I'm comfortably running MATE on the Raspberry Pi Model B (which has
just 512MB RAM) I've been stating that MATE is well suited for use on resource
constrained hardware and professional workstations alike. This is still true,
but I've also said that MATE is lighter than Xfce and I might have to eat humble
pie on that one.

The topic of measursing desktop environment resource use came up on the
`#archlinux-tu` IRC channel recently and someone suggested using
[ps_mem.py](https://github.com/pixelb/ps_mem/) to gather the memory usage data.
`ps_mem.py` provides a far more robust mechanism for gathering memory usage data
than I've seen in previous comparisons.

So the seed was planted, I created a bunch of VirtualBox guest machines and set
to work comparing the memory requirements of all the Linux desktop environments
I could.

## Damn it, just tell me what the "*lightest*" desktop environment is!

OK, for those of you who just want the final answer, with none of the
explanation, here it is:

| Desktop Environment  | Memory Used |
| ---------------------|-------------|
| Enlightenment 0.18.8 |    83.8 MiB |
| LXDE 0.5.5           |    87.0 MiB |
| Xfce 4.10.2          |   110.0 MiB |
| LXQt 0.7.0           |   113.0 MiB |
| MATE 1.8.1           |   123.0 MiB |
| Cinnamon 2.2.13      |   176.3 MiB |
| GNOME3 3.12.2        |   245.3 MiB |
| KDE 4.13.1           |   302.6 MiB |
| Unity 7.2.0.14       |   312.5 MiB |

## Bullshit! How did you come up with these numbers?

All the VirtualBox VMs are 32-bit with 768MB RAM and based on the same core
[Arch Linux](http://www.archlinux.org) installation. I achieved this using my
[ArchInstaller](https://github.com/flexiondotorg/archinstaller) script which is
designed for quickly installing reproducible Arch Linux setups.

Each VM differs only by the packages that are required for the given desktop
environment. The desktop environments native display manager is also installed
but if it doesn't have one then `lightdm` was chosen. LXDE, Xfce, MATE, Cinnamon
and GNOME all have `gvfs-smb` installed as this enables accessing Windows and
Samba shares (a common requirement for home and office) in their respective file
managers and the KDE install includes packages to provide equivalent functionality.
You can see the specific desktop environment packages or package groups that were
installed here:

  * <https://github.com/flexiondotorg/ArchInstaller/tree/master/packages/desktop>

Each VM was booted, logged in and any initial desktop environment configuration
was completed choosing the default options if prompted. Then `ps_mem` was
installed, the VM shut down and a snapshot made.

Each VM was then started, logged in via the display manager, the desktop
environment was fully loaded and waited for disk activity to settle. Then
`ps -efH` and `ps_mem` were executed via SSH and the results sent back to my
workstation. When the process and memory collections were conducted there had
been no desktop interaction and no applications had been launched.

## Your numbers are wrong I can get *xxx* desktop to run in *yyy* less memory! ##

Well done, you probably can.

Each virtual machine has VirtualBox guest additions, OpenSSH, Network Manager,
`avahi-daemon`, `ntpd`, `rpc.statd`, `syslog-ng` and various other bits and bobs
installed and running. Some of these are not required or have lighter alternatives
available.

So, while I freely accept that each desktop environment can be run in less memory,
the results here are relative to a consistent base setup.

However, what is important to note is that **I think the Cinnamon results are
too low**. Cinnamon is forked from GNOME3 and the Arch Linux package groups for
Cinnamon only install the core Cinnamon packages but none of the GNOME3
applications or components that would be required to create a full desktop
environment.

So comparing Cinnamon with the other desktops in this test is not a fair
comparison. For example, GNOME3 and KDE default installs on Arch Linux include
all the accessibility extensions and applications for sight or mobility impaired
individuals where as Cinnamon does not. This is just one example of where I
think the Cinnamon results are skewed.

## The RAM is there to be used. Is lighter actually better?

No, and Yes.

I subscribe to the school of thought that RAM is there to be used. But;

  * I want to preserve as much free RAM for the applications I run, not for feature bloat in the desktop environment. I'm looking at you KDE.
  * I want a fully integrated desktop experience, but not one that is merely lighter because it lacks features. I'm looking at you LXDE.
  * I want a consistent user interface that any of my family could use, not one that favours style over substance. I'm looking at you Enlightenment.

Another take on lightness is that the more RAM used, the more code that needs
executing. Therefore, higher CPU utilisation and degraded desktop performance
on modest hardware. This could also translate into degraded battery performance.

This is why I choose MATE Desktop. It is a fully integrated desktop environment,
that is responsive, feature full, has reasonable memory requirements and scales
from single core armv6h CPU with 512MB RAM to multi core x86_64 CPU with 32GB
RAM (for me at least).

## Without the full stats it never happened. Prove it!

He is the full data capture from `ps_mem.py` for each desktop environment.

### Enlightenment ###

```text
Private  +   Shared  =  RAM used	Program

172.0 KiB +  46.5 KiB = 218.5 KiB	dbus-launch
316.0 KiB +  40.0 KiB = 356.0 KiB	dhcpcd
336.0 KiB +  87.5 KiB = 423.5 KiB	rpcbind
560.0 KiB +  37.0 KiB = 597.0 KiB	crond
580.0 KiB +  54.0 KiB = 634.0 KiB	systemd-logind
688.0 KiB +  67.5 KiB = 755.5 KiB	systemd-udevd
480.0 KiB + 276.0 KiB = 756.0 KiB	avahi-daemon (2)
700.0 KiB + 133.5 KiB = 833.5 KiB	ntpd
768.0 KiB +  78.5 KiB = 846.5 KiB	VBoxService
580.0 KiB + 267.0 KiB = 847.0 KiB	tempget
544.0 KiB + 312.0 KiB = 856.0 KiB	enlightenment_start
764.0 KiB +  94.0 KiB = 858.0 KiB	rpc.statd
600.0 KiB + 280.5 KiB = 880.5 KiB	at-spi-bus-launcher
624.0 KiB + 298.0 KiB = 922.0 KiB	at-spi2-registryd
724.0 KiB + 309.5 KiB =   1.0 MiB	accounts-daemon
784.0 KiB + 386.5 KiB =   1.1 MiB	enlightenment_fm
952.0 KiB + 395.0 KiB =   1.3 MiB	efreetd
  1.0 MiB + 517.0 KiB =   1.5 MiB	dbus-daemon (3)
  5.3 MiB + -3781.0 KiB =   1.7 MiB	udisksd
  1.2 MiB + 483.0 KiB =   1.7 MiB	(sd-pam) (2)
  1.6 MiB + 234.0 KiB =   1.9 MiB	syslog-ng
  1.1 MiB +   1.0 MiB =   2.1 MiB	systemd (3)
  1.4 MiB + 814.5 KiB =   2.2 MiB	lightdm (2)
  1.3 MiB +   1.1 MiB =   2.4 MiB	sshd (2)
  2.6 MiB + 575.5 KiB =   3.2 MiB	VBoxClient (4)
  2.4 MiB + 781.0 KiB =   3.2 MiB	NetworkManager
  10.9 MiB + -7741.5 KiB =   3.3 MiB	polkitd
  6.2 MiB +  68.5 KiB =   6.3 MiB	systemd-journald
  11.3 MiB + -2300.0 KiB =   9.1 MiB	nm-applet
  16.3 MiB + 426.0 KiB =  16.7 MiB	Xorg
  19.9 MiB +   1.5 MiB =  21.4 MiB	enlightenment
---------------------------------
                          89.6 MiB
=================================
```

### LXDE ###

```text
  Private  +   Shared  =  RAM used	Program

184.0 KiB +  45.0 KiB = 229.0 KiB	dbus-launch
320.0 KiB +  36.0 KiB = 356.0 KiB	dhcpcd
340.0 KiB +  83.0 KiB = 423.0 KiB	rpcbind
360.0 KiB +  78.0 KiB = 438.0 KiB	lxdm-binary
384.0 KiB +  93.5 KiB = 477.5 KiB	lxsession
580.0 KiB +  50.0 KiB = 630.0 KiB	systemd-logind
700.0 KiB +  55.0 KiB = 755.0 KiB	systemd-udevd
464.0 KiB + 297.0 KiB = 761.0 KiB	avahi-daemon (2)
  4.6 MiB + -3890.5 KiB = 821.5 KiB	menu-cached
612.0 KiB + 213.0 KiB = 825.0 KiB	at-spi-bus-launcher
500.0 KiB + 328.0 KiB = 828.0 KiB	lxdm-session
768.0 KiB +  97.5 KiB = 865.5 KiB	rpc.statd
632.0 KiB + 251.5 KiB = 883.5 KiB	gvfsd
644.0 KiB + 244.5 KiB = 888.5 KiB	at-spi2-registryd
776.0 KiB + 189.0 KiB = 965.0 KiB	accounts-daemon
  4.8 MiB + -3888.5 KiB =   1.0 MiB	gvfsd-fuse
884.0 KiB + 305.0 KiB =   1.2 MiB	gvfsd-trash
  1.1 MiB + 322.0 KiB =   1.4 MiB	udisksd
  1.1 MiB + 381.0 KiB =   1.5 MiB	upowerd
  1.1 MiB + 410.0 KiB =   1.5 MiB	gvfs-udisks2-volume-monitor
  1.0 MiB + 485.5 KiB =   1.5 MiB	dbus-daemon (3)
  1.2 MiB + 507.0 KiB =   1.7 MiB	(sd-pam) (2)
  1.6 MiB + 259.0 KiB =   1.9 MiB	syslog-ng
  1.2 MiB + 991.5 KiB =   2.1 MiB	systemd (3)
  1.3 MiB +   1.1 MiB =   2.4 MiB	sshd (2)
  1.5 MiB + 983.0 KiB =   2.4 MiB	lxpolkit
  6.3 MiB + -3414.0 KiB =   3.0 MiB	NetworkManager
  3.3 MiB + 706.5 KiB =   4.0 MiB	openbox
  4.4 MiB +  59.5 KiB =   4.4 MiB	systemd-journald
  6.9 MiB + -1941.0 KiB =   5.0 MiB	lxpanel
  12.9 MiB + -7745.0 KiB =   5.3 MiB	polkitd
  3.6 MiB +   1.8 MiB =   5.4 MiB	pcmanfm
  11.5 MiB + -3637.5 KiB =   8.0 MiB	ntpd
  7.1 MiB +   1.8 MiB =   9.0 MiB	nm-applet
  13.9 MiB + 604.5 KiB =  14.5 MiB	Xorg
---------------------------------
                          87.0 MiB
=================================
```

### Xfce ###

```text
  Private  +   Shared  =  RAM used	Program

176.0 KiB +  32.0 KiB = 208.0 KiB	dbus-launch
292.0 KiB +  26.5 KiB = 318.5 KiB	gpg-agent
316.0 KiB +  32.0 KiB = 348.0 KiB	dhcpcd
324.0 KiB +  81.0 KiB = 405.0 KiB	rpcbind
488.0 KiB +  96.0 KiB = 584.0 KiB	xfconfd
588.0 KiB +  47.0 KiB = 635.0 KiB	systemd-logind
464.0 KiB + 260.0 KiB = 724.0 KiB	avahi-daemon (2)
712.0 KiB +  49.0 KiB = 761.0 KiB	systemd-udevd
608.0 KiB + 173.0 KiB = 781.0 KiB	at-spi-bus-launcher
644.0 KiB + 169.5 KiB = 813.5 KiB	at-spi2-registryd
768.0 KiB +  57.5 KiB = 825.5 KiB	VBoxService
784.0 KiB +  55.5 KiB = 839.5 KiB	sh
640.0 KiB + 218.5 KiB = 858.5 KiB	gvfsd
764.0 KiB +  94.5 KiB = 858.5 KiB	rpc.statd
760.0 KiB + 160.0 KiB = 920.0 KiB	accounts-daemon
872.0 KiB + 174.0 KiB =   1.0 MiB	gvfsd-fuse
  4.8 MiB + -3831.0 KiB =   1.1 MiB	gvfsd-trash
  1.1 MiB + 311.0 KiB =   1.4 MiB	upowerd
  1.1 MiB + 282.0 KiB =   1.4 MiB	tumblerd
  1.1 MiB + 289.0 KiB =   1.4 MiB	udisksd
  1.1 MiB + 369.0 KiB =   1.4 MiB	gvfs-udisks2-volume-monitor
  1.1 MiB + 353.0 KiB =   1.5 MiB	xfce4-notifyd
  1.2 MiB + 515.0 KiB =   1.7 MiB	(sd-pam) (2)
  1.3 MiB + 483.5 KiB =   1.8 MiB	dbus-daemon (3)
  1.6 MiB + 248.5 KiB =   1.9 MiB	syslog-ng
  1.5 MiB + 465.0 KiB =   1.9 MiB	Thunar
  5.4 MiB + -3457.5 KiB =   2.0 MiB	lightdm (2)
  1.1 MiB + 992.5 KiB =   2.1 MiB	systemd (3)
  1.4 MiB + 695.5 KiB =   2.1 MiB	panel-6-systray
  1.6 MiB + 651.0 KiB =   2.3 MiB	xfce4-session
  1.3 MiB +   1.1 MiB =   2.3 MiB	sshd (2)
  1.9 MiB + 525.0 KiB =   2.4 MiB	xfsettingsd
  1.6 MiB + 903.0 KiB =   2.5 MiB	panel-2-actions
  6.3 MiB + -3505.0 KiB =   2.9 MiB	NetworkManager
  2.6 MiB + 442.5 KiB =   3.0 MiB	VBoxClient (4)
  2.6 MiB + 624.5 KiB =   3.2 MiB	xfce4-power-manager (2)
  2.1 MiB +   1.1 MiB =   3.2 MiB	xfwm4
  3.1 MiB +   1.3 MiB =   4.4 MiB	xfce4-panel
  5.0 MiB +  61.5 KiB =   5.0 MiB	systemd-journald
  12.9 MiB + -7827.0 KiB =   5.3 MiB	polkitd
  3.8 MiB +   1.6 MiB =   5.4 MiB	xfdesktop
  6.6 MiB +   1.3 MiB =   7.8 MiB	nm-applet
  11.5 MiB + -3643.5 KiB =   7.9 MiB	ntpd
  23.0 MiB + -3258.0 KiB =  19.8 MiB	Xorg
---------------------------------
                        110.0 MiB
=================================
```

### LXQt ###

```text
  Private  +   Shared  =  RAM used   Program

176.0 KiB +  35.0 KiB = 211.0 KiB   dbus-launch
320.0 KiB +  35.0 KiB = 355.0 KiB   dhcpcd
324.0 KiB +  83.0 KiB = 407.0 KiB   rpcbind
612.0 KiB +  51.0 KiB = 663.0 KiB   systemd-logind
460.0 KiB + 267.0 KiB = 727.0 KiB   avahi-daemon (2)
676.0 KiB +  53.0 KiB = 729.0 KiB   systemd-udevd
580.0 KiB + 179.0 KiB = 759.0 KiB   menu-cached (2)
768.0 KiB +  63.5 KiB = 831.5 KiB   VBoxService
604.0 KiB + 247.0 KiB = 851.0 KiB   at-spi-bus-launcher
768.0 KiB +  96.5 KiB = 864.5 KiB   rpc.statd
648.0 KiB + 231.5 KiB = 879.5 KiB   at-spi2-registryd
4.7 MiB + -3856.0 KiB = 976.0 KiB accounts-daemon
908.0 KiB + 396.0 KiB =   1.3 MiB   lxqt-globalkeysd
1.1 MiB + 425.0 KiB =   1.5 MiB   upowerd
1.1 MiB + 484.5 KiB =   1.6 MiB   dbus-daemon (3)
1.2 MiB + 551.0 KiB =   1.7 MiB   (sd-pam) (2)
1.6 MiB + 248.0 KiB =   1.9 MiB   syslog-ng
1.1 MiB + 998.5 KiB =   2.1 MiB   systemd (3)
1.3 MiB +   1.0 MiB =   2.3 MiB   sshd (2)
1.5 MiB + 933.5 KiB =   2.4 MiB   lxqt-policykit-agent
1.6 MiB + 901.0 KiB =   2.4 MiB   lxqt-session
1.7 MiB + 837.0 KiB =   2.5 MiB   sddm
2.6 MiB + 456.5 KiB =   3.0 MiB   VBoxClient (4)
6.3 MiB + -3350.0 KiB =   3.1 MiB NetworkManager
2.4 MiB +   1.5 MiB =   3.8 MiB   lxqt-powermanagement
2.6 MiB +   1.5 MiB =   4.1 MiB   lxqt-runner
3.4 MiB + 881.0 KiB =   4.3 MiB   openbox
2.7 MiB +   1.8 MiB =   4.5 MiB   lxqt-notificationd
4.7 MiB +  59.5 KiB =   4.7 MiB   systemd-journald
12.5 MiB + -7812.0 KiB =   4.9 MiB polkitd
3.8 MiB +   2.2 MiB =   6.0 MiB   lxqt-panel
11.5 MiB + -3644.5 KiB =   7.9 MiB ntpd
11.2 MiB + -2581.0 KiB =   8.7 MiB nm-applet
12.2 MiB + 366.0 KiB =  12.6 MiB   pcmanfm-qt
18.2 MiB + -644.0 KiB =  17.6 MiB  Xorg
---------------------------------
                        113.0 MiB
=================================
```

### MATE ###

```text
  Private  +   Shared  =  RAM used	Program

248.0 KiB +  57.0 KiB = 305.0 KiB	rtkit-daemon
316.0 KiB +  31.0 KiB = 347.0 KiB	dhcpcd
344.0 KiB +  81.0 KiB = 425.0 KiB	rpcbind
388.0 KiB +  80.5 KiB = 468.5 KiB	dbus-launch (2)
  4.4 MiB + -4003.0 KiB = 525.0 KiB	dconf-service
588.0 KiB +  45.0 KiB = 633.0 KiB	systemd-logind
552.0 KiB + 117.0 KiB = 669.0 KiB	gconfd-2
456.0 KiB + 259.0 KiB = 715.0 KiB	avahi-daemon (2)
548.0 KiB + 189.0 KiB = 737.0 KiB	gconf-helper
692.0 KiB +  47.0 KiB = 739.0 KiB	systemd-udevd
592.0 KiB + 150.5 KiB = 742.5 KiB	at-spi-bus-launcher
660.0 KiB + 179.5 KiB = 839.5 KiB	at-spi2-registryd
644.0 KiB + 199.5 KiB = 843.5 KiB	gvfsd
768.0 KiB +  92.5 KiB = 860.5 KiB	rpc.statd
  4.7 MiB + -3955.0 KiB = 893.0 KiB	accounts-daemon
  4.8 MiB + -3943.5 KiB =   1.0 MiB	gvfsd-fuse
  4.8 MiB + -3854.0 KiB =   1.1 MiB	gvfsd-trash
  5.0 MiB + -3789.0 KiB =   1.3 MiB	upowerd
  5.1 MiB + -3817.0 KiB =   1.4 MiB	udisksd
  1.1 MiB + 337.0 KiB =   1.4 MiB	gvfs-udisks2-volume-monitor
  1.6 MiB + 249.5 KiB =   1.9 MiB	syslog-ng
  1.6 MiB + 429.0 KiB =   2.0 MiB	polkit-mate-authentication-agent-1
  5.4 MiB + -3485.5 KiB =   2.0 MiB	lightdm (2)
  1.7 MiB + 510.5 KiB =   2.2 MiB	dbus-daemon (4)
  1.3 MiB +   1.0 MiB =   2.3 MiB	sshd (2)
  1.4 MiB +   1.0 MiB =   2.4 MiB	systemd (4)
  1.8 MiB + 679.5 KiB =   2.4 MiB	(sd-pam) (3)
  1.9 MiB + 570.5 KiB =   2.5 MiB	mate-screensaver
  2.0 MiB + 536.0 KiB =   2.5 MiB	mate-session
  1.9 MiB + 679.5 KiB =   2.6 MiB	notification-area-applet
  2.1 MiB + 703.0 KiB =   2.8 MiB	mate-power-manager
  2.2 MiB + 596.0 KiB =   2.8 MiB	NetworkManager
  2.7 MiB + 686.5 KiB =   3.4 MiB	marco
  2.6 MiB + 937.5 KiB =   3.5 MiB	wnck-applet
  3.6 MiB + 309.5 KiB =   3.9 MiB	pulseaudio
  2.7 MiB +   1.2 MiB =   3.9 MiB	mate-volume-control-applet
  3.0 MiB +   1.0 MiB =   4.0 MiB	clock-applet
  7.6 MiB + -2931.0 KiB =   4.7 MiB	mate-settings-daemon
  7.7 MiB + -2790.0 KiB =   4.9 MiB	mate-panel
  5.0 MiB +  60.5 KiB =   5.1 MiB	systemd-journald
  13.0 MiB + -7854.0 KiB =   5.3 MiB	polkitd
  10.2 MiB + -2592.0 KiB =   7.7 MiB	caja
  11.5 MiB + -3653.5 KiB =   7.9 MiB	ntpd
  7.5 MiB +   1.1 MiB =   8.6 MiB	nm-applet
  14.9 MiB +   1.2 MiB =  16.1 MiB	Xorg
---------------------------------
                        123.0 MiB
=================================
```

### Cinnamon ###

```text
  Private  +   Shared  =  RAM used	Program

248.0 KiB +  56.0 KiB = 304.0 KiB	rtkit-daemon
316.0 KiB +  31.0 KiB = 347.0 KiB	dhcpcd
340.0 KiB +  82.0 KiB = 422.0 KiB	rpcbind
  4.4 MiB + -3995.0 KiB = 469.0 KiB	dconf-service
384.0 KiB +  88.5 KiB = 472.5 KiB	dbus-launch (2)
576.0 KiB +  44.0 KiB = 620.0 KiB	systemd-logind
556.0 KiB + 115.0 KiB = 671.0 KiB	gconfd-2
452.0 KiB + 258.0 KiB = 710.0 KiB	avahi-daemon (2)
544.0 KiB + 185.0 KiB = 729.0 KiB	gconf-helper
596.0 KiB + 174.5 KiB = 770.5 KiB	at-spi-bus-launcher
656.0 KiB + 170.5 KiB = 826.5 KiB	at-spi2-registryd
800.0 KiB +  47.0 KiB = 847.0 KiB	systemd-udevd
640.0 KiB + 208.5 KiB = 848.5 KiB	gvfsd
768.0 KiB +  88.5 KiB = 856.5 KiB	rpc.statd
  4.7 MiB + -3946.0 KiB = 910.0 KiB	accounts-daemon
  4.8 MiB + -3938.5 KiB =   1.0 MiB	gvfsd-fuse
  4.8 MiB + -3847.0 KiB =   1.1 MiB	gvfsd-trash
  5.0 MiB + -3818.0 KiB =   1.3 MiB	upowerd
  5.1 MiB + -3819.0 KiB =   1.4 MiB	udisksd
  1.1 MiB + 340.0 KiB =   1.4 MiB	gvfs-udisks2-volume-monitor
  1.1 MiB + 303.0 KiB =   1.4 MiB	cupsd
  1.3 MiB + 394.0 KiB =   1.7 MiB	csd-printer
  1.6 MiB + 198.5 KiB =   1.8 MiB	syslog-ng
  1.4 MiB + 599.5 KiB =   2.0 MiB	lightdm (2)
  1.6 MiB + 513.5 KiB =   2.1 MiB	dbus-daemon (4)
  1.3 MiB + 979.0 KiB =   2.2 MiB	sshd (2)
  1.4 MiB +   1.0 MiB =   2.4 MiB	systemd (4)
  1.9 MiB + 784.5 KiB =   2.6 MiB	(sd-pam) (3)
  6.2 MiB + -3555.0 KiB =   2.7 MiB	NetworkManager
  6.6 MiB + -3794.5 KiB =   2.9 MiB	colord
  2.7 MiB + 713.5 KiB =   3.4 MiB	polkit-gnome-authentication-agent-1
  2.8 MiB + 805.0 KiB =   3.6 MiB	cinnamon-screensaver
  3.6 MiB + 341.5 KiB =   3.9 MiB	pulseaudio
  3.2 MiB + 826.5 KiB =   4.0 MiB	cinnamon-session
  4.9 MiB +  56.5 KiB =   5.0 MiB	systemd-journald
  13.2 MiB + -7890.0 KiB =   5.4 MiB	polkitd
  3.9 MiB +   2.1 MiB =   6.0 MiB	nm-applet
  5.5 MiB +   2.0 MiB =   7.5 MiB	cinnamon-settings-daemon
  11.4 MiB + -3668.5 KiB =   7.9 MiB	ntpd
  8.2 MiB +   1.1 MiB =   9.3 MiB	cinnamon-launch
  7.7 MiB +   2.0 MiB =   9.8 MiB	nemo
  21.2 MiB + -527.5 KiB =  20.7 MiB	Xorg
  85.9 MiB + -34668.5 KiB =  52.1 MiB	cinnamon
---------------------------------
                        176.3 MiB
=================================
```

### GNOME3 ###

```text
  Private  +   Shared  =  RAM used	Program

180.0 KiB +  34.0 KiB = 214.0 KiB	dbus-launch
276.0 KiB +  14.0 KiB = 290.0 KiB	ssh-agent
248.0 KiB +  51.0 KiB = 299.0 KiB	rtkit-daemon
312.0 KiB +  28.0 KiB = 340.0 KiB	dhcpcd
324.0 KiB +  21.5 KiB = 345.5 KiB	systemd-hostnamed
328.0 KiB +  20.0 KiB = 348.0 KiB	systemd-localed
324.0 KiB +  80.0 KiB = 404.0 KiB	rpcbind
580.0 KiB +  52.5 KiB = 632.5 KiB	bluetoothd
604.0 KiB +  40.0 KiB = 644.0 KiB	systemd-logind
556.0 KiB + 109.0 KiB = 665.0 KiB	gconfd-2
452.0 KiB + 252.0 KiB = 704.0 KiB	avahi-daemon (2)
680.0 KiB +  44.0 KiB = 724.0 KiB	systemd-udevd
548.0 KiB + 182.0 KiB = 730.0 KiB	gconf-helper
  4.6 MiB + -3950.5 KiB = 765.5 KiB	at-spi2-registryd
596.0 KiB + 185.0 KiB = 781.0 KiB	at-spi-bus-launcher
768.0 KiB +  50.5 KiB = 818.5 KiB	VBoxService
696.0 KiB + 146.5 KiB = 842.5 KiB	gvfsd
768.0 KiB +  86.5 KiB = 854.5 KiB	rpc.statd
  4.8 MiB + -3960.0 KiB = 960.0 KiB	accounts-daemon
852.0 KiB + 137.5 KiB = 989.5 KiB	gvfsd-fuse
792.0 KiB + 267.0 KiB =   1.0 MiB	zeitgeist-daemon
  5.1 MiB + -3910.5 KiB =   1.3 MiB	gdm
  5.0 MiB + -3853.0 KiB =   1.3 MiB	upowerd
  1.0 MiB + 291.0 KiB =   1.3 MiB	gvfs-udisks2-volume-monitor
  5.1 MiB + -3877.0 KiB =   1.3 MiB	udisksd
  1.1 MiB + 286.0 KiB =   1.4 MiB	cupsd
  1.4 MiB + 133.0 KiB =   1.5 MiB	gnome-keyring-daemon
  1.1 MiB + 448.0 KiB =   1.5 MiB	gdm-session-worker
  1.3 MiB + 359.0 KiB =   1.7 MiB	gsd-printer
  1.2 MiB + 509.0 KiB =   1.7 MiB	(sd-pam) (2)
  1.6 MiB + 192.5 KiB =   1.8 MiB	syslog-ng
  1.3 MiB + 648.0 KiB =   1.9 MiB	mission-control-5
  5.6 MiB + -3676.5 KiB =   2.0 MiB	gnome-session
  1.1 MiB + 984.5 KiB =   2.1 MiB	systemd (3)
  1.5 MiB + 573.5 KiB =   2.1 MiB	zeitgeist-datahub
  1.3 MiB + 953.0 KiB =   2.2 MiB	sshd (2)
  6.1 MiB + -3700.5 KiB =   2.5 MiB	colord
  6.1 MiB + -3656.0 KiB =   2.5 MiB	NetworkManager
  2.2 MiB + 466.0 KiB =   2.6 MiB	dbus-daemon (3)
  2.0 MiB + 728.5 KiB =   2.7 MiB	gnome-shell-calendar-server
  2.6 MiB + 491.5 KiB =   3.1 MiB	VBoxClient (4)
  2.5 MiB +   1.0 MiB =   3.5 MiB	evolution-source-registry
  6.5 MiB + -2914.5 KiB =   3.6 MiB	tracker-extract
  3.5 MiB + 338.5 KiB =   3.9 MiB	pulseaudio
  6.7 MiB + -2828.5 KiB =   3.9 MiB	tracker-miner-fs
  3.4 MiB +   2.1 MiB =   5.5 MiB	goa-daemon
  13.3 MiB + -7973.0 KiB =   5.5 MiB	polkitd
  4.9 MiB + 728.0 KiB =   5.7 MiB	tracker-store
  6.1 MiB +  51.5 KiB =   6.2 MiB	systemd-journald
  4.2 MiB +   2.1 MiB =   6.3 MiB	nm-applet
  11.4 MiB + -3668.5 KiB =   7.9 MiB	ntpd
  10.1 MiB + -1729.0 KiB =   8.4 MiB	gnome-settings-daemon
  8.1 MiB +   1.7 MiB =   9.8 MiB	Xorg
  10.7 MiB + -816.5 KiB =   9.9 MiB	evolution-alarm-notify
  24.6 MiB +   1.1 MiB =  25.7 MiB	evolution-calendar-factory
143.2 MiB + -56658.5 KiB =  87.9 MiB	gnome-shell
---------------------------------
                        245.3 MiB
=================================
```

### KDE ###

```text
  Private  +   Shared  =  RAM used	Program

  72.0 KiB +   8.0 KiB =  80.0 KiB	start_kdeinit
  80.0 KiB +  13.5 KiB =  93.5 KiB	kwrapper4
128.0 KiB +  23.0 KiB = 151.0 KiB	agetty
176.0 KiB +  28.0 KiB = 204.0 KiB	dbus-launch
292.0 KiB +  28.5 KiB = 320.5 KiB	gpg-agent
320.0 KiB +  28.0 KiB = 348.0 KiB	dhcpcd
272.0 KiB +  84.0 KiB = 356.0 KiB	cat (4)
340.0 KiB +  79.0 KiB = 419.0 KiB	rpcbind
604.0 KiB +  39.0 KiB = 643.0 KiB	systemd-logind
464.0 KiB + 247.0 KiB = 711.0 KiB	avahi-daemon (2)
768.0 KiB +  87.5 KiB = 855.5 KiB	rpc.statd
852.0 KiB +  51.5 KiB = 903.5 KiB	startkde
352.0 KiB + 669.0 KiB =   1.0 MiB	systemd-udevd (2)
656.0 KiB + 524.5 KiB =   1.2 MiB	kdm (2)
  1.1 MiB + 420.0 KiB =   1.5 MiB	upowerd
852.0 KiB + 780.0 KiB =   1.6 MiB	klauncher
  1.3 MiB + 346.0 KiB =   1.7 MiB	udisksd
  1.5 MiB + 256.5 KiB =   1.8 MiB	akonadi_control
  1.3 MiB + 529.0 KiB =   1.8 MiB	(sd-pam) (2)
  1.6 MiB + 201.5 KiB =   1.8 MiB	syslog-ng
  1.5 MiB + 409.5 KiB =   1.9 MiB	dbus-daemon (2)
  1.2 MiB + 971.5 KiB =   2.1 MiB	systemd (3)
656.0 KiB +   1.5 MiB =   2.2 MiB	kdeinit4
  1.3 MiB + 997.0 KiB =   2.3 MiB	sshd (2)
  1.3 MiB +   1.6 MiB =   2.9 MiB	kio_trash (2)
  2.1 MiB +   1.1 MiB =   3.2 MiB	klipper
  6.9 MiB + -3587.0 KiB =   3.4 MiB	NetworkManager
  2.4 MiB +   1.0 MiB =   3.5 MiB	ksmserver
  3.2 MiB + 594.5 KiB =   3.8 MiB	kuiserver
  3.2 MiB + 952.5 KiB =   4.1 MiB	kglobalaccel
  3.4 MiB + 829.5 KiB =   4.2 MiB	akonadi_migration_agent
  3.4 MiB + 837.5 KiB =   4.3 MiB	polkit-kde-authentication-agent-1
  3.8 MiB + 716.5 KiB =   4.5 MiB	knotify4
  4.4 MiB +  49.5 KiB =   4.5 MiB	systemd-journald
  3.8 MiB + 891.0 KiB =   4.7 MiB	baloo_file
  3.8 MiB + 975.0 KiB =   4.7 MiB	akonadi_maildispatcher_agent
  3.8 MiB + 983.0 KiB =   4.7 MiB	akonadi_baloo_indexer
  4.1 MiB +   1.3 MiB =   5.4 MiB	akonadi_newmailnotifier_agent
  4.3 MiB +   1.1 MiB =   5.4 MiB	korgac
  13.2 MiB + -7804.0 KiB =   5.6 MiB	polkitd
  5.5 MiB +   1.7 MiB =   7.1 MiB	akonadi_notes_agent
  11.1 MiB + -3575.0 KiB =   7.6 MiB	kactivitymanagerd
  5.6 MiB +   2.1 MiB =   7.7 MiB	akonadi_sendlater_agent
  11.4 MiB + -3697.5 KiB =   7.8 MiB	ntpd
  7.2 MiB + 777.5 KiB =   8.0 MiB	akonadiserver
  6.0 MiB +   2.9 MiB =   8.9 MiB	akonadi_archivemail_agent
  6.3 MiB +   2.6 MiB =   8.9 MiB	kmix
  6.1 MiB +   2.9 MiB =   9.0 MiB	akonadi_mailfilter_agent
  6.9 MiB +   2.4 MiB =   9.3 MiB	kded4
  9.1 MiB +   2.7 MiB =  11.7 MiB	akonadi_agent_launcher (3)
  13.8 MiB + -1069.5 KiB =  12.8 MiB	kwin
  13.2 MiB +   3.2 MiB =  16.5 MiB	krunner
  68.8 MiB + -49024.0 KiB =  21.0 MiB	mysqld
  30.3 MiB + -2270.0 KiB =  28.1 MiB	Xorg
  36.9 MiB +   6.8 MiB =  43.7 MiB	plasma-desktop
---------------------------------
                        302.6 MiB
=================================
```

### Unity ###

```text
  Private  +   Shared  =  RAM used	Program

  92.0 KiB +  14.0 KiB = 106.0 KiB	cat
128.0 KiB +  21.0 KiB = 149.0 KiB	agetty
180.0 KiB +  28.0 KiB = 208.0 KiB	dbus-launch
252.0 KiB +  47.0 KiB = 299.0 KiB	rtkit-daemon
312.0 KiB +  27.0 KiB = 339.0 KiB	dhcpcd
324.0 KiB +  18.0 KiB = 342.0 KiB	systemd-localed
336.0 KiB +  21.0 KiB = 357.0 KiB	systemd-timedated
344.0 KiB +  79.0 KiB = 423.0 KiB	rpcbind
412.0 KiB +  69.0 KiB = 481.0 KiB	dconf-service
592.0 KiB +  39.0 KiB = 631.0 KiB	systemd-logind
588.0 KiB +  92.5 KiB = 680.5 KiB	indicator-messages-service
448.0 KiB + 245.0 KiB = 693.0 KiB	avahi-daemon (2)
604.0 KiB +  89.5 KiB = 693.5 KiB	indicator-bluetooth-service
548.0 KiB + 168.0 KiB = 716.0 KiB	gconf-helper
  4.6 MiB + -3955.0 KiB = 725.0 KiB	at-spi-bus-launcher
684.0 KiB +  42.0 KiB = 726.0 KiB	systemd-udevd
640.0 KiB + 100.0 KiB = 740.0 KiB	gconfd-2
636.0 KiB + 115.5 KiB = 751.5 KiB	at-spi2-registryd
652.0 KiB + 144.5 KiB = 796.5 KiB	indicator-power-service
648.0 KiB + 158.5 KiB = 806.5 KiB	gvfsd
772.0 KiB +  45.5 KiB = 817.5 KiB	VBoxService
768.0 KiB +  85.5 KiB = 853.5 KiB	rpc.statd
796.0 KiB + 122.0 KiB = 918.0 KiB	accounts-daemon
568.0 KiB + 391.5 KiB = 959.5 KiB	(sd-pam)
  4.8 MiB + -3982.5 KiB = 969.5 KiB	gvfsd-fuse
824.0 KiB + 253.0 KiB =   1.1 MiB	dbus (2)
828.0 KiB + 271.0 KiB =   1.1 MiB	zeitgeist-daemon
  4.9 MiB + -3904.0 KiB =   1.1 MiB	gvfsd-trash
  1.0 MiB + 131.5 KiB =   1.2 MiB	indicator-session-service
  5.0 MiB + -3883.0 KiB =   1.2 MiB	upowerd
  1.1 MiB + 237.0 KiB =   1.3 MiB	cupsd
  1.1 MiB + 279.0 KiB =   1.4 MiB	gvfs-udisks2-volume-monitor
  5.1 MiB + -3857.0 KiB =   1.4 MiB	udisksd
  1.1 MiB + 324.5 KiB =   1.4 MiB	zeitgeist-fts
  5.1 MiB + -3833.0 KiB =   1.4 MiB	indicator-application-service
  1.2 MiB + 382.0 KiB =   1.6 MiB	indicator-sound-service
  1.6 MiB + 174.5 KiB =   1.8 MiB	syslog-ng
  5.6 MiB + -3769.0 KiB =   1.9 MiB	gnome-session
932.0 KiB +   1.0 MiB =   1.9 MiB	systemd (2)
  1.4 MiB + 537.0 KiB =   2.0 MiB	lightdm (2)
  1.4 MiB + 753.0 KiB =   2.1 MiB	mission-control-5
  1.3 MiB + 936.0 KiB =   2.2 MiB	sshd (2)
  1.8 MiB + 531.0 KiB =   2.3 MiB	zeitgeist-datahub
  6.2 MiB + -3779.0 KiB =   2.5 MiB	colord
  2.2 MiB + 458.5 KiB =   2.6 MiB	dbus-daemon (3)
  6.2 MiB + -3682.0 KiB =   2.6 MiB	NetworkManager
  2.3 MiB + 515.0 KiB =   2.8 MiB	gnome-fallback-mount-helper
  2.3 MiB + 485.0 KiB =   2.8 MiB	polkit-gnome-authentication-agent-1
  2.4 MiB + 514.0 KiB =   2.9 MiB	notify-osd
  2.5 MiB + 417.5 KiB =   3.0 MiB	VBoxClient (4)
  2.6 MiB + 547.5 KiB =   3.1 MiB	indicator-keyboard-service
  2.7 MiB + 657.0 KiB =   3.3 MiB	indicator-printers-service
  2.7 MiB + 854.0 KiB =   3.5 MiB	telepathy-indicator
  2.5 MiB +   1.1 MiB =   3.6 MiB	evolution-source-registry
  3.1 MiB + 577.0 KiB =   3.7 MiB	bamfdaemon
  3.6 MiB + 306.5 KiB =   3.9 MiB	pulseaudio
  3.0 MiB + 933.0 KiB =   3.9 MiB	indicator-datetime-service
  3.9 MiB +   1.3 MiB =   5.3 MiB	unity-panel-service
  13.2 MiB + -7982.0 KiB =   5.4 MiB	polkitd
  4.4 MiB +   1.8 MiB =   6.1 MiB	nm-applet
  6.1 MiB + 747.0 KiB =   6.9 MiB	goa-daemon
  7.3 MiB +  50.5 KiB =   7.3 MiB	systemd-journald
  11.4 MiB + -3690.5 KiB =   7.8 MiB	ntpd
  5.3 MiB +   4.5 MiB =   9.8 MiB	gnome-settings-daemon
  11.6 MiB +   1.0 MiB =  12.6 MiB	nautilus
  24.7 MiB +   1.2 MiB =  25.8 MiB	evolution-calendar-factory
  40.2 MiB + -351.0 KiB =  39.9 MiB	Xorg
103.2 MiB + -4818.0 KiB =  98.5 MiB	compiz
---------------------------------
                        312.5 MiB
=================================
```

## Final thoughts

On Arch Linux at least, Xfce has lower resource requirements than MATE.
When I said different in the past I was wrong, unless you use openSUSE
in which case I was probably right, maybe.
