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
        <a href="/blog/${item.key}">${item.title}</a>
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
          <a href="/blog/${key}">${article.title}</a>
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
    `Approximately ${distance.toFixed(2)} km away from you.🤯`
})

const dropdownButton = document.getElementById("dropdown-button")
let dropdownMenu
let isDropdownOpen = false

function createDropdownMenu() {
  const menu = document.createElement("div")
  menu.id = "dropdown-menu"
  menu.classList.add(
    "absolute",
    "right-0",
    "z-40",
    "w-40",
    "origin-top-right",
    "rounded-md",
    "bg-[#212529]",
    "bg-[#424649]",
    "font-medium",
    "shadow-lg",
    "ring-1",
    "ring-[#D6D7DC]",
    "ring-opacity-80",
  )
  menu.innerHTML = `
    <div class="p-2 py-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
      <a href="https://github.com/bluestar-b" class="mb-1 block rounded-md px-2 py-1 text-sm hover:bg-[#4d5154]" aria-label="github: bluestar-b" role="menuitem" target="_blank">Github</a>
      <a href="https://discord.com/users/8291561798035046708" aria-label="discord: bluestar.meow" class="mb-1 block rounded-md px-2 py-1 text-sm hover:bg-[#4d5154]" role="menuitem" target="_blank">Discord</a>
      <a href="https://www.instagram.com/bluestar.pics" aria-label="Instagram: bluestar.pics" class="mb-1 block rounded-md px-2 py-1 text-sm hover:bg-[#4d5154]" target="_blank" role="menuitem">Instagram</a>
      <a href="mailto:canikissfemboy@gmail.com" class="mb-1 block rounded-md px-2 py-1 text-sm hover:bg-[#4d5154]" role="menuitem">Email</a>
      <a onclick="document.body.remove();" class="mb-1 block rounded-md px-2 py-1 text-sm hover:bg-[#4d5154]" role="menuitem">Click me!!!</a>
    </div>
  `
  return menu
}

function toggleDropdown() {
  isDropdownOpen = !isDropdownOpen
  if (isDropdownOpen) {
    dropdownMenu = createDropdownMenu()
    dropdownButton.parentElement.appendChild(dropdownMenu)
  } else {
    if (dropdownMenu) {
      dropdownButton.parentElement.removeChild(dropdownMenu)
      dropdownMenu = null
    }
  }
}

dropdownButton.addEventListener("click", (event) => {
  event.stopPropagation() // Prevent the event from bubbling up to the window listener
  toggleDropdown()
})

window.addEventListener("click", (event) => {
  if (isDropdownOpen && dropdownMenu) {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownButton.parentElement.removeChild(dropdownMenu)
      dropdownMenu = null
      isDropdownOpen = false
    }
  }
})

const images = [
  { src: "/images/sunset.jpg", alt: "Chasing the sun on two wheels." },
  {
    src: "/images/anusawari_prachathipatai.jpeg",
    alt: "Anusawari Prachathipatai",
  },
  {
    src: "/images/rama8_bridge_santi_chai_prakan_park.jpeg",
    alt: "Rama 8 Bridge From Santi Chai Prakan Park",
  },
  {
    src: "/images/river_view_rama8_bridge.jpeg",
    alt: "River View From Rama 8 Bridge",
  },
  { src: "/images/sao_chingcha.jpeg", alt: "Sao Chingcha" },
  {
    src: "/images/sunset_view_from_rama8_bridge.jpeg",
    alt: "Sunset View From Rama 8 Bridge",
  },
]

const randomIMG = images[Math.floor(Math.random() * images.length)]

const imageElement = document.getElementById("randomImage")

imageElement.src = randomIMG.src
imageElement.alt = randomIMG.alt

const linkElement = document.createElement("a")
linkElement.href = randomIMG.src
linkElement.textContent = randomIMG.alt
