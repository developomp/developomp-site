---
name: Arch Linux setup script
overview: My Arch Linux desktop setup
image: /img/portfolio/linux-setup-script.png
repo: https://github.com/developomp/setup
badges:
  - linux
  - python
---

## Introduction

Properly setting up a desktop takes a lot of time.
Installing all of your favorite applications and configuring them to your liking is no easy task.
The primary purpose of this project is to solve this exact problem by automating the process of installation and configuration of applications and system.

## How does it work?

[Github pages](https://pages.github.com) allows the developers to deploy a static site directly from their repositories.
I have set up a [github action](https://docs.github.com/en/actions) so that the content of the bootstrap script gets copied over to the `index.html` file in the `gh-pages` branch so it can be downloaded from https://setup.developomp.com/.
This script then clones the rest of the repository upon execution so it can start doing its thing.
