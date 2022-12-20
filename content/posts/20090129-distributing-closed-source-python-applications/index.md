---
title: Distributing closed source Python applications
aliases: /posts/2009-01-distributing-closed-source-python-applications
date: 2009-01-29 13:04:03
tags: [Python,Freeze,Linux,Windows ]
summary: Freezing proprietary Python applications for distribution to clients
sidebar: true
images: hero.webp
hero: hero.webp
---

Last November we switched to [Python](http://www.python.org/) as the principal
language for all new software development projects at work, ditching Microsoft
Visual C++ and PHP in the process. Last Friday we released our first Python
application to our customers for both Windows and Linux users.

Although we make good use of Open Source software development tools and
methodologies the application we have just written is propritary and the
source can not be released publicly. We needed to compile, or _freeze_, the
Python script in order to create a standalone executable. Tools that do this
have been around for sometime, however our application makes use of Win32
Extensions for Python and WMI on Windows, DBUS/HAL on Linux, wxPython
on both, and a number of other modules. This is quite a big ask for the Python
script compilers and initially the only tool which could build this lot
successfully was [py2exe](http://www.py2exe.org/). Sadly that only solves part
of the problem since it is a Windows only tool.

Then we found [bbfreeze](http://pypi.python.org/pypi/bbfreeze/), which
supports both Windows and Linux with Mac OS X support being actively
developed. `bbfreeze` has a simple build API and we were soon using it to build
stand alone executables for both Windows and Linux. Everything is peachy, all
we needed was as means to install our application.

We only need a tarball for Linux since we manage all kiosk installations, but
our customer can install the Windows version. Enter [InnoSetup](http://www.jrsoftware.org/isinfo.php).
InnoSetup is a free installer for Windows programs and installer can even be
created from the command line, perfect for integration with our Jenkins build
servers.
