---
title: Integrating Dropbox photo syncing with Open Media Vault and Plex
aliases: /posts/2014-06-integrating-dropbox-photo-syncing-with-open-media-vault-and-plex
date: 2014-06-28 12:00:00
lastmod: 2016-08-22
categories: [ "Linux", "Open Source", "Tutorial", "Self Hosting" ]
tags: [ "Dropbox", "Open Media Vault", "Plex", "Debian" ]
summary: Integrating Dropbox on a headless Open Media Vault server.
sidebar: true
images: hero.webp
hero: hero.webp
---

**This how-to was updated for Open Media Vault 2.x and 3.x on 22nd August 2016.**

I've installed [Open Media Vault](http://www.openmediavault.org/)
on a [HP ProLiant MicroServer G7 N54L](http://www8.hp.com/uk/en/products/proliant-servers/product-detail.html?oid=5336624)
and use it as media server for the house. OpenMediaVault (OMV) is a network
attached storage (NAS) solution based on [Debian](http://www.debian.org) Linux.

I use a free Dropbox account to sync photos from mine and my wife's Android
phones and wanted to automate to import of these photo upload into Plex, which
is also running on Open Media Vault.

# Installing Dropbox on Open Media Vault

I looked for a Dropbox Plugin for Open Media Vault and found this:

  * <https://github.com/lordldx/openmediavault-dropbox>

Sadly, at the time of writing, it is unfinished and I didn't have the time to
go and learn the Open Media Vault plugin API.

The Open Media Vault forum does include a [Dropbox HOW-TO](http://forums.openmediavault.org/viewtopic.php?f=13&t=70)
which is very similar to how [I've run Dropbox on headless Linux servers](/posts/dropbox-is-my-nikola-publish-button/)
in the past. So, I decided to adapt my existing notes to Open Media Vault.

## Create a Dropbox Share

Create a Dropbox share via the OMV WebUI.

  * `Access Right Management -> Shared Folders`

I gave my the name "Dropbox". I know, very original.

## Installing Dropbox on a headless server

Download and extract the latest Dropbox stable release.

```bash
cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64" | tar xzf -
chown -Rv ${USER}: ~/.dropbox-dist
sudo ln -s ~/.dropbox-dist/dropboxd /usr/local/bin/
```

Run `dropboxd`.

```bash
~/.dropbox-dist/dropboxd
```

You should see output like this:

```text
This client is not linked to any account... Please visit https://www.dropbox.com/cli_link?host_id=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx to link this machine.
```

Visit the URL, login with your Dropbox account and link the account. You
should see the following.

```text
Client successfully linked, Welcome Web!
```

`dropboxd` will now create a `~/Dropbox` folder and start synchronizing. Stop
`dropboxd` with CTRL+C.

## Symlink the Dropbox share

Login to the OMV server as `root` and sym-link the Dropbox share you created
earlier to the Dropbox directory in the root home directory.

```bash
mv ~/Dropbox ~/Dropbox-old
ln -s /media/<UUID>/Dropbox ~/Dropbox
rsync -a -W --progress ~/Dropbox-old/ ~/Dropbox/
```

### init.d - Open Media Vault 2.x

If you are using Open Media Vault 2.x (based on Debian wheezy) the
you'll need to create an init script.

To run Dropbox as daemon with init.d. Create `/etc/init.d/dropbox` with the
following content.

```bash
#!/bin/sh
### BEGIN INIT INFO
# Provides: dropbox
# Required-Start: $local_fs $remote_fs $network $syslog $named
# Required-Stop: $local_fs $remote_fs $network $syslog $named
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# X-Interactive: false
# Short-Description: dropbox service
### END INIT INFO

DROPBOX_USERS="user_a"
DAEMON=.dropbox-dist/dropboxd

start() {
	echo "Starting dropbox..."
	for dbuser in $DROPBOX_USERS; do
		HOMEDIR=`getent passwd $dbuser | cut -d: -f6`
		if [ -x $DAEMON ]; then
			HOME="$HOMEDIR" start-stop-daemon -b -o -c $dbuser -S -u $dbuser -x $HOMEDIR/$DAEMON
		fi
	done
}

stop() {
	echo "Stopping dropbox..."
	for dbuser in $DROPBOX_USERS; do
		HOMEDIR=`getent passwd $dbuser | cut -d: -f6`
		if [ -x $HOMEDIR/$DAEMON ]; then
			start-stop-daemon -o -c $dbuser -K -u $dbuser -x $HOMEDIR/$DAEMON
		fi
	done
}

status() {
	for dbuser in $DROPBOX_USERS; do
		dbpid=`pgrep -u $dbuser dropbox`
		if [ -z $dbpid ] ; then
			echo "dropboxd for USER $dbuser: not running."
		else
			echo "dropboxd for USER $dbuser: running (pid $dbpid)"
		fi
	done
}

case "$1" in
	start)
		start
		;;
	stop)
		stop
		;;
	restart|reload|force-reload)
		stop
		start
		;;
	status)
		status
		;;
	*)
		echo "Usage: /etc/init.d/dropbox {start|stop|reload|force-reload|restart|status}"
		exit 1
esac

exit 0
```

Enable the init.d script.

```bash
sudo chmod +x /etc/init.d/dropbox
sudo update-rc.d dropbox defaults
```

## Starting and Stopping the Dropbox daemon

Use `/etc/init.d/dropbox start` to start and `/etc/init.d/dropbox stop` to stop.

### systemd - OpenMediaVault 3.x

If you are using Open Media Vault 3.x (based on Debian jessie) then
you'll need to create a systemd unit. Create the systemd service file.

```bash
sudo nano /lib/systemd/system/dropbox.service
```

Add this:

```systemd
[Unit]
Description=Dropbox
After=local-fs.target network.target

[Service]
Type=simple
WorkingDirectory=%h/.dropbox-dist
ExecStart=/usr/local/bin/dropboxd
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
User=%I

[Install]
WantedBy=multi-user.target
```

Enable the dropbox service for a given user.

```bash
sudo systemctl enable dropbox@user_a
```

Start the service.

```bash
sudo systemctl start dropbox@user_a
```

## Dropbox client

It is recommended to download the official Dropbox client to configure
Dropbox and get its status.

```bash
wget "http://www.dropbox.com/download?dl=packages/dropbox.py" -O dropbox
sudo chmod 755 dropbox
sudo mv dropbox /usr/local/bin/
```

You can check on Dropbox status by running the following.

```bash
dropbox status
```

For usage instructions run `dropbox help`.

# Photo importing

So, the reason for doing all this is that I now have a Dropbox instance
running on my home file server and everyday it runs a script, that I wrote,
to automatically import new photos into a directory that Plex monitors.
I'll post details about my photo sorting script, [Phort](https://github.com/flexiondotorg/Phort),
at a later date.

#### References

  * <http://www.dropboxwiki.com/Text_Based_Linux_Install>
