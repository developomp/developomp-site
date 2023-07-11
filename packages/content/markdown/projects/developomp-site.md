---
name: developomp-site
overview: my websites for blogging, portfolio, resume, etc.
image: /img/portfolio/developomp-site.avif
repo: https://github.com/developomp/developomp-site
badges:
  - typescript
  - tailwindcss
  - react
  - svelte
---

## Introduction

developomp-site is a monorepo managed by [turborepo](https://turbo.build/repo)
and pnpm workspace.

- https://developomp.com - about me, built with **SvelteKit**
- https://blog.developomp.com - Blogging site, built with **React + Vite**
- https://portfolio.developomp.com - Portfolio, built with **React + Vite**
- https://resume.developomp.com - Portfolio, simply redirects to https://developomp.com/resume

## Interesting Stuff

- [markdown parsing][markdown-parsing]
- [test post](https://blog.developomp.com/posts/test-post)

[markdown-parsing]: https://github.com/developomp/developomp-site/tree/081855a4ecb6f5bf74b76758c358ea54b465b2b7/packages/blog-content
