---
title: nullmailer on Arch Linux
aliases: /posts/2013-03-nullmailer-on-arch-linux
date: 2013-03-09 23:27:43
tags: [ Arch Linux,nullmailer,MTA,MSA,SMTP,SMTPS,Gmail ]
summary: Configuring nullmailer on Arch Linux to relay email via Gmail
sidebar: true
images: hero.webp
hero: hero.webp
---

I've been a fan of [nullmailer](http://untroubled.org/nullmailer/) for some years
now, so much so that I took ownership of the [nullmailer package for Arch Linux](https://aur.archlinux.org/packages/nullmailer/).

> nullmailer is a sendmail/qmail/etc replacement MTA for hosts which
> relay to a fixed set of smart relays.  It is designed to be simple to
> configure, secure, and easily extendable.

The other advantage `nullmailer` has compared to similar tools is that is queues
email until it is able to deliver it upstream.

Install `nullmailer` as follows.

```bash
packer -S --noedit --noconfirm nullmailer
```

Configuring `nullmailer` to relay via Gmail can be achieved using
[SMTPS](http://en.wikipedia.org/wiki/SMTPS) or
[MSA](http://en.wikipedia.org/wiki/Mail_submission_agent). `nullmailer` has
had these capabilities since 1.10. The following provides some useful clues
`/usr/lib/nullmailer/smtp --help`.

While these examples are specific to relaying via Gmail, you can see it is
trivial to adapt them to any other mail host.

## Relay via Gmail using MSA

Add to following to `/etc/nullmailer/remotes`. I prefer this technique.

```bash
smtp.gmail.com smtp --port=587 --auth-login --user=you@gmail.com --pass=Yourpassword --starttls
```

## Relay via Gmail using SMTPS

Add to following to `/etc/nullmailer/remotes`.

```bash
smtp.gmail.com smtp --port=465 --auth-login --user=you@gmail.com --pass=Yourpassword --ssl
```

Once you've got `/etc/nullmailer/remotes` configured start the nullmailer service.

```bash
sudo systemctl start nullmailer
```

To test `nullmailer` can relay email correctly do the following.

```bash
echo "Test 1" | mailx -s "Test One" me@example.org
```

You can see what `nullmailer` is up to by checking the systemd journal or syslog
(if you've syslog enabled systemd). This is how to get the logs from the systemd
journal.

```bash
journalctl _SYSTEMD_UNIT=nullmailer.service
```

Or via syslog.

```bash
sudo grep nullmailer /var/log/daemon.log
```

When you're happy `nullmailer` is working enable the systemd unit.

```bash
sudo systemctl enable nullmailer
```

Email will now flow as required.
