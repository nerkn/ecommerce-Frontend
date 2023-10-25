import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: '/',
  plugins: [
    svgr({
      exportAsDefault: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '/src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: true,
    port: 3053,
    proxy: {
      '/api': 'http://backend:3000',
      '/api2': 'http://backend:3000',
      '/admin': 'http://backoffice:3300',
    },
  },
  preview: {
    port: 3053,
  },

  build: {
    sourcemap: false,
    modulePreload: {
      resolveDependencies: (url, deps, context) => {
        return []
      },
    },
    rollupOptions: {
      output: {
        sourcemap: false,
        /*
        manualChunks: {
          radix: ['@radix-ui/react-slot'],
          router: ['wouter', 'zustand'],
        },
        */
      },
    },
  },
})
