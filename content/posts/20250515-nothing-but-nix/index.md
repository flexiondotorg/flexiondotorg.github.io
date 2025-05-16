---
title: "Nothing but Nix"
slug: nothing-but-nix-github-actions
date: 2025-05-15T13:37:42+01:00
#lastmod: 2025-05-15T13:37:42+01:00
categories: [ "Linux", "Development", "Tutorial", "Open Source" ]
tags: [ "NixOS", "GitHub Actions", "Nix", "CI", "Btrfs", "Determinate Nix", "FlakeHub" ]
summary: "The Nix Space Heist: Reclaiming 130GB in GitHub Actions"
sidebar: true
hero: "hero.webp"
draft: false
images:
  - "hero.webp"
---

Have you ever tried to build a complex [NixOS](https://nixos.org/) ️❄️ configuration in GitHub Actions only to be greeted by the dreaded *"no space left on device"* error? I certainly have, and it's been driving me bonkers for quite some time! 😖

[Standard GitHub Actions runners](https://docs.github.com/en/actions/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners#standard-github-hosted-runners-for-public-repositories) come with a paltry ~20GB of free disk space, or so it would seem. Which sounds decent until you try to build sophisticated NixOS or [Home Manager](https://nix-community.github.io/home-manager/) configurations. A comprehensive workstation or home lab server setup can consume 10-15GB due to all the included packages and dependencies, leaving precious little headroom for anything else 🤏

This space limitation effectively meant I couldn't build my full workstation and server configurations in CI. So annoying! 😠 I wanted my CI to cache complete builds to [FlakeHub Cache](https://flakehub.com/), but was forever stuck with only partial builds or individual packages that wouldn't properly test the complete configurations. This meant that each configuration change on my workstations and servers required frustrating additional compilation time for things like 3rd party kernel modules, [Ollama](https://ollama.com/), custom package overrides, and more - all because I couldn't get full builds cached through CI ️🥺

Well, I'd had enough of that nonsense and decided to solve the problem once and for all 🧠

## Introducing *Nothing but Nix* ️❄️

I'm chuffed to bits to announce [*Nothing but Nix*](https://github.com/marketplace/actions/nothing-but-nix), a GitHub Action that **brutally reclaims** disk space 🪓 on runners and transforms them into Nix powerhouses!

Here's what it does in a nutshell:

```yaml
- uses: actions/checkout@v4
- uses: wimpysworld/nothing-but-nix@main
- uses: DeterminateSystems/determinate-nix-action@main
- run: |
    nix flake check
```

The result? Instead of ~20GB for your [Nix store](https://zero-to-nix.com/concepts/nix-store/), you get **65GB to 130GB** of sweet, glorious Nix-dedicated space. That's enough to build even the chonkiest of configurations! 🪨

## Space, the Final Frontier 🌌

Working at [Determinate Systems](https://determinate.systems), I get to see firsthand how powerful Nix can be when properly cached. Our [FlakeHub Cache](https://flakehub.com) makes system updates lightning fast ⚡ but I couldn't fully leverage it in CI because my builds kept running out of space.

I wanted to be able to **build and test all my configurations** in CI:

- 💁 **Servers:** media services, local LLMs, website, fediverse services, distributed storage, backup
- ️🖥️ **Workstations:** dual GPU, loaded with dev tools, content creation apps and local LLMs
- 💻 **Laptops:** optimized for travel, media on the go, presentations and development
- 👻 **VMs:** for [Linux desktop development](https://ubuntu-mate.org) and testing

But GitHub's ~20GB limitation kept getting in the way 🙅 Sure, I could have paid GitHub for their larger runners with more disk space, but being both cheap and stubborn, I wasn't having any of that! 💸❌ Instead, I started thinking, *"Hang on a minute, those free runners must have more space somewhere - I just need to find it and claim it!"* 🤔💭

After digging through the runner specs and file system layout, I discovered that **GitHub Actions runners have a large chunk of free space on the `/mnt` filesystem that's barely used** 🤯 There was also the possibility to reclaim significant space by purging pre-installed software that Nix users don't need anyway 😈

## The Slightly Mad Science Bit ‍🧑‍🔬

At its core, *Nothing but Nix* uses a two-pronged attack:

### 1. The Initial Slash: Instant Volume Creation

First, the action creates a large loop device from free space on `/mnt` and sets up a properly tuned BTRFS filesystem:

```bash
# Create a large disk image in the free space
free_space=$(df -m --output=avail /mnt | tail -n 1 | tr -d ' ')
loop_dev=$(sudo losetup --find)
sudo fallocate -l $((free_space - 1024))M "/mnt/disk0.img"
sudo losetup "${loop_dev}" "/mnt/disk0.img"

# Set up an optimized BTRFS filesystem
sudo mkfs.btrfs -L nix -d raid0 -m raid0 --nodiscard "${loop_dev}"
sudo mount LABEL=nix /nix -o noatime,nobarrier,nodiscard,compress=zstd:1,space_cache=v2,commit=120
```

**This immediately provides around 65GB of Nix-ready space before your workflow even gets going!** 💪
I could have stopped here, but did I mention beging stubborn yet? 🫏

### 2. The Background Purge: Merciless Space Reclamation

**While your workflow continues**, *Nothing but Nix* starts a background process to ruthlessly eliminate unnecessary software:

- Docker images? Gone! 🗑️
- Language runtimes? Obliterated! 💥
- Package managers? Annihilated! 💣
- Documentation? Vaporized! 🔥

As space is reclaimed, it creates a second disk image on the root file system and adds it to the BTRFS pool, **dynamically growing your Nix volume up to around 130GB.** 🚀

The file system purge is powered by `rmz` (from the [Fast Unix Commands (FUC)](https://github.com/SUPERCILEX/fuc) project) - a high-performance alternative to `rm` that makes deletion blazingly fast. **Using traditional `rm` a full file system purge took ~11 minutes ⏳😞 `rmz` cut that to under 60 seconds!** ️⏱️😀

### BTRFS with `nodiscard`?

I'm using [BTRFS](https://btrfs.readthedocs.io/en/latest/) for the volume because it:

1. Supports dynamic device addition
2. Has built-in compression to save even more space
3. Allows optimal space utilization with RAID0 layout

The **`nodiscard` mount option is absolutely essential** because we're using loop devices backed by [sparse files](https://en.wikipedia.org/wiki/Sparse_file).

Without it, BTRFS would try to issue [TRIM/discard](https://btrfs.readthedocs.io/en/latest/Trim.html) commands that cause allocation size to be misreported when using loop devices. This misreporting would result in inaccurate space accounting. The `nodiscard` option ensures the filesystem maintains an accurate picture of its available storage.

## Choose Your Weapon: The Hatchet Protocol 🪓

Not everyone needs the same level of space reclamation, so I've added different *"Hatchet Protocol"* levels to control how aggressive the action is:

```yaml
- uses: wimpysworld/nothing-but-nix@main
  with:
    hatchet-protocol: 'cleave'  # Options: holster, carve, cleave (default), rampage
```

| Protocol | `/nix` | Description                                      |
|----------|--------|--------------------------------------------------|
| Holster  | ~65GB  | Keep the hatchet sheathed, use space from `/mnt` |
| Carve    | ~85GB  | Craft and combine free space from `/` and `/mnt` |
| Cleave   | ~115GB | Make decisive cuts to large packages             |
| Rampage  | ~130GB | Relentless elimination of all bloat              |

I recommend **Cleave** for most users, which is the default setting. It strikes a good balance between reclaiming space and keeping some useful tools around. But if you're a proper Nix enthusiast who believes that `#nix-is-life`, the Rampage protocol will squeeze out every last byte of space for your Nix store ️️❄️

## From Frustration to Freedom ️🕊️

Since implementing *Nothing but Nix*, I've been able to build **all** my NixOS and Home Manager configurations in CI. This means:

1. 🔒 Every `flake.lock` update is fully tested against my complete configuration set 
2. ✅ All successful builds are cached to FlakeHub Cache
3. ⚡ System updates are lightning-fast

This has been an absolute game-changer for my workflow. Now when I apply updates to any of my devices, everything is delivered directly from `cache.flakehub.com` with zero local compilation time! 🚀 All packages have been pre-built and verified in CI, meaning updates that would have taken ages to compile (*looking at you `ollama`* 👀) locally now complete in seconds. It's the difference between waiting for a coffee break and a blink-and-you'll-miss-it experience 🤩

Here's what the build times look like:

- 💁 2x Servers: ~5-10 minutes
- ️🖥️ 2x Workstations: ~6-13 minutes
- 💻 4x Laptops: ~7-10 minutes
- 👻 2x Virutal Manachines: ~4-10 minutes
- 📦 59x Local packages: ~5-14 minutes

## Getting Started with *Nothing but Nix* ✨

Ready to give it a go? Here's how to use it in your GitHub Actions workflow:

```yaml
name: "Test Nix Flake"
on:
  pull_request:
  push:
    branches: [ main ]

jobs:
  tests:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4      
      # 👇 Add this before installing Nix
      - uses: wimpysworld/nothing-but-nix@main     
      - uses: DeterminateSystems/determinate-nix-action@main
      - run: |
          # Now you have 100+ GB for your Nix builds!
          nix build . -L
          nix flake check
```

For FlakeHub users, make sure you add the `permissions` block as shown above. This allows [Determinate Nix](https://determinate.systems/nix/) to authenticate with FlakeHub and FlakeHub Cache.

## Beyond Storage to Virtual Machines? 🔮

Now that I've proven large volumes can be dynamically constructed in GitHub runners, I'm starting to think about what else might be possible. A GitHub action that implements something like [Quickemu](https://github.com/quickemu-project/quickemu) (*another project of mine*), to standup KVM-accelerated VMs inside a GitHub runner is my favourite idea 💡

GitHub has [recently announced](https://github.blog/changelog/2023-02-23-hardware-accelerated-android-virtualization-on-actions-windows-and-linux-larger-host) hardware acceleration for Android virtualization on Linux runners, which means the KVM infrastructure is already there and avilable for open source projects and larger runners 😯 All we need to do is leverage it for our own VMs.

Imagine being able to run a full VM of your validated build environment inside GitHub Actions! It would be like having a self-hosted runner, but without the self-hosting 😏 And it just so happens that the [Determinate Nix Action](https://github.com/DeterminateSystems/determinate-nix-action) enables KVM in GitHub runners. Coincidence? 😉

## Build Something Massive ️🏗️

*Nothing but Nix* removes one of the most frustrating limitations for Nix users in GitHub Actions. No more trimming your configurations to fit into tiny spaces - now you can build and test your full NixOS fleet with confidence 🤓

Give it a try, and let me know what you think!

The action is available at:
- GitHub: [wimpysworld/nothing-but-nix](https://github.com/wimpysworld/nothing-but-nix)
- Marketplace: [*Nothing but Nix*](https://github.com/marketplace/actions/nothing-but-nix)

If you run into any issues or have ideas for improvements, please open an issue on GitHub. And if this tool saves your CI builds, consider giving the repo a star! ⭐

Happy Nixing! ❄️