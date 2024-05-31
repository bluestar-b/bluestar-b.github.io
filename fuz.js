import Fuse from "fuse.js"

const list = [
  {
    id: "hello",
    date: "2024-04-04T00:00:00.000Z",
    title: "Test",
    author: "bluestar",
    desc: "<3",
    tags: ["test1", "test2", "OwO"],
  },
  {
    id: "hello1",
    date: "2024-04-04T00:00:00.000Z",
    title: "Test",
    author: "bluestar",
    desc: "<3",
    tags: ["UwU", "hell no", "OwO"],
  },
]

const flattenedList = list.map((item) => ({
  ...item,
  tags: item.tags.join(" "),
}))

const options = {
  includeScore: true,
  keys: ["tags", "title", "author"],
}

const fuse = new Fuse(flattenedList, options)
const result = fuse.search("blue")

console.log(result)
