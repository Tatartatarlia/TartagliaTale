import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 项目页地址为 https://<用户>.github.io/<仓库名>/
// 部署时在 CI 里设置环境变量 BASE_PATH=/仓库名/（首尾带斜杠）
// 本地开发保持默认 '/' 即可
const base = process.env.BASE_PATH ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
