import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        gallery: "./gallery.html",
        reimagined: "./reimagined.html",
        yap: "./yap.html",
        worker1: "./markdownWorker.js",
        worker2: "./prefetch-worker.js",
        minimal: "./minimal.html",
      },
    },
  },
});

/*
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
	*/
