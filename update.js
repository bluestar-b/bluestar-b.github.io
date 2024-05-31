import { promises as fs } from "fs"
import { JSDOM } from "jsdom"

const articles = [
  { title: "Article 1", content: "Content for article 1." },
  { title: "Article 2", content: "Content for article 2." },
  // Add more articles as needed
]

async function updateHtml() {
  try {
    // Read the index.html file
    const data = await fs.readFile("index.html", "utf8")

    // Create a JSDOM instance with the HTML content
    const dom = new JSDOM(data)
    const document = dom.window.document

    // Get the articles div
    const articlesDiv = document.getElementById("articles")

    // Clear existing articles
    articlesDiv.innerHTML = ""

    // Add new articles
    articles.forEach((article) => {
      const articleDiv = document.createElement("div")
      const title = document.createElement("h2")
      title.textContent = article.title
      const content = document.createElement("p")
      content.textContent = article.content
      articleDiv.appendChild(title)
      articleDiv.appendChild(content)
      articlesDiv.appendChild(articleDiv)
    })

    // Serialize the updated DOM back to HTML
    const updatedHtml = dom.serialize()

    // Write the updated HTML back to the file
    await fs.writeFile("index.html", updatedHtml, "utf8")

    console.log("File has been updated with multiple articles.")
  } catch (err) {
    console.error("Error:", err)
  }
}

updateHtml()
