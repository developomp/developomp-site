# Contribution Guide

## Things to get familiar with

- pnpm - package manager & monorepo
- React - Front-end framework
- Svelte - Front-end framework
- SvelteKit - Svelte meta-framework

## Project Structure

- `apps`
  - `main` - https://developomp.com
  - `blog` - https://blog.developomp.com
  - `portfolio` - https://portfolio.developomp.com
- `packages` - shared stuff used across different packages
  - `blog-content` - Contents for the blog
  - `eslint-config` - ESLint configuration files
  - `tailwind-config` -tailwindCSS configuration files
  - `theme` - universal developomp theme
  - `tsconfig` - TSConfig files

## Setting Up

> **If you are a Windows user:**
>
> - Do **NOT** use the Command Prompt (cmd)
> - Do **NOT** use Windows PowerShell
> - Run these commands from PowerShell or a Linux terminal such as WSL or Git Bash
>
> PowerShell and Windows PowerShell are [different applications](https://learn.microsoft.com/en-us/powershell/scripting/whats-new/differences-from-windows-powershell?view=powershell-7.3).

1. Clone this git repository
2. Install the following
   - [NodeJS](https://nodejs.org)
   - [pnpm](https://pnpm.io/installation)
3. Install Dependencies
   ```
   pnpm install
   ```
4. Run whatever command you need either in project root or in individual packages
   - `pnpm build` - Build all apps and packages
   - `pnpm dev` - Run all apps and packages locally
     - blog - http://localhost:3000
     - main - http://localhost:5173
     - portfolio - http://localhost:5174
   - `pnpm lint` - Lint all apps and packages
   - `pnpm clean` - Remove all auto-generated content such as `node_modules` and `dist`.

## Testing

Use following services to test & benchmark different aspects of the site

- https://seoptimer.com
- https://gtmetrix.com
