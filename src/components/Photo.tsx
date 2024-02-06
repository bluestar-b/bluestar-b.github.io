import Image from "next/image"

const images = [
  { src: "/images/sunset.jpg", alt: "Chasing the sun on two wheels." },
  { src: "/images/looking_up.jpeg", alt: "Look!" },
  { src: "/images/road.jpeg", alt: "Just a road" },
]

const Photo = () => {
  return (
    <div className="columns-2 sm:columns-3 gap-4 my-2">
      {images.map((image, index) => (
        <div className="relative h-40 overflow-hidden" key={index}>
          <Image
            src={image.src}
            alt={image.alt}
            quality={50}
            fill
            className=" object-cover rounded-lg transition-opacity opacity-70 hover:opacity-100"
          />
        </div>
      ))}
    </div>
  )
}

export default Photo
