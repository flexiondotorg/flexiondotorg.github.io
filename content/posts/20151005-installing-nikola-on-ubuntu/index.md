---
title: Installing Nikola on Ubuntu
aliases: /posts/2015-11-installing-nikola-on-ubuntu
date: 2015-11-05 11:00:00
categories: [ "Linux", "Open Source", "Content Creation"]
tags: [ "Nikola", "Python", "Content Management", "Ubuntu", "Static Site Generator", "virtualenv" ]
summary: How to install Nikola on Ubuntu 14.04 or newer
sidebar: true
images: hero.webp
hero: hero.webp
---

Nikola is a static site and blog generator written in [Python](http://www.python.org)
that I've been using for a good while now. This blog post describes how to install
[Nikola](http://getnikola.com/) on Ubuntu 14.04 or newer. Now, this may look
like a long winded way to install Nikola, given that .deb package exists, but in
my opinion it is the correct way to install Nikola on Ubuntu.

## Installing Python

First you'll need Python.

```bash
sudo apt-get install cython3 libpython3.4 python3.4 python3.4-dev python3.4-minimal
```

Now install the Python "package" management utilities.

```bash
sudo apt-get install python-setuptools python-virtualenv python-pip virtualenvwrapper
```

## The Snakepit

Create a "Snakepit" directory for storing all the virtualenvs.

```bash
mkdir ~/Snakepit
```

## Create a virtualenv for Nikola

The following will create a new virtualenv called `nikola` based on Python 3.4.

```bash
virtualenv -p /usr/bin/python3.4 ~/Snakepit/nikola-773
```

### Working on a virtualenv

To activate the virtualenv do the following.

```bash
source ~/Snakepit/nikola-773/bin/activate
```

Your shell prompt will change while a virtualenv is being worked on to  indicate
which virtualenv is currently active.

While working on a virtualenv you can `pip` install what you need or manually
install any Python libraries safe in the knowledge you will not adversely
damage any other virtualenvs or the global packages in the process. Very useful
for developing a new branch which may have different library requirements than
the master/head.

When you are finished working in a virtualenv you can deactivate it by simply
executing `deactivate`.

## Install Nikola requirements

Nikola requires some additional packages.

```bash
sudo apt-get install liblcms2-dev libfreetype6-dev libjpeg8-dev \
libopenjp2-7-dev libtiff5-dev libwebp-dev libxslt1-dev libxml2-dev \
libyaml-dev libzmq-dev zlib1g-dev
```

Some of the content optimisation filters require additional packages.

```bash
sudo apt-get install closure-compiler jpegoptim optipng yui-compressor
```

Install Tidy 5. (optional)

```bash
sudo apt-get -y remove libtidy-0.99-0 tidy
wget http://binaries.html-tidy.org/binaries/tidy-5.1.14/tidy-5.1.14-64bit.deb -O /tmp/tidy5.deb
sudo dpkg -i /tmp/tidy5.deb
sudo ln -s /usr/bin/tidy /usr/local/bin/tidy5
rm /tmp/tidy5.deb
```

### What are these requirements for?

The following are required to build `pillow`, the Python imaging library.

  * `liblcms2-dev`
  * `libfreetype6-dev`
  * `libjpeg8-dev`
  * `libopenjp2-7-dev`
  * `libtiff5-dev`
  * `libwebp-dev`
  * `zlib1g-dev`

The following are required to build `lxml`, a Python XML library.

  * `libxml2-dev`
  * `libxslt1-dev`

The following are required to build `python-coveralls`.

  * `libyaml-dev`

The following are required to build `pyzmq`.

  * `libzmq-dev`

## Install Nikola

First install Cython, which will ensure some of the packages required by Nikola use
all the available optimisations.

```bash
pip install --upgrade Cython
```

Install all of Nikola.

```bash
pip install --upgrade "Nikola[extras,tests]"
```

## Create a site

After installing Nikola, you should create a site. A site is a collection of
all assets needed to render your website, including configuration, posts,
pages, images, and all other files and customizations.

To create a site, you need to run:

```bash
nikola init <directory_name>
```

A wizard will guide your initial setup The `--demo` option can be used to populate
your site with some example content. If you do not want the wizard, use the `--quiet`
argument.

Nikola is now installed and and initial site is setup. `nikola help` and the
[Nikola Handbook](http://getnikola.com/handbook.html) will assist you from here.
