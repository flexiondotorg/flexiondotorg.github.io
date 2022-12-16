---
title: Python and virtualenv on Arch Linux and Ubuntu
aliases: /posts/2012-12-python-and-virtualenv-on-archlinux-and-ubuntu
date: 2012-12-11 20:38:50
tags: [ Python,Arch Linux,Ubuntu,virtualenv ]
summary: Installing Python and virtualenv on Arch Linux and Ubuntu
sidebar: true
images: hero.png
hero: hero.png
---

We use [Python](http://www.python.org) for pretty much all our software
development at [work](http://www.flightdataservices.com/). We also use
[virtualenv](http://www.virtualenv.org) and
[virtualenvwrapper](http://www.doughellmann.com/projects/virtualenvwrapper/)
extensively, both for development *and* deployment.

## Why is virtualenv so great?

It just is. Read the [virtualenv documentation](http://www.virtualenv.org/en/latest/).
If you're a Python developer you need `virtualenv` in your life. You also need
`virtualenvwrapper` too.

> virtualenvwrapper is a set of extensions to Ian Bicking’s virtualenv tool
> for creating isolated Python development environments.

## Installing Python and virtualenvwrapper

Outlined below is how I install Python and `virtualenvwrapper`. We have not
yet made the jump to Python 3 at work, hence the references to Python 2.6 and
2.7. Some of us develop on Arch Linux, but all deployments are on Ubuntu.

### Arch Linux

As Arch Linux is a rolling release we can simply install everything via
`pacman`.

```bash
sudo pacman -Syy
sudo pacman -S --needed --noconfirm python-pip python-setuptools python-virtualenv
sudo pacman -S --needed --noconfirm python2-pip python2-setuptools python2-virtualenv python-virtualenvwrapper"
```

Simple.

### Ubuntu

The following was done on Ubuntu Lucid 10.04 LTS.

Add some essential PPAs.

```bash
sudo apt-add-repository ppa:bzr/ppa
sudo apt-add-repository ppa:git-core/ppa
sudo apt-add-repository ppa:fkrull/deadsnakes
```

Update the system and install Python 2.6 and 2.7.

```bash
sudo apt-get update
sudo apt-get install libpython2.6 python2.6 python2.6-dev python2.6-minimal
sudo apt-get install libpython2.7 python2.7 python2.7-dev python2.7-minimal
```

Remove any `apt` installed Python packages that we are about to repalce. The
versions of these packages in the Ubuntu repos and PPAs are too old.

```bash
sudo apt-get purge python-setuptools python-virtualenv python-pip python-profiler
```

Install `distribute`.

```bash
curl -O http://python-distribute.org/distribute_setup.py
sudo python2.6 distribute_setup.py
sudo python2.7 distribute_setup.py
```

Install `pip`.

```bash
curl -O https://raw.github.com/pypa/pip/master/contrib/get-pip.py
sudo python2.6 get-pip.py
sudo python2.7 get-pip.py
```

Use `pip` to install `virtualenv` and `virtualenv` wrapper.

```bash
sudo pip-2.6 install virtualenv --upgrade
sudo pip-2.7 install virtualenv --upgrade
sudo pip install virtualenvwrapper
```

Fairly simple.

### The Snakepit

This step is common to Arch Linux and Ubuntu. Create a *"Snakepit"* directory for
storing all the virtualenvs.

```bash
mkdir ~/Snakepit
```

Add the following your `~/.bashrc` to enable `virtualenvwrapper`.

``` shell
export WORKON_HOME=${HOME}/Snakepit
if [ -f /usr/local/bin/virtualenvwrapper.sh ]; then
    source /usr/local/bin/virtualenvwrapper.sh
elif [ -f /usr/bin/virtualenvwrapper.sh ]; then
    source /usr/bin/virtualenvwrapper.sh
fi
```

## Creating a virtualenv

Open a new shell to ensure that the `virtualenvwrapper` configuration is
active.

The following will create a new virtualenv called `Nikola5` based on Python
2.7 and will not give access to the global `site-packages` directory.

```bash
mkvirtualenv -p python2.7 --no-site-packages ~/Snakepit/Nikola5
```

`mkvirtualenv_help` shows a full list of arguments, the `-r` switch can install
all the packages listed in a `pip` requirements file into the newly created
virtualenv. Very useful.

## Working on a virtualenv

To workon, or activate, an existing virtualenv do the following.

```bash
workon Nikola5
```

You can switch to another virtualenv at any time, just use `workon envname`.
Your shell prompt will change while a virtualenv is being worked on to indicate
which virtualenv is currently active.

While working on a virtualenv you can `pip` install what you need or manually
install any Python libraries safe in the knowledge you will not adversely
damage any other virtualenvs or the global packages in the process. Very useful
for developing a new branch which may have different library requirements than
the master/head.

When you are finished working in a virtualenv you can deactivate it by simply
executing:

```bash
deactivate
```

That just about sums up my notes.
