---
title: Headless Debian 6.0 Torrent Server
aliases: /posts/2013-03-transmission-on-headless-debian-squeeze
date: 2013-03-21 17:35:22
tags: [ Linux,Debian,Torrent,Transmission,Server,Headless ]
summary: Installing Transmission daemon on headless Debian (Squeeze) 6.0
sidebar: true
images: hero.png
hero: hero.png
---

I recently switched ISPs at home and now have unlimited high speed broadband.

Finally I can participate in torrenting Linux .ISO images. I always download
the latest distros using [BitTorrent](http://en.wikipedia.org/wiki/BitTorrent)
and can now contribute to the community by seeding the distros I've downloaded.

I have a small (in size and resources) [Debian](http://www.debian.org) 6.0
headless server at home that I wanted to turn into a torrent box. I'm a big fan
of [Transmission](http://www.transmissionbt.com/) since it can be managed from
the shell, web and Android phone/tablet. Sadly, the Transmission packages in the
official Debain squeeze repositories are quite old, 2.03 at the time of writing,
and there are no Transmission packages in [Debian Backports](http://backports-master.debian.org/).

However after flexing my _google-fu_ I found a [3rd party Debian Squeeze
repository](http://apt.balocco.name/changelog.txt) that includes fairly current
(2.73 at the time of writing) Transmission packages specifically for headless use.
Yah!

## Install Transmission Daemon

First become root.

```bash
sudo -s -H
```

Add the repository key.

```bash
apt-key adv --keyserver keyserver.ubuntu.com --recv-key 92B84A1E
```

Add the repository.

```bash
echo "deb http://apt.balocco.name squeeze main" > /etc/apt/sources.list.d/balocco.list
```

Update the package list.

```bash
apt-get update
```

Install Transmission.

```bash
apt-get install transmission-cli transmission-daemon transmission-webinterface
```

## Basic Configuration

The Transmission settings can be found in `/etc/transmission-daemon/settings.json`.

**If `transmission-daemon` is running when you make changes to `settings.json`
the changes you make will be discarded the next time `transmission-daemon` is started.**

Therefore either stop `transmission-daemon` before you make any changes or you can make
the daemon reload `settings.json` by sending it the SIGHUP signal.

### Connect from anywhere

If you want to be able to connect to Transmission from anywhere on the Internet
stop `transmission-daemon`, make the following changes to `settings.json` and
then start `transmission-daemon`.

```json
"rpc-password": "YourPlainTextPassword",
"rpc-username": "YourUsername",
"rpc-whitelist-enabled": false,
```

The `rpc-username` field will need adding but you can edit the existing entry
for `rpc-password`. Enter the `rpc-password` as a plain text string, Transmission
will automatically convert the password to a hash the next time it is started.

## Connect via a browser

You should now be able to access the Transmission web interface via
`http://yourhost.example.org:9091`. If you didn't change the username and password
(you really should) the defaults are:

  * Username : `transmission`
  * Password : `transmission`

## Connect via Android

I have an Android phone and an Android tablet. I use
[Remote Transmission](https://play.google.com/store/apps/details?id=com.neogb.rtac)
on my Android devices to manage my torrent box.

## Connect via the shell

If, like me, you spend the majority of you time at the shell. Then
[transmission-remote-cli](https://github.com/fagga/transmission-remote-cli) is
probably for you. All my workstation run [Arch Linux](http://www.archlinux.org) so
I install `transmission-remote-cli` as follows.

```bash
sudo pacman -S transmission-remote-cli
```

See the GitHub project page for `tramission-remote-cli` for instructions on how
to connect to a remote Transmission daemon.

## Block List

Regardless of how you intend to use Transmission you should enable a block list,
this can be done via `settings.json` and the web interface. The following block
lists are a good start.

  * <http://list.iblocklist.com/?list=bt_level1&fileformat=p2p&archiveformat=gz>
  * <http://www.bluetack.co.uk/config/level1.gz>

That covers the basics for getting Transmission running on headless Debian 6.0 and
how to connect to it from just about anywhere and on any device. I recommend reading
the [Trasmission Wiki](https://trac.transmissionbt.com/wiki) as Transmission is
capable of so much more than I have covered in this blog post.

Happy torrenting.

#### References
  * <http://apt.balocco.name/changelog.txt>
  * <http://www.lowendtalk.com/discussion/1001/squeeze-repository>
  * <https://trac.transmissionbt.com/wiki/EditConfigFiles>
  * <https://github.com/fagga/transmission-remote-cli>
  * <http://www.iblocklist.com/>
