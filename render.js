import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { JSDOM } from "jsdom"
import markdownit from "markdown-it"
import Shiki from "@shikijs/markdown-it"

import { execSync } from "child_process"

const contentsDir = path.resolve(process.cwd(), "contents")
const outputDir = path.resolve(process.cwd(), "blog")
const metadataFile = path.resolve(process.cwd(), "metadata.json")
let metadata = {}

const md = new markdownit({
  html: true,
})
md.use(
  await Shiki({
    theme: "andromeeda",
  }),
)

const commitID = execSync("git rev-parse --short HEAD", {
  encoding: "utf8",
}).trim()

const options = {
  weekday: "short",
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
}

async function processFile(file) {
  console.log("Processing", file)
  const filePath = path.join(contentsDir, file)
  const str = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(str)

  const baseFilename = path.basename(file, path.extname(file))
  metadata[baseFilename] = data

  const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="en">

<head>
<title>${data.title}</title>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap')
    </style>
      
</head>

<body class="prose md:prose-lg lg:prose-3xl p-2 prose-h1:text-3xl prose-invert prose-neutral mx-auto h-screen prose-img:rounded-xl prose-video:rounded-lg">
<h2 class="text-center theme-toggle">${data.title}</h2>

<div id="info" class="text-sm font-bold"></div>
<div id="tags" class="not-prose items-center">
<p class="inline-flex text-xs font-bold">Tags:</p>
</div>
</body>
</html>
`)

  const { document } = dom.window

  function setMetaTag(property, content) {
    let metaTag = document.querySelector(`meta[property="${property}"]`)
    if (!metaTag) {
      metaTag = document.createElement("meta")
      metaTag.setAttribute("property", property)
      document.head.appendChild(metaTag)
    }
    metaTag.setAttribute("content", content)
  }

  function setHead(tagName, content) {
    let tag = document.querySelector(tagName)
    if (!tag) {
      tag = document.createElement(tagName)
      document.head.appendChild(tag)
    }
    tag.textContent = content
  }

  const container = document.getElementById("tags")
  container.innerHTML += data.tags
    .map(
      (tag, index) =>
        `<a class="inline-flex items-center text-sm font-bold text-[color:var(--link-text-color)]">${tag}${index < data.tags.length - 1 ? ", " : ""}</a>`,
    )
    .join("")

  setMetaTag("og:title", data.title)
  setMetaTag("og:type", "website")
  setMetaTag("og:description", data.desc)

  setHead("title", data.title)
  setHead("meta", "charset=UTF-8")

  document.body.innerHTML += md.render(content)

  const scriptTag = document.createElement("script")
  scriptTag.setAttribute("type", "module")
  scriptTag.setAttribute("src", "/src/main.js")
  document.body.appendChild(scriptTag)

  /*
  const footer = document.createElement("footer");
  footer.className = "mt-auto text-white py-4";
  footer.innerHTML = `<div class="mx-auto text-center text-xs">Generated on ${new Date().toLocaleString()}<br/></div>`;
  document.body.appendChild(footer);
*/
  document.getElementById("info").innerHTML =
    `Author: ${data.author}<br />Publish on: ${new Date(data.date).toLocaleString("en-GB", options)}<br/>Commit ID: ${commitID}`

  const htmlContent = dom.serialize()

  const outputPath = path.join(outputDir, `${baseFilename}.html`)
  fs.writeFileSync(outputPath, htmlContent)
  console.log(`Converted ${file} to ${baseFilename}.html`)
}

fs.readdir(contentsDir, async (err, files) => {
  if (err) {
    console.error("Error reading directory:", err)
    return
  }
  const mdFiles = files.filter((file) => path.extname(file) === ".md")

  if (mdFiles.length === 0) {
    console.log("No Markdown files found.")
    return
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  for (const file of mdFiles) {
    await processFile(file)
  }

  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2))
  console.log(`Metadata saved to ${metadataFile}`)
})
