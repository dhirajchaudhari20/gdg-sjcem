import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['gdg-logo-new.png'],
      manifest: {
        name: 'GDG on Campus SJCEM',
        short_name: 'GDG SJCEM',
        description: 'Official website of GDG on Campus SJCEM',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024 // 4MB
      }
    })
  ],
  define: {
    '__BUILD_TIME__': JSON.stringify(new Date().toLocaleString()),
  },
})
