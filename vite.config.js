import { defineConfig } from "vite"
import { resolve } from "path"
import { glob } from "glob"
import tailwindcss from "tailwindcss"

const root = resolve(__dirname, '')
const outDir = resolve(__dirname, 'dist')
const htmlDir = resolve(__dirname, 'rc/src/html')

const htmlFiles = glob.sync(`${htmlDir}/*.html`).reduce((acc, file) => {
    const key = file.replace(`${htmlDir}/`, '').replace('.html', '')
    acc[key] = file
    return acc
  }, {})

export default {
    plugins: [
        tailwindcss({
          config: './tailwind.config.js'
        })
      ],
  base: '/restaurant-css-framework/',
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
        input: htmlFiles
    }
  },
  optimizeDeps: {
    include: ['src/**/*.html']
  }
}