---
title: Ployer Momo8 IPS Custom Firmware
aliases: /posts/2013-03-ployer-momo8-ips-custom-firmware
date: 2013-03-22 13:35:34
tags: [ Android,Tablet,Ployer Momo8 IPS,RK3066,Firmware,ClockWorkMod ]
summary: Ployer Momo8 IPS Custom Firmware with ClockWorkMod
sidebar: true
images: hero.png
hero: hero.png
---

I bought a [budget Android tablet a little while back](/posts/2012-09-quality-android-tablet-on-a-budget-ployer-momo8-ips/)
that turned out to be really rather good. However, there were issues with the
initial firmware.

  * Connecting to, or maintaining connection with, some wireless networks was unreliable.
  * When the internal NAND was under moderate load the tablet would become unresponsive.

Ployer released a firmware update in November 2012 and again in April 2013 which
addressed these issues. Here's the translated change log.

> 1. Increase the volume buttons on the vertical screen.
> 2. System, audio and video decoding, browser, Flash player, 3G module, boot
>    animation module BUG repair.
> 3. Update NandFlash, Mali, Wifi module drivers, while addressing some CTS
>    tests BUG and the stability of the system as a whole has been further
>    enhanced.
> 4. Optimize Flash stability, improve the efficiency of the implementation of
>    the DDR.
> 5. Default input method Sogou input method.
> 6. Update Google Pinyin input method.

However, the official Ployer firmware comes pre-loaded with a selection of
Chinese applications and defaults to a Chinese language.

# Objectives

I decided to have a go a making my own custom firmware for the Ployer Momo8 IPS
with the following goals.

  * Pre-rooted.
  * Removal of pre-installed Chinese apps.
  * Removal of bloatware.
  * Extend `/data` partition.
  * Make it a <i>"Google Experience"</i> device.
  * ClockWorkMod Recovery (available to donors)

I think I've been fairly successful. My firmware includes Android 4.1.2
features and even some Android 4.2 features. Until someone successfully ports
[cyanogenmod](http://www.cyanogenmod.org/) to the Ployer Momo8 IPS or Ployer
release a 4.2.x update then my firmware is the most complete <i>"Google Experience"</i>
you'll find for the device.

# Changes

Below are the changes I made to the official Ployer Momo8 IPS firmware.

## 13.164

This release is mainly a fix for Google+. The builds are running now and will
be available for download later today.

  * Integrated SuperSU 1.32
      * <http://forum.xda-developers.com/showthread.php?t=1538053>
  * Tweaked WiFi 2.4Ghz Transmit Power. `maxp2ga0` is now 76 in:
      * This appears to be the default for other devices with the same chipset, feedback welcomed.
  * Reverted `PlusOne.apk` to the version in 13.137
      * This should fix the force closes.

## 13.149

The purpose of this release is to refresh some system apps, address some
compatibility issues and to offer versions of my custom firmware based on both
20130325 and 20121120.

  * Based on the Official Ployer MOMO8(IPS)-4.1.1-Firmware-20130325 and the Official Ployer MOMO8(IPS)-4.1.1-Firmware-20121120.
      * Feedback suggests that WiFi works better for some when using firmware based on the 20121120 version.
      * <u>Only donors will have access to the 20121120 versions.</u>
  * Integrated SuperSU 1.30
      * <http://forum.xda-developers.com/showthread.php?t=1538053>
  * Removed the `framework.jar` patch as it introduces incompatibilities of its own.
  * Removed the PicoTTS voice data files from the `/system` partition.
      * PicoTTS voices can be selectively installed via `Settings -> Language and Input`.
      * This is a space saving measure and essential for the 20121120 version.
  * Updated the following, as of May 25th 2013:
      * `Magazines.apk` (Google Play Magazines)
      * `Music2.apk` (Google Play Music)
      * `PlusOne.apk` (Google+)
      * `Talk.apk` (Hangouts)

## 13.137

This release is focused on stability, adding the new Google Play features
announced at [Google I/O 2013](https://developers.google.com/events/io/) and
also includes everything from the previous releases.

  * Integrated Android 4.2 sounds, fonts and boot animation
      * Boot animation is now the correct size, higher quality and doesn't flicker at the end of a boot.
      * All Android 4.2 sounds and fonts are now included.
          * Fixed default notification sound.
          * Lock screen font looks much nicer.
      * <http://forum.xda-developers.com/showthread.php?t=1991734>
  * Integrated Android 4.2.2 keyboard
      * <http://forum.xda-developers.com/showthread.php?p=38124560>
  * Integrated Nova Launcher 2.1
      * <http://novalauncher.com>
  * Integrated Feedly 15.0.1
      * <http://www.feedly.com>
  * Integrated Power Toggles 4.6.6
      * <http://www.powertoggles.com>
  * Tweaked WiFi 2.4Ghz Transmit Power. `maxp2ga0` is now 100 in:
      * `/etc/firmware/nvram_RK901.txt` was previously 74.
      * `/etc/firmware/nvram_RK903.cal` was previously 76.
      * `/etc/firmware/nvram_RK903.txt` was previosuly 72.
      * `/etc/firmware/nvram_RK903_26M.cal` was previously 60.
  * Tweaked WiFi 5.0Ghz Transmit Power. `maxp5ga0`, `maxp5gla0` and `maxp5gha0` are now 100 in:
      * `/etc/firmware/nvram_RK903.cal` were all previously 80.
      * `/etc/firmware/nvram_RK903_26M.cal` were all previously 80.
  * Added camera icon to the application drawer.
  * Fixed boot up time
      * Boot up time is significantly faster, with the exception of the first boot after a firmware flash.
  * Fixed apps disappearing from the Settings and the Play Store.
  * Replaced Google Talk with Hangouts
  * Removed Google Drive and Google Earth
      * When pre-installed they would Force Close.
  * Updated the following, as of May 16th 2013:
      * `Books.apk` (Google Play Books)
      * `GestureSearch.apk`
      * `Currents.apk`
      * `GoogleEars.apk` (Sound Search)
      * `GmsCore.apk` (Google Play Services)
      * `Magazines.apk` (Google Play Magazines)
      * `Maps.apk`
      * `Music2.apk` (Google Play Music)
      * `Phonesky.apk` (Play Store)
      * `Talk.apk` (Hangouts)
      * `TalkBack.apk` (Accessibility)
      * `Videos.apk` (Google Play Movies)

## 13.129

This version includes everything from the previous release plus the changes below.

  * Based on the Official Ployer MOMO8(IPS)-4.1.1-Firmware-20130325
      * <http://download.ployer.cn/downdetail.asp?id=763>
  * Boot loader upgraded to 1.22
      * Switching to Upgrade mode in Rockchip Batch Tool is much quicker.
  * Extended `/system` partition from 375M to 428M
  * Removed more Chinese applications and bloatware
      * Removed UCBrowser shared objects from `/system/lib`
      * Removed QQMiniHD shared objects from `/system/lib`
      * Removed more Adobe Reader shared objects from `/system/lib` and fonts from `/system/fonts/adobefonts`
  * Integrated Clockworkmod Recovery to 6.0.31 (donors only)
      * <http://androtab.info/clockworkmod/rockchip/changelog/>
  * Integrated Adobe Flash 11.1.115.54
      * <http://helpx.adobe.com/flash-player/kb/archived-flash-player-versions.html>
  * Integrated File Wrangler 1.5
      * <https://play.google.com/store/apps/details?id=com.amon.filewrangler>
  * Integrated AdAway 2.3 (Google now blocks all advert blockers from the Play Store)
      * <http://code.google.com/p/ad-away/>
  * Replaced Launcher2 4.1.5 with Nova Launcher 2.0.2
      * <http://novalauncher.com>
  * Replaced the default wallpaper with the default wallpaper from the Nexus 10.
  * Removed User Management - it was not reliable.
  * Removed `Chrome.apk` but updated `/system/lib/libchromeview.so` from Chrome 26.0.1410.58
      * This is a space saving measure but ensures the ROM is Chrome compatible.
  * Updated the following, as of May 10th 2013:
      * `Authenticator.apk`
      * `CalendarGoogle.apk`
      * `Currents.apk`
      * `Drive.apk`
      * `Earth.apk`
      * `Gmail.apk`
      * `GooglePlayBooks.apk`
      * `GooglePlayMagazines.apk`
      * `GooglePlayMovies.apk`
      * `GooglePlayMusic.apk`
      * `GooglePlayServices.apk`
      * `Keep.apk`
      * `Maps.apk`
      * `Phonesky.apk` (Play Store)
      * `PlusOne.apk` (Google+)
      * `Street.apk`
      * `YouTube.apk`

## 13.080

  * Based on the Official Ployer MOMO8(IPS)-4.1.1-Firmware-20121120
      * <http://download.ployer.cn/downdetail.asp?id=763>
  * Extended `/data` partition to 2GB.
      * <http://www.freaktab.com/showthread.php?287-RockChip-ROM-Building-Tips-and-Tricks-by-Finless&p=4054&viewfull=1#post4054>
  * Removed Chinese applications.
      * `UCBrowser_V2.1.1.219_Android3_pf147_(Build12110718).apk`
      * `dopoolplayer`
      * `iReader_android_v2000_108044_guanwang.apk` including shared objects from `/system/lib`.
      * `market_hd.apk`
      * `qiyiyingshi_V3.0_mumayi_e3d3e.apk`
      * `qq_mini_hd_1.9.1.apk`
      * `sougoushurufa.apk` including shared objects from `/system/lib`.
      * `zhonghuawannianli_ECalendar_V3.2.3_mumayi_3ee39.apk`
  * Cleaned up `build.prop`
      * Changed Chinese strings to ASCII
      * Configured English (UK) as default language/locale.
      * Configured Europe/London as default time zone.
      * Default display brightness set at 50%
      * Deleted settings for Chinese applications that have been removed.
  * Removed Rockchip Utilities.
      * `ApkInstaller.apk`
      * `RkExplorer.apk`
      * `RKUpdateService.apk` including shared objects from `/system/lib`.
      * `RkVideoPlayer.apk`
  * Removed bloatware.
      * Adobe Reader including shared objects from `/system/lib`.
      * DocsToGo.
  * Integrated SuperSU 1.25
      * <http://forum.xda-developers.com/showthread.php?t=1538053>
  * Integrated Clockworkmod Recovery 6.0.28
      * <http://androtab.info/clockworkmod/rockchip/>
      * <http://forum.xda-developers.com/showthread.php?t=2102679>
  * Integrated Google Apps (JZO54K) 4.1.2
      * Adds the first boot Setup Wizard.
      * Adds Picasa photo syncing.
      * Face Unlock 4.1.2
      * Google Talk 4.1.2
      * <http://rootzwiki.com/topic/31532-gapps-412-485486-jzo54k-gapps-package-1012/>
  * Integrated Launcher2 4.2, includes 50% transparency on app drawer.
      * <http://forum.xda-developers.com/showthread.php?t=1995812>
  * Integrated some Jelly Bean 4.2 features:
      * Jelly Bean 4.2 clock.
      * Jelly Bean 4.2 keyboard with gesture.
      * Movie Studio video editor.
      * <http://forum.xda-developers.com/showthread.php?t=2010535>
  * Integrated Cyanogenmod 10.0 APKs
      * `Calculator.apk` : Adds different calculator panels.
      * `Galaxy4.apk` : Smaller APK
      * `HoloSpiralWallpaper.apk` : Smaller APK
      * `LiveWallpapers.apk` : Smaller APK
      * `LiveWallpapersPicker.apk` : Smaller APK
      * `MagicSmokeWallpapers.apk` : Smaller APK
      * `NoiseField.apk` : Smaller APK
      * `PhaseBeam.apk` : Smaller APK
      * `SoundRecorder.apk` : Smaller APK
      * `VisualizationWallpapers.apk` : Smaller APK
  * Integrated Adobe Flash 11.1.115.47
      * <http://helpx.adobe.com/flash-player/kb/archived-flash-player-versions.html>
  * Integrated Quick Boot 4.2
      * <https://play.google.com/store/apps/details?id=com.siriusapplications.quickboot>
  * Integrated File Wrangler 1.4
      * <https://play.google.com/store/apps/details?id=com.amon.filewrangler>
  * Integrated User Management
      * <http://forum.xda-developers.com/showthread.php?t=1824066>
      * <https://play.google.com/store/apps/details?id=com.appaholics.um>
  * Integrated busybox 1.20.2
  * Added additional permissions files for increased compatibility.
      * `android.hardware.camera.autofocus.xml`
      * `android.hardware.camera.front.xml`
      * `android.hardware.ethernet.xml`
      * `android.hardware.sensor.accelerometer.xml`
      * `android.hardware.sensor.light.xml`
      * `android.hardware.touchscreen.multitouch.xml`
  * Replaced ring tones, alerts and notifications with the audio from Nexus 4.
  * Replaced boot animation with the Nexus animation.
  * Replaced the default wallpaper with one from the Jelly Bean SDK.
  * Updated the following, as of March 18th 2012:
      * `CalendarGoogle.apk`
      * `Gmail.apk`
      * `GooglePlayMovies.apk`
      * `GooglePlayMusic.apk`
      * `GooglePlayServices.apk`
      * `PlusOne.apk` (Google+)
      * `Maps.apk`
      * `Phonesky.apk` (Google Play Store)
      * `Street.apk`
      * `YouTube.apk`
  * Removed `Chrome.apk` but updated `/system/lib/libchromeview.so`.
      * This is a space saving measure but ensures the ROM is Chrome compatible.
  * Patched `framework.jar` so that Gameloft titles work.
      * <http://www.slatedroid.com/topic/50354-gameloft-game-fix-for-license-check-or-loop/>
      * <http://dragondevs.com/index.php?/topic/1265-gameloft-game-fix-for-license-check-or-loop/>
      * <http://forum.xda-developers.com/showthread.php?t=955847>
  * All APKs are ZipAligned.

## What didn't change

  * I haven't modified `build.prop` to make the Ployer Momo8 IPS masquerade as
  another brand or model of Android device. I will not be making this change, please
  don't request it.
  * Although my firmware includes many features from Android 4.1.2 and some from
  Android 4.2 I haven't bumped the Android version or Build number. That would be
  dishonest and misleading.

## Known Issues

  * Adobe Flash is enabled the first time the Browser app (not Chrome) is executed.
  * Hangouts app does not work on the first boot following a firmware flash. It
  does works correctly on subsequent boots.
  * Although `busybox` is included in the ROM, no sym-links are created.
  * Some Gameloft titles may not work, Asphalt 7 for example. Do other Gameloft
  titles work properly? This problem is present in the official Ployer firmware too,
  there are framework patches to fix this problem but they seem to introduce other
  incompatibilities.

# Donate

Please consider donating to this project. It is nice to have the effort I've
put into this custom firmware recognized. I don't ask for much, it is at your
discretion, but just think how happy I'll look when I am sipping the beer you bought
me `:-D`

<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
    <input type="hidden" name="cmd" value="_s-xclick">
    <input type="hidden" name="hosted_button_id" value="P6QSGCZG9YNBQ">
    <input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online.">
    <img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">
</form>

# Downloads

You'll need Rockchip Batch Tool which include the RockChip USB drivers and
the firmware flashing utility. I've modified Rockchip Batch Tool to default to
English language and removed old logs and transient data to reduce the size of
the download. You'll also need the firmware itself.

  * <a href="http://ge.tt/9NH0edD1?c" target="_blank">Ployer MOMO8 IPS Firmware</a>

Download Rockchip Batch Tool and the STOCK RECOVERY version of the ROM. Unzip both
archives once they are downloaded.

# How to Flash

<div class="alert alert-block"><strong>Warning</strong> Always (<u>I can't
stress this enough</u>) flash the STOCK RECOVERY version of my custom ROM.
<strong>Never</strong> flash the CWM RECOVERY version without first having
flashed the STOCK RECOVERY version. If you are upgrading from another ROM
(even one of mine) always flash the STOCK RECOVERY version first.</div>

Flashing this ROM will will effectively factory reset your tablet, wipe your
installed apps, app data and preferences. If you have rooted your tablet you
might want to consider making a backup with
[Titanium Backup * root](https://play.google.com/store/apps/details?id=com.keramidas.TitaniumBackup).
If you have not rooted your tablet then you could use [Helium - App Sync and Backup](https://play.google.com/store/apps/details?id=com.koushikdutta.backup).

  * Install the Rockchip USB drivers included with Rockchip Batch Tool.
    * This was simple of Windows XP but I couldn't get Windows 7 to accept the Rockchip drivers. However, installing [MoboRobo](http://www.moborobo.com/) on Windows 7 provided the correct driver.
  * Turn the Ployer Momo8 IPS on.
  * On the tablet go to `Settings` -> `Developer options` and **untick** `USB debugging`.
  * Start `RKBatchTool.exe`.
  * In `RKBatchTool` choose firmware file, click the `Switch` button. The
  device icon should change to green to indicate a successful connection.

<div class="alert alert-info"><strong>Note</strong> The very first time your
`Switch` to upgrade mode, Windows may prompt you to install additional
Rockchip USB drivers.</div>

  * **Only if the device icon changed to Green**, click `Upgrade`.
  * The firmware will be flashed and the tablet will automatically reboot into Recovery.
  * You will see a green Android and then the paritions (`/data`, `/cache` and `/mnt/sdcard`) will be formatted.
    * `/mnt/sdcard` is the internal memory, not the microSDHC card inserted in the card reader.
  * When the formatting is complete the tablet will reboot.

The first boot may take a little longer than usual. You will be presented with
the Welcome wizard where you can configure language and locale, etc. You can
optionally enter your Google Apps or Gmail account credentials and doing so will
prompt for which Wifi network to associate with.

## Rockchip Batch Tool Video

I've also made a video showing how to flash the firmware. Frankly, the
hardest part is getting the Rockchip drivers installed.

<iframe width="640" height="360" src="http://www.youtube.com/embed/Itcy13bYJfU?rel=0" frameborder="0" allowfullscreen></iframe>

# How to Flash the CWM version

<div class="alert alert-block"><strong>Warning</strong> Like I said,
<strong>never</strong> flash the CWM RECOVERY version of my ROM without first
having flashed the STOCK RECOVERY version. The CWM version is made available
to donors.</div>

  * Flash the STOCK RECOVERY version of the ROM as detailed above.
  * Follow the same procedure, but this time flash the CWM RECOVERY version.
  * When the CWM RECOVERY flash is complete the tablet will boot into CWM recovery. Do the following:
      * `wipe cache partition`
      * `advanced` -> `wipe dalvik cache`
      * `++++++Go Back++++++`
      * `reboot system now`
  * The tablet will reboot, it will be a slower boot than usual but subsequent boots will be quicker.

## ClockWorkMod Recovery

Booting to recovery can be achieved using the pre-install Quick Boot app.

The Ployer Momo8 IPS only has one hardware button (power) so CWM is controlled
with gestures.

  * Swipe up/down: up/down
  * Swipe left: select
  * Swipe right: back

The Power button also acts as select, which I find to be the most reliable way
to select an action.

# FAQ

## Does this custom firmware fix WiFi connectivity?

Short answer, possibly.

Of all the WiFi networks I have access to, only one causes the Ployer Momo8
IPS to encounter weak signal and intermittent connections. When using the
Official Ployer firmware on that WiFi network, connecting more than 5 meters
from the access point is unreliable and maintaining a connection is almost
impossible.

Using my firmware I can connect and maintain a connection up to about 10
meters from the access point. My testing, and the feedback from others
suggests the my firmware improves the WiFi signal by 8 to 10dBm.

From my testing the Momo8 IPS appears to have issues with some wireless access
points, possibly related to the chipset in the access point or the Momo8 IPS,
but I've not been able to pin it down. That said, I've got access to 2 Draytek
Vigor routers and the Momo8 IPS does not work well with either of them. Every
other wireless network I've connected to works well.

For example, at home I stream 720p movies via DLNA over WiFi and watch them on
the Momo8 IPS using [MX Player](https://play.google.com/store/apps/details?id=com.mxtech.videoplayer.ad).
It works perfectly and never buffers or lags. However, your mileage may vary.

## Why should I always flash the STOCK RECOVERY version first?

Short answer, it's the safest option.

There are 6 different ROMs (official or otherwise) that I am aware of for the
Ployer Momo8 IPS. They **all** have slightly different partition layouts. If
you flash one of my CWM RECOVERY ROMs over a ROM using a slightly different
partition layout, it will almost certainly soft brick the tablet. The STOCK
RECOVERY will always correctly format the partitions directly after a flash,
thereby mitigating the risk of soft bricking the tablet.

## Ooops, I've soft bricked my tablet. What do I do?

Read the comments here, there are several useful tips. You can also use the
comments here to see if anyone can offer assistance. Alternatively, go the
Ployer Momo8 forum on Slatedroid, read what others have done and ask for
help.

  * <http://www.slatedroid.com/forum/445-momo8/>

## How do the 20130325 and 20121120 versions differ.

The differences Ployer made between 20130325 and 20121120 is not well
documented. I did some additional analysis of what changed between the
November 2012 and April 2013 releases from Ployer, you can find my
notes here:

  * [New Official Firmware: MOMO8 (IPS) -4.1.1 firmware 20130325](http://www.slatedroid.com/topic/68650-new-official-firmware-momo8-ips-411-firmware-20130325/page__view__findpost__p__819153)

In addition to whatever Ployer changed, this is how my 20121120 differs from
20130325.

  * The `/system` partition on the 20121120 version is 375MB, therefore the
  following system apps are not included:
      * `AdAway.apk`
      * `Authenticator.apk`
      * `Books.apk`
      * `Currents.apk`
      * `Feedly.apk`
      * `GestureSearch.apk`
      * `Keep.apk`
      * `Magazines.apk`
      * `Videos.apk`
      * `YouTube.apk`
      * All of the above can be installed from the Play Store, which the exception
      of [AdAway](http://code.google.com/p/ad-away/) which can be side-loaded.
  * Boot loader is version 1.20 rather than the newer 1.22.
  * All other tweaks and modifications are the same.

Some people have reported that WiFi is more reliable when using a firmware
based on 20121120. Due to the size of the custom firmwares and the bandwidth they
consume, <u>custom versions of my firmware based on 20121120 are only available
to donors</u>.

# Feedback

Your feedback is welcome, please use the comments are below.
