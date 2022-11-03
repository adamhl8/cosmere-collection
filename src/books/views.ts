import { z } from "zod"
import mistborn from "./mistborn.js"
import standalones from "./standalones.js"
import stormlight from "./stormlight.js"
import whitesand from "./whitesand.js"

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

const { tfe, woa, hoa, aol, sos, bom, sh, tlm } = mistborn
const { wok, wor, ed, ob, ds, row } = stormlight
const { elantris, tes, wb, sfs, sotd, au } = standalones
const { ws1, ws2, ws3 } = whitesand

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
