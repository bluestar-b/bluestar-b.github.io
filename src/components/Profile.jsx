import Image from "next/image"
import clsx from "clsx"

const Profile = () => {
  const imageContainerClasses = clsx(
    "h-32",
    "w-32",
    "object-fill",
    "md:h-48",
    "md:w-48",
  )
  const imageClasses = clsx("rounded-xl")
  const titleClasses = clsx("text-2xl", "font-bold", "md:text-4xl")
  const subtitleClasses = clsx("text-sm", "md:text-lg", "font-semibold")

  return (
    <>
      <div className="flex h-fit items-center space-x-4">
        <div className={imageContainerClasses}>
          <Image
            className={imageClasses}
            width={180}
            height={180}
            quality={80}
            src="/pfp.jpeg"
            alt="Profile picture"
          />
        </div>
        <div className="">
          <h1 className={titleClasses}>bluestar</h1>
          <h1 className={subtitleClasses}>gayware dev</h1>
        </div>
      </div>
    </>
  )
}

export default Profile
