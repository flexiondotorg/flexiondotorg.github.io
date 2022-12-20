---
title: IMDB Film Summary as a MPEG-2 video, Part 2
aliases: /posts/2009-09-imdb-film-video-summary
date: 2009-09-20 08:48:36
tags: [ IMDB,MPEG,PHP ]
summary: Improvements to film summaries embedded in videos
sidebar: true
images: hero.webp
hero: hero.webp
---

**UPDATE! I no longer use or maintain the script below. I suggest the vastly
superior [Sheet Maker for Linux](http://www.bunyipawonga.org/sheetmaker/index.php)**.

Back in April I released a script to create a MPEG video summarising a movie
using data from IMDB, you can find the original post in the URL below to learn
why I created such a script in the first place.

  * [IMDB Film Summary as a MPEG-2 video](2009-04-imdb-film-summary-mpeg2-video.html)

Today I've released v2.0 of that script, which is almost a complete re-write
mostly thanks to Eric at [yPass.net](http://yPass.net/) who contributed
significantly. Thanks to Eric the script is much improved since version 1.0,
here is a run down of what's new.

## v2.0 2009, 19th September.

  * Merged yet more contributions from Eric, <http://www.ypass.net>. Thanks Eric!
  * Added usage instructions.
  * Added categorisation by Certificate.
  * Added dynamic computation of video bitrate.
  * Added silent audio generation.
  * Added a shell script to reprocess an entire film store.
  * Re-added MPEG-2 video encoding.
  * Improved video encoding speed by removing pre-processing with `jpeg2yuv`.
  * Fixed spiffy animations when cover art is not available.
  * Fixed spiffy animations on platforms that may have incomplete GD.
  * Modified filename input so that an input filename is optional rather than mandatory.


## v1.2 2009, 17th July.

  * Merged extensive contributions from Eric, <http://www.ypass.net>. Thanks Eric!
  * Updated the README to reflect Eric's changes.
  * MPEG-4 video encoding replaced MPEG-2 video encoding.
  * Never released to the public.

To download the script and find out how to make full use of it visit the
release page below.

  * [IMDB-to-MPEG](https://github.com/flexiondotorg/IMDB-to-MPEG)

As it stands the IMDB-to-MPEG script does what I require, so I will maintain it
in it's current form. However, Eric has been working on a new direction by
adding support for NetFlix, creating a GUI with php-gtk and some other cool
stuff. While Eric has shared the details with me, I simply don't have the time
to add all that good stuff to IMDB-to-MPEG, so if you like the sound of what
Eric has been up to hop over to his site to find out more.

  * [Netflix Has a Developer API](http://www.ypass.net/blog/2009/07/netflix-has-a-developer-api/)
