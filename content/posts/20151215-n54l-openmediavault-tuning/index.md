---
title: HP Microserver N54L power saving and performance tuning using Debian
aliases: /posts/2015-12-hp-microserver-n45l-power-saving
date: 2015-12-16 12:00:00
tags: [ Linux,Debian,HP MicroServer,N54L ]
summary: Configure HP Microserver N54L Power Saving on Debian
sidebar: true
images: hero.png
hero: hero.png
---

I've installed [Open Media Vault](http://www.openmediavault.org/)
on a [HP ProLiant MicroServer G7 N54L](http://www8.hp.com/uk/en/products/proliant-servers/product-detail.html?oid=5336624)
and use it as media server for the house. OpenMediaVault (OMV) is a
network attached storage (NAS) solution based on [Debian](http://www.debian.org).

I want to minimise power consumption but maximise performance. Here are
some tweaks reduce power consumption and improve network performance.

# Power Saving

Install the following.

```bash
apt-get install amd64-microcode firmware-linux firmware-linux-free \
firmware-linux-nonfree pciutils powertop radeontool
```

And for ACPI.

```bash
apt-get install acpi acpid acpi-support acpi-support-base
```

## ASPM and ACPI

First I enabled PCIE ASPM in the BIOS and forced the kernel to use it and
ACPI via `grub` by changing `GRUB_CMDLINE_LINUX_DEFAULT` in `/etc/default/grub`,
so it looks like this:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet acpi=force pcie_aspm=force nmi_watchdog=0"
```

Then update `grub` and reboot.

```bash
update-grub
reboot
```

## Enable Power Saving via udev

The following rules file `/etc/udev/rules.d/90-local-n54l.rules` enables
power saving modes for all PCI, SCSI and USB devices and ASPM. Futher
the internal Radeon card power profile is set to low as there is rarely
a monitor connected. The file contains the following:

```bash
SUBSYSTEM=="module", KERNEL=="pcie_aspm", ACTION=="add", TEST=="parameters/policy", ATTR{parameters/policy}="powersave"
SUBSYSTEM=="i2c", ACTION=="add", TEST=="power/control", ATTR{power/control}="auto"
SUBSYSTEM=="pci", ACTION=="add", TEST=="power/control", ATTR{power/control}="auto"
SUBSYSTEM=="usb", ACTION=="add", TEST=="power/control", ATTR{power/control}="auto"
SUBSYSTEM=="usb", ACTION=="add", TEST=="power/autosuspend", ATTR{power/autosuspend}="2"
SUBSYSTEM=="scsi", ACTION=="add", TEST=="power/control", ATTR{power/control}="auto"
SUBSYSTEM=="spi", ACTION=="add", TEST=="power/control", ATTR{power/control}="auto"
SUBSYSTEM=="drm", KERNEL=="card*", ACTION=="add", DRIVERS=="radeon", TEST=="power/control", TEST=="device/power_method", ATTR{device/power_method}="profile", ATTR{device/power_profile}="low"
SUBSYSTEM=="scsi_host", KERNEL=="host*", ACTION=="add", TEST=="link_power_management_policy", ATTR{link_power_management_policy}="min_power"
```

Add this to `/erc/rc.local`.

```bash
echo '1500' > '/proc/sys/vm/dirty_writeback_centisecs'
```

## Hard disk spindown

Using the Open Media Vault web interface got to `Storage -> Physical Disks`,
select each disk in turn and click `Edit` then set:

  * **Advanced Power Management:** Intermediate power usage with standby
  * **Automatic Acoustic Management:** Minimum performance, Minimum acoustic output
  * **Spindown time:** 20 minutes

# Performance Tuning

## Network

The following tweaks improve network performance ,but **I have a
[HP NC360T PCI Express Dual Port Gigabit Server Adapter](http://www.hiwifi.co.uk/)**
in my N54L so these settings may not be applicable to the onboard NIC.

Add this to `/erc/rc.local`.

```bash
ethtool -G eth0 rx 4096
ethtool -G eth1 rx 4096
ethtool -G eth0 tx 4096
ethtool -G eth1 tx 4096
ifconfig eth0 txqueuelen 1000
ifconfig eth1 txqueuelen 1000
```

Add the following to `/etc/sysctl.d/local.conf`.

```bash
fs.file-max = 100000
net.core.netdev_max_backlog = 50000
net.core.optmem_max = 40960
net.core.rmem_default = 16777216
net.core.rmem_max = 16777216
net.core.wmem_default = 16777216
net.core.wmem_max = 16777216
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.all.log_martians = 1
net.ipv4.conf.all.send_redirects = 0
net.ipv4.ip_local_port_range = 10000 65000
net.ipv4.tcp_fin_timeout = 10
net.ipv4.tcp_max_syn_backlog = 30000
net.ipv4.tcp_max_tw_buckets = 2000000
net.ipv4.tcp_rfc1337 = 1
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_sack=0
net.ipv4.tcp_slow_start_after_idle = 0
net.ipv4.tcp_timestamps=0
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_wmem = 4096 65536 16777216
net.ipv4.udp_rmem_min = 8192
net.ipv4.udp_wmem_min = 8192
vm.swappiness = 10
```

## Conclusion

With these settings applied `powertop` reports everything that can be in
a power saving mode is and the room temperature is measurably cooler.
More importantly, with four 4TB drives in a RAID-5 configuration
formatted with XFS and dual bonded gigabit ethernet, I am able to backup
data to the server at a sustained rate of 105MB/s, which is 0.85 Gbit.

Not too shabby for an AMD Turion II Neo N54L (2.2GHz) `:-D`

#### References

  * <http://www.wgdd.de/2013/08/hp-n54l-microserver-energy-efficiency.html?m=1>
  * <http://gareth.halfacree.co.uk/2014/02/tuning-an-hp-proliant-microserver>
  * <http://www.scottalanmiller.com/linux/2011/06/20/working-with-nic-ring-buffers/>
  * <https://gist.github.com/dstroot/2785263>
