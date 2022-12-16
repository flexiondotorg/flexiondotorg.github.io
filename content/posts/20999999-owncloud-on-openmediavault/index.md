---
title: Setting up ownCloud on Open Media Vault
#slug: 2013-08-bitsync-on-open-media-vault
date: 2013-08-31 21:21:09
tags: [ Linux,Debian,Open Media Vault,OMV,ownCloud ]
#link:
summary: Setting up ownCloud on Open Media Vault
sidebar: true
images: hero.png
hero: hero.png
draft: true
---

I have [Open Media Vault](http://www.openmediavault.org/) running on a
[HP ProLiant MicroServer G7 N54L](http://www8.hp.com/uk/en/products/proliant-servers/product-detail.html?oid=5336624).

OpenMediaVault (OMV) is a network attached storage (NAS) solution based on
[Debian](http://www.debian.org) Linux. At the time of writing OMV 0.4.x is
based on Debian 6.0 (Squeeze).

# ownCloud

I'm going to test ownCloud to see if it can replace some of what I use Dropbox
for. Do the following as `root` or adapt with `sudo`.

## Install MySQL

    apt-get install mysql-server

The install will prompt for a MySQL `root` password.

  * New password for the MySQL "root" user: yourpassword

Secure the MySQL database a little.

    sudo mysql_secure_installation

  * It will prompt you for your MySQL root password. Enter the password you entered upon installation of LAMP stack.
  * It will ask you to change root password, type "n" for no.
  * It will ask you to remove anonymous users, type "y" for yes.
  * It will ask you to disallow remote root logins, type "y" for yes.
  * It will ask you to remove test database and access to it, type "y" for yes.
  * It will ask you to reload privilege tables, type "y" for yes.

## Setting Up a MySQL Database

Log in to MySQL with the following command:

    mysql -u root -p

It will prompt you for root password, enter the one you entered upon installing LAMP stack.

Next, create a new database with the following command:

    CREATE DATABASE owncloud;

Then assign a new user with proper privileges to the new database:

    GRANT ALL ON owncloud.* TO 'owncloud'@'localhost' IDENTIFIED BY 'some_password';

Be sure to replace "some_password" with the actual password you desire for 
your MySQL database. Type "quit" to exit MySQL interface.

## Install Apache and PHP5

    apt-get install apache2 apache2-utils curl libcurl3 php5 php5-curl php5-gd php5-mysql php5-intl php-xml-parser

Now we need to enable mod_rewrite and mod_headers, the Apache2 modules that are needed for
ownCloud to function normally.

To enable mod_rewrite and mod_headers, type the following:

    a2enmod rewrite
    a2enmod headers

Additionally, we have to change Apache2 config file in order for ownCloud rewrite rules to
work properly. Execute the following:

    nano /etc/apache2/sites-available/default

There, find `<Directory /var/www/>` section and change `AllowOverride None` to
`AllowOverride All` and save the changes. Restart Apache2 for changes to take effect.

    service apache2 restart

## Install ownCloud

    wget http://download.opensuse.org/repositories/isv:ownCloud:community/Debian_6.0/Release.key
    apt-key add - < Release.key
    echo 'deb http://download.opensuse.org/repositories/isv:ownCloud:community/Debian_6.0/ /' > /etc/apt/sources.list.d/owncloud.list
    apt-get update
    apt-get install owncloud

Point your browser to http://fqdn-of-your-droplet.tld/owncloud to access 
ownCloud 5 installation.

Be sure to replace "fqdn-of-your-droplet.tld" with the actual FQDN of your 
droplet.

Then, after the installation dialog opens, fill in the details for the admin 
account. Next, enter the MySQL database details as you set them up in the 
previous step and click Finish Setup.

#### References

  * <http://software.opensuse.org/download/package?project=isv:ownCloud:community&package=owncloud>
  * <https://www.digitalocean.com/community/articles/how-to-setup-owncloud-5-on-ubuntu-12-10>
  * <http://linuxg.net/how-to-install-owncloud-5-on-ubuntu-13-04-and-linux-mint-14/>
