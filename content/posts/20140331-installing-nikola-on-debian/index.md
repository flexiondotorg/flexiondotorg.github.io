---
title: Installing Nikola on Debian
aliases: /posts/2014-03-installing-nikola-on-debian
date: 2014-03-31 16:19:43
categories: [ "Linux", "Open Source", "Tutorial" ]
tags: [ "Nikola", "Python", "Content Management", "Debian", "Static Site Generator", "virtualenv"]
summary: How to install Nikola static site generator on Debian
sidebar: true
images: hero.webp
hero: hero.webp
---

Nikola is a static site and blog generator written in [Python](http://www.python.org)
that I've been using for a good while now. This blog post describes how to install
[Nikola](http://getnikola.com/) on Debian. Now, this may look like a long winded way
to install Nikola, given that Debian .deb package exist, but in my opinion it is
the correct way to install Nikola on Debian.

## Installing Python ##

First you'll need Python and [virtualenvwrapper](http://www.doughellmann.com/projects/virtualenvwrapper/)

```bash
sudo apt-get install libpython2.7 python2.7 python2.7-dev python2.7-minimal
```

Remove any `apt` installed Python packages that we are about to replace. The
versions of these packages in the Debian repositories soon get stale.

```bash
sudo apt-get purge python-setuptools python-virtualenv python-pip python-profiler
```

Install `pip`.

```bash
wget https://bootstrap.pypa.io/get-pip.py
sudo python2.7 get-pip.py
```

Use `pip` to install `virtualenv` and `virtualenvwrapper`.

```bash
sudo pip install virtualenv --upgrade
sudo pip install virtualenvwrapper
```

## The Snakepit

Create a "Snakepit" directory for storing all the virtualenvs.

```bash
mkdir ~/Snakepit
```

Add the following your `~/.bashrc` to enable `virtualenvwrapper`.

```bash
export WORKON_HOME=${HOME}/Snakepit
if [ -f /usr/local/bin/virtualenvwrapper.sh ]; then
    source /usr/local/bin/virtualenvwrapper.sh
elif [ -f /usr/bin/virtualenvwrapper.sh ]; then
    source /usr/bin/virtualenvwrapper.sh
fi
```

## Create a virtualenv for Nikola

Open a new shell to ensure that the `virtualenvwrapper` configuration is active.
The following will create a new virtualenv called `nikola` based on Python 2.7.

```bash
mkvirtualenv -p /usr/bin/python2.7 ~/Snakepit/nikola-640
```

### Working on a virtualenv

To activate an existing virtualenv do the following.

```bash
workon nikola-640
```

You can switch to another virtualenv at any time, just use `workon envname`.
Your shell prompt will change while a virtualenv is being worked on to
indicate which virtualenv is currently active.

While working on a virtualenv you can `pip` install what you need or manually
install any Python libraries safe in the knowledge you will not adversely
damage any other virtualenvs or the global packages in the process. Very
useful for developing a new branch which may have different library requirements
than the master/head.

When you are finished working in a virtualenv you can deactivate it by
simply executing `deactivate`.

## Install Nikola requirements ##

Nikola is will be powered by Python 2.7 and some additional packages will
be required.

```bash
sudo apt-get install python2.7-dev libfreetype6-dev libjpeg8-dev libxslt1-dev libxml2-dev libyaml-dev
```
### What are these requirements for? ###

  * `python2.7-dev` provides the header files for Python 2.7 so that Python
  modules with C extensions can be built.

The following are required to build `pillow`, the Python imaging library.

  * `libjpeg8-dev`
  * `libfreetype6-dev`

The following are required to build `lxml`, a Python XML library.

  * `libxml2-dev`
  * `libxslt1-dev`

The following are required to build `python-coveralls`.

  * `libyaml-dev`

## Install Nikola

Download Nikola.

```bash
mkdir -p ${VIRTUAL_ENV}/src
cd ${VIRTUAL_ENV}/src
wget https://github.com/getnikola/nikola/archive/v6.4.0.tar.gz -O nikola-640.tar.gz
tar zxvf nikola-640.tar.gz
cd nikola-6.4.0
```

Install the Nikola requirements.

```bash
pip install -r requirements-full.txt
```

If you intend to use the Nikola planetoid (Planet generator) plugin you'll also
need to following.

```bash
pip install peewee feedparser
```

Actually install nikola.

```bash
python setup.py install
```

Nikola is now installed. `nikola help` and the [Nikola Handbook](http://getnikola.com/handbook.html)
will assist you from here on.
