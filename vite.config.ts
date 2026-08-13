import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 把 @ 映射到 src 文件夹
      '@': path.resolve(__dirname, './src')
    }
  }
})