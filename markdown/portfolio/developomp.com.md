---
name: developomp.com
overview: my website for blogging, portfolio, and resume.
image: /img/portfolio/developomp.com.png
repo: https://github.com/developomp/developomp-site
badges:
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

developomp.com is my website built for blogging, data hosting, portfolio, resume, etc.

It is a static, single page application built with [react](https://reactjs.org) framework.
It is hosted on [google firebase](https://firebase.google.com), and domain registered with [AWS](https://aws.amazon.com) Route 53.

## How it works

The build process of the site can be subdivided into three major stages: _content generation_, _site building_, and _deployment_.

### 1. content generation

Before the site ever gets to deal with react stuff, a sort of content pre-processing should take place.
In this stage, markdown files are rendered to HTML, svg images are constructed, and json files containing metadata are generated.
These files are all saved in the `src/data` directory with exceptions for some image files which are saved in the `public/img` directory.

#### A. HTML generation

The [markdown files](https://github.com/developomp/developomp-site/tree/master/markdown) are rendered to HTML using the [markdown-it](https://github.com/markdown-it/markdown-it) library.
Various extensions are used in this stage to extend markdown features such as footnotes, mathematical expressions, and code blocks.

- Check the [test post](/posts/test-post) to see all markdown features.
- Check the [`generate/parsemarkdown.ts`](https://github.com/developomp/developomp-site/blob/master/generate/parseMarkdown.ts) file to see the conversion logic.

#### B. images

After the all the text contents are parsed, svg images are constructed.

First, icons from [simple-icons](https://github.com/simple-icons/simple-icons) that are used by the site are saved in the `src/data/icons` directory.

Then, other images such as the "programming skills" stats that can be seen in my [portfolio](/portfolio) and in my [github profile](https://github.com/developomp#skills).

- The [EJS](https://ejs.co) library is used for svg construction.
- The code can be found in [`generate/portfolio`](https://github.com/developomp/developomp-site/tree/master/generate/portfolio).

#### C. metadata

After all the contents are generated, json files containing metadata about the contents are generated.
This can then be imported in react for searching and listing.

Files generated in this stage includes:

- `src/data/map.json` (contains information about regular blog posts and pages)
- `src/data/portfolio.json` (contains information about portfolio related data such as my projects)
- `src/data/search.json` (contains searchable [elasticlunr](https://github.com/weixsong/elasticlunr.js) index for the search page)

### 2. site building

Good old react build process using [react-scripts](https://www.npmjs.com/package/react-scripts).

### 3. deployment

The site is deployed to firebase.

## Limitations

Because all the work is done in the client-side,
there is a possibility that the site is too slow to use for some users with outdated hardware especially for mobile users.

Also, since the search operation also happens in the client-side,
the client has to download every blog posts in the site for the search feature to work.
This may be a issue for users with slow/limited access to the internet.
