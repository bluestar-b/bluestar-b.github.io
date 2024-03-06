import Link from "next/link"

const FavoriteMusicList = () => {
  const MusicList = [
    {
      title: "Asu no Yozora Shoukaihan",
      artist: "Orangestar",
      link: "https://youtu.be/XogSflwXgpw",
    },
    {
      title: "Natsuiro Answer",
      artist: "Orangestar",
      link: "https://youtu.be/S6_zybtKN5k",
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
    <div className="justify-center">
      {MusicList.map((music, index) => (
        <div
          className="mt-1 min-w-full overflow-hidden overflow-ellipsis"
          key={index}
        >
          <div>
            <div className="text-md">
              <span>{music.artist}</span> -{" "}
              <Link
                className="hover:underline text-[color:var(--link-text-color)]"
                href={music.link}
              >
                {music.title}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FavoriteMusicList
