# Contribution Guide

## Project overview

This project is largely managed by the following tools:

- [devenv](https://devenv.sh) - for development shell and dependencies. Think of [Docker](https://docker.com) but better.
- [turborepo](https://turbo.build) - for JS/TS monorepo management. Understanding it is required to make sense of the project file structure.

You need at least basic level understanding of the tools above to effectively work on this project.

## Setting up

1. Install the following
   - [devenv](https://devenv.sh/getting-started)
   - [direnv](https://direnv.net/docs/installation.html)
2. Clone this git repository
3. Start coding!

## Building

must build the dependencies first

```
pnpm build
```

## Testing

1. Run E2E Tests

   ```
   pnpm test:e2e
   ```

2. Benchmark deployed sites using the following services:

   - https://seoptimer.com
   - https://gtmetrix.com
