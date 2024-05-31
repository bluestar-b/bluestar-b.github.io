import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Marked } from "marked"
import { JSDOM } from "jsdom"

import { markedHighlight } from "marked-highlight"
import hljs from "highlight.js"

const contentsDir = path.resolve(process.cwd(), "contents")
//Output Dir for contents
const outputDir = path.resolve(process.cwd(), "blog")

const metadataFile = path.resolve(process.cwd(), "metadata.json")
let metadata = {}

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext"
      return hljs.highlight(code, { language }).value
    },
  }),
)

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
    console.log("Saved metadata for", file)
    const filePath = path.join(contentsDir, file)
    const str = fs.readFileSync(filePath, "utf8")
    const { data } = matter(str)

    console.log(data.tags)
    const baseFilename = path.basename(file, path.extname(file))
    metadata[baseFilename] = data
  }

  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2))
  console.log(`Metadata saved to ${metadataFile}`)

  for (const file of mdFiles) {
    const filePath = path.join(contentsDir, file)
    const str = fs.readFileSync(filePath, "utf8")
    const { content, data } = matter(str)

    const dom = new JSDOM(`
<!DOCTYPE html>
<html>

<head>
<title>${data.title}</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

</head>

<body class="prose md:prose-lg lg:prose-xl p-4 prose-invert prose-neutral mx-auto h-screen prose-img:rounded-xl prose-video:rounded-lg">
<h2 class="text-center">${data.title}</h1>
<div id="info" class="text-xs"></div>


<div id="tags" clsss="not-prose inline-flex">
<p class="inline-flex text-xs font-medium">Tags:</p>

</div>
</body>
</html>

`)
    const { document, window } = dom.window

    function setMetaTag(property, content) {
      let metaTag = document.querySelector(`meta[property="${property}"]\n`)
      if (!metaTag) {
        metaTag = document.createElement("meta")
        metaTag.setAttribute("property", property)
        document.head.appendChild(metaTag)
      }
      metaTag.setAttribute("content", content)
      document.head.appendChild(document.createTextNode("\n"))
    }

    function setHead(tagName, content) {
      let tag = document.querySelector(`${tagName}`)
      if (!tag) {
        tag = document.createElement(tagName)
        document.head.appendChild(tag)
      }
      tag.textContent = content

      document.head.appendChild(document.createTextNode("\n"))
    }

    const container = document.getElementById("tags")

    container.innerHTML += data.tags
      .map(
        (tag, index) => `
    <a class="inline-flex items-center text-sm text-[color:var(--link-text-color)]">${tag}${index < data.tags.length - 1 ? ", " : ""}</a>
`,
      )
      .join("")

    setMetaTag("og:title", data.title)
    setMetaTag("og:type", "website")
    setMetaTag("og:description", data.desc)

    setHead("title", data.title)
    setHead("meta", "charset=UTF-8")

    document.body.innerHTML += marked.parse(content)

    const scriptTag = document.createElement("script")
    scriptTag.setAttribute("type", "module")
    scriptTag.setAttribute("src", "/src/main.js")
    document.body.appendChild(scriptTag)

    const footer = document.createElement("footer")
    footer.className = "mt-auto text-white py-4"
    footer.innerHTML = `
      <div class="mx-auto text-center text-xs">
        Generated on ${new Date().toLocaleString()}<br/>
      </div>
    `
    document.body.appendChild(footer)

    document.getElementById("info").innerHTML =
      `Author: ${data.author}<br />Publish on: ${data.date.toLocaleString()}`

    const htmlContent = dom.serialize()

    const baseFilename = path.basename(file, path.extname(file))
    const filename = `${baseFilename}.html`
    const outputPath = path.join(outputDir, filename)
    fs.writeFileSync(outputPath, htmlContent)
    console.log(`Converted ${file} to ${filename}`)
  }
})
