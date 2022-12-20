---
title: gLabels 2.2.1
aliases: /posts/2008-01-glabels-221
date: 2008-01-30 11:45:57
tags: [Linux,GNOME,Ubuntu,Label Printing ]
summary: Accurate label printing for Linux is restored
sidebar: true
images: hero.webp
hero: hero.webp
---

[gLabels](http://glabels.sourceforge.net/), as packaged in the Ubuntu
repositories, has not worked properly for some time. The accuracy of printing
was way out making gLabels a non-starter unless you went to the hassle
of manually re-aligning every label on a page to account for the inaccuracies.

However, I have been patiently waiting for a new version of gLables to be
released. The new development branch completely replaces `libgnomeprint` with
the new `GtkPrintOperation` and Cairo. The upshot of that is that the printing
accuracy issues are resolved.

[GetDeb](http://www.getdeb.net) have released [.debs for gLabels 2.2.1](http://www.getdeb.net/app/gLabels)
that work with Ubuntu Gutsy 7.10. You can either download the .debs from the
gLabels page at GetDeb and let `gdebi` do its thing or do the following from the
shell...

```bash
wget -c ftp://cesium.di.uminho.pt/pub/getdeb/gl/glabels_2.2.1-1~getdeb1_i386.deb
wget -c ftp://cesium.di.uminho.pt/pub/getdeb/gl/glabels-data_2.2.1-1~getdeb1_all.deb
sudo dpkg -i glabels*.deb
```

We print a lot of labels at work to identify media for flight recorders, that
job just got a whole lot easier. More importantly, I now have a viable address
label printing solution for my wife.
