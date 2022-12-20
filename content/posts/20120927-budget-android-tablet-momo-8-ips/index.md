---
title: Quality Android tablet on a budget - Ployer Momo8 IPS
aliases: /posts/2012-09-quality-android-tablet-on-a-budget-ployer-momo8-ips
date: 2012-09-27 20:14:43
tags: [ Android,Tablet,Ployer Momo8 IPS,RK3066 ]
summary: My experiences with a budget Android tablet
sidebar: true
images: hero.webp
hero: hero.webp
---

I've recently taken delivery of my first Android tablet, the Ployer Momo8 IPS.

I purchased mine from [GTR Electronics](http://www.gtrelectronics.co.uk/) as
they have a track record for excellent customer service, provide 12 month warranty
and their devices are free from Chinese apps and bloatware. I wrote up a review on
Amazon.co.uk, see below.

  * [A quality Android tablet with a budget price](http://www.amazon.co.uk/review/R1SWPZCIRMQ65L/ref=cm_cr_pr_perm?ie=UTF8&ASIN=B0096DKGJW&linkCode=&nodeID=&tag=)

As I mention in the review above, I've rooted the Momo8 IPS. The following were
useful references for the rooting.

  * <http://forum.xda-developers.com/showthread.php?t=1893504>
  * <http://flashmyandroid.com/forum/showthread.php?1183-How-to-root-the-Cube-U30GT&p=11116>
  * <http://www.pandawillforum.com/showthread.php?13111-How-to-Root-UG802-Rockchip-RK3066-mini-PC>

-------------------------------------------------------------------------------
***UPDATE! Since writing this blog post I've made a pre-rooted custom firmware
for the Ployer Momo 8 IPS. Installing it may be easier than following the
instructions below.**

  * [Ployer Momo8 IPS Custom Firmware](/posts/2013-03-ployer-momo8-ips-custom-firmware/)

-------------------------------------------------------------------------------

Here are the basic steps to getting root on the Momo8 IPS.

  * Enable USB Debugging on the Momo8 IPS - `Settings –> Developer Options`
  * Find a Windows computer.
  * Download and install [Momorobo 2.0.2.290](http://download.moborobo.com/download/Client/MoboroboSetup_V2.0.2.290(Moborobo_En_official).exe).
  * Start Moborobo and connect the Momo8 IPS to the Windows computer.
  Wait for Moborobo to establish a connection to the tablet.
  * Download and install [ZhuoDaShi 2.2.9](http://static.opda.com/zhuodashi/ZhuoDaShi-2.2.9-setup.exe).
  * Start ZhuoDaShi. It is a Chinese language application only, so this is somewhat tricky.
    * Wait for ZhuoDaShi connect to your Momo8 IPS.
    * Click the highlighted text that includes the word ROOT among some Chinese text then click on the big ROOT button.
    * After a short while you should see some Chinese text in green. Click the large button.
  * You should now have root and the SuperSU app will be listed in your apps.
  * Install [Root Checker](https://play.google.com/store/apps/details?id=com.joeykrim.rootcheck)
  on the Momo8 IPS to ensure you have root.
  * Once satisfied you have root (I ran Titanium Backup to be absolutely sure)
  you can uninstall the Momorobo daemon and ZhuoDaShi app the from your Momo8 IPS.
  * The version of SuperSU installed by ZhuoDaShi is quite old and can't be
  updated via the Google Play Store. To remedy this do the following.
    * Under `SuperSU -> Settings` select `Switch superuser app`
    * Now open Google Play Store and install [SuperSU](https://play.google.com/store/apps/details?id=eu.chainfire.supersu).

Hope this is helpful to someone else, but proceed with caution.
