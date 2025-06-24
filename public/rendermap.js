import pkg from "dotted-map";
const { getMapJSON } = pkg;

import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function precompute() {
  try {
    const mapJsonString = getMapJSON({ height: 60, grid: "vertical" });
    const savePath = path.join(__dirname, "public", "map.json");
    await writeFile(savePath, mapJsonString);
    console.log(`Map JSON precomputed and saved to ${savePath}`);
  } catch (e) {
    console.error("Failed to precompute map:", e);
  }
}

precompute();
