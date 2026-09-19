import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Two independently loadable applications: the reader is not a route in the writer.
export default defineConfig({
  build: { rollupOptions: { input: { writer: resolve(import.meta.dirname, 'index.html'), reader: resolve(import.meta.dirname, 'reader.html') } } },
})
