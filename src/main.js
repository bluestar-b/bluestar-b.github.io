import "./style.css"
import Sortable from "sortablejs"

// Puzzle grid
const dragAndDropItems = document.getElementById("puzzle")
new Sortable(dragAndDropItems, {
  swapThreshold: 0.26,
  invertSwap: true,
  animation: 150,
})

const images = ["grid_0.jpg", "grid_1.jpg", "grid_2.jpg", "grid_3.jpg"]

images.forEach((img) => {
  const divElement = document.createElement("div")
  divElement.classList.add("puzzle")

  const imgElement = document.createElement("img")
  imgElement.src = `/puzzlegrid/${img}`
  imgElement.alt = `Image ${img}`
  imgElement.classList.add("w-full", "h-full", "object-fill")

  divElement.appendChild(imgElement)

  dragAndDropItems.appendChild(divElement)
})

//re-render image alt text
document.querySelectorAll("#images img").forEach((img) => {
  const altText = img.getAttribute("alt")

  if (altText) {
    const overlay = document.createElement("div")
    overlay.className =
      "absolute inset-0 text-white font-semibold text-xs p-2 opacity-0 group-hover:opacity-100 mt-1.5 rounded-r-lg bg-gray-900/50 h-fit w-fit flex transition-opacity duration-300"

    overlay.textContent = altText

    const wrapper = document.createElement("div")
    wrapper.className = "relative group w-full"
    img.parentNode.insertBefore(wrapper, img)
    wrapper.appendChild(img)
    wrapper.appendChild(overlay)
  }
})
