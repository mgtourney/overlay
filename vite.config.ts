import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@RelayCon': path.resolve(__dirname, './src/helpers/RelayConnection.ts'),
      '@GenTypes': path.resolve(__dirname, './src/types/general.d.ts'),
    }
  },
  plugins: [vue()]
})
