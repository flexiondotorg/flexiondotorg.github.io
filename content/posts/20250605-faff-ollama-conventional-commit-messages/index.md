---
title: faffing about with diffs
slug: faff-ollama-conventional-commit-generator
date: 2025-06-05T13:37:42+01:00
#lastmod: 2025-06-05T13:37:42+01:00
tags: [ "Git", "AI", "Ollama", "GitKraken", "Conventional Commits" ]
summary: "Another bloody AI commit generator, born from pure spite but stays local"
sidebar: true
hero: "hero.webp"
draft: false
images:
  - "hero.webp"
---
Picture this: you've just spent literal minutes crafting the perfect bit of code, you're chuffed with yourself, and then you open your git client only to stare at that commit message box. 🤔

That cursor blinking mockingly while you try to remember what you changed just moments ago. **And you wonder, why do I have to write this? `git` already knows what happened!**

Now, I'm a proper [GitKraken](https://gitkraken.dev/) devotee – have been for years 🦑 Love the thing so much I've disabled all git integrations in VS Code to maintain a clean separation between coding and source control. It's brilliant software and I'm happy to pay for it ([you should too using my handy-dandy referral link](https://gitkraken.cello.so/AxtLstzXaif)) 🤑

## When AI promises go sideways

GitKraken recently added AI integration for generating commit messages, complete with customisable prompts. Naturally, I thought *"Right, this'll sort my commit message faff once and for all!"* Two problems emerged rather quickly:

- First, I blew through my AI credit bundle faster than a student with their first overdraft facility. Turns out I commit quite a lot, and those credits don't stretch as far as you'd hope.

- Second, and this really wound me up, I could not for the life of me get it to generate proper [Conventional Commits](https://www.conventionalcommits.org/). I know how to craft AI system prompts – I've been mucking about with LLMs long enough – but GitKraken's AI seemed determined to ignore my carefully crafted instructions about `feat:`, `fix:`, and `chore:` prefixes.

## Enter faff, stage left

So naturally, being the sort of person who builds entire projects out of mild irritation, I decided to solve this myself. Meet [`faff`](https://github.com/wimpysworld/faff) – yet another bloody AI commit generator, because apparently the Internet wasn't drowning in enough of them already ☔

`faff` does one thing: it looks at your staged git diff, sends it to a local [Ollama](https://ollama.com/) LLM, and spits out a conventional commit message. No cloud APIs, no credit bundles, no sending your `TODO: delete this abomination` code comments to feed the vibe-coding dealers.

```bash
git add .
faff
```

Perfect conventional commits, every time. Well, most of the time. It's AI, not magic 🪄

<div align="center"><img alt="faff demo" src="faff.gif" width="1024" /></div>

## The plot twist that made me question everything

Here's where this story takes a turn that'll make you laugh at my expense. After building `faff`, documenting it, and feeling rather pleased with myself, I discovered something that made me want to bang my head against my desk repeatedly.

**You can hook GitKraken's AI up to Ollama.**

And naturally, [my carefully crafted system prompt from `faff`](https://github.com/wimpysworld/faff/blob/main/faff.sh#L92), when used in GitKraken AI via Ollama with the same [qwen2.5-coder](https://ollama.com/library/qwen2.5-coder) models, works exactly like `faff` does. 🤦‍♂️

So technically, I could have solved my original problem without building an new tool. But where's the fun in that?

## Why faff still matters (and it's not just stubbornness)

Despite this rather embarrassing revelation, `faff` still has its place:

- **Privacy by default**: Everything stays local, until you push it to GitHub
- **No vendor lock-in**: Works with any Ollama-supported model. Want to try the latest coding model? Just change the environment variable.
- **Shell-first design**: Perfect for those of us who live in terminals, or an excuse for me creating another shonky shell script
- **Learning project**: Born from genuine frustration and a desire to poke around the [Ollama API](https://github.com/ollama/ollama/blob/main/docs/api.md). Sometimes the best tools come from scratching your own itch.

Plus, let's be honest – there's something deeply satisfying about having a tool that does exactly what you want, how you want it, without any *faff!* 🥁

## Give it a whirl

If you're tired of crafting commit messages that either say "Updated stuff" (*again!*) or read like Victorian novels, [`faff` might be worth a look](https://github.com/wimpysworld/faff). It's a shell script, it works with local AI, and it follows conventional commits standards without the existential crisis.

And if you decide you'd rather stick with GitKraken's AI (which, after my discoveries, is perfectly reasonable), at least [grab it through my referral link](https://gitkraken.cello.so/AxtLstzXaif) so I can pretend this whole adventure was planned from the start. ️🗺️

Because sometimes the best projects are the ones born from pure spite, accidentally becoming useful along the way. That's half the fun of building things, isn't it?

**Drop the faff, dodge the judgment, get back to coding. 🦙**