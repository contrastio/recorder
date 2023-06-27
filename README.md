# Vite React TypeScript

Vite starter template with opinionated predefined settings.

## Features

- [Vite](https://vitejs.dev/) with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/) and [Prettier](https://prettier.io/)
- Pre-commit hook with [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged)
- Static typing for CSS modules with [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules)
- [PostCSS Nesting](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting)
- Import aliases for an opinionated folder structure (can be customized in [vite.config.ts](vite.config.ts)). Highly inspired by [Robin Wieruch's post](https://www.robinwieruch.de/react-folder-structure)

## Getting started

Use this repository as a [GitHub template](https://github.com/Volcomix/vite-react-ts/generate) or use [degit](https://github.com/Rich-Harris/degit) to scaffold your project locally:

```bash
npx degit volcomix/vite-react-ts my-project
cd my-project

yarn
yarn dev
```

## VSCode integration

You need to [use the workspace version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript) in order to get CSS modules static typing working. See the [TypeScript plugin repository](https://github.com/mrmckeb/typescript-plugin-css-modules#visual-studio-code) for advanced usage.

This starter template works well with the following extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)

Fix all, organize imports and format on save work seamlessly when configured in user or workspace settings:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```
