import { Center, MantineProvider, Stack } from "@mantine/core"
import { bySeries } from "./books/views.js"
import BookGroup from "./components/BookGroup.js"

const App = () => {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
      <Center>
        <Stack justify="flex-start">
          {bySeries.map((group) => (
            <BookGroup key={group.name} group={group} />
          ))}
        </Stack>
      </Center>
    </MantineProvider>
  )
}

export default App
