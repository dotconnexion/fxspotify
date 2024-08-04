import { defineConfig } from 'astro/config';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",
  redirects: {
    '/[...intl]/track/[...id]': '/track/[...id]'
  },
  adapter: netlify()
});