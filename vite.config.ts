/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import presetWind from '@unocss/preset-wind'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import { manualChunks } from './build.config'
import { devPlugin, getReplacer, buildPlugin } from './plugins'
import optimizer from 'vite-plugin-optimizer'

// https://vitejs.dev/config/
const config = defineConfig({
  base: process.env.BASE_PATH ?? '/',

  plugins: [
    optimizer(getReplacer()),
    devPlugin(),
    vue({ reactivityTransform: true }),
    Unocss({
      presets: [
        presetAttributify(),
        presetWind(),
        presetIcons({ scale: 1.8, warn: true }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, '/src'),
    },
  },
  build: {
    rollupOptions: {
      plugins: [buildPlugin()],
      output: {
        manualChunks,
      },
    },
  },
})

export default config
