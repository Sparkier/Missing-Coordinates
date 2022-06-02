# Contributing

Thank you for considering contributing to **missing-coordinates**.
We hope these guidelines make it easier and shed some light on our approach and processes.

## File organization

We use [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to manage packages in this monorepo.

```
missing-coordinates/
  package.json
  packages/
    missing-coordinates/
      package.json
      src/
      ...
    storybook/
      package.json
      stories/
      ...
  ...
```

## Development

To develop and enhance **missing-coordinates**, we provide both a npm package for the main functionality, and a storybook package for demo, visualization, and debugging purposes.

### Run storybook

```sh
yarn storybook
```

### Run missing-coordinates in dev mode (interactive rebuilds)

```sh
cd packages/missing-coordinates
yarn dev
```

### Build missing coordinates

```sh
yarn build
```

## Committing

This repository follows
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) guideline for commit
messages and has a `commitlint` hook which will require you to have the valid commit message before
committing.

You can use `cz` to help you create a commit message.
