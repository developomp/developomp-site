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

developomp.com is my website built for blogging and hosting data such as images, portfolio, resume, etc.
It is Hosted on google firebase, and domain registered with amazon AWS Route 53.
It is built with Node.js, React.js and typescript.

## How it works

The build process of the site can be categorized into three stages.

### content generation

In this stage, markdown files are rendered to HTML, json files containing metadata are generated, and svg images are built.
Check the `auto generated files` section of the [.gitignore](https://github.com/developomp/developomp-site/blob/master/.gitignore#L4) file to learn where these files are saved.
Check the [deployment github action](https://github.com/developomp/developomp-site/blob/master/.github/workflows/firebase-hosting-deploy.yml) for specific commands.

#### markdown

[Markdown files](https://github.com/developomp/developomp-site/tree/master/source/markdown) are rendered to HTML using the [markdown-it](https://github.com/markdown-it/markdown-it) library.
Check the [parsemarkdown.ts](https://github.com/developomp/developomp-site/blob/master/source/generate/parseMarkdown.ts) file to see the conversion logic and plugins used.

#### metadata

To allow content searching and listing, json files containing metadata such as available tags, posts categorized by tags, posts sorted by date, etc. are created.
[elasticlunr.js](https://github.com/weixsong/elasticlunr.js) library is also used to allow searching by content.

#### images

svg images are generated so they can be used in other sites like in my [github profile](https://github.com/developomp#skills).

### site-building

Just a classic boring react build process. Uses [react-scripts](https://www.npmjs.com/package/react-scripts).

### deployment

The site is deployed to firebase.
