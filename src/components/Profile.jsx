"use client"
import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"
import { useEffect, useState } from "react"

const Profile = () => {
  const [clickCount, setClickcount] = useState(0)
  const handleClick = () => {
    setClickcount((prevCount) => prevCount + 1)
  }
  useEffect(() => {
    if (clickCount > 4) {
      window.location.href = "https://en.wikipedia.org/wiki/Nazi_Germany"
    }
  }, [clickCount])

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
            onClick={handleClick}
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
          <h1 className={subtitleClasses}>
            <Link href="/note">gayware dev</Link>
          </h1>
        </div>
      </div>
    </>
  )
}

export default Profile
