import "./style.css"

import TimeAgo from "javascript-time-ago"

import en from "javascript-time-ago/locale/en"

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo("en-US")

import metadata from "/metadata.json"
import Fuse from "fuse.js"


import "./dracula.css"

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

const dropdownButton = document.getElementById("dropdown-button")
const dropdownMenu = document.getElementById("dropdown-menu")
let isDropdownOpen = false

function toggleDropdown() {
  isDropdownOpen = !isDropdownOpen
  if (isDropdownOpen) {
    dropdownMenu.classList.remove("hidden", "fade-out")
    dropdownMenu.classList.add("fade-in")
  } else {
    dropdownMenu.classList.remove("fade-in")
    dropdownMenu.classList.add("fade-out")
  }
}

dropdownButton.addEventListener("click", toggleDropdown)

window.addEventListener("click", (event) => {
  if (
    !dropdownButton.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    if (isDropdownOpen) {
      dropdownMenu.classList.remove("fade-in")
      dropdownMenu.classList.add("fade-out")
    }
  }
})

function TodoList() {
  let visibleLabels = 5

  const todos = [
    { title: "Teacher's Day activity", date: "2023/06/25 00:00:00" },
    {
      title: "International Day Against Drug Abuse",
      date: "2023/06/26 00:00:00",
    },
    {
      title: "Scout Promise Review Ceremony",
      date: "2023/07/01 00:00:00",
    },
    { title: "Study trip to Phetchaburi", date: "2023/07/22 00:00:00" },
    {
      title: "Candlelight procession, Wat Dong Noi, Lopburi",
      date: "2023/07/27 00:00:00",
    },
    { title: "Scout camp", date: "2023/08/16 00:00:00" },
    { title: "Scout camp(end)", date: "2023/08/18 00:00:00" },
    {
      title: "Field trip to Bang Saen And Marine Science Museum",
      date: "2023/08/26 00:00:00",
    },
    { title: "Last activity (of the semester)", date: "2023/09/09 00:00:00" },
    { title: "Exams #1/2023", date: "2023/09/16 00:00:00" },
    { title: "Exams #2/2023", date: "2023/09/17 00:00:00" },
    { title: "Semester break starts", date: "2023/09/18 00:00:00" },
    { title: "Semester starts", date: "2023/11/05 00:00:00" },
    {
      title: "Teacher's Day and I got something!!",
      date: "2024/01/15 00:00:00",
    },
    { title: "Academic camp", date: "2024/01/20 00:00:00" },
    { title: "Field trip to Ayutthaya", date: "2024/02/20 00:00:00" },
    { title: "Trip from Lopburi to Chonburi.", date: "2024/02/29 06:00:00" },
    { title: "Exams #1/2024", date: "2024/03/02 06:00:00" },
    { title: "Exams #2/2024", date: "2024/03/03 06:00:00" },
    { title: "Semester starts", date: "2024/05/19 00:00:00" },
    { title: "My birthday 2025", date: "2025/04/03 00:00:00" },
  ].reverse()

  const loadMore = () => {
    visibleLabels += 5
    render()
  }

  const render = () => {
    const todoList = document.getElementById("todoList")
    todoList.innerHTML = ""
    todos.slice(0, visibleLabels).forEach((todo) => {
      const div = document.createElement("div")
      const span = document.createElement("span")
      span.className = "text-md"
      span.textContent = `${todo.title} - ${timeAgo.format(new Date(todo.date))}`
      div.appendChild(span)
      todoList.appendChild(div)
    })

    if (visibleLabels < todos.length) {
      const button = document.createElement("button")
      button.className = "text-blue-500"
      button.textContent = "Load More"
      button.addEventListener("click", loadMore)
      todoList.appendChild(button)
    }
  }

  render()

  return null
}

const existingTodoListElement = document.getElementById("todoList")
TodoList(existingTodoListElement)

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
const photoInfoElement = document.getElementById("photoInfo")

imageElement.src = randomIMG.src
imageElement.alt = randomIMG.alt

const linkElement = document.createElement("a")
linkElement.href = randomIMG.src
linkElement.textContent = randomIMG.alt
photoInfoElement.appendChild(linkElement)
