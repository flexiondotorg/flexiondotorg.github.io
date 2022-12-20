---
title: MP3Gainer - Apply ReplayGain to your entire music library
aliases: /posts/2009-08-mp3gainer-replaygain-your-music-library
date: 2009-08-14 15:25:45
tags: [Linux,MP3,ReplayGain,Bash,Ubuntu ]
summary: Volume normalise an entire MP3 library the right way
sidebar: true
images: hero.webp
hero: hero.webp
---

Work has been crazy. We're moving house. Hence, not much time for geeky stuff
recently. I've been putting this off for ages, I need to "normalise" the
volume of my MP3 music music library. Not all CDs sound equally loud. Whilst
different musical moods require that some tracks should sound louder than
others, the loudness of a given CD has more to do with the year of issue or
the whim of the producer than the intended emotional effect. This difference
carries over when you rip the CD to MP3 and random play through my music
collection requires constant manual volume adjustment. This has been bugging
me for a while now, but when it started to bug my wife I knew it was time to
find a solution. My main concerns with applying some sort of audio
normalisation were....

  * My MP3s should not be irretrievably changed into something I end up hating.
  * The method used should be free of the application used for music playback,
    given that I play my music on iPod Nano, iPod Shuffle, PSP, PS3, Linux desktops,
    TomTom 720T FM streaming and in car MP3 player.

After some research [mp3gain](http://mp3gain.sourceforge.net) seems to be the
tool for the job which provides an implementation of
[ReplayGain](http://www.replaygain.org/). However, as of today my entire CD
collection is ripped, which is very large, so I needed a way to process my
whole music collection in an automated fashion. I found some examples of how
to script this, but there are caveats with the solutions I found. Therefore I
have created my own script, MP3Gainer, to apply ReplayGain using `mp3gain`
which overcomes these common limitations. MP3Gainer recursively applies
ReplayGain to a MP3 music collection of any size and directory depth.
ReplayGain can be applied in 'track' or 'album' mode and if ReplayGain has
previously been applied it can also be undone. It is important to understand
that MP3Gainer 'album' mode really is per album, which is what you want. Trust
me! This script works on Ubuntu, should work on any other Linux/Unix
flavour and possibly Mac OS X providing you have the required tools installed.

  * [MP3Gainer](https://github.com/flexiondotorg/MP3Gainer)
