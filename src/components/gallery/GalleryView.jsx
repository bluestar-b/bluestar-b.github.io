import { useState } from "react"
import Photo from "./Photo"
import Badge from "../Badge"
const GalleryView = () => {
  const imageList = [
    "20231205_173740_1.jpg",
    "20231206_173932.jpg",
    "20231206_173929.jpg",
    "20231206_173942.jpg",
    "IMG_20240112_170415.jpg",
    "IMG_20231226_172709_1.jpg",
    "1697118730304.jpg",
  ]

  const prefix = "/gallery/"
  const imagesPerPage = 4

  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * imagesPerPage
  const endIndex = startIndex + imagesPerPage

  const visibleImages = imageList.slice(startIndex, endIndex)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <div className="mt-4 flex">
        {[...Array(Math.ceil(imageList.length / imagesPerPage)).keys()].map(
          (pageNumber) => (
            <button
              Hoverable
              key={pageNumber + 1}
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              <Badge Hoverable>{pageNumber + 1}</Badge>
            </button>
          ),
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {visibleImages.map((filename, index) => (
          <Photo key={index} src={`${prefix}${filename}`} />
        ))}
      </div>
    </div>
  )
}

export default GalleryView
