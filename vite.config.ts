import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import presetWind from '@unocss/preset-wind'
import presetAttributify from '@unocss/preset-attributify'
import { resolve } from 'path'

// https://vitejs.dev/config/
const config = defineConfig({
  base: process.env.BASE_PATH ?? '/',

  plugins: [
    vue({ reactivityTransform: true }),
    Unocss({
      presets: [presetWind, presetAttributify],
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, '/src'),
    },
  },
})

export default config
