---
title: Give XFS a chance. Don't believe the FUD.
aliases: /posts/2010-02-give-xfs-a-chance-dont-believe-the-fud
date: 2010-02-12 13:14:44
lastmod: 2012-10-01
tags: [Linux,XFS,Ext3,Ext4,JFS ]
summary: In which I dispel some myths about XFS and fanboi a little
sidebar: true
images: hero.webp
hero: hero.webp
---

**This post was updated in October 2012**

After tinkering with Ext4 I did some research and tested other file systems on
my new disk arrays. I've concluded that [XFS](http://oss.sgi.com/projects/xfs/),
once tuned, is the best file system for my needs and it could well be the best
file system for your needs too.

The remainder of this page explains how I arrived at that decision and how I tune
XFS to get optimal, yet safe, performance that can rival Ext4 and JFS.

## Benchmarks

Here are some benchmarks.

  * <http://izanbardprince.wordpress.com/2009/03/28/comparing-boot-performance-of-ext3-ext4-and-xfs-on-ubuntu-jaunty/>
  * <http://linuxgazette.net/122/piszcz.html>
  * [Reiser4 Benchmarked On Linux 3.5 Against EXT4, Btrfs, XFS, ReiserFS](http://www.phoronix.com/scan.php?page=article&item=reiser4_linux35&num=1)

## Why I chose XFS

I have not chosen XFS for performance alone, indeed some benchmarks show that
XFS it outperformed for some file operations.

My workstation at home has two 6TB disk arrays and a 1TB root file system.
The disk arrays contain photo, music and video libraries which are streamed
via UPnP/DLNA and DAAP. The video files can be 2GB to 30GB in size. I also
do a good deal of HD video encoding, processing and editing. My root partition
contains many virtual machine images of which several are running at any given
time.

My work laptop has a 250GB root file system and also contains many virtual
machine images of which one is usually running.

XFS is designed with large file systems and large file handling in mind.
It seems a sensible choice for those reasons alone, but I also liked the
following features:

  * XFS has on-line defragmentation tools, while (at the original time of writing in early 2010) Ext3/4 and JFS do not.
  * XFS dramatically reduces start-up time by avoiding `fsck` delay. Ext3/4 can be very slow to `fsck` large volumes.
  * XFS has very fast (a few seconds or less) file system creation. JFS is faster than XFS but Ext4 takes many, many minutes.
  * XFS formatted disk capacity is greater than Ext3/4 even after removing the reserved blocks from the Ext3/4 file system. JFS formatted capacity is similar to XFS.

On that last point, XFS gains 400GB over Ext4 on a 6TB array but when the
Ext4 reserved blocks are removed XFS gains 100GB over Ext4.

## Tuning XFS

Most of the performance tuning information I found (at the original time
of writing in early 2010) is out of date and doesn't reflect the XFS
defaults in modern Linux kernels.

_That said, the information on this page is quite old and I no longer
feel the need to tweak XFS like I once did._

### Creating XFS

#### XFS 3.1.0 and Kernel 2.6.32 or newer

Ubuntu Lucid 10.04 comes with XFS 3.1.0. The defaults used when creating a XFS file
system using Ubuntu 10.04 are optimal and do not require any tweaking.

#### XFS 3.0.2 and Kernel 2.6.31 or older

Ubuntu Karmic 9.10 comes with XFS 3.0.2. If you are running an earlier Ubuntu
release and want to use a tuned XFS root file system you can't simply use the
graphical partitioning tool from the Ubuntu LiveCD installer. However, it is
very easy manually create the tuned XFS file systems. Simply boot the Ubuntu
Live CD, then start a new shell `Application -> Accessories -> Terminal`.

Now run the following as `root`.

```bash
mkfs.xfs -l lazy-count=1 -L VolumeName <dev>
```

`lasy-count=1` is a default since XFS 3.1.0 but was recommended by the XFS
developers before that. `lazy-count` is a `mkfs` option because it changes the
on-disk format slightly, and older kernels do not understand this new format.
Hence `mkfs` sets a superblock feature bit to prevent the file system from being
mounted on kernels that don't understand the slightly different disk format.
So you must specify `lazy-count=0` if you want to disable this feature for older
kernels which don't support it.

  * <http://oss.sgi.com/archives/xfs/2007-12/msg00536.html>

### Forcing a tuned XFS creation

If you are not sure what XFS version you are running, and therefore what the
defaults might be on your system, you can fully tune XFS using the following.

#### For < 1TB XFS file system

```bash
mkfs.xfs -l lazy-count=1,version=2,size=128m -i attr=2 -d agcount=4 -L VolumeName <dev>
```

#### For > 1TB XFS filesystem

```bash
mkfs.xfs -l lazy-count=1,version=2,size=128m -i attr=2 -d agcount=16 -L VolumeName <dev>
```

Once you have created all your tuned XFS file systems start the Ubuntu installer from the
Live CD. When the disk partitioning section comes round choose: `Specify Partitions Manually`

Now `Change` each XFS file system telling the partitioner where to mount each XFS file system.
But ensure that you **do not** tick `Format the Partition:`, thereby preserving your tuned XFS
file systems.

When you see this message, just click Continue.

> The file system on /dev/sda1 assigned to /boot has not been marked for
> formatting.  Directories containing system files (/etc, /lib, /usr,
> /var, ...) that already exist under any defined mountpoint will be deleted
> during the install.
>
> Please ensure that you have backed up any critical data before installing.

### Mounting XFS

Further performance optimisations can be gained but specifying some additional mount
options for your XFS file systems.

To manually mount a XFS file system with, optimal mount options, use the following:

```bash
mount -t xfs -o noatime,osyncisosync,logbsize=256k,logbufs=8 <dev> <mtpt>
```

The `/etc/fstab` entries I use look something like this.

```text
UUID=xxxxxxxxxxx...x <mtpt> xfs noatime,osyncisosync,logbsize=256k,logbufs=8 0 2
```

The `logsbsize' and `logbufs` options address the often sited limitation of XFS when
handling lots of small files and large number of file deletions. The above assumes
you don't require `atime`. Not using `atime` provides a significant performance benefit.

#### atime, relatime and noatime

Every time a file is accessed (read or write) the default for most file systems
is to append the metadata associated with that file with an updated access time.
Thus, even read operations incur an overhead associated with a write to the file
system. This can lead to a significant degradation in performance in some usage
scenarios. Appending `noatime` to the fstab line for _any_ file system stops
this action from happening.

One may also specify a `relatime` option which updates the atime if the previous
atime is older than the mtime or ctime. In terms of performance, this will not be
as fast as the `noatime` mount option, but is useful if using applications that
need to know when files were last read (like `mutt`).

As access time is of little importance in most scenarios, this alteration has
been widely touted as a fast and easy way to get a performance boost. Even
Linus Torvalds seems to be a proponent of this optimization

  * <http://kerneltrap.org/node/14148>

Access time is _not_ the same as the last-modified time. Disabling access
time will still enable you to see when files were last modified by a write
operation.

#### async and nobarrier

If you really want to go for all out performance you can also provide `async` and
`nobarrier` mount options. But you really need to understand and accept the potential
issues with using these options.

Read the following to understand what write barriers are and if you are prepared
to disable them to gain performance.

  * <http://lwn.net/Articles/283161/>

## XFS userspace tools

XFS is available as a kernel module in Ubuntu and also available from the Live
CDs. Once Ubuntu is installed you can install the XFS userspace tools as follows.

```bash
sudo apt-get install xfsdump xfsprogs
```

### De-fragmenting XFS

There are two utilities that XFS has to manage this fragmentation.

  * `xfs_db` XFS Debug Information. Used to examine an XFS file system for problems or gather information about the XFS file system.
  * `xfs_fsr` File System Organiser. Improves the organisation of mounted file systems. The reorganisation algorithm operates on one file at a time, compacting or otherwise improving the layout of the file extents (contiguous blocks of file data).

#### Defragment a file system

To find the health of a XFS file system use the `xfs_db` command to
gather some information. In the example below `/dev/sda1` is mounted as
`/boot` and `/dev/sda3` is mounted as `/root`.

```bash
sudo xfs_db -c frag -r /dev/sda1
actual 162, ideal 162, fragmentation factor 0.00%

sudo xfs_db -c frag -r /dev/sda3
actual 2288833, ideal 254504, fragmentation factor 88.88%
```

The closer the fragmentation factor is to 0% the better. Unsurprisingly
`/boot` is not fragmented. However `/root` is very fragmented.

Defragmenting XFS file systems can be done on a live running system,
but it is a good idea to schedule this for a time where the partition
will be used less.

The file system reorganizer for XFS is `xfs_fsr`. Typically, I instruct
`xfs_fsr` to reorganise `/dev/sda3` with a timeout (-t) of 6hrs (60 * 60 * 6 = 21600)
which is specified in seconds. But for the purposes of this example I used a timeout of 15 mins.

```bash
sudo xfs_fsr -t 300 /dev/sda3 -v
```

The output will look something like this.

```text
/ start inode=0
ino=145565
extents before:2 after:1 DONE ino=145565
ino=145662
extents before:2 after:1 DONE ino=145662
ino=600148
extents before:2 after:1 DONE ino=600148
ino=1127295
extents before:82794 after:1 DONE ino=1127295
ino=1127243
extents before:2 after:1 DONE ino=1127243
ino=1382852
extents before:50869 after:1 DONE ino=1382852
ino=1422636
```

When the defrag is finished check how well the file system reorganising was.

```
sudo xfs_db -c frag -r /dev/sda3
actual 2155648, ideal 254512, fragmentation factor 88.19%
```

As you can see defragmenting for 15 mins doesn't improve things greatly, which
is why `xfs_fsr` needs to be run for several hours or more.

Manually defragmenting the file system is simple enough, but a better solution
would be to schedule a cron job to run periodically.

#### Defragment a file

It is also possible to de-fragment a single file. To determine if a file is
in need of defragmenting run the following...

```bash
xfs_bmap -v /srv/A320/PGQAR.DAT | wc -l
```

This will output a number which showing the number of extents the file is using.

```text
95280
```

This number should be close to 1. So in the example above, I have a very fragmented file.

```bash
sudo xfs_fsr -v /srv/A320/PGQAR.DAT
```

This will output something like the following.

```bash
/srv/A320/PGQAR.DAT
extents before:95278 after:1 DONE /srv/A320/PGQAR.DAT
```

The file is now defragmented. I use the method above to target defragmentation where I
know files reside that are most likely to be fragmented, rather than defragmenting the
whole file system.

## References

### XFS References

  * <http://www.xfs.org/index.php/Main_Page>
  * <http://en.wikipedia.org/wiki/XFS>
  * <http://oss.sgi.com/projects/xfs/papers/hellwig.pdf>
  * <http://www.ibm.com/developerworks/linux/library/l-fs9.html>
  * <http://www.ibm.com/developerworks/linux/library/l-fs10.html>
  * <http://www.mythtv.org/wiki/XFS_Filesystem>
  * <http://www.thushanfernando.com/index.php/2009/01/25/maintaining-your-xfs-with-xfs-fsr/>
  * <http://www.linux.com/archive/feature/141404>

### Performance Tuning XFS References

  * <http://everything2.com/index.pl?node_id=1479435>
  * <http://www.opensubscriber.com/message/xfs@oss.sgi.com/8198329.html>
  * <http://ondrejcertik.blogspot.com/2008/02/xfs-is-20x-slower-than-ext3-with.html>
  * <http://archives.free.net.ph/message/20090825.155236.abd842ef.en.html>
  * <http://www.mythtv.org/wiki/Optimizing_Performance#XFS-Specific_Tips>
