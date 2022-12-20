---
title: IMDB Film Summary as a MPEG-2 video
aliases: /posts/2009-04-imdb-film-summary-mpeg2-video
date: 2009-04-22 18:00:07
tags: [ IMDB,MPEG,PHP,PlayStation 3 ]
summary: Create film preview information for your UPnP server
sidebar: true
images: hero.webp
hero: hero.webp
---

**UPDATE! I no longer use or maintain the script below. I suggest the vastly
superior [Sheet Maker for Linux](http://www.bunyipawonga.org/sheetmaker/index.php)**.

If you've read my blog before you'll know I run Mediatomb DLNA server with my
PlayStation 3 as the client, You'll also know I am working towards importing my
entire DVD collection into my Mediatomb server. However, my wife wants to know
something about each film in the library without having to dig out the DVD
case from storage. My solution is to include a MPEG-2 video displaying the
film summary in the Mediatomb library for each DVD I have imported so it can
be easily viewed from the PS3.

My script is called IMDB-to-MPEG and I've finally got round to uploading it.

  * [IMDB-to-MPEG](https://github.com/flexiondotorg/IMDB-to-MPEG)

The scripts takes one parameter as input, a film title. The plotline, year of
release, genres, cast list and running time for that film are gathered from IMDB
and formatted as text. Here is an example.

```text
  The Usual Suspects (1995)

  A boat has been destroyed, criminals are dead, and
  the key to this mystery lies with the only
  survivor and his twisted, convoluted story
  beginning with five career crooks in a seemingly
  random police lineup. (106 mins)

  Starring Stephen Baldwin as Michael McManus,
  Gabriel Byrne as Dean Keaton, Benicio Del Toro as
  Fred Fenster, Kevin Pollak as Todd Hockney, and
  Kevin Spacey as Roger 'Verbal' Kint.

  Genres: Crime, Mystery, Thriller.

  Rated 8.7 out of 10 from 227,964 votes.
```

The text is converted into an image and then encoded into a MPEG-2 video using
the lowest possible bitrate/resolution that is acceptable to read when viewing
on a 42" plasma from my sofa.

Directories for each matching genre are created and also one for the IMDB
rating (rounded down). The MPEG-2 is stored in the 'All' folder and then
symlinked to the genres and rating for that film. I then copy my video into
the appropriate directory in 'All'. For example.

```text
    .
    |-- All
    |   `-- The_Usual_Suspects
    |       `-- About_The_Usual_Suspects.mpg
    |-- Genres
    |   |-- Crime
    |   |   `-- The_Usual_Suspects -> ../../All/The_Usual_Suspects
    |   |-- Mystery
    |   |   `-- The_Usual_Suspects -> ../../All/The_Usual_Suspects
    |   `-- Thriller
    |       `-- The_Usual_Suspects -> ../../All/The_Usual_Suspects
    |-- Ratings
    `-- 8
    `-- The_Usual_Suspects -> ../../All/The_Usual_Suspects
```

This code was lashed up in a few hours, it ain't pretty but it works for me on
my Ubuntu systems, maybe it'll work for you too.
