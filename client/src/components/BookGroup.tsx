import { Card, Divider, Title } from "@mantine/core"
import { Fragment } from "react"
import { TBookGroupData } from "../books/views.js"
import Book from "./Book.js"

interface BookGroupProps {
  group: TBookGroupData
}

const BookGroup = ({ group }: BookGroupProps) => {
  const books = group.books.map((book, i, { length }) => {
    return i + 1 !== length ? (
      <Fragment key={book.name}>
        <Book book={book} />
        <Divider mt="md" mb="md" />
      </Fragment>
    ) : (
      <Book key={book.name} book={book} />
    )
  })

  return (
    <Card sx={{ overflow: "visible", width: 800 }} shadow="md" radius="md" withBorder>
      <Title>{group.name}</Title>
      <Card.Section>
        <Divider mt="md" mb="md" />
      </Card.Section>
      {books}
    </Card>
  )
}

export default BookGroup
