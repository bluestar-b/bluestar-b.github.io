import { defineConfig } from "vite";
import fs from "node:fs";

const inlineHomeStyles = {
  name: "inline-home-styles",
  apply: "build",
  transformIndexHtml: {
    order: "post",
    handler(html, context) {
      if (!context.filename.endsWith("/index.html")) return html;

      const styles = fs.readFileSync("src/styles.css", "utf8");
      return html.replace(
        /<link rel="stylesheet"[^>]*>/,
        `<style>${styles}</style>`,
      );
    },
  },
};

export default defineConfig({
  server: {
    allowedHosts: true,
  },
  preview: {
    allowedHosts: true,
  },
  plugins: [inlineHomeStyles],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        gallery: "./gallery.html",
        reimagined: "./reimagined.html",
        feed: "./feed.html",
        worker1: "./markdownWorker.js",
        worker2: "./prefetch-worker.js",
        minimal: "./minimal.html",
        article: "./megapixels_is_a_lie.html",
        pookie: "./pookie.html",
        thinkpad: "./thinkpad.html",
        imcooked: "./imcooked.html",
        countdown: "./countdown.html",
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
