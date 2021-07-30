# developomp-site

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Repository for my (developomp's) <a href="https://developomp.com" target="_blank">website</a>.

Tools / Frameworks / Packages used:

|                                                               Name | Use                         |
| -----------------------------------------------------------------: | :-------------------------- |
|                                      [AWS](https://aws.amazon.com) | Domain register             |
|                            [Firebase](https://firebase.google.com) | Static site hosting         |
|                                       [react](https://reactjs.org) | Front end framework         |
|        [gray-matter](https://github.com/jonschlinkert/gray-matter) | Parsing markdown files      |
|           [react-tooltip](https://github.com/wwayne/react-tooltip) | Tooltips                    |
| [react-date-range](https://github.com/hypeserver/react-date-range) | Date picker for search page |

# Setup

Requirements:

-   [node](https://nodejs.org)
-   [yarn](https://github.com/yarnpkg/yarn)
-   optional:
    -   [vscode](https://code.visualstudio.com)
        -   [extensions](./.vscode/extensions.json) (also optional but highly recommended):

Steps:

-   Clone this repository
    -   `git clone https://github.com/developomp/developomp-site.git`
-   Or download as a zip file
    -   ![download procedure](./downloading.png)
-   open [`source`](./source) directory
    -   `cd source`
-   Install dependencies (must be in `source` directory)
    -   `yarn install`
-   start local server in http://localhost:3000
    -   `yarn start`

# Contributing

Please read the [`CONTRIBUTING.md`](./CONTRIBUTING.md) file.

# How it works

The command `yarn start` does two things under the hood.

First it executes the [generate.ts](./source/generate.ts) script to convert [markdown files](./source/markdown) to json files so it can be imported by react during runtime. The script also creates `map.js` file which is used to search posts without having to go through all of them each time. To just generate these files without starting the app, run `yarn generate` command in the [`source` directory](./source).

Then it serves the app in http://localhost:3000 as normal just like any other react apps.

The `yarn build` command will create files that can be served in the actual website.

# Special thanks

-   [Ruipeng Zhang](https://github.com/ppoffice) for design inspiration ([hexo-icarus-theme](https://github.com/ppoffice/hexo-theme-icarus))
-   [Artem Golubin](https://github.com/rushter) for design inspiration ([his blog](https://rushter.com/blog))
-   [discord](http://discord.com) for dark theme color palette (before the [rebranding of May 2021](https://blog.discord.com/how-were-making-discord-more-welcoming-for-everyone-ee152f198c60))
-   My dear friend [Aditya Prakash](https://github.com/AdityaPrakash-26) for extensive testing and wonderful suggestions

# License

This project is licensed under the MIT License.<br>
Check the [LICENSE](./LICENSE) file for more information.

Font license:

[Open Font License (OFL)](./LICENSE_OFL) ([Source](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL#5667e9e4)):

-   [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro?query=source+code+pro) (monospaced code font)
-   [Noto Sans KR](https://fonts.google.com/specimen/Noto+Sans+KR) (Korean and English font)
