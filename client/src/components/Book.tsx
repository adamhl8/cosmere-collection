import { Grid, Image } from "@mantine/core"
import { useEffect, useState } from "react"
import { apiObj } from "../App.js"
import { TBookData, TBooksView } from "../books/views.js"
import OwnedMultiSelect from "./OwnedMultiSelect.js"
import ReadChip from "./ReadChip.js"

interface BookProps {
  book: TBookData
  view: TBooksView
}

const Book = ({ book, view }: BookProps) => {
  const { api } = apiObj
  const [isRead, setIsRead] = useState(book.isRead)
  const [ownedFormats, setOwnedFormats] = useState<string[]>(book.ownedFormats)
  const bookCoverBorderColor = ownedFormats.includes("lb")
    ? "#ff8000"
    : ownedFormats.includes("hc")
    ? "#a335ee"
    : ownedFormats.includes("pb")
    ? "#0070dd"
    : ownedFormats.includes("eb")
    ? "#1eff00"
    : false

  const handleSetIsRead = async () => {
    const status = !isRead
    setIsRead(status)

    const { shortName } = book
    await api.patch("updateIsRead", { json: { [shortName]: { isRead: status } } })
  }

  const handleSetOwnedFormats = async (ownedFormats: string[]) => {
    setOwnedFormats(ownedFormats)

    const { shortName } = book
    await api.patch("updateOwnedFormats", { json: { [shortName]: { ownedFormats } } })
  }

  useEffect(() => {
    setIsRead(book.isRead)
    setOwnedFormats(book.ownedFormats)
  }, [view])

  return (
    <Grid grow justify="center" align="center">
      <Grid.Col span="auto">
        <Image
          sx={{ ...(bookCoverBorderColor && { border: `thin solid ${bookCoverBorderColor}` }), boxSizing: "content-box" }}
          styles={{ image: { filter: `grayscale(${isRead ? 0 : 1})` } }}
          width={50}
          fit="contain"
          src={book.coverUrl}
        />
      </Grid.Col>
      <Grid.Col span={2}>{book.name}</Grid.Col>
      <Grid.Col span={1}>
        <ReadChip isRead={isRead} handleSetIsRead={handleSetIsRead} />
      </Grid.Col>
      <Grid.Col span={4}>
        <OwnedMultiSelect ownedFormats={ownedFormats} handleSetOwnedFormats={handleSetOwnedFormats} />
      </Grid.Col>
    </Grid>
  )
}

export default Book
