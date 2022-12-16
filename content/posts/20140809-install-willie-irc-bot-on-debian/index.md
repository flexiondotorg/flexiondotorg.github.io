---
title: Installing Willie IRC Bot on Debian
aliases: /posts/2014-08-installing-willie-irc-bot-on-debian
date: 2014-08-09 11:11:11
tags: [ Python,IRC Bot,Debian ]
summary: How I Installed Willie IRC Bot on Debian Wheezy
sidebar: true
images: hero.png
hero: hero.png
---

[Willie](http://willie.dftba.net/) is an IRC bot written in [Python](http://www.python.org)
that I've recently started using. This blog post describes how to install Willie
on Debian and as usual I will be using `virtualenv` to isolate this Python
application from the rest of the system.

## Installing Python

First you'll need Python.

```bash
sudo apt-get install libpython2.7 python2.7 python2.7-dev python2.7-minimal
```

The following will also be required to enable all the features Willie supports.

```bash
sudo apt-get install enchant python2.7-dev libxslt1-dev libxml2-dev
```

Remove any `apt` installed Python packages that we are about to replace.
The versions of these packages in the Debian repositories soon get stale.

```bash
sudo apt-get purge python-setuptools python-virtualenv python-pip python-profiler
```

Install `pip`.

```bash
wget https://bootstrap.pypa.io/get-pip.py
sudo python2.7 get-pip.py
```

Use `pip` to install `virtualenv`.

```bash
sudo pip install virtualenv --upgrade
```

## The Snakepit ##

Create a "Snakepit" directory for storing all the Python virtual
environments.

```bash
mkdir ~/Snakepit
```

## Create a virtualenv for Willie ##

The following will create a new virtualenv called `willie` using Python
2.7 as the interpreter.

```bash
virtualenv -p /usr/bin/python2.7 ~/Snakepit/willie
```

### Working on a virtualenv ###

Activate the virtualenv for Willie.

```bash
source ~/Snakepit/willie/bin/activate
```

Your shell prompt will change, something like `(willie)user@host:~$`,
while a virtualenv is being worked on to indicate which virtualenv is
currently active.

While working on a virtualenv you can `pip` install what you need or
manually install any Python libraries safe in the knowledge you will
not upset any other virtualenvs or the global packages in the process.
Very useful for developing a new branch which may have different
library requirements than the current stable release.

When you are finished working in a virtualenv you can deactivate it by
simply executing `deactivate`.

## Install Willie ##

I've decided to use Python 2.7 to run Willie and therefore have to
install `backports.ssl_match_hostname` which is not required if you use
Python 3.3.

```bash
pip install willie backports.ssl_match_hostname
```

### Additional functionality

Willie has no external dependencies, besides Python. However, some of
the modules do have external dependencies. So install the following
Python modules so that I can make use of everything Willie can do.

```bash
pip install feedparser pytz lxml praw pyenchant pygeoip ipython --upgrade
```

## Configure Willie

I am not going to explain to how to configure Willie because all that
good stuff is very well documented by the project.

  * <https://github.com/embolalia/willie/wiki>

But for reference, my `default.cfg` looks something like this:

```ini
[core]
nick = nicofyourbot
user = nicofyourbot
name = Give You Bot A Name
host = chat.freenode.net
use_ssl = true
verify_ssl = true
port = 6697
owner = nicofthebotowner
channels = #example
nickserv_password = ************
prefix = \.
timeout = 120

[db]
userdb_type = sqlite
userdb_file = /home/username/.willie/willie.db
```

## Willie as a daemon

From this point on I assume you've completed the first run
configuration of Willie and have `.willie/default.cfg` in your home
directory.

Add the following to `/etc/init.d/willie`.

```bash
#!/bin/sh
### BEGIN INIT INFO
# Provides: willie
# Required-Start: $local_fs $remote_fs
# Required-Stop: $local_fs $remote_fs
# Should-Start: $network
# Should-Stop: $network
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# Short-Description: Willie IRC Bot.
# Description: Start and stops the Willie IRC bot for a given user.
### END INIT INFO

# NOTE! Replace with the user you want to run Willie.
willie_USER="yourusername"

HOMEDIR=$(getent passwd $willie_USER | awk -F: '{print $6}')
DAEMON="$HOMEDIR/Snakepit/willie/bin/willie"
CONFIG="$HOMEDIR/.willie/default.cfg"

startd() {
    if [ -f ${CONFIG} ]; then
        echo "Starting Willie for $willie_USER"
        start-stop-daemon -c $willie_USER -u $willie_USER -x $DAEMON -S -- --config ${CONFIG} --fork --quiet
    else
        echo "Couldn't start Willie for $willie_USER (no $CONFIG found)"
    fi
}

stopd() {
    echo "Stopping Willie for $willie_USER"
    willie_PID=$(pgrep -fu $willie_USER $DAEMON)
    if [ -z "$willie_PID" ]; then
        echo "Willie for USER $willie_USER: not running."
    else
        kill -15 $willie_PID
    fi
}

status() {
    willie_PID=$(pgrep -fu $willie_USER $DAEMON)
    if [ -z "$willie_PID" ]; then
        echo "Willie for USER $willie_USER: not running."
    else
        echo "Willie for USER $willie_USER: running (pid $willie_PID)"
    fi
}

case "$1" in
    start) startd ;;
    stop) stopd ;;
    restart|reload|force-reload) stopd && startd ;;
    status) status ;;
    *) echo "Usage: /etc/init.d/willie {start|stop|reload|force-reload|restart|status}"
       exit 1
       ;;
esac

exit 0
```

Set the permissions.

```bash
sudo chmod +x /etc/init.d/willie
```

Check that you can start/stop Willie.

```bash
sudo /etc/init.d/willie start
sudo /etc/init.d/willie status
sudo /etc/init.d/willie stop
```

Add `willie` to the startup/shutdown sequence.

```bash
sudo update-rc.d willie defaults
```

And that's it. Willie is now running as a daemon inside a virtualenv.
