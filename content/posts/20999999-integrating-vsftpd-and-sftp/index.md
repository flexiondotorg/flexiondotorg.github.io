---
title: Integrating vsftpd and sftp
#slug: 2013-09-integrating-vsftpd-and-sftp
date: 2013-09-13 21:21:09
tags: [ Linux,Ubuntu,ssh,sftp,ftp,vsftpd ]
#link:
summary: Setting up vsftpd and sftp to share directory
sidebar: true
images: hero.png
hero: hero.png
draft: true
---

# Install vsftpd

    sudo apt-add-repository ppa:flexiondotorg/server-stuff
    sudo apt-get update
    sudo apt-get install vsftpd

# Install OpenSSH

    sudo apt-get install ssh
    echo "/usr/lib/sftp-server" | sudo tee -a /etc/shells

sudo chown root /home/bob
sudo chmod go-w /home/bob
sudo mkdir /home/bob/writeable
sudo chown bob:sftponly /home/bob/writeable
sudo chmod ug+rwX /home/bob/writeable

# Create a user

    PASSWORD=`openssl passwd -crypt passw0rd`
    sudo useradd --home /var/local/user1 --create-home --password ${PASSWORD} --shell /sbin/nologin -G ftp,user1 user1

In order to `chroot` both vsftpd and internal-sftp the root of the users home
directory must be owned by root, but a lower level directory, `data/`, will be
made available for file transfers.

    mkdir /var/local/user1/data
    chown root:user1 /var/local/user1
    chown -R user1:user1 /var/local/user1/data

anonymous_enable=NO
local_enable=YES
write_enable=YES
chroot_local_user=YES

####References
  * <http://askubuntu.com/questions/134425/how-can-i-chroot-sftp-only-ssh-users-into-their-homes>
  * <http://www.thegeekstuff.com/2012/03/chroot-sftp-setup/>
  * <http://www.benscobie.com/fixing-500-oops-vsftpd-refusing-to-run-with-writable-root-inside-chroot/>

