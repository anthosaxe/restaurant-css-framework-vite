import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';
import tailwindcss from 'tailwindcss';
import { createHtmlPlugin } from 'vite-plugin-html';

const root = resolve(__dirname, '');
const outDir = resolve(__dirname, 'dist');
const htmlDir = resolve(__dirname, 'src/html');

const htmlFiles = glob.sync(`${htmlDir}/*.html`);

const inputFiles = htmlFiles.reduce((acc, file) => {
  const name = file.replace(`${htmlDir}/`, '').replace('.html', '');
  acc[name] = file;
  return acc;
}, { index: resolve(__dirname, 'index.html') });

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          cssPath: '/assets/style-DJeIUuWn.css'
        }
      }
    }),
    tailwindcss({
      config: './tailwind.config.js'
    })
  ],
  base: '/',
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: inputFiles
    }
  }
});