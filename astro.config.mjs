// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import og from 'astro-og';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        name: 'Inter',
        cssVariable: '--font-inter',
        provider: fontProviders.fontsource(),
        // Specify weights that are actually used
        weights: [400, 500, 600, 700],
        // Specify styles that are actually used
        styles: ['normal'],
        // Download only font files for characters used on the page
        subsets: ['latin', 'cyrillic'],
      },
      {
        name: 'Geist',
        cssVariable: '--font-geist',
        provider: fontProviders.fontsource(),
        // Specify weights that are actually used
        weights: [400, 500, 600, 700],
        // Specify styles that are actually used
        styles: ['normal'],
        // Download only font files for characters used on the page
        subsets: ['latin', 'cyrillic'],
      },
    ],
  },

  image: {
    remotePatterns: [{ pathname: 'http://localhost:4321/src/media/blog/*' }],
  },

  integrations: [icon(), og()],
});
