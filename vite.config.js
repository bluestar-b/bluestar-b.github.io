import { defineConfig } from "vite"
import { run } from "vite-plugin-run"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"

import fs from "fs"
import path from "path"

function getHtmlEntries(paths) {
  const entries = {}

  paths.forEach((pattern) => {
    const baseDir = path.resolve(__dirname, pattern.baseDir)
    const files = fs.readdirSync(baseDir)

    files.forEach((file) => {
      const filePath = path.join(baseDir, file)
      const stat = fs.statSync(filePath)

      if (!stat.isDirectory() && file.endsWith(".html")) {
        const name = path.relative(__dirname, filePath).replace(/\\/g, "/")
        entries[name] = filePath
      }
    })
  })

  return entries
}

const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|webp)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  png: {
    quality: 30,
  },
  jpeg: {
    quality: 30,
  },
  jpg: {
    quality: 30,
  },
}

export default defineConfig({
  plugins: [
    ViteImageOptimizer(DEFAULT_OPTIONS),

    run([
      {
        name: "Render blog",
        run: ["node", "render.js"],
        pattern: ["src/**/*.js", "contents/**/*.md", "render.js"],
      },
    ]),
  ],
  build: {
    rollupOptions: {
      input: getHtmlEntries([
        { baseDir: ".", patterns: ["index.html"] },
        { baseDir: "blog", patterns: ["*.html"] },
      ]),
    },
  },
})
