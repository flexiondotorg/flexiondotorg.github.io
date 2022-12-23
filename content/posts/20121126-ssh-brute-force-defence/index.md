---
title: SSH brute force defense
aliases: /posts/2012-11-ssh-brute-force-defence
date: 2012-11-26 13:14:09
categories: [ "Linux", "Open Source", "Tutorial", "Security" ]
tags: [ "Arch Linux", "Ubuntu", "OpenSSH", "DenyHosts", "Fail2Ban" ]
summary: Deploy DenyHosts or Fail2Ban to better prevent SSH brute force attacks.
sidebar: true
images: hero.webp
hero: hero.webp
---

I have several VPS hosts with different providers using different
virtualisation platforms. Naturally I have [OpenSSH](http://www.openssh.org/)
running on these VPS hosts and deploy either [DenyHosts](http://denyhosts.sourceforge.net/)
or [Fail2Ban](http://www.fail2ban.org/) to add an extra security layer to
thwart SSH brute force attacks and other abuse.

DenyHosts blocks brute force attacks by adding offending IP addresses to
`/etc/hosts.deny`. It therefore requires the SSH server is configured with
`tcp_wrappers`. Arch Linux [dropped support for tcp_wrappers](https://www.archlinux.org/news/dropping-tcp_wrappers-support/)
so DenyHosts is not suitable for Arch. Fail2Ban supports blocking via `iptables` and/or
`tcp_wrappers` and can also block offending hosts that are abusing services other than just `sshd`.

## DenyHosts on Ubuntu

Here is a simple example for DenyHosts on Ubuntu Lucid 10.04 LTS Server.

```bash
sudo apt-get install denyhosts
```

That's it. The default configuration will provide suitable prevention, but do
take a look at `/etc/denyhosts.conf` for a full run down of all available options.
I use the defaults with the following exceptions:

```ini
PURGE_DENY = 5d
PURGE_THRESHOLD = 2
ADMIN_EMAIL =
SYSLOG_REPORT=NO
```

You might want to consider whitelisting some of your own IP address. Create a
file called `allowed-hosts` in `/var/lib/denyhosts` and list each of your
"trusted" IP addresses.

DenyHosts can be restarted by executing:

```bash
sudo /etc/init.d/denyhosts restart
```

## Fail2Ban on Arch Linux

Fail2Ban now supports systemd.

Configuration files are stored in `/etc/fail2ban`. General configuration is
`/etc/fail2ban/jail.conf`, but this file might be overwritten in the future. To
preserve customisations, create `/etc/fail2ban/jail.local` and add your local
configuration settings to it. In the example below some IP addresses are whitelisted
and the default backend is set to systemd:

```ini
[DEFAULT]

ignoreip = 172.16.0.2/32
backend = systemd
```

Next create a custom sshd configuration in `/etc/fail2ban/jail.d/sshd.conf`
which will temporarily ban offending IP addresses.

```ini
# fail2ban SSH
# block ssh after 3 unsuccessful login attempts for 10 minutes
[sshd]
enabled  = true
action   = iptables[chain=INPUT, protocol=tcp, port=22, name=sshd]
maxRetry = 3
findtime = 600
bantime  = 600
port     = 22
```

The 'action' creates DROP rule in iptables after 3 unsuccessful login
attempts, valid for 10 minutes (bantime). Findtime defines time frame in which
fail2ban will count failed login attempts from logs, so if one IP has 3
incorrect login attempts in last 10 minutes, it will be banned.

Enable and start the Fail2Ban daemon.

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

Basic commands for fail2ban-client:

```bash
fail2ban-client start sshd
fail2ban-client stop sshd
fail2ban-client reload sshd
fail2ban-client status sshd
fail2ban-client set sshd unbanip 172.16.0.4
```

See the [Arch Linux Fail2Ban Wiki page](https://wiki.archlinux.org/index.php/Fail2ban)
for more details.

**References**
  * <http://krisko210.blogspot.co.uk/2014/03/setting-up-fail2ban.html>

## SSH best practice

DenyHosts and Fail2Ban do not provide complete protection against SSH brute
force attacks. I employ other SSH best practice to better secure the SSH
services I expose to the Internet, and so should you. The following is a
good reference.

  * [Getting started with SSH security and configuration](http://www.ibm.com/developerworks/aix/library/au-sshsecurity/index.html)

## Other SSH brute force prevention tools

In the interests of fairness, other SSH brute force preventation tools are
available.

  * [Sshgaurd](http://www.sshguard.net/)
  * [sshdfilter](http://cgi.csc.liv.ac.uk/~greg/sshdfilter/)
  * [Uncomplicated Firewall](https://help.ubuntu.com/community/UFW)
    * [Rate Limiting](https://wiki.archlinux.org/index.php/Uncomplicated_Firewall#Rate_Limiting_with_ufw)

Do you know any other tools that help prevent SSH brute force attacks?
