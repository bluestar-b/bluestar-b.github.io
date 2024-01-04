import { Tab } from "@headlessui/react"
import MessageArea from "./MessageArea"
import FavoriteMusicList from "./FavoriteMusicList"

const Tabs = () => {
  const TabStyle =
    "p-1 font-bold mr-4 ui-selected:outline-none ui-selected:border-b-2 hover:border-b-2 "

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
            <FavoriteMusicList />
          </MessageArea>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Tabs
