---
title: Install nginx on Debian
aliases: /posts/2013-03-nginx-on-debian-squeeze-and-wheezy
date: 2013-03-14 18:09:21
tags: [ Linux,Debian,nginx ]
summary: Installing nginx on a Debian (Squeeze) 6.0 and (wheezy) 7.0
sidebar: true
images: hero.webp
hero: hero.webp
---

My webserver of choice is [nginx](http://nginx.org/), it's resource friendly,
fast, reliable and versatile.

I have a resource constrained Debian 6.0 "server" and wanted to deploy nginx on
it for testing. Sadly, the nginx package in the Squeeze repositories is very old.
Fortunately, the nginx team maintain a Debian package repository.

Add the nginx repository.

```bash
sudo nano /etc/apt/sources.list.d/nginx.list
```

## Squeeze ##

```text
deb http://nginx.org/packages/debian/ squeeze nginx
deb-src http://nginx.org/packages/debian/ squeeze nginx
```

## Wheezy ##

```text
deb http://nginx.org/packages/debian/ wheezy nginx
deb-src http://nginx.org/packages/debian/ wheezy nginx
```

Download the nginx package signing key.

```bash
wget http://nginx.org/keys/nginx_signing.key
```

Add the nginx package signing key to the keyring.

```bash
sudo apt-key add nginx_signing.key
```

Update the repositories.

```bash
sudo apt-get update
```

Install nginx.

```bash
sudo apt-get install nginx
```

I run `ufw` on my VPS so use the following to allow external access to my
website.

```bash
sudo ufw allow 80/tcp
```

nginx is installed and can be configured in the usual way.

#### References

  * <http://wiki.nginx.org/Install>
  * <http://wiki.nginx.org/Pgp>
