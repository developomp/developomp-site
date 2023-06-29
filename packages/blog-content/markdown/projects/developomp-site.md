---
name: developomp-site
overview: my websites for blogging, portfolio, resume, etc.
image: /img/portfolio/developomp.com.avif
repo: https://github.com/developomp/developomp-site
badges:
  - githubactions
  - turborepo
  - typescript
  - javascript
  - nodedotjs
  - firebase
  - amazonaws
  - react
  - html5
  - css3
---

## Intro

developomp.com is a website I built for blogging, data hosting, portfolio, resume, etc.

It is a static, single page application built with [react](https://reactjs.org) framework.
It is hosted on [google firebase](https://firebase.google.com), and domain registered with [AWS](https://aws.amazon.com) Route 53.

## How it's used

The portfolio page doubles as a project description page where it lists some interesting aspects of the project.
It's basically a developer's note where I show parts I put extra effort and want people to know about it.

## How it works

The build process of the site can be subdivided into three major stages: _content generation_, _site building_, and _deployment_.

### 1. content generation

Before the site ever gets to deal with react stuff, a sort of content pre-processing should take place.
In this stage, markdown files are rendered to HTML, svg images are constructed, and json files containing metadata are generated.
These files are all saved in the `src/data` directory with exceptions for some image files which are saved in the `public/img` directory.

#### A. HTML generation

The [markdown files](https://github.com/developomp/developomp-site/tree/master/markdown) are rendered to HTML using the [markdown-it](https://github.com/markdown-it/markdown-it) library.
Various extensions are used in this stage to extend markdown features such as footnotes, mathematical expressions, and code blocks.

- Check the [test post](/posts/test-post) to see all markdown related features.
- The conversion logic can be found in the [`generate/parsemarkdown.ts`](https://github.com/developomp/developomp-site/blob/master/generate/parseMarkdown.ts) file.

#### B. images

After the all the text contents are parsed, svg images are constructed.

First, icons from [simple-icons](https://github.com/simple-icons/simple-icons) that are used by the site are copied to the `src/data/icons` directory.
Then, other images such as the "programming skills" stats that can be seen in the [portfolio](/portfolio) page and in my [github profile](https://github.com/developomp#skills) are generated using the [EJS](https://ejs.co) library.

- The code can be found in [`generate/portfolio`](https://github.com/developomp/developomp-site/tree/master/generate/portfolio).

#### C. metadata

After dealing with all the contents, json files containing metadata are generated.
These can then be imported by react for searching and listing.

Files generated in this stage includes:

- `src/data/map.json` (contains information about regular blog posts and pages)
- `src/data/portfolio.json` (contains information about portfolio related data)
- `src/data/search.json` (contains searchable [elasticlunr](https://github.com/weixsong/elasticlunr.js) index for the search page)

### 2. site building

Good old react build process using [react-scripts](https://www.npmjs.com/package/react-scripts).

### 3. deployment

The site is deployed to firebase.

## Features

### Reactive UI

The site is designed to work on displays of any sizes.
Horizontal overflows are properly dealt with in small displays,
and contents have a maximum width so it looks beautiful on ultra-wide displays.

### Searching

The search feature usually involves a server or service like [algolia](https://www.algolia.com).
However, the searching logic is in the client side so there's no task that requires a server aside from static site hosting.

## Limitations

Because all the computation is done in the client-side,
there is a possibility for the site to be too slow to use some users with outdated hardware (especially mobile users).

Also, since the search operation also happens in the client-side,
the client has to download every blog posts in the site for the search feature to work.
This may be a issue for users with slow/limited access to the internet.
