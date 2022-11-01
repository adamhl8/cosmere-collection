import { Center, MantineProvider, Stack } from "@mantine/core"
import BookGroup from "./components/BookGroup.js"

const App = () => {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
      <Center>
        <Stack justify="flex-start">
          <BookGroup />
          <BookGroup />
        </Stack>
      </Center>
    </MantineProvider>
  )
}

export default App
