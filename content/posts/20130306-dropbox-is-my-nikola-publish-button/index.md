---
title: Dropbox is my Nikola publish button
aliases: /posts/2013-03-dropbox-is-my-nikola-publish-button
date: 2013-03-06 19:01:21
categories: [ "Linux", "Open Source", "Tutorial", "Content Creation" ]
tags: [ "Nikola", "Python", "Dropbox", "Content Management", "Static Site Generator" ]
summary: Publishing a Nikola blog via Dropbox on a headless Linux server
sidebar: true
images: hero.webp
hero: hero.webp
---

When I [migrated my site to Nikola](/posts/migrating-wordpress-to-nikola/)
I wanted to ensure I could manage my blog from the shell, the web, Android
smartphone or Android tablet. I took some inspiration from [Joe Hewitt's](http://joehewitt.com)
article [Dropbox is my publish button](http://joehewitt.com/2011/10/03/dropbox-is-my-publish-button)
and created a free Dropbox account which links to a shared folder on my Dropbox
Pro account. I created a simple shell script (invoked via `cron` every minute)
that looks for a trigger file, if the trigger file exists Nikola publishes and
deploys the site.

I am able to edit content from anywhere, on any device, and trigger publishing.
Very happy.

What follows is how I install Dropbox on headless servers running Arch Linux
and Debian/Ubuntu.

## Installing Dropbox daemon - all distros

Download the latest Dropbox stable release for 32-bit or 64-bit.

```bash
wget -O dropbox.tar.gz "http://www.dropbox.com/download/?plat=lnx.x86"
wget -O dropbox.tar.gz "http://www.dropbox.com/download/?plat=lnx.x86_64"
```

Extract the archive and install Dropbox in `/opt`.

```bash
cd
tar -xvzf dropbox.tar.gz
sudo mv ~/.dropbox-dist /opt/dropbox
sudo find /opt/dropbox/ -type f -exec chmod 644 {} \;
sudo chmod 755 /opt/dropbox/dropboxd
sudo chmod 755 /opt/dropbox/dropbox
sudo ln -s /opt/dropbox/dropboxd /usr/local/bin/dropboxd
```

Run `dropboxd`.

```bash
/usr/local/bin/dropboxd
```

You should see output like this:

```text
This client is not linked to any account... Please visit https://www.dropbox.com/cli_link?host_id=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx to link this machine.
```

Visit the URL, login with your Dropbox account and link the account. You should see the following.

```text
Client successfully linked, Welcome Web!
```

`dropboxd` will now create a `~/Dropbox` folder and start synchronizing. Stop `dropboxd` with CTRL+C.

### Arch Linux - systemd

Run Dropbox as daemon with systemd. Create `/usr/lib/systemd/system/dropbox@.service`
with the following content.

```systemd
[Unit]
Description=Dropbox
After=local-fs.target network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/dropboxd
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=always
User=%I

[Install]
WantedBy=multi-user.target
```

Enable the daemon for your user, run the following replace`<user>` with your
username. This will ensure Dropbox is started when the system boots.

```bash
sudo systemctl enable dropbox@<user>
sudo systemctl start dropbox@<user>
```

### Debian/Ubuntu - init.d

Run Dropbox as daemon with init.d. Create `/etc/init.d/dropbox` with the
following content, replacing `<user>` with your username.

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

DROPBOX_USERS="<user>"
DAEMON=/opt/dropbox/dropbox

start() {
    echo "Starting dropbox..."
    for dbuser in $DROPBOX_USERS; do
        HOMEDIR=`getent passwd $dbuser | cut -d: -f6`
        if [ -x $HOMEDIR/$DAEMON ]; then
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

## Install Dropbox client - all distros

It is recommended to download the official Dropbox client to configure Dropbox
and get its status.

```bash
wget "http://www.dropbox.com/download?dl=packages/dropbox.py" -O dropbox-cli
chmod 755 dropbox-cli
sed -i s'/#!\/usr\/bin\/python/#!\/usr\/bin\/env python2/' dropbox-cli
sudo mv dropbox-cli /usr/local/bin/
```

For usage instructions run `dropbox-cli help`.

## Disable LAN Sync

Stop Dropbox from sending LAN Sync broadcasts every 30 seconds over port 17500.

```bash
dropbox-cli lansync n
```

I'm planning to make more use of Dropbox for content management and content
delivery, blog posts to follow.

#### References
  * <http://www.dropboxwiki.com/Text_Based_Linux_Install>
  * <https://aur.archlinux.org/packages/dropbox/>
  * <https://wiki.archlinux.org/index.php/Dropbox>
