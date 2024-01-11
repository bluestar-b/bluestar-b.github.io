"use client"
import { Tab } from "@headlessui/react"
import MessageArea from "./MessageArea"
import FavoriteMusicList from "./FavoriteMusicList"
import GalleryView from "./gallery/GalleryView"
import Link from "next/link"
import Image from "next/image"

const Tabs = () => {
  const TabStyle =
    "p-1 font-bold mr-4 ui-selected:outline-none dark:ui-selected:border-white ui-selected:border-black ui-selected:border-b-2 hover:border-b-2"

  return (
    <Tab.Group>
      <Tab.List>
        <Tab className={TabStyle}>About</Tab>
        <Tab className={TabStyle}>Fav music</Tab>
        <Tab className={TabStyle}>Gallery</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <MessageArea>
            Hello, I&apos;m Mac (aka bluestar),
            <br />
            A 15 y/o space enthusiast and a non-formal student 🚀. Back in 2020,
            since I discovered what programming is and started learning more
            about it, I incredibly understood it faster. I focused on it too
            much, and this way, I&apos;ve been speedrunning the process of learning
            <LinkIcon href="https://python.org/" icon="/icons/python.svg">
              Python
            </LinkIcon>
            and
            <LinkIcon icon="/icons/javascript.svg">JavaScript</LinkIcon>for a
            year now.
            <LinkIcon href="https://go.dev/" icon="/icons/golang.svg">
              Golang
            </LinkIcon>
            has been my best friend for a moment. I enjoy network programming,
            cycling stuff.
            <div className="mb-4 mt-1">
              <div className="text-base font-light italic leading-relaxed text-pink-600 dark:text-pink-300">
                &quot;Life is boring, but life still has colors to explore. Find
                a new color or make that color yourself.&quot;
              </div>
              - 2023
            </div>
          </MessageArea>
        </Tab.Panel>
        <Tab.Panel>
          <MessageArea>
            <FavoriteMusicList />
          </MessageArea>
        </Tab.Panel>
        <Tab.Panel>
          <GalleryView />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

const LinkIcon = ({ children, href, icon }) => {
  return (
    <Link
      href={href || ""}
      className="ml-1 mr-1 inline-flex items-center rounded border border-neutral-400 bg-neutral-200 p-1 text-sm leading-4 text-black no-underline dark:border-neutral-500 dark:bg-neutral-900 dark:text-white"
    >
      <Image
        src={icon}
        alt="icon"
        className="mr-1 h-4 w-auto"
        width={32}
        height={32}
      />{" "}
      {children}
    </Link>
  )
}

export default Tabs
