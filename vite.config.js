import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import purgecss from '@fullhuman/postcss-purgecss'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [react()],
      css: {
        devSourcemap: true,
      },
    }
  } else {
    return {
      plugins: [react(), splitVendorChunkPlugin()],
      css: {
        postcss: {
          plugins: [
            purgecss({
              content: ['./**/*.html', './src/**/*jsx', './src/**/*js '],
            }),
          ],
        },
      },
      // https://rollupjs.org/guide/en/#outputmanualchunks
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-router-dom', 'react-dom'],
            },
          },
        },
      },
    }
  }
})
