import fs from 'fs'
import path from 'path'

const srcDir = path.resolve(process.cwd(), 'src', 'assets')
const outDir = path.resolve(process.cwd(), 'dist', 'assets')

async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true })
  const entries = await fs.promises.readdir(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else if (entry.isFile()) {
      await fs.promises.copyFile(srcPath, destPath)
    }
  }
}

async function run() {
  try {
    if (!fs.existsSync(srcDir)) {
      console.log('No src/assets folder found — skipping copy.')
      return
    }
    await copyDir(srcDir, outDir)
    console.log('Assets copied to dist/assets')
  } catch (err) {
    console.error('Failed to copy assets:', err)
    process.exit(1)
  }
}

run()
