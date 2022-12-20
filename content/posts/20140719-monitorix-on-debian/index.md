---
title: Monitorix on Debian
aliases: /posts/2014-07-monitorix-on-debian
date: 2014-07-19 12:00:00
tags: [ Linux,Debian,Monitorix,System Monitoring ]
summary: Setting up Monitorix on Debian Squeeze & Wheezy
sidebar: true
images: hero.webp
hero: hero.webp
---

I have a few Debian servers that run at home and on VPSs. I wanted to add some
basic systems monitoring to them, but didn't want anything too complicated to
look after. I found [Monitorix](http://www.monitorix.org/).

> Monitorix is a free, open source, lightweight system monitoring tool
> designed to monitor as many services and system resources as possible.
> It has been created to be used under production Linux/UNIX servers,
> but due to its simplicity and small size can be used on embedded devices
> as well.

# Install Monitorix

This install has been tested on Debian Squeeze and Wheezy. First install
the dependencies.

```bash
sudo apt-get install rrdtool perl libwww-perl libmailtools-perl \
libmime-lite-perl librrds-perl libdbi-perl libxml-simple-perl \
libhttp-server-simple-perl libconfig-general-perl libio-socket-ssl-perl
```

Now Monitorix itself.

```bash
wget -c "http://apt.izzysoft.de/ubuntu/dists/generic/index.php?file=monitorix_3.5.1-izzy1_all.deb" -O monitorix_3.5.1-izzy1_all.deb
sudo dpkg -i monitorix_3.5.1-izzy1_all.deb
```

At this point Monitorix is installed and running. Point your browser to
`http://example.org:8080/monitorix/` and enjoy!

# Configuring Monitorix

Everything in `/etc/monitorix/monitorix.conf` is comprehensively documented,
just get tweaking.

  * <http://www.monitorix.org/documentation.html>

Each time you update the configuration Monitorix will require a restart.

```bash
sudo service monitorix restart
```

## nginx status

If you run [nginx](http://wiki.nginx.org/Main) then you'll want to drop the
following into `/etc/nginx/conf.d/status.conf` so that Monitorix can monitor
nginx.

```nginx
server {
    listen localhost:80;
    location /nginx_status {
        stub_status on;
        access_log off;
        allow 127.0.0.1;
        deny all;
    }
}
```

#### References

  * <http://www.monitorix.org/doc-debian.html>
