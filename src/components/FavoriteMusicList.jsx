import ExternalLink from "./ExternalLink"

const FavoriteMusicList = () => {
  const MusicList = [
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
    <div className="justify-start">
      {MusicList.map((music, index) => (
        <div className="mt-2 w-full rounded-md border p-3" key={index}>
          <div>
            <div className="text-lg font-bold">
              <ExternalLink to={music.link}>{music.title}</ExternalLink>
            </div>{" "}
            <div className="font-bold">
              Artist: <span className="font-semibold ">{music.artist}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FavoriteMusicList
