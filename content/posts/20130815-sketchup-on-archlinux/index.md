---
title: SketchUp Make on Arch Linux
aliases: /posts/2013-08-sketchUp-make-on-arch-linux
date: 2013-08-15 15:42:47
categories: [ "Linux", "Open Source", "Tutorial" ]
tags: [ "wine", "SketchUp", "Arch Linux" ]
summary: Install SketchUp Make 2013 on Arch Linux with Wine 1.7
sidebar: true
images: hero.webp
hero: hero.webp
---

I use [SketchUp](http://www.sketchup.com) at work to manipulate models for use
in [Google Earth](http://earth.google.com). Here is how I got SketchUp Make
2013 installed and working on [Arch Linux](http://www.archlinux.org) under
[Wine](http://www.winehq.com) 1.7.

# Wine for Arch Linux

Install Wine on Arch Linux as follows.

```bash
sudo pacman -S --needed icoutils libwbclient libxslt lib32-mpg123 p11-kit lib32-p11-kit samba wine winetricks wine-mono wine_gecko
sudo packer -S --noedit --noconfirm ttf-ms-fonts
```

For 64-bit also install the following.

```bash
sudo packer -S --noedit --noconfirm lib32-libwbclient lib32-libxslt
```

# Installing SketchUp Make

Once Wine is installed download SketchUp Make 2013.

  * <http://www.sketchup.com/download>

Create a clean wine prefix.

```bash
export WINEPREFIX="${HOME}/.sketchup"
export WINEARCH="win32"
wineboot
```

Install `corefonts` using `winetricks`

```bash
winetricks corefonts
```

Start the SketchUp Make setup.

```bash
wine SketchUpWEN.exe
```

Follow the installation wizard, I just went with the defaults.

That's it. SketchUp is installed and should be associated with the appropriate
file types.

## Video Corruption

My workstation has a Radeon 5000 series graphics card and I use the Open Source
`radeon` driver. I don't know if this problem is specific to my hardware/drivers
but SketchUp will eventually (sometimes immediately) encounter video corruption.
Once that happens I can't see or manipluate the models.

The solution that works for me is:

```bash
env WINEPREFIX="${HOME}/.sketchup" LIBGL_ALWAYS_SOFTWARE=1 vblank_mode=0 wine "C:\Program Files\SketchUp\SketchUp 2013\SketchUp.exe"
```

If this also works for you then `SketchUp.desktop` can be modified to persist
these settings.

```bash
nano ~/.local/share/applications/wine/Programs/SketchUp\ 2013/SketchUp.desktop
```

Replace the contents with what follows but change `USER` with your username.

```ini
[Desktop Entry]
Name=SketchUp
Exec=env WINEPREFIX="/home/USER/.sketchup" LIBGL_ALWAYS_SOFTWARE=1 vblank_mode=0 wine C:\\\\windows\\\\command\\\\start.exe /Unix /home/USER/.sketchup/dosdevices/c:/users/USER/Start\\ Menu/Programs/SketchUp\\ 2013/SketchUp.lnk
Type=Application
StartupNotify=true
Icon=1871_SketchUpIcon.0
```

## Uninstalling SketchUp Make

Should you ever need to, you can uninstall SketchUp Make as follows.

```bash
rm -rfv ${HOME}/.sketchup/
rm -rfv ~/.local/share/applications/wine/Programs/SketchUp\ 2013/
```

#### References
  * <http://appdb.winehq.org/objectManager.php?sClass=version&iId=28620>
