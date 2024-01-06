import Photo from "./Photo"

const GalleryView = () => {
  const imageList = [
    "20231205_173740_1.jpg",
    "20231206_173932.jpg",
    "20231206_173929.jpg",
    "20231206_173942.jpg",
  ]

  const prefix = "/gallery/"

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {imageList.map((filename, index) => (
          <Photo key={index} src={`${prefix}${filename}`} />
        ))}
      </div>
    </div>
  )
}

export default GalleryView
