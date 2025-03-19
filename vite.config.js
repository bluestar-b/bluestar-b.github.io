import { defineConfig } from "vite"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"

const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|webp)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  png: {
    quality: 20,
  },
  jpeg: {
    quality: 20,
  },
  jpg: {
    quality: 20,
  },
}

export default defineConfig({
  plugins: [ViteImageOptimizer(DEFAULT_OPTIONS)],
})
