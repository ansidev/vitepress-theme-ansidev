# vitepress-theme-ansidev

This is the [VitePress](https://vitepress.vuejs.org/) theme for my [personal blog](https://ansidev.xyz/).

Please note this theme is solely dedicated for personal blog and isn't meant to be used as a content-neutral theme. It does **not** follow semver and may contain hard-coded logic specific to my personal blog.

However, if you want to use it for your VitePress site and you get into any issue, feel free to create an GitHub issue to raise your request(s). I will have a look!

## Development Setup

This repo can be developed on its own since it is a self-contained VitePress theme. Make sure to use [pnpm](https://pnpm.io/) as the package manager when installing deps. A demo app is available in `/demo` and can be run with `pnpm dev`:

```bash
pnpm install
pnpm dev
```

## Developing with Real Content

To work on this theme in the context of the `ansidev.xyz` website or a similar site (which has the same code structure) requires cloning both repos and linking the theme into the docs repo:

1. Clone repositories:

   ```bash
   # Replace the git URL without your own repository
   git clone git@github.com:ansidev/blog.git blog
   git clone git@github.com:ansidev/vitepress-theme-ansidev.git blog-theme
   ```

2. Link theme into docs repo:

   ```bash
   # In ./blog-theme
   pnpm install
   # Make vitepress-theme-ansidev available for global linking
   pnpm link --global

   # in ./blog
   pnpm install
   # Link theme
   pnpm link --global vitepress-theme-ansidev
   ```

3. Start VitePress server:

   ```bash
   # in ./blog
   pnpm dev
   ```

### Available Scripts

Here is the list of available scripts that can be used during the development.

```bash
# Boot local dev server.
$ pnpm dev

# Build demo, then serve locally. This is for testing
# production build in the local environment.
$ pnpm serve

# Run lint via Prettier.
$ pnpm lint

# Run type check via tsc.
$ pnpm type
```

## Contact

Le Minh Tri [@ansidev](https://ansidev.xyz/about).

## License

This source code is forked from https://github.com/vuejs/theme.

[MIT](./LICENSE)

Copyright (c) 2024-present Le Minh Tri
