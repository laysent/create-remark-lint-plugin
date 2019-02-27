# create-remark-lint-plugin

This scaffold helps generate an initial plugin project for [remark-lint](https://github.com/remarkjs/remark-lint).

## Usage

```bash
npx create-remark-lint-plugin plugin-name-here
```

If plugin name is not provided via arguments, it will be asked using prompts.

You can also pass `--folder` parameters to create initial project inside given subfolder. Example:

```bash
npx create-remark-lint-plugin plugin-name-here --folder packages
```

The command above will create a `remark-lint-plugin-name-here` inside `packages` folder under current running directory.
