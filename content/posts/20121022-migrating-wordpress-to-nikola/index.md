---
title: Migrating Wordpress to Nikola
aliases: /posts/2012-10-migrating-wordpress-to-nikola
date: 2012-10-22 17:13:43
tags: [ Nikola,Python,Wordpress,Content Management,Static Site Generator ]
summary: From a dynamic Wordpress site to static Nikola site
sidebar: true
images: hero.webp
hero: hero.webp
---

I recently migrated three sites from a self hosted [Wordpress](http://www.wordpress.org)
installation to [Nikola](http://getnikola.com/). Nikola is a static
site and blog generator written in [Python](http://www.python.org).

Although I use both [reStructuredText](http://docutils.sourceforge.net/rst.html)
and [Markdown](http://daringfireball.net/projects/markdown/), I decided
to migrate my Wordpress content to Markdown.

This is by no means an exhaustive Wordpress to Nikola migration guide but it
should provide enough clues for anyone else wanting to do the same. The
following was done on Ubuntu 10.04 LTS.

Export the Wordpress content. `Tools -> Export -> All Content`

Use `xmllint` to find any errors in the Wordpress XML export and fix them.

## Nikola 5

**UPDATE!** I've added the instructions for install Nikola 5 since fist
publishing this post.

Install Nikola 5 in a `virtualenv` using
[virtualenvwrapper](http://www.doughellmann.com/projects/virtualenvwrapper/).

```bash
cd ~
sudo apt-get install libxslt1-dev libxml2-dev libjpeg62-dev python2.6-dev
wget http://nikola-generator.googlecode.com/files/nikola-5.zip
unzip ~/nikola-5.zip
mkvirtualenv -i markdown -r ~/nikola-5/requirements.txt --use-distribute nikola-5
cd ~/nikola-5
python setup.py install
```

## Nikola 4

Install Nikola 4.0.3, in a `virtualenv` using
[virtualenvwrapper](http://www.doughellmann.com/projects/virtualenvwrapper/).
Nikola 4.0.3 spits deprecation warnings with `doit>=0.16.1` hence the use of
`sed`.

```bash
cd ~
sudo apt-get install libxslt1-dev libxml2-dev libjpeg62-dev python2.6-dev
wget http://nikola-generator.googlecode.com/files/nikola-4.0.3.zip
unzip ~/nikola-4.0.3.zip
sed -i 's/>=0\.16/==0\.16/' ~/nikola-4.0.3/requirements.txt
mkvirtualenv -i markdown -r ~/nikola-4.0.3/requirements.txt --use-distribute nikola
cd nikola-4.0.3
python setup.py install
```

Import the Wordpress content.

```bash
cd
nikola import_wordpress wordpress.linted.xml
```

Use [html2text](https://github.com/aaronsw/html2text) to convert the HTML
markup in `new_site/posts/*.wp` to _real_ Markdown.

Use the [Disqus Wordpress Plug-in](http://wordpress.org/extend/plugins/disqus-comment-system/)
to migrate Wordpress comments to [Disqus](http://www.disqus.com).

If required, generate a list of the Wordpress URLs for Nikola redirections.

```bash
grep "<link>" wordpress.linted.xml | sed -e 's/<link>//g' -e 's/<\/link>//g'
```

I migrated from several sub-domains to one top-level and the Wordpress URLs
I was using can't be persevered with Nikola. I use a combination of Nikola
redirects and nginx configuration to handle the re-directions.

At this point the bulk of the migration is done. I tweaked the Nikola `conf.py`
to use `.md` files instead of `.wp`, added some assets to the Nikola `files`
directory, configured deployments and updated the theme. I also decided to axe
some obsolete blog posts.

Migrating to Disqus has been very frustrating and although my comments have
now been migrated the Migrate Threads has yet reflect the new URLs of my posts.
There is no visibility of what, if anything, is happening when you execute the
Disqus URL Mapper. This is not a Nikola issue.

I am extremely happy with Nikola itself and it has proved itself flexible and
I can now capture my notes in a familiar format and in a familiar environment,
Python. Next steps are to integrate Nikola with Dropbox so I can publish from
any device with ease and add a search facility.
