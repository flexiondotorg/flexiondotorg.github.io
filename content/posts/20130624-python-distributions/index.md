---
title: Python Distributions
aliases: /posts/2013-06-python-distributions
date: 2013-06-24 13:11:43
categories: [ "Linux", "Open Source", "Development" ]
tags: [ "Python", "Numpy", "Scipy", "h5py", "Flight Data" ]
summary: A selection of Python distributions for data analysis
sidebar: true
images: hero.webp
hero: hero.webp
---

At [work](http://www.flightdataservices.com) I maintain the
[Jenkins](http://http://jenkins-ci.org/) test and build servers. I'm just about
to update our Windows build servers and thought I'd better check the available
"Python Distributions" to see if our current choice (the brilliant
[Python(x,y)](https://code.google.com/p/pythonxy/) is still the most suitable for
our needs.

Our [Flight Data Analyzer](http://github.com/FlightDataServices) makes extensive
use of [Numpy](http://www.numpy.org/), [Scipy](http://www.scipy.org/),
[h5py](http://code.google.com/p/h5py/) and other analysis tools. So, pre-built
Python distributions on Windows save me a lot of ~~pain~~ time. On Linux we roll
our own of course.

What follows is a list of Python Distributions that include Python and the essential
modules we require.

## Anaconda

> Completely free enterprise-ready Python distribution for large-scale data
> processing, predictive analytics, and scientific computing.

  * <https://store.continuum.io/cshop/anaconda/>

Heard about this for the first time a couple of days ago. It looks very promising
with 32-bit and 64-bit flavours and MKL optimised modules are available from the
reasonably priced Anaconda Accelerate. While I roll my own Python Distribution for
our Linux build servers, I am rather taken with the idea of using Anaconda on Linux
and Windows to provide a consistent platform everywhere. I'm looking forward to
testing Anaconda this week.

[Continuum](http://www.continuum.io) appear to be taking on Enthought at their
own game, and good luck to them as they have some really interesting projects
on the go.

  * <http://www.continuum.io/developer-resources>

## Enthought Canopy

> Enthought Canopy is a comprehensive Python analysis environment with easy
> installation & updates of the proven Enthought Python distribution - all part
> of a robust platform you can explore, develop and visualize on.

  * <https://www.enthought.com/products/canopy/>

We used to use Entought EPD and Canopy builds on EPD. However, we decided to
switch from EPD and consolidate analyst workstation and build server deployments
around Python(x,y).

There were several factors to this decision, but the main issue was that updates
to the EPD package repositories were slow for some essential modules we use. Canopy
seems to have inherited package latency from EPD as Numpy is still at 1.6.1 while
we now require Numpy 1.7.

Paid versions of Canopy have MKL optimizations and 64-bit platform support.

  * <https://www.enthought.com/products/canopy/compare-subscriptions/>

## Python(x,y)

> Scientific-oriented Python Distribution based on Qt and Spyder.

  * <https://code.google.com/p/pythonxy/>

This is what we currently use for Windows build servers and analyst workstations.
The only reason I'm conisdering switching is that is it 32-bit only. Other than
that, I love it and highly recommend it. Python(x,y) doesn't offer MKL optimisations.

## WinPython

> WinPython is a portable scientific Python 2/3 32/64bit distribution for Windows

  * <http://code.google.com/p/winpython/>

From the same stable as Python(x,y) but has 32-bit and 64-bit flavours, yummy.
WinPython includes everything I need so will definately get fully tested this week.

## Portable Python

> Portable Python is a Python programming language pre-configured to run directly
> from any USB storage device, enabling you to have, at any time, a portable
> programming environment.

  * <http://portablepython.com/>

Not looked at this in any real detail. Appears to be 32-bit only but does include
a number of essential packages.

## Unofficial Windows Binaries for Python Extension Packages

> Provides 32- and 64-bit Windows binaries of many scientific open-source extension
> packages for the official CPython distribution of the Python programming language.

  * <http://www.lfd.uci.edu/~gohlke/pythonlibs/>

OK, so this is not a Python distribution but it is compelling. 32-bit and 64-bit
platforms are catered for and MKL optimizations are available at no cost. Each
package needs to be installed individually, which can be seen as both good and bad.
Good because you only install what you actually require and bad because the initial
installation is protracted. That said, it is on my evaluation list for this week.

## Anymore?

Those are the Python Distributions I'm aware of. Are there any others I should
consider?
