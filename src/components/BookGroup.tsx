import { Card, Divider, Title } from "@mantine/core"
import bookNames from "../books.js"
import Book from "./Book.js"

const GroupTable = () => {
  const books = bookNames.map((book, i, { length }) => {
    return i + 1 !== length ? (
      <>
        <Book key={book} book={book} />
        <Divider mt="md" mb="md" />
      </>
    ) : (
      <Book key={book} book={book} />
    )
  })

  console.log(books)

  return (
    <Card sx={{ overflow: "visible", width: 800 }} mt="lg" mb="lg" shadow="md" radius="md" withBorder>
      <Title>The Stormlight Archive</Title>
      <Card.Section>
        <Divider mt="md" mb="md" />
      </Card.Section>
      {books}
    </Card>
  )
}

export default GroupTable
