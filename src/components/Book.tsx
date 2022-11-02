import { Grid, Image } from "@mantine/core"
import { useState } from "react"
import { TBookData } from "../books/views.js"
import OwnedMultiSelect from "./OwnedMultiSelect.js"
import ReadChip from "./ReadChip.js"

interface BookProps {
  book: TBookData
}

const Book = ({ book }: BookProps) => {
  const [isRead, setIsRead] = useState(false)
  const [ownedFormats, setOwnedFormats] = useState<string[]>([])
  const bookCoverBorderColor = ownedFormats.includes("lb")
    ? "#ff8000"
    : ownedFormats.includes("hc")
    ? "#a335ee"
    : ownedFormats.includes("pb")
    ? "#0070dd"
    : ownedFormats.includes("eb")
    ? "#1eff00"
    : false

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
        <ReadChip isRead={isRead} setIsRead={setIsRead} />
      </Grid.Col>
      <Grid.Col span={4}>
        <OwnedMultiSelect ownedFormats={ownedFormats} setOwnedFormats={setOwnedFormats} />
      </Grid.Col>
    </Grid>
  )
}

export default Book
