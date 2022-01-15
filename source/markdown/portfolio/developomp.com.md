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
It is hosted on [google firebase](https://firebase.google.com), and domain registered with [amazon AWS](https://aws.amazon.com) Route 53.
It is built with Node.js, React.js and typescript.

## How it works

The build process of the site can be categorized into three stages.

### 1. content generation

In this stage, markdown files are rendered to HTML, json files containing metadata are generated, and svg images are constructed.
These files are all saved in the `source/src/data` directory with exceptions for some image files which are saved in the `source/public/img` directory.

#### A. HTML generation

In this stage, [Markdown files](https://github.com/developomp/developomp-site/tree/master/source/markdown) are rendered to HTML using the [markdown-it](https://github.com/markdown-it/markdown-it) library.

Check the [parsemarkdown.ts](https://github.com/developomp/developomp-site/blob/master/source/generate/parseMarkdown.ts) file to see the conversion logic and plugins used.

#### B. metadata

To allow content searching and listing, json files containing metadata such as title, length, and tags are generated.
The [elasticlunr.js](https://github.com/weixsong/elasticlunr.js) library is also used for searching.

#### C. images

svg images are generated so they can be used in other sites like in my [github profile](https://github.com/developomp#skills).
The [EJS](https://ejs.co) templates and style used to generate the image can be found in `source/generate/portfolio`.

### 2. site-building

Just a classic boring react build process. Uses [react-scripts](https://www.npmjs.com/package/react-scripts).

### 3. deployment

The site is deployed to firebase.

## Limitations

Since the site does not support server side rendering (SSR), the pages might be too slow to use for some weaker devices.
