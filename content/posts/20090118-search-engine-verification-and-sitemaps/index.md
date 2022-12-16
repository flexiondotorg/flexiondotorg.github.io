---
title: Search engine verification and sitemaps
aliases: /posts/2009-01-search-engine-verification-and-sitemaps
date: 2009-01-18 23:19:12
tags: [Content Management,SEO,Sitemap,Wordpress ]
summary: Verify websites with search engines and submit sitemaps for indexing
sidebar: true
images: hero.png
hero: hero.png
---

I finally got around to verifying my websites with the Google, Yahoo! and MSN
Live search engines. I've also setup sitemaps for my websites too. I've done
this for the websites at work but couldn't be arsed to do it for my own sites
until today.

To find out why you want sitemap enable your sites read the
[Sitemap](http://en.wikipedia.org/wiki/Site_map) page at Wikipedia. In order to
register your sitemaps with the major search engines you'll need to setup
accounts for [Google Webmaster Tools](https://www.google.com/webmasters/tools/),
[MSN Live Webmaster Tools](http://webmaster.live.com/webmaster/) and
[Yahoo! Site Explorer](https://siteexplorer.search.yahoo.com/).

You'll then need to _verify_ your site(s) with each of the search engines, they
provide details about how to do this but it typically requires that you put a
meta tag in your page header. Once you've verified your site(s) it's time to
create a `sitemap.xml`.

If you have a Wordpress blog adding sitemap support is easy, just use the
[Google XML Sitemaps](http://wordpress.org/extend/plugins/google-sitemap-generator/)
plugin. This re-builds `sitemap.xml` when you update posts, pages, comments etc.
It also notifies all the relevant search engines that content has changed on
your site. Very useful indeed. If you need to create your sitemap by hand, or
better yet script its creation, then read [sitemaps.org](http://www.sitemaps.org/)
for the protocol spec.
