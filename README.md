# developomp-site

Repository for my (developomp's) <a href="https://developomp.com" target="_blank">website</a>.

Tools / Frameworks / Packages used:

|                                                                          Name | Use                                                   |
| ----------------------------------------------------------------------------: | :---------------------------------------------------- |
|                                                 [AWS](https://aws.amazon.com) | Domain register                                       |
|                                       [Firebase](https://firebase.google.com) | Static site hosting                                   |
|                         [Typescript](https://github.com/microsoft/TypeScript) | Static typing for javascript                          |
|                                                  [react](https://reactjs.org) | Front end framework                                   |
|         [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) | [Fontawesome](https://fontawesome.com) icons in react |
|           [react-helmet-async](https://github.com/staylor/react-helmet-async) | HTML head management                                  |
|                              [dompurify](https://github.com/cure53/DOMPurify) | HTML sanitizer for markdown-to-html page generation   |
|                   [gray-matter](https://github.com/jonschlinkert/gray-matter) | parsing markdown                                      |
| [local-storage-fallback](https://github.com/ripeworks/local-storage-fallback) | storing theme choice                                  |
|                      [react-tooltip](https://github.com/wwayne/react-tooltip) | Tooltips                                              |
|   [styled-components](https://github.com/styled-components/styled-components) | easier CSS styling                                    |
|         [styled-theming](https://github.com/styled-components/styled-theming) | Theming                                               |
|                                    [eslint](https://github.com/eslint/eslint) | code analysis                                         |
|                              [prettier](https://github.com/prettier/prettier) | code formatting                                       |
|                              [ts-node](https://github.com/TypeStrong/ts-node) | running markdown-to-html generator                    |
|                                                     [jest](https://jestjs.io) | code testing                                          |

# Setup

Requirement:

-   [node](https://nodejs.org)
-   [yarn](https://github.com/yarnpkg/yarn) ([npm](https://github.com/npm/cli) is **not** supported)
-   optional:
    -   [git](https://git-scm.com)
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

# Special thanks

-   [Ruipeng Zhang](https://github.com/ppoffice) for design inspiration ([hexo-icarus-theme](https://github.com/ppoffice/hexo-theme-icarus))
-   [discord](http://discord.com) for dark theme color palette
-   My friend [Aditya Prakash](https://github.com/AdityaPrakash-26) for extensive testing and wonderful suggestions

# License

This project is licensed under the MIT License.<br>
Check the [LICENSE](./LICENSE) file for more information.

Font license:

[Open Font License (OFL)](./LICENSE_OFL) ([Source](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL#5667e9e4)):

-   [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro?query=source+code+pro) (monospaced code font)
-   [Noto Sans KR](https://fonts.google.com/specimen/Noto+Sans+KR) (Korean and English font)
