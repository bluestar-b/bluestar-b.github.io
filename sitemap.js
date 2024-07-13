import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, extname, relative } from 'path';

function sitemapPlugin(options = {}) {
  const { baseUrl = '', outputPath = 'dist/sitemap.xml' } = options;

  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    writeBundle() {
      const files = getFiles('dist', '.html');
      const urls = files.map(file => {
        const relativePath = relative('dist', file);
        const url = new URL(relativePath, baseUrl).toString();
        return url;
      });

      const sitemap = generateSitemap(urls);
      writeFileSync(outputPath, sitemap, 'utf8');
    },
  };
}

function getFiles(dir, ext, files = []) {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      getFiles(fullPath, ext, files);
    } else if (extname(fullPath) === ext) {
      files.push(fullPath);
    }
  }
  return files;
}

function generateSitemap(urls) {
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const footer = '</urlset>';
  const body = urls.map(url => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n');
  return `${header}${body}\n${footer}`;
}

export default sitemapPlugin;

