---
title: Spring cleaning Arch Linux
aliases: /posts/2013-05-spring-cleaning-arch-linux
date: 2013-05-07 18:09:21
tags: [ Arch Linux,pacman,packer ]
summary: How to clean up installed packages on Arch Linux.
sidebar: true
images: hero.webp
hero: hero.webp
---

About a year ago I migrated all my workstations, laptops and netbooks to
[Arch Linux](http://www.archlinux.org). Since then, I've setup Arch Linux
on a [Raspberry Pi](http://www.raspberrypi.org) and this server was also
recently migrated to Arch Linux.

I've had no major issues issues during the last year and have upgraded through
five major Linux kernels, transitioned to `systemd` and upgraded from GNOME 3.2
to 3.8.

Although I have been disciplined about [merging `.pacnew` files](https://wiki.archlinux.org/index.php/Pacnew_and_Pacsave_Files)
frequently, during the upgrades and experimentation's I have packages installed
that I no longer require and obsolete files kicking about.

After the upgrade to GNOME 3.8 I decided to clean up a little. I rarely dip
into the AUR, but when I do I always use [`packer`](https://aur.archlinux.org/packages/packer/)
to clearly separate what is official from what is not.

## Finding what is installed

The following commands are useful for identifying installed packages based on
where they were installed from. The package lists generated from the commands below
can be quite big but often highlight packages that I know I'm no longer using nor
require.

### Listing installed packages

List packages installed from the official repositories.

```bash
pacman -Qq | grep -Fv -f <(pacman -Qqm)
```

List packages installed from the AUR.

```bash
pacman -Qqm
```

### Listing installed packages by size

Use `pacsysclean` to list installed packages sorted by size, it helps identify
large packages that are no longer required which can the be manually uninstalled.

### Listing orphaned packages

List orphaned packages install from the official repositories.

```bash
pacman -Qqtd | grep -Fv -f <(pacman -Qqtdm)
```

List ophaned packages from the AUR.

```bash
pacman -Qqmtd
```

### Getting package information

Get package information for a package in the official repositories.

```bash
pacman -Si <package>
```

Get package information for a package in the AUR.

```bash
packer -Si <package>
```

## Removing orphaned packages

Removing orphaned packages manually can be very time consuming, but is by far the
safer option. However, I decided to take a brave pill a uninstall all orphaned
packages automatically.

Remove all orphaned packages installed from the official repositories.

```bash
sudo pacman -Rs `pacman -Qqtd | grep -Fv -f <(pacman -Qqtdm)`
```

Remove all ophanced packages install from the AUR.

```bash
sudo pacman -Rs $(pacman -Qqtdm)
```

## Re-installing what you do need

When you do something scary like removing all the obsolete packages automatically,
then you should really make sure you do have everything install that you require.

### Re-install 64-bit base

```bash
sudo pacman -S --needed `pacman -Sqg base multilib-devel | grep -v gcc-libs | tr '\n' ' '`
```

### Re-install 32-bit base

```bash
sudo pacman -S --needed `pacman -Sqg base base-devel | tr '\n' ' '`
```

Reinstall the groups required for a GNOME 3 desktop.

```bash
sudo pacman -S --needed `pacman -Sqg gnome gnome-extra telepathy | tr '\n' ' '`
```

Install all missing dependencies for packages in the official repositories.

```bash
sudo pacman -S --needed `pacman -Si $@ 2>/dev/null | awk -F ": " -v filter="^Depends" \ '$0 ~ filter {gsub(/[>=<][^ ]*/,"",$2) ; gsub(/ +/,"\n",$2) ; print $2}' | grep -v smtp- | sort -u`
```

Install all missing dependencies for packages in the AUR. This will re-install even if the
package is already installed. I can't be arsed to filter it out for a one liner.

```bash
sudo packer -S --noedit --noconfirm `packer -Si $(pacman -Qqm) 2>/dev/null | awk -F ": " -v filter="^Depends" \ '$0 ~ filter {gsub(/[>=<][^ ]*/,"",$2) ; gsub(/ +/,"\n",$2) ; print $2}' | grep -v java- | sort -u`
```

## Find files not associated with a package

When packages are removed they may leave some files behind. The following will find all files
not associated with a package. These files can _not_ be automatically deleted, each entry
requires assessment.

```bash
pacman -Qlq | sort -u > /tmp/db
sudo find /bin /etc /sbin /usr ! -name lost+found \( -type d -printf '%p/\n' -o -print \) | sort > /tmp/fs
comm -23 /tmp/fs /tmp/db
```

As with all spring cleaning chores, I got bored by this stage as my workstation
was looking pretty tidy. Much of what is presented in this blog post is a rehash
of what others have already contributed to the [Arch Linux Wiki](https://wiki.archlinux.org/).
I've just organised what "_Works For Me_ &trade;" so I know what to do next year.

#### References
  * <https://wiki.archlinux.org/index.php/Pacman_Tips>
