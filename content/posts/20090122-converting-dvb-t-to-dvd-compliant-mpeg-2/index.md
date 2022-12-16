---
title: Converting DVB-T to DVD Compliant MPEG-2
aliases: /posts/2009-01-converting-dvb-t-to-dvd-compliant-mpeg-2
date: 2009-01-22 23:46:26
tags: [DVB-T,PVR,Linux,MPEG-2,Project-X,DVD,Freeview,PlayStation 3,PlayTV ]
summary: Export PlayTV recorded video from PlayStation 3
sidebar: true
images: hero.png
hero: hero.png
---

I am just about to clean up and convert another batch of programmes I have
recorded from Freeview (DVB-T in the UK) so that I can add them to my
DLNA Server. I thought I'd share the method I use on Ubuntu.

By clean up, I mean edit out any adverts and trim crap from the start and the
end of the recordings. It just so happens that the result of this process is
a DVD compliant MPEG-2 which is suitable for DVD authoring, or in my case,
streaming around the house. This method of conversion should work for any DVB
PVR which allows you to export recordings via USB and, of course,
[MythTV](http://www.mythtv.org/) or similar.

## DVB Ripping

I have a PlayTV add-on for the PlayStation 3 which enables me to record Freeview
(DVB-T) broadcasts to the PS3 internal hard disk. I mostly use PlayTV to record
films. To prevent the PlayStation 3 hard disk filling up with films I wanted to
export, edit out any adverts and then serve the edited file from my DLNA server
or author it to DVD.

This process does not re-encode the audio or video therefore it is fairly quick
and the output is the same quality as the input.

Although I am using a PlayStation 3 as PVR and MPEG-2 TS (Transport Stream) file
can be converted to a MPEG-2 PS (Program Stream) file using this process.

## Export from PlayStation 3

### PlayTV to Home Menu

First we need to move the recording from the PlayTV Library to the PS3 Home Menu.
Start PlayTV, open the Library, select the recording and choose the Move to Home
Menu option.

### Copy from Home Menu to External USB

  * Quit PlayTV
  * Plug in an external (FAT32 formatted) USB drive to the PS3.
  * Go to Video on the PS3 Home Menu and select the recording you moved there earlier.
  * Select Copy from the Options screen and choose the external USB drive as the target.

## Clean MPEG-2 TS and convert to MPEG-2 PS

Plug the USB drive into your Ubuntu workstation and copy the `.m2ts` file to your
hard disk.

You will need to [Project X](http://project-x.sourceforge.net/) to clean the
MPEG-2 TS and convert it to MPEG-2 PS.

```bash
apt-get install project-x
```

## Edit out the adverts

Start the Project X GUI and load your `.m2ts` file.

  * `File -> Add` and select your .m2ts file.

Now use Project X to add cut points to edit out any adverts.

## De-multiplex the audio and video

When you have completed your edits you need to 'demux' the `.m2ts` file into two
streams, one holding the audio (.mp2) and one holding the video (.m2v).

  * Click the `Prepare >>` button.
  * From the `Process Window` select the `Action` type `to M2P`
  * Click the start button and wait for the processing to finish.
  * Clock the ''Process Windows'' and quit Project X.

## Re-multiplex the audio and video

The reason for the de-mux and then re-musing it to ensure the timecodes are
correct, other the video will not playback correctly.

Install MJPEG tools.

```bash
apt-get install mjpegtools
```

Now we need to re-multiplex the audio and video to create a DVD compliant MPEG-2 PS file.

```bash
mplex -f 8 -o muxed-%d.mpg audio.mp2 video.m2v
```

The `-f 8` option specifies a dvd-compliant stream that is compatible with dvdauthor.
The `-o` option specifies the outfile, you can substitute `muxed-%d.mpg` with a
more descriptive name if you like. `%d` is expanded to a number if `mplex` decides
to split the output to several files, this usually happens when the recording
contains commercials and is nothing to worry about.

## Author DVD

The MPEG-2 PS file that has been created should be suitable for DVD authoring
using DeVeDe. When adding MPEG-2 PS files created using the method above open
the DeVeDe `Advanced options` and select *This file is already a DVD/xCD-suitable
MPEG-PS file* in the `Misc` menu.

#### References

  * <http://project-x.sourceforge.net/>
  * <http://ttcut.tritime.de/index.2.html>
  * <http://gopchop.org/index.php>
  * <http://gopchop.sourceforge.net/>
  * <http://www.rastersoft.com/programas/devede.html>
