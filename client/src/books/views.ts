import { z } from "zod"
import books from "./books.js"

const BookData = z.object({
  name: z.string().min(1),
  coverUrl: z.string().min(1),
  isRead: z.boolean(),
  formats: z.string().array(),
})
export type TBookData = z.infer<typeof BookData>

const BookGroupData = z.object({
  name: z.string().min(1),
  books: BookData.array(),
})
export type TBookGroupData = z.infer<typeof BookGroupData>

const BooksView = BookGroupData.array()

const { tfe, woa, hoa, aol, sos, bom, sh, tlm } = books
const { wok, wor, ed, ob, ds, row } = books
const { elantris, tes, wb, sfs, sotd, au } = books
const { ws1, ws2, ws3 } = books

const bySeries = BooksView.parse([
  {
    name: "Mistborn",
    books: [tfe, woa, hoa, aol, sos, bom, sh, tlm],
  },
  {
    name: "The Stormlight Archive",
    books: [wok, wor, ed, ob, ds, row],
  },
  {
    name: "Standalones / Novellas",
    books: [elantris, tes, wb, sfs, sotd, au],
  },
  {
    name: "White Sand",
    books: [ws1, ws2, ws3],
  },
])

export { bySeries }
