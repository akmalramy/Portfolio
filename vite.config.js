import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Serve files requested under /assets/* from src/assets during dev
function devAssetsMiddleware() {
  return {
    name: 'dev-assets-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        try {
          if (!req.url || !req.url.startsWith('/assets/')) return next()
          const relPath = req.url.replace(/^\/assets\//, '')
          const filePath = path.resolve(process.cwd(), 'src', 'assets', relPath)
          if (!fs.existsSync(filePath)) return next()
          const stat = fs.statSync(filePath)
          if (stat.isDirectory()) return next()
          const ext = path.extname(filePath).toLowerCase()
          const typeMap = {
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.html': 'text/html',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.svg': 'image/svg+xml',
            '.webp': 'image/webp',
            '.gif': 'image/gif'
          }
          const contentType = typeMap[ext] || 'application/octet-stream'
          res.statusCode = 200
          res.setHeader('Content-Type', contentType)
          const stream = fs.createReadStream(filePath)
          stream.pipe(res)
          stream.on('error', () => next())
        } catch (err) {
          next()
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), devAssetsMiddleware()],
})
