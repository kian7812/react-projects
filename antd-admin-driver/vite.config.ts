import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [react(), mockDevServerPlugin(),],
  server: {
    proxy: {
      // ✅vite-plugin-mock-dev-server 
      // 以 middleware 的方式，对 server.proxy 配置的代理路径 进行二次拦截，命中规则后，返回配置的 mock data 。
      '/mock-local-api': '',

      // ✅本地开发
      "/local-api": {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        prependPath: true,
        rewrite: (path) => path.replace(/^\/local-api/, ''), // ✅
      },

      // https://jsonplaceholder.typicode.com/posts
      // /mock-local/api/post
    }
  }
})
