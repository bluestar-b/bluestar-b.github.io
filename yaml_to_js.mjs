import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const yamlPath = path.resolve(__dirname, "images.yaml");
const jsPath = path.resolve(__dirname, "./src/images.js");

const file = fs.readFileSync(yamlPath, "utf8");
const data = YAML.parse(file);

const imagesWithThumbnails = data.images.map((img) => {
  const url = new URL(img.image);
  const extIndex = url.pathname.lastIndexOf(".");
  const thumbPath =
    url.pathname.slice(0, extIndex) + "_thumb" + url.pathname.slice(extIndex);
  const thumbnail = url.origin + thumbPath;
  return { ...img, thumbnail };
});

const jsOutput = `const images = ${JSON.stringify(imagesWithThumbnails, null, 2)};\n\nexport default images;\n`;

fs.writeFileSync(jsPath, jsOutput);

console.log("✅ images.js with thumbnails generated from images.yaml");
