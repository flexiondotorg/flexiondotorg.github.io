---
title: Uncomplicated Firewall (UFW) on Arch Linux
aliases: /posts/2013-03-ufw-on-arch-linux
date: 2013-03-09 08:37:43
tags: [ Arch Linux,Firewall,VPS,UFW,Uncomplicated Firewall ]
summary: Configuring Uncomplicated Firewall (UFW) on Arch Linux.
sidebar: true
images: hero.png
hero: hero.png
---

While migrating one of my VPS servers to [Arch Linux](http://www.archlinux.org)
I deployed [Uncomplicated Firewall (UFW)](https://wiki.ubuntu.com/UncomplicatedFirewall)
to handle basic firewall duties. I like `ufw` as it provides simple host-based
firewall management and, in my opinion, one of the better projects to come out
of the Ubuntu camp.

Install `ufw` as follows.

```bash
sudo pacman -Syy -noconfirm --needed ufw
```

Configuring `ufw` is simple but make sure you have console access to the host
you are configuring just in case you lock yourself out.

**NOTE!** When enabling `ufw` the chains are flushed and connections may be
dropped. You can add rules to the firewall before enabling it however, so if you
are testing `ufw` on a remote machine it is recommended you perform...

```bash
ufw allow ssh/tcp
```

...before running `sudo ufw enable`. Once the firewall is enabled, adding and
removing rules will not flush the firewall, although modifying an existing rule
will.

Set the default behaviour to deny all incoming connections.

```bash
sudo ufw default deny
```

Open up TCP port 22 but with rate limiting enabled which will deny connections
from an IP address that has attempted to initiate 6 or more connections in the
last 30 seconds. Ideal for protecting `sshd` but you should conisder other
[SSH brute force defense](/posts/ssh-brute-force-defense/)
techniques as well.

```bash
sudo ufw limit tcp/22
```

I'm hosting a few websites on my VPS so I open http and https.

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Enable the `ufw` systemd unit.

```bash
sudo systemctl enable ufw
sudo systemctl start ufw
```

However, `ufw` is not enabled at this point. To enable the firewall you also
have to do the following.

```bash
sudo ufw enable
```

You can see the status of the firewall using `sudo ufw status`.

On low-end servers it might be beneficial to disable logging.

```bash
sudo ufw logging off
```

At this point you should have a basic firewall configured and `ufw help` or the
references below will assist you.

#### References

  * <https://wiki.archlinux.org/index.php/Uncomplicated_Firewall>
  * <https://wiki.ubuntu.com/UncomplicatedFirewall>
  * <https://launchpad.net/ufw>
