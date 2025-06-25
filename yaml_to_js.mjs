import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";
import http from "http";
import https from "https";
import ExifReader from "exifreader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const yamlPath = path.resolve(__dirname, "images.yaml");
const jsPath = path.resolve(__dirname, "./src/images.js");

const file = fs.readFileSync(yamlPath, "utf8");
const data = YAML.parse(file);

function fetchPartial(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const options = new URL(url);
    options.headers = { Range: "bytes=0-524287" }; // first 512 KB

    client.get(options, (res) => {
      if (res.statusCode !== 206 && res.statusCode !== 200) {
        return reject(new Error(`Request failed with status code: ${res.statusCode}`));
      }

      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });
    }).on("error", reject);
  });
}



function filterImportantExif(tags) {
  if (!tags) return null;

  const width = tags["Image Width"]?.value || null;
  const height = tags["Image Height"]?.value || null;

  const lat = tags["GPSLatitude"]?.description;
  const lon = tags["GPSLongitude"]?.description;
  const latRef = tags["GPSLatitudeRef"]?.description;
  const lonRef = tags["GPSLongitudeRef"]?.description;

  const gpsLat = latRef === "S" ? -lat : lat;
  const gpsLon = lonRef === "W" ? -lon : lon;

  return {
    Make: tags["Make"]?.description || null,
    Model: tags["Model"]?.description || null,
    Software: tags["Software"]?.description || null,
    DateTimeOriginal: tags["DateTimeOriginal"]?.description || null,
    DateTime: tags["DateTime"]?.description || null,
    Resolution: {
      Width: width,
      Height: height,
      Megapixels: width && height ? Number(((width * height) / 1_000_000).toFixed(2)) : null
    },
    Orientation: tags["Orientation"]?.description || null,
    WhiteBalance: tags["WhiteBalance"]?.description || null,
    ISO: tags["ISOSpeedRatings"]?.description || null,
    ExposureTime: tags["ExposureTime"]?.description || null,
    FNumber: tags["FNumber"]?.description || null,
    ShutterSpeed: tags["ShutterSpeedValue"]?.description || null,
    Aperture: tags["ApertureValue"]?.description || null,
    FocalLength: tags["FocalLength"]?.description || null,
    FocalLength35mm: tags["FocalLengthIn35mmFilm"]?.description || tags["FocalLength35efl"]?.description || null,
    GPS: lat && lon ? { Latitude: gpsLat, Longitude: gpsLon } : null,
    Flash: tags["Flash"]?.description || null,
    ColorSpace: tags["ColorSpace"]?.description || null,
    SceneType: tags["SceneType"]?.description || null,
    LensModel: tags["LensModel"]?.description || null
  };
}




async function processImages() {
  const imagesWithExif = [];

  for (const img of data.images) {
    const url = new URL(img.image);
    const extIndex = url.pathname.lastIndexOf(".");
    const thumbPath =
      url.pathname.slice(0, extIndex) + "_thumb" + url.pathname.slice(extIndex);
    const thumbnail = url.origin + thumbPath;



    let exifData = null;
    try {
      const buffer = await fetchPartial(img.image);
      const fullExif = ExifReader.load(buffer);


 console.log(`\n📸 EXIF for ${img.image}`);
    for (const [key, tag] of Object.entries(fullExif)) {
      console.log(`${key}: ${JSON.stringify(tag, null, 2)}`);
    }


      exifData = filterImportantExif(fullExif);
    } catch (e) {
      console.warn(`Failed EXIF for ${img.image}: ${e.message}`);
    }





    imagesWithExif.push({
      ...img,
      thumbnail,
      exif: exifData,
    });
  }

  const jsOutput = `const images = ${JSON.stringify(imagesWithExif, null, 2)};\n\nexport default images;\n`;

  fs.writeFileSync(jsPath, jsOutput);
  console.log("✅ images.js with thumbnails + filtered EXIF generated from images.yaml");
}

processImages();
