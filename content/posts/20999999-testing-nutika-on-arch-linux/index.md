---
title: Transform Python into C++ with Nuitka
date: 2013-03-12 17:13:43
tags: [ Nuitka,Python,Arch Linux,virtualenv ]
summary: Using Nuitka on Arch Linux to transform Python apps into C++
sidebar: true
images: hero.png
hero: hero.png
draft: true
---

At [Flight Data Services](http://www.flightdataservices.com) and we have a
policy to release what we develop as Open Source, where possible. However,
aviation is a largely proprietary industry so we often find ourselves in the
position where we simply can not release code because we have to protect the
property of our technology partners. It is for this reason I have an interest
in compiling Python programs into executables.

Over the years we've used the usual tools to compile, or freeze, Python
programs. Such as [py2exe](http://www.py2exe.org/),
[bbfreeze](https://pypi.python.org/pypi/bbfreeze/),
[Cython](http://www.cython.org/) (in some cases) and
[PyInstaller](http://www.pyinstaller.org/).

Recently, I've been following the work of Kay Haden and his
[Nuitka](http://nuitka.net) project. From the Nuitka wesbite:

> Right now Nuitka is a good replacement for the Python interpreter and
> compiles every construct that CPython 2.6, 2.7 and 3.2 offer. It
> translates the Python into a C++ program that then uses "libpython" to
> execute in the same way as CPython does, in a very compatible way. It
> is somewhat faster than CPython already, but currently it doesn't make
> all the optimizations possible, but a 258% factor on pystone is a good
> start (number is from version 0.3.11).

In short, Nuitka turns Python into C++ and then compiles the C++. Sounds like a
good way to better protect proprietary technologies.

First you'll need Python and [virtualenvwrapper](http://www.doughellmann.com/projects/virtualenvwrapper/)
so read my [Python and virtualenv on Arch Linux and Ubuntu](/posts/python-and-virtualenv-on-arch-linux-and-ubuntu/)
blog post and get yourself equipped.

Create a `virtualenv` for Nuitka.

```bash
mkvirtualenv -p python2.7 --use-distribute Nuitka
```

You will notice your shell prompt has changed to indicate that the `(Nuitka)`
virtualenv is now active. Install Nuitka and [Scons](http://www.scons.org/)
into the `virtualenv`.

```bash
cd ${VIRTUAL_ENV}
pip install nuitka
easy_install scons
```

Nuitka and Scons are now installed.

Download the source for the Python program you want to compile and install its
requirements.

`nuitka --help` and the [Nuitka Documentation](http://nuitka.net/pages/documentation.html)
will assist you from here on.
