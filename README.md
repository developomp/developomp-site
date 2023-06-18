# developomp-site

[![what's this?](https://img.shields.io/badge/what's_this%3F-grey?style=for-the-badge)](https://developomp.com/portfolio/developomp-site)

A monorepo ([Turborepo](https://turbo.build)) of my websites for blogging, portfolio, resume, etc.

## Usage

1. Clone this git repository
2. Install [NodeJS](https://nodejs.org) and [pnpm](https://pnpm.io/installation)
3. Install Dependencies
   ```
   pnpm install
   ```
4. Run whatever command you need
   - `pnpm build` - Build all apps and packages
   - `pnpm dev` - Run all apps and packages locally
   - `pnpm lint` - Lint all apps and packages
   - `pnpm clean` - Remove all auto-generated content such as `node_modules` and `dist`.

## Project Structure

- `aps`
  - `main` - https://developomp.com
  - `blog` - https://blog.developomp.com
- `packages` - packages prefixed with `@developomp-site/`
  - `components-react` - ReactJS components
  - `eslint-config` - ESLint configuration files
  - `tailwind-config` -tailwindCSS configuration files
  - `theme` - universal developomp theme
  - `tsconfig` - TSConfig files
  - `utils` - Utility functions

## Special thanks

- My dear friend [Aditya Prakash](https://github.com/AdityaPrakash-26) for extensive testing and wonderful suggestions
- [Ruipeng Zhang](https://github.com/ppoffice) for design inspiration ([hexo-icarus-theme](https://github.com/ppoffice/hexo-theme-icarus))
- [Artem Golubin](https://github.com/rushter) for design inspiration ([his blog](https://rushter.com/blog))
- [discord](http://discord.com) for dark theme color palette (before the [rebranding of May 2021](https://blog.discord.com/how-were-making-discord-more-welcoming-for-everyone-ee152f198c60))

## License

The source code for this project is available under the [MIT License](./LICENSE).<br>

Font licenses:

[Open Font License (OFL)](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL#5667e9e4):

- [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro?query=source+code+pro) (monospaced code font)
- [Noto Sans KR](https://fonts.google.com/specimen/Noto+Sans+KR) (Korean and English font)
