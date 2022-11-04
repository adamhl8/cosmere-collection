import { z } from "zod"
import defaultBooksData from "./books.js"

export const BookData = z.object({
  shortName: z.string().min(1),
  name: z.string().min(1),
  coverUrl: z.string().min(1),
  isRead: z.boolean(),
  ownedFormats: z.string().array(),
})
export type TBookData = z.infer<typeof BookData>

export const BooksData = z.record(z.string().min(1), BookData)
export type TBooksData = z.infer<typeof BooksData>

const BookGroupData = z.object({
  name: z.string().min(1),
  books: BookData.array(),
})
export type TBookGroupData = z.infer<typeof BookGroupData>

const BooksView = BookGroupData.array()
export type TBooksView = z.infer<typeof BooksView>

interface BookGroupTemplate {
  name: string
  books: string[]
}
type BooksViewTemplate = BookGroupTemplate[]

const bySeriesTemplate = [
  {
    name: "Mistborn",
    books: ["tfe", "woa", "hoa", "aol", "sos", "bom", "sh", "tlm"],
  },
  {
    name: "The Stormlight Archive",
    books: ["wok", "wor", "ed", "ob", "ds", "row"],
  },
  {
    name: "Standalones / Novellas",
    books: ["elantris", "tes", "wb", "sfs", "sotd", "au"],
  },
  {
    name: "White Sand",
    books: ["ws1", "ws2", "ws3"],
  },
]

export const generateView = (viewTemplate: BooksViewTemplate = bySeriesTemplate, booksData: TBooksData = defaultBooksData) => {
  const view = []

  for (const groupTemplate of viewTemplate) {
    const books = []

    for (const bookKey of groupTemplate.books) {
      const bookData = booksData[bookKey]
      if (!bookData) continue
      books.push(bookData)
    }

    const group: TBookGroupData = {
      name: groupTemplate.name,
      books,
    }

    view.push(group)
  }

  return BooksView.parse(view)
}

const bySeries = generateView(bySeriesTemplate)

export { bySeries }
