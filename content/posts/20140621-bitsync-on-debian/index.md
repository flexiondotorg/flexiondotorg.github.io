---
title: Setting up BitSync on Debian
aliases: /posts/2014-06-bitsync-on-debian
date: 2014-06-21 12:00:00
tags: [ Linux,Debian,BitTorrent Sync,btsync,Torrent,syncthing,Dropbox ]
summary: Setting up BitTorrent Sync on Debian
sidebar: true
images: hero.png
hero: hero.png
---

I've replaced Dropbox with [BitTorrent Sync](http://www.bittorrent.com/sync).
In order to do this I've have `btsync` running on a VPS (2CPU, 2GB, 400GB), my
home server and assorted Arch Linux workstations.

I had a couple of reasons for migrating away from Dropbox.

  * Dropbox was costing $100 per year.
  * Dropbox encryption model is weak and I have data security/privacy.

The VPS I am running BitTorrent Sync on costs $50 per year and provides four
times the storage. I run `btsync` on a VPS so that there is always a server
*"in the cloud"* that is available to sync with so that my setup emulates what
Dropbox used to do.

All my servers are running Debian and this is how I install `btsync` on
Debian.

```bash
sh -c "$(curl -fsSL http://debian.yeasoft.net/add-btsync-repository.sh)"
sudo apt-get install btsync
```

This is how I respond to the prompts:

```text
* Do you want to define a default BitTorrent Sync instance? : YES
* BitTorrent Sync Daemon Credentials: yourusername
* BitTorrent Sync Daemon Group: yourusername
* Niceness of the BitTorrent Sync Daemon: 0
* On which portnumber should BitTorrent Sync listen? 0
* BitTorrent Sync Listen Port: 12345
* Do you want BitTorrent Sync to request port mapping via UPNP? NO
* Download Bandwith Limit: 0
* Upload Bandwith Limit: 0
* Web Interface Bind IP Address: 0.0.0.0
* Web Interface Listen Port: 8888
* The username for accessing the web interface: yourusername
* The password for accessing the web interface: yourpassword
```

As you'll see, I don't use UPNP on my VPS. I elect a specific port (not
actually 12345 by the way) and open that port up with `ufw`. I also only
allow access to the WebUI port from another server I own which reverse
proxies via `nginx`.

`btsync` works really well, I have it syncing hundreds of thousands of
files  that amount to several hundred gigabytes of data. On my Arch Linux
workstations I use the brilliant [btsync-gui](http://www.yeasoft.com/site/projects:btsync-deb:btsync-gui)
and [BitTorrent Sync is also available for Android](https://play.google.com/store/apps/details?id=com.bittorrent.sync).

That said, I still use a free Dropbox account to sync photos from mine and my
wife's Android phones. I have a Dropbox instance running on my home file server
and everyday it runs a script to automatically import these photos into Plex.

Such a shame, that at the time of writing, `btsync` is closed source :-(
Maybe that will change but if it doesn't [syncthing](http://syncthing.net/)
may well be the answer when it has matured a little.

#### References

  * <http://www.yeasoft.com/site/projects:btsync-deb:btsync-server>
  * <http://forum.bittorrent.com/topic/18974-debian-and-ubuntu-server-packages-for-bittorrent-sync/>
