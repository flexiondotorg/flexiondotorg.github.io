---
title: ZNC IRC proxy
aliases: /posts/2014-08-znc-irc-proxy
date: 2014-08-02 10:10:10
tags: [ Linux,Debian,IRC,IRC Bouncer ]
summary: How I install the ZNC IRC bouncer on Debian Wheezy
sidebar: true
images: hero.png
hero: hero.png
---

I have been using the [BIP](/posts/bip-irc-proxy/) IRC proxy that maintains a
persistent connection to a list of IRC channels. However, I've heard good things
about [ZNC](http://znc.in) and decided to give it a try.

The purpose of an IRC proxy, or bouncer, is that you can then point your IRC
clients to them to maintain a transparent connection from multiple clients
and playback the conversations that took place while you were away.

## Installing ZNC

The ZNC package for Debian Wheezy are very old, so I decide to install
from source.

### Install required packages

We first need to make sure we have all the packages required to build ZNC.

```bash
sudo apt-get install build-essential libssl-dev libperl-dev pkg-config
```

### Compile ZNC

Now download and compile ZNC.

```bash
cd
wget http://znc.in/releases/znc-1.4.tar.gz
tar zxvf znc-1.4.tar.gz
cd znc-1.4
./configure --with-openssl
make
sudo make install
```

### Create a user

Create a separate ZNC user so that ZNC does not need to run as root:

```bash
sudo groupadd znc
sudo adduser --system --home /var/lib/znc --group znc
```

### Configuring ZNC

You can use the interactive wizard to configure ZNC which really
help create the initial configuration.

```bash
sudo -u znc /usr/local/bin/znc --datadir=/var/lib/znc --makeconf
```

Here is a transcript of how I answered the initial configuration questions.

```text
[ .. ] Checking for list of available modules...
[ >> ] ok
[ ** ] Building new config
[ ** ]
[ ** ] First let's start with some global settings...
[ ** ]
[ ?? ] What port would you like ZNC to listen on? (1025 to 65535): 7778
[ ?? ] Would you like ZNC to listen using SSL? (yes/no) [no]: yes
[ ?? ] Would you like ZNC to listen using both IPv4 and IPv6? (yes/no) [yes]:
[ .. ] Verifying the listener...
[ >> ] ok
[ ** ] Unable to locate pem file: [/var/lib/znc/znc.pem], creating it
[ .. ] Writing Pem file [/var/lib/znc/znc.pem]...
[ >> ] ok
[ ** ]
[ ** ] -- Global Modules --
[ ** ]
[ ** ] +-----------+----------------------------------------------------------+
[ ** ] | Name      | Description                                              |
[ ** ] +-----------+----------------------------------------------------------+
[ ** ] | partyline | Internal channels and queries for users connected to znc |
[ ** ] | webadmin  | Web based administration module                          |
[ ** ] +-----------+----------------------------------------------------------+
[ ** ] And 10 other (uncommon) modules. You can enable those later.
[ ** ]
[ ?? ] Load global module <partyline>? (yes/no) [no]: yes
[ ?? ] Load global module <webadmin>? (yes/no) [no]: yes
[ ** ]
[ ** ] Now we need to set up a user...
[ ** ]
[ ?? ] Username (AlphaNumeric): yournick
[ ?? ] Enter Password:
[ ?? ] Confirm Password:
[ ?? ] Would you like this user to be an admin? (yes/no) [yes]:
[ ?? ] Nick [yournick]:
[ ?? ] Alt Nick [yournick_]:
[ ?? ] Ident [yournick]:
[ ?? ] Real Name [Got ZNC?]: Your Name
[ ?? ] Bind Host (optional):
[ ?? ] Number of lines to buffer per channel [50]: 1024
[ ?? ] Would you like to clear channel buffers after replay? (yes/no) [yes]:
[ ?? ] Default channel modes [+stn]:
[ ** ]
[ ** ] -- User Modules --
[ ** ]
[ ** ] +--------------+------------------------------------------------------------------------------------------+
[ ** ] | Name         | Description                                                                              |
[ ** ] +--------------+------------------------------------------------------------------------------------------+
[ ** ] | chansaver    | Keep config up-to-date when user joins/parts                                             |
[ ** ] | controlpanel | Dynamic configuration through IRC. Allows editing only yourself if you're not ZNC admin. |
[ ** ] | perform      | Keeps a list of commands to be executed when ZNC connects to IRC.                        |
[ ** ] | webadmin     | Web based administration module                                                          |
[ ** ] +--------------+------------------------------------------------------------------------------------------+
[ ** ] And 21 other (uncommon) modules. You can enable those later.
[ ** ]
[ ?? ] Load module <chansaver>? (yes/no) [no]: yes
[ ?? ] Load module <controlpanel>? (yes/no) [no]: tes
[ ?? ] Load module <controlpanel>? (yes/no) [no]: yes
[ ?? ] Load module <perform>? (yes/no) [no]: yes
[ ?? ] Load module <webadmin>? (yes/no) [no]: yes
[ ** ]
[ ?? ] Would you like to set up a network? (yes/no) [no]:
[ ** ]
[ ?? ] Would you like to set up another user? (yes/no) [no]:
[ .. ] Writing config [/var/lib/znc/configs/znc.conf]...
[ >> ] ok
[ ** ]
[ ** ]To connect to this ZNC you need to connect to it as your IRC server
[ ** ]using the port that you supplied.  You have to supply your login info
[ ** ]as the IRC server password like this: user/network:pass.
[ ** ]
[ ** ]Try something like this in your IRC client...
[ ** ]/server <znc_server_ip> +7778 flexiondotorg:<pass>
[ ** ]And this in your browser...
[ ** ]https://<znc_server_ip>:7778/
[ ** ]
[ ?? ] Launch ZNC now? (yes/no) [yes]: no
```

### Running ZNV as a daemon

Here is a `/etc/init.d/znc` for Debian based on this installation method:

```bash
#! /bin/sh
### BEGIN INIT INFO
# Provides:          znc
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: ZNC IRC bouncer
# Description:       ZNC is an IRC bouncer
### END INIT INFO

PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin
DESC="ZNC daemon"
NAME=znc
DAEMON=/usr/local/bin/$NAME
DATADIR=/var/lib/znc
DAEMON_ARGS="--datadir=$DATADIR"
PIDDIR=$DATADIR/run
PIDFILE=$PIDDIR/$NAME.pid
SCRIPTNAME=/etc/init.d/$NAME
USER=znc
GROUP=znc

# Exit if the package is not installed
[ -x "$DAEMON" ] || exit 0

# Read configuration variable file if it is present
[ -r /etc/default/$NAME ] && . /etc/default/$NAME

# Load the VERBOSE setting and other rcS variables
. /lib/init/vars.sh

# Define LSB log_* functions.
# Depend on lsb-base (>= 3.2-14) to ensure that this file is present
# and status_of_proc is working.
. /lib/lsb/init-functions

#
# Function that starts the daemon/service
#
do_start()
{
    # Return
    #   0 if daemon has been started
    #   1 if daemon was already running
    #   2 if daemon could not be started
    if [ ! -d $PIDDIR ]
    then
        mkdir $PIDDIR
    fi
    chown $USER:$GROUP $PIDDIR
    start-stop-daemon --start --quiet --pidfile $PIDFILE --exec $DAEMON --test --chuid $USER > /dev/null || return 1
    start-stop-daemon --start --quiet --pidfile $PIDFILE --exec $DAEMON --chuid $USER -- $DAEMON_ARGS > /dev/null || return 2
}

#
# Function that stops the daemon/service
#
do_stop()
{
    # Return
    #   0 if daemon has been stopped
    #   1 if daemon was already stopped
    #   2 if daemon could not be stopped
    #   other if a failure occurred
    start-stop-daemon --stop --quiet --retry=TERM/30/KILL/5 --pidfile $PIDFILE --name $NAME --chuid $USER
    RETVAL="$?"
    [ "$RETVAL" = 2 ] && return 2
    # Wait for children to finish too if this is a daemon that forks
    # and if the daemon is only ever run from this initscript.
    # If the above conditions are not satisfied then add some other code
    # that waits for the process to drop all resources that could be
    # needed by services started subsequently.  A last resort is to
    # sleep for some time.
    start-stop-daemon --stop --quiet --oknodo --retry=0/30/KILL/5 --exec $DAEMON --chuid $USER
    [ "$?" = 2 ] && return 2
    # Many daemons don't delete their pidfiles when they exit.
    rm -f $PIDFILE
    return "$RETVAL"
}

#
# Function that sends a SIGHUP to the daemon/service
#
do_reload() {
    start-stop-daemon --stop --signal 1 --quiet --pidfile $PIDFILE --name $NAME --chuid $USER
    return 0
}

case "$1" in
  start)
    [ "$VERBOSE" != no ] && log_daemon_msg "Starting $DESC" "$NAME"
    do_start
    case "$?" in
        0|1) [ "$VERBOSE" != no ] && log_end_msg 0 ;;
        2) [ "$VERBOSE" != no ] && log_end_msg 1 ;;
    esac
    ;;
  stop)
    [ "$VERBOSE" != no ] && log_daemon_msg "Stopping $DESC" "$NAME"
    do_stop
    case "$?" in
        0|1) [ "$VERBOSE" != no ] && log_end_msg 0 ;;
        2) [ "$VERBOSE" != no ] && log_end_msg 1 ;;
    esac
    ;;
  status)
    status_of_proc -p $PIDFILE "$DAEMON" "$NAME" && exit 0 || exit $?
    ;;
  reload)
    log_daemon_msg "Reloading $DESC" "$NAME"
    do_reload
    log_end_msg $?
    ;;
  restart)
    log_daemon_msg "Restarting $DESC" "$NAME"
    do_stop
    case "$?" in
      0|1)
        do_start
        case "$?" in
            0) log_end_msg 0 ;;
            1) log_end_msg 1 ;; # Old process is still running
            *) log_end_msg 1 ;; # Failed to start
        esac
        ;;
      *)
        # Failed to stop
        log_end_msg 1
        ;;
    esac
    ;;
  *)
    echo "Usage: $SCRIPTNAME {status|start|stop|reload|restart}" >&2
    exit 3
    ;;
esac
```

After you've created the script, you must give it the proper permissions to run
and add the script to the startup/shutdown sequence.

```bash
sudo chmod 755 /etc/init.d/znc
sudo update-rc.d znc defaults
```

Start the service:

```bash
sudo service znc start
```

Stop the service:

```bash
sudo service znc stop
```

### Web configuration

I love that ZNC comes bundled with a web based configuration tool. Just
login to https://znc.example.org:7778 to add users, add networks to
users and to add channels to networks. Really simple stuff.

### IRC client configuration

I use [HexChat](http://hexchat.github.io/), but other IRC clients are available.
Just add a new Network to HexChat for your ZNC server, use the username,
suffixed with the network name you configured in ZNC, and your ZNC password.

## Conclusion

I much prefer ZNC to BIP.

  * I really like the web and IRC configuration but I still have the option to
  configure the config files directly.
  * ZNC is far less cryptic with regard to setting up IRC client connections and
  user management is much better implemented.
  * When I add a new channel to an existing network in ZNC it automatically appears
  in my connected clients without the need to restart anything.
  * ZNC's IRC backlogs don't have the confusing double time stamps present in BIP
  and ZNC is much faster re-establishing connections to my multiple IRC network and
  channels.
  * Most importantly, ZNC has been far more stable than BIP.

**References**

  * <http://wiki.znc.in/Installation>
  * <http://wiki.znc.in/Running_ZNC_as_a_system_daemon>
  * <https://www.digitalocean.com/community/tutorials/how-to-install-znc-an-irc-bouncer-on-an-ubuntu-vps>
  * <https://raymii.org/s/tutorials/Install_the_Lastest_ZNC_from_Source_in_Ubuntu.html>
  * <https://shellfish.io/tutorial/1/how-to-install-znc-on-debian-7/>
