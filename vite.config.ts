import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetWind } from 'unocss'
import { manualChunks } from './build.config'

// https://vitejs.dev/config/
const config = defineConfig({
  base: process.env.BASE_PATH ?? '/',

  plugins: [
    vue({ reactivityTransform: true }),
    Unocss({
      presets: [
        presetAttributify(),
        presetWind(),
        presetIcons({
          scale: 1.8,
          warn: true,
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
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
      output: {
        manualChunks,
      },
    },
  },
})

export default config
