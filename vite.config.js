import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import resolve from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['chunk-DIPWBXXG.js?v=cf204dfb'],
  },
})
