---
name: pomky
overview: A gtk-based, [conky](https://github.com/brndnmtthws/conky)-like system monitor written in rust.
image: /img/portfolio/pomky.png
repo: https://github.com/developomp/pomky
badges:
  - rust
---

<!--
- gtk
- cairo
-->

## Introduction

Pomky was created to solve some problems/limitations that exists in the conky project.
Primarily the lack of a GUI editor and the primitive layout system.

To fix these issues, pomky uses gtk for the GUI and windowing.
This allows the UI to be edited using software such as [glade](https://gitlab.gnome.org/GNOME/glade)
which is much more flexible and is better for quick UI testing.

It is currently replaced by [smon](https://github.com/developomp/smon) de to [some wayland issues](https://github.com/developomp/pomky/issues/12).
