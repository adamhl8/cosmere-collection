import { z } from "zod"
import mistborn from "./mistborn.js"
import stormlight from "./stormlight.js"

const BookData = z.object({
  name: z.string().min(1),
  coverUrl: z.string().min(1),
})
export type TBookData = z.infer<typeof BookData>

const BookGroupData = z.object({
  name: z.string().min(1),
  books: BookData.array(),
})
export type TBookGroupData = z.infer<typeof BookGroupData>

const BooksView = BookGroupData.array()

const { tfe, woa, hoa } = mistborn
const { wok, wor, ob } = stormlight

const bySeries = BooksView.parse([
  {
    name: "Mistborn",
    books: [tfe, woa, hoa],
  },
  {
    name: "The Stormlight Archive",
    books: [wok, wor, ob],
  },
])

export { bySeries }
