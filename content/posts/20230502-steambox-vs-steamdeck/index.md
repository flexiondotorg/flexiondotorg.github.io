---
title: "Steam Box vs Steam Deck"
slug: steambox-vs-steamdeck
date: 2023-05-01T18:38:19+01:00
lastmod: 2023-05-02T20:15:42+01:00
categories: [ "Linux", "Computer Hardware" ]
tags: [ "ChimeraOS", "HoloISO", "Steam Deck", "Gaming", "Emulation" ]
summary: "I declined my Steam Deck pre-order and I'm now playing more games on Linux"
sidebar: true
hero: "hero.webp"
draft: false
images:
  - "hero.webp"
---

 When I received my Steam Deck Purchase Information email I wasn't playing games all that often; mostly online racing games with friends once a week. I didn't think I'd get much use out of a handheld console. I also had an inventory of PC parts available that could be used to build a dedicated Steam Box. So on July 18th 2022, I declined spending £569 on a Steam Deck and set about building a Steam Box instead. Here's how I got on and what I learned.

## As featured on Linux Matters! 🎙️

I recently discussed why I cancelled my Steam Deck pre-order on the [Linux Matters](https://linuxmatters.sh/) podcast. **You can hear that discussion with my friends Alan and Mark in [Linux Matters: Lawful evil monitor alignment (Episode 2)](https://linuxmatters.sh/2/)**.

<p class="text-center">
  <a href="https://linuxmatters.sh" target="_blank"><img src="https://linuxmatters.sh/img/episode/linuxmatters-banner-3000x750.webp" class="img-fluid" alt="Linux Matters Podcast"/></a>
  <br />
  <em>Linux Matters Podcast</em>
</p>

## Hardware 🖥️

At the time I had an inventory of parts that weren't being used and on the second desk in my office I had an ultra-wide monitor, keyboard, mouse and more controllers than I know what to do with. From the parts I had available I selected the following:

- [Gigabyte B550i Mini-ITX AORUS Pro AX Motherboard](https://www.gigabyte.com/Motherboard/B550I-AORUS-PRO-AX-rev-10#kf)
- [AMD Ryzen™ 7 5700G](https://www.amd.com/en/products/apu/amd-ryzen-7-5700g)
- [Noctua NH-L9a-AM4 Low Profile Cooler](https://noctua.at/en/nh-l9a-am4)
- [VENGEANCE® LPX 32GB (2 x 16GB) DDR4 DRAM 3600MHz C18](https://www.corsair.com/uk/en/Categories/Products/Memory/VENGEANCE-LPX/p/CMK32GX4M2D3600C18)
- [MP600 CORE 1TB M.2 NVMe PCIe Gen. 4 x4 SSD](https://www.corsair.com/uk/en/Categories/Products/Storage/M-2-SSDs/MP600-CORE/p/CSSD-F1000GBMP600COR)
- [Gigabyte Radeon™ RX 5700 XT GAMING OC 8G](https://www.gigabyte.com/uk/Graphics-Card/GV-R57XTGAMING-OC-8GD-rev-10#kf)
- [Microsoft Xbox Wireless Adapter for Windows 10](https://www.xbox.com/en-GB/accessories/adapters/wireless-adapter-windows)

I had all the parts I needed to build a Steam Box, except for the case and power supply, so I bought a [Fractal Design Node 202 (without PSU)](https://www.fractal-design.com/products/cases/node/node-202/black/) for £65 on eBay and a [CORSAIR SF750 80 PLUS Platinum SFX Power Supply](https://www.corsair.com/uk/en/Categories/Products/Power-Supply-Units/Power-Supply-Units-Advanced/SF-Series/p/CP-9020186-UK) for £145 on Amazon.

<iframe src="https://kit.co/embed?url=https%3A%2F%2Fkit.co%2Fwimpysworld%2Fsteam-box" style="display: block; border: 0px; margin: 0 auto; width: 100%; height: 100vw; max-width: 700px; max-height: 700px" scrolling="no"></iframe>

### Node 202 Considerations 💼

The Node 202 is a compact chassis (10.2 litres) that can house a capable gaming build, but has several specific considerations to keep in mind.

#### GPU Considerations

The case is designed for 2-slot graphics cards, which means that larger triple-slot cards may not fit. The maximum supported dimensions are:

- Length: 310mm
- Width: 145mm
- Depth: 47mm

The Radeon™ RX 5700 XT GAMING OC 8G I have is too big to fit in the Node 202 case, but I was able to remove the shroud and fans, which allowed me to fit the GPU in the case with 2x 120mm Noctua case fans mounted on the bottom panel of the case to provide cooling.

<p class="text-center">
  <img src="./deshrouded-gigabyte-radeon-5700xt.webp" class="img-fluid" alt="Deshrouded Gigabyte RX 5700XT Gaming OC"/>
  <br />
  <em>Deshrouded Gigabyte RX 5700XT Gaming OC</em>
</p>

#### CPU Considerations

The Node 202 riser card interface is PCI Express **3.0** x16 and there is limited space for a CPU cooler. This is why I went with the 5700G APU I had on hand, instead of the 5900X that I also had in my supplies.

- The 5700G APU is a 65W TDP part, requiring less cooling than the 5900X
  - The Noctua NH-L9a-AM4 I had is a low-profile cooler that is rated for 65W TDP.
  - I replaced the NH-L9a-AM4 fan with a Noctua NF-B9 redux-1600 PWM 4-Pin, 1600 RPM to provide additional cooling
- The 5700G APU is a single CCX, further reducing the cooling requirements
- The 5700G APU only has PCI Express 3.0, the same as the Riser card interface that comes with the Node 202 case
  - A CPU with PCI Express 4.0 support or higher would work too, but would be limited to PCI Express 3.0 speeds

The Node 202 also has limited space for cable management. The modular design of the Corsair SF750 power supply along with its easy-to-route cables helped to keep the cables tidy and prevented them from blocking airflow.

<p class="text-center">
  <img src="./partially-built-steambox.webp" class="img-fluid" alt="Partially Built Steam Box"/>
  <br />
  <em>Partially Built Steam Box</em>
</p>

## Operating System 📀

Initially, I installed [HoloISO](https://github.com/HoloISO), which gets lots of attention but switched to [ChimeraOS](https://chimeraos.org/) on a recommendation from my friend [Jorge Casto](https://www.ypsidanger.com/). **ChimeraOS is excellent!** 🧑‍🍳🤌

> "ChimeraOS is an operating system that provides an out of the box couch gaming experience. After installation, boot directly into Steam Big Picture and start playing your favorite games.
>
> If you want Steam in your living room, you want ChimeraOS" - ChimeraOS Team

**If you're building a Steam Box, I highly recommend ChimeraOS**. One of the key advantages of ChimeraOS is its use of atomic updates. Atomic updates ensure that updates are applied as a single, cohesive unit, which reduces the likelihood of update failures and ensures that the system is always in a consistent state. In contrast, HoloISO uses the regular Arch Linux update mechanism, which applies updates individually and can potentially lead to update failures. In pursuit of a true console-like experience, ChimeraOS gets it right and even supports rolling back updates should anything go wrong.

<p class="text-center">
  <a href="https://chimeraos.org/" target="_blank"><img src="./chimeraos.svg" class="img-fluid" alt="ChimeraOS"/></a>
  <br />
</p>

ChimeraOS is a very well-thought-out implementation of a console-like operating system when compared to HoloISO. Here's a summary of how ChimeraOS, SteamOS and HoloISO compare:

|                                   | ChimeraOS          | SteamOS 3.x        | HoloISO                |
| --------------------------------- | ------------------ | ------------------ | ---------------------- |
| Based on                          | Arch Linux         | Arch Linux         | SteamOS 3.x/Arch Linux |
| Desktop                           | Gnome              | KDE Plasma         | KDE Plasma             |
| Atomic updates                    | :heavy_check_mark: | :heavy_check_mark: | :x:                    |
| Read-write root filesystem        | :x:                | :x:                | :heavy_check_mark:     |
| Custom partitioning               | :x:                | :x:                | :heavy_check_mark:     |
| General hardware support          | :heavy_check_mark: | :x:                | :heavy_check_mark:     |
| Up-to-date base packages          | :heavy_check_mark: | :x:                | :x:                    |
| Remote app installation           | :heavy_check_mark: | :x:                | :x:                    |
| Built-in EGS & GOG support        | :heavy_check_mark: | :x:                | :x:                    |
| Built-in emulation support        | :heavy_check_mark: | :x:                | :x:                    |
| Additional game tweaks            | :heavy_check_mark: | :x:                | :x:                    |
| Additional artwork                | :heavy_check_mark: | :x:                | :x:                    |
| Built-in GE Proton                | :heavy_check_mark: | :x:                | :x:                    |
| Full source publicly hosted       | :heavy_check_mark: | :x:                | :x:                    |
| Forkable infrastructure           | :heavy_check_mark: | :x:                | :x:                    |

<p class="text-center">
  <em>Table taken from the <a href="https://github.com/ChimeraOS/chimeraos/wiki" target="_blank">ChimeraOS Wiki</a></em>
</p>

### ChimeraOS Experience 🦁

I've been using ChimeraOS for nearly a year and I'm extremely happy with it. I installed ChimeraOS 33 when I built the Steam Box and it has updated itself, without issue, to ChimeraOS 41 (at the time of writing). New releases are made every 4 to 6 weeks. Some of the ChimeraOS features that I love are:

- A true Steam Deck-like experience but for a wide range of hardware
  - More so if you have Steam Controllers available, I've got three connected wirelessly
- Wake up from sleep via the push of a controller button
- Built-in support for Epic Game Store and GOG
- Built-in support for emulation
  - I enjoy playing retro arcade and console games, and ChimeraOS makes it easy to install and play them
- Built-in support for Xbox Wireless Controllers
  - [My Stadia Controllers with Bluetooth Firmware also work great with ChimeraOS](/posts/flash-stadia-controller-bluetooth-firmware-on-linux/)
- Bundles current builds of Proton-GE
- Web-based UI for managing the system/games

Having a dedicated "games console" has resulted in me playing more games, but more importantly, playing more games with my family. The three of us sit together to play through games, often with my daughter on controls and my wife and I problem-solving and making suggestions. As a family, we've revisited [Spyro™ Reignited Trilogy](https://store.steampowered.com/app/996580/Spyro_Reignited_Trilogy/) something my wife and I played through together on the original PlayStation last-century! 😱 My daughter and I are most of the way through the [Monkey Island Collection](https://store.steampowered.com/bundle/6588/Monkey_Island_Collection/) and we've discovered we love co-op games like [Unravel Two](https://store.steampowered.com/app/1225570/Unravel_Two/) and [It Takes Two](https://store.steampowered.com/app/1426210/It_Takes_Two/). We've also purchased some "mobile" games we play on tablets and NVIDIA SHIELD such as [Riptide GP2](https://store.steampowered.com/app/257790/Riptide_GP2/), [Riptide GP Renegade](https://store.steampowered.com/app/443860/Riptide_GP_Renegade/) and [Horizon Chase Turbo](https://store.steampowered.com/app/389140/Horizon_Chase_Turbo/). Yes, we like racing games 🏁

My daughter has access to (mostly) the same games her friends play on Xbox and PlayStation. She doesn't feel like our Steam Box is "different" from her friend's consoles. When they visit each other they broadly play the same selection of titles, except for platform exclusives of course. When [Stray](https://store.steampowered.com/app/1332010/Stray/) and [Five Nights at Freddys](https://store.steampowered.com/app/319510/Five_Nights_at_Freddys/) became the games to play among her circle of friends, they were a click away and worked perfectly. Thanks to the Steam Deck, ChimeraOS is just a games console and not a "PC" to her. She doesn't have to worry about updates, drivers, or anything else. She just turns it on and plays games.

<p class="text-center">
  <img src="./completed-steambox.jpg" class="img-fluid" alt="ChimeraOS powered Steam Box in action"/>
  <br />
  <em>ChimeraOS powered Steam Box in action - before I figured out how to enable ultra-wide resolution</em>
</p>

I've found ChimeraOS offers much better game compatibility than I've been able to achieve by simply installing Steam on Ubuntu. For example, [Forza Horizon 4](https://store.steampowered.com/app/1293830/Forza_Horizon_4/) and [Forza Horizon 5](https://store.steampowered.com/app/1551360/Forza_Horizon_5/) both run beautifully on the ChimeraOS powered Steam Box; something that eluded me on Ubuntu. The Steam Box is connected to a 3440x1440 ultra-wide monitor and configuring each game to use "Native" resolution via the game properties unlocks a gorgeous ultra-wide gaming experience. There is no going back from this once you've experienced it, especially for split screen local multiplayer games.

## Steam Deck 🎮

Several of my friends have Steam Decks and love them. They use them as both a handheld console and docked under the TV for family gaming. So, I could be using a Steam Deck to facilitate our family gaming requirements, but I don't think I would have arrived at the idea of using a Steam Deck in this way without first experiencing the benefits of the Steam Box. I am considering getting a Steam Deck or similar handheld gaming-orientated PC and it would certainly be nice to use something more power efficient than the 270W total system power consumption the Steam Box requires. **You can hear more about how [my friend Mark has switched to Steam Deck as his primary gaming device](https://linuxmatters.sh/1/) in [Linux Matters: Mastodon on My Résumé (Episode 1)](https://linuxmatters.sh/1/)**.

## Upgrades 📈

Since I first built the Steam Box I've upgraded the GPU to a [Fighter AMD Radeon™ RX 6700 XT 12GB GDDR6](https://www.powercolor.com/product?id=1612512944). At the time of writing, this is the most powerful Radeon GPU that comfortably fits in the Node 202 case and still leaves room for the additional case fans I installed. This GPU is a great match for the ultra-wide monitor and all the games I've tried can run at 3440x1440 with high presets (or better) at upwards of 60fps. When I first built the Steam Box, ChimeraOS worked best with Radeon GPUs, if you wanted to enable the Steam Deck UI (gamepadui). Support for Intel and NVIDIA GPUs is improving, but I've stayed with AMD Radeon because that's been proven to be the most compatible option.

I've also added a second SSD; the [Crucial P3 4TB M.2 PCIe Gen3](https://uk.crucial.com/ssd/p3/ct4000p3ssd8). I used the ChimerOS web UI to prepare the drive and it now automatically shows up in the Steam UI as a Steam Library location.

## What's next? 🔮

The Steam Box has a permanent home in my office, but originally I'd planned to put it in the lounge under the TV. I have an original Steam Link, so now I'm thinking that I'll put the Steam Link under the TV to replace the NVIDIA SHIELD. I have some older [GPD](https://gpd.hk/) devices that are designed for gaming, so I think I'll put ChimeraOS on those to see how they perform as dedicated handheld game consoles. Could they be used as Steam Link clients too?

ChimeraOS also supports installing software via [Flathub](https://flathub.org/). I'd like to get a browser installed that can be used for streaming services like Netflix and Disney+ so we can use the Steam Box for watching TV too.

I'll report back on all of this in a future post. [Like 👍️ and Subscribe ❤️](/posts/rss.xml)

## Conclusion 🏁

The tinkerer, maker and developer in me wants to try [NixOS as games console solution](https://github.com/Jovian-Experiments/Jovian-NixOS) but I'm starting to think that other than the learning opportunity there is no real value in doing so, considering what an excellent job ChimeraOS does.

And here we are at the conclusion with barely a mention of Linux 🐧 ChimeraOS and the Steam Deck are excellent examples of Linux devices done right; all the Linux-y stuff is just implementation detail. *Even I don't think of our Steam Box as being a Linux-y thing*; I just pick up a controller, wake up the console and start playing contemporary games or my favourite retro classics 🕹️ without any fuss.
