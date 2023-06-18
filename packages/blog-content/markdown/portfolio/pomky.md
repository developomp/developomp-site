---
name: pomky
overview: A gtk-based, [conky](https://github.com/brndnmtthws/conky)-like system monitor written in rust.
image: /img/portfolio/pomky.png
repo: https://github.com/developomp/pomky
badges:
  - rust
  - gtk
  - cairographics
---

## Introduction

If you're into desktop customization, chances are, you're using (or used)
[rainmeter][rainmeter]. In case you don't know what that is, it is by far the
most popular desktop customization tool. Think of Windows 7 widgets on steroid.

However, rainmeter only works in the Windows Operating System. Which means Linux
users like me have to look elsewhere for alternatives. Fortunately, there are
projects like [conky][conky] and [polybar][polybar], so getting started should
not be too difficult especially with the endless supply of ideas, references,
and guides from communities such as [r/unixporn][unixporn].

When I first switched to Linux back in 2017, I was somewhat satisfied with my
simple conky widgets, but I knew I had to eventually do something about its
primitive configuration system that prevented me from making anything with
complexity without looking like a card pyramid that could collapse at the
slightest disturbance. So one day in December 2021, after finishing
[The Rust Book][the-rust-book], I decided to make my own tailor-made system
monitor as my first rust project.

## Challenges

### What framework to use

When I first started the project, I considered using [tauri][tauri] which is
basically [ElectronJS][electronjs] but with rust & WebKit for backend and is
much more lightweight.

However, that plan quickly fall apart when it turned out to be impossible to
make a window that acted like it's part of the desktop (like the task bar)
instead of a regular window without access to the lower level code. In technical
terms, I wasn't able to mark the window as `_NET_WM_WINDOW_TYPE_DESKTOP`
([FreeDesktop Documentation][freedesktop-docs]). This is now possible thanks to
[tauri-apps/tao#522][tauri-always-on-bottom] PR being merged, but at the time,
there was no simple and clean solution.

After going through different options, I ended up implementing everything from
scratch using the [rust binding for gtk][gtk-rs]. This allowed me to simply set
a `WindowTypeHint` ([GDK documentation][gdk-docs]) and expect everything to work
flawlessly. This also allowed me to use powerful GUI design tools such as
[glade][glade].

### Drawing graphs

Although GTK doesn't provide any usable built-in graph & chart components,
developers can still implement their own using the
[Cairo Graphics Library][cairographics] which is part of the
[GTK architecture][gtk-architecture].

After reading some documentations and way more google searches than I'd like to
admit, I was able to make a simple graph and bar component I was happy with.

## Future

Although the end result looks rather marvelous if you ask me, there are several
rough edges I'd like to smooth out. For starters, it acts erratically on
[Wayland][wayland] (getting a title bar all of a sudden, moving out of its set
position, etc.), gets drawn over other window when switching workspaces, has
higher CPU usage than other system monitors, has unpredictable CPU spikes, etc.

Which is why in the future, I'll be using [eww][eww]: yet another Linux widget
system written in rust. The way it works is very similar to pomky behind the
scenes (uses gtk, draws with cairo, custom components, all the good stuff), but
it is better than pomky in almost every conceivable way. It is more configurable
, more lightweight, more modular, and solves the previously mentioned issues.

[rainmeter]: https://www.rainmeter.net "rainmeter"
[conky]: https://github.com/brndnmtthws/conky "conky"
[polybar]: https://github.com/polybar/polybar "polybar"
[unixporn]: https://www.reddit.com/r/unixporn "unixporn"
[the-rust-book]: https://doc.rust-lang.org/book "The Rust Book"
[tauri]: https://tauri.app "tauri"
[electronjs]: https://www.electronjs.org "ElectronJS"
[freedesktop-docs]: https://specifications.freedesktop.org/wm-spec/wm-spec-latest.html#idm45299620502752 "Freedesktop Documentation"
[tauri-always-on-bottom]: https://github.com/tauri-apps/tao/pull/522 "tauri-apps/tao PR #522"
[gtk-rs]: https://gtk-rs.org "gtk-rs"
[gdk-docs]: https://docs.gtk.org/gdk3/enum.WindowTypeHint.html#desktop "GDK Documentation"
[glade]: https://wiki.gnome.org/Apps/Glade "Glade"
[cairographics]: https://www.cairographics.org "Cairo Graphics"
[gtk-architecture]: https://www.gtk.org/docs/architecture "GTK architecture"
[wayland]: https://wayland.freedesktop.org "Wayland"
[eww]: https://github.com/elkowar/eww "eww"
