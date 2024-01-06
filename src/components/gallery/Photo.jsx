import Image from "next/image"

const Photo = ({ src }) => {
  return (
    <div className="group relative">
      <Image
        alt="???????"
        quality={40}
        className="h-auto w-full rounded-lg object-cover"
        height={200}
        src={src}
        style={{
          objectFit: "cover",
        }}
        width={200}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 p-4 transition-all group-hover:bg-opacity-50"></div>
    </div>
  )
}

export default Photo
