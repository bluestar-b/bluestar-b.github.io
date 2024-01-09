import Image from "next/image"

const Photo = ({ src }) => {
  return (
    <div className="group relative">
      <Image
        alt="???????"
        quality={30}
        className="h-auto w-full rounded-lg object-cover"
        height={200}
        src={src}
        style={{
          objectFit: "cover",
        }}
        width={200}
      />
    </div>
  )
}

export default Photo
