import Photo from "./Photo"

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

  return (
    <div>
      <div className="mb-8 mt-4 grid h-full grid-cols-2 gap-4">
        {imageList.map((filename, index) => (
          <Photo key={index} src={`${prefix}${filename}`} />
        ))}
      </div>
    </div>
  )
}

export default GalleryView
