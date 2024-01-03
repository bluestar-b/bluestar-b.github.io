import { Tab } from "@headlessui/react"
import MessageArea from "./MessageArea"
import Link from "next/link"
import ExternalLink from "./ExternalLink"

const Tabs = () => {
  const TabStyle =
    "p-1 font-bold mr-4 ui-selected:outline-none ui-selected:border-b-2 hover:border-b-2 "
  const FavMusic = [
    {
      title: "Asu no Yozora Shoukaihan",
      artist: "Orangestar",
      link: "https://youtu.be/XogSflwXgpw",
    },
    {
      title: "Kuusou Ressha",
      artist: "Orangestar",
      link: "https://youtu.be/xzoShzMIlIM",
    },
    {
      title: "What I've done",
      artist: "Linkin Park",
      link: "https://youtu.be/8sgycukafqQ",
    },
  ]

  return (
    <Tab.Group>
      <Tab.List>
        <Tab className={TabStyle}>About</Tab>
        <Tab className={TabStyle}>Fav music</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <MessageArea>
            Hello, I'm Mac (bluestar), a 15 y/o space enthusiast 🚀. I've been
            speedrunning the process of learning Python and JavaScript for a
            year now. Golang has been my best friend for a moment. I enjoy
            network programming, cycling stuff.
          </MessageArea>
        </Tab.Panel>
        <Tab.Panel>
          <MessageArea>
            <div className="justify-start">
              {FavMusic.map((music, index) => (
                <div className="mt-2 p-3 border rounded-md" key={index}>
                  <div>
                    <div className="font-bold text-lg">
                      <ExternalLink to={music.link}>{music.title}</ExternalLink>
                    </div>{" "}
                    <div className="font-bold">
                      Artist:{" "}
                      <span className="font-semibold ">{music.artist}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MessageArea>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Tabs
