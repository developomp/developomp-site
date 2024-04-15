# Contribution Guide

## Project Structure

- `apps`
  - `main` - https://developomp.com
  - `blog` - https://blog.developomp.com
- `packages` - shared stuff used across different packages
  - `content` - Shared content
  - `eslint-config` - ESLint configuration files
  - `tailwind-config` -tailwind configuration with pomp-specific extensions

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
4. Setup husky
   ```
   pnpm husky install
   ```
5. Run whatever command you need either in project root or in individual packages
   - `pnpm build` - Build all apps and packages
   - `pnpm dev` - Run all apps and packages locally
     - blog - http://localhost:3000
     - main - http://localhost:5173
   - `pnpm lint` - Lint all apps and packages
   - `pnpm clean` - Remove all auto-generated content such as `node_modules` and `dist`.

## Setting up for deployment

1. Install the following
   - [terraform CLI](https://developer.hashicorp.com/terraform/downloads)
   - [AWS CLI](https://aws.amazon.com/cli)
2. Setup AWS credentials
   ```
   aws configure
   ```

## Testing

1. Build site

   ```
   pnpm build
   ```

2. Run E2E Tests

   ```
   pnpm test:e2e
   ```

3. Benchmark deployed sites using the following services:

   - https://seoptimer.com
   - https://gtmetrix.com
