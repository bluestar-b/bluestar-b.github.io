import "./style.css"

import metadata from "/metadata.json"
import Fuse from "fuse.js"

const list = Object.entries(metadata).map(([key, item]) => ({
  key,
  ...item,
  tags: Array.isArray(item.tags) ? item.tags.join(" ") : "",
}))

const options = {
  includeScore: true,
  keys: ["tags", "title", "author"],
}

const fuse = new Fuse(list, options)

function renderResults(results) {
  const resultsContainer = document.getElementById("articles")
  resultsContainer.innerHTML = ""

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found</p>"
    return
  }

  results.sort((a, b) => new Date(b.item.date) - new Date(a.item.date))

  const limitedResults = results.slice(0, 6)

  limitedResults.forEach((result) => {
    const item = result.item
    const div = document.createElement("div")
    div.classList.add("result-item")
    div.innerHTML = `
      <div>
        <a class="blog-link" aria-label="${item.title}" href="/blog/${item.key}">${item.title}</a>
      </div>
    `
    resultsContainer.appendChild(div)
  })
}

function updateHtml() {
  try {
    const articlesDiv = document.getElementById("articles")
    articlesDiv.innerHTML = ""
    for (const key in metadata) {
      const article = metadata[key]
      //      const tags = article.tags.map((tag) => `<li>${tag}</li>`).join("")
      const articleHtml = `
        <div>
          <a class="blog-link" aria-label=${article.title} href="/blog/${key}">${article.title}</a>
        </div>
      `
      articlesDiv.insertAdjacentHTML("beforeend", articleHtml)
    }

    console.log("Articles updated in the browser.")
  } catch (err) {
    console.error("Error:", err)
  }
}

updateHtml()

const searchBox = document.getElementById("searchBox")
searchBox.addEventListener("input", (e) => {
  const query = e.target.value
  if (query.trim() === "") {
    updateHtml()
  } else {
    const results = fuse.search(query)
    renderResults(results)
  }
})

async function getCoords() {
  const response = await fetch("https://ipapi.co/json/")
  const data = await response.json()
  return { latitude: data.latitude, longitude: data.longitude }
}

/*
    Calculate the great circle distance between two points
    on the Earth's surface given their latitude and longitude
    in degrees.

*/
function haversine(lat1, lon1, lat2, lon2) {
  let dLat = ((lat2 - lat1) * Math.PI) / 180.0
  let dLon = ((lon2 - lon1) * Math.PI) / 180.0

  lat1 = (lat1 * Math.PI) / 180.0
  lat2 = (lat2 * Math.PI) / 180.0

  let a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2)
  let rad = 6371
  let c = 2 * Math.asin(Math.sqrt(a))
  return Math.ceil(rad * c)
}

getCoords().then((coords) => {
  const lat2 = coords.latitude,
    lon2 = coords.longitude
  const lat1 = 14.771096,
    lon1 = 100.691103
  const distance = haversine(lat1, lon1, lat2, lon2)
  document.getElementById("distance").innerHTML =
    `Approximately ${distance.toFixed(2)} km away from you. :3`
})

document.querySelectorAll("#images img").forEach((img) => {
  const altText = img.getAttribute("alt")

  if (altText) {
    const overlay = document.createElement("div")
    overlay.className =
      "absolute inset-0 text-white font-semibold text-xs p-2 opacity-0 group-hover:opacity-100 flex transition-opacity duration-300"
    overlay.textContent = altText

    const wrapper = document.createElement("div")
    wrapper.className = "relative group w-full"
    img.parentNode.insertBefore(wrapper, img)
    wrapper.appendChild(img)
    wrapper.appendChild(overlay)
  }
})
