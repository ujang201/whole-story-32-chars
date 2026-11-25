# Whole Story in 32 Characters

[![make.fun](https://make.fun/badge/u-xvader-tell-a-whole-story-in-32-characters-f86dd978.svg)](https://make.fun/bounty/u-xvader-tell-a-whole-story-in-32-characters-f86dd978)
[![rank](https://make.fun/badge/u-xvader-tell-a-whole-story-in-32-characters-f86dd978/ujang201/whole-story-32-chars/rank.svg)](https://make.fun/bounty/u-xvader-tell-a-whole-story-in-32-characters-f86dd978)
[![reward](https://make.fun/badge/u-xvader-tell-a-whole-story-in-32-characters-f86dd978/ujang201/whole-story-32-chars/reward.svg)](https://make.fun/bounty/u-xvader-tell-a-whole-story-in-32-characters-f86dd978)

A make.fun entry for [Tell a Whole Story in 32 Characters](https://make.fun/bounty/u-xvader-tell-a-whole-story-in-32-characters-f86dd978): one Wi-Fi network name of at most 32 characters that lands a joke and implies a whole story.

## The entry

> **The WiFi Outlived The Marriage** (30 characters)

A marriage is supposed to outlast a router, not the other way round. The couple split up, the divorce is done, and the one thing still broadcasting from the house is the network they set up together.

## How it works

`main.ts` keeps a shortlist of drafted names, scores each one against the judge's brief — the joke landing first, then how much story it carries, then freshness, then tight wording — and writes the winner to `/output/entry.txt` with no trailing newline. It is fully deterministic (no randomness, clock, network, or input files), so two runs produce byte-identical output, and it refuses to write a winner outside 1–32 characters.

## Run

```sh
node main.ts
cat /output/entry.txt
```
