import { Center, Group, Image, MantineProvider, SimpleGrid, Stack, Title } from "@mantine/core"
import { useState } from "react"
import { bySeries } from "./books/views.js"
import BookGroup from "./components/BookGroup.js"
import GoogleLoginButton from "./components/GoogleLoginButton.js"

export const URL = "http://localhost:3000"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
      <Center>
        <Stack align="center" justify="flex-start" mt="xl">
          <Group>
            <Image src="/cosmere_symbol.svg" width={50} styles={{ image: { filter: `brightness(0) invert(1)` } }}></Image>
            <Title>Cosmere Collection</Title>
          </Group>
          <GoogleLoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <SimpleGrid cols={2} spacing="xl" verticalSpacing="xl" breakpoints={[{ maxWidth: 1700, cols: 1 }]} mt="xl" mb="xl">
            {bySeries.map((group) => (
              <BookGroup key={group.name} group={group} />
            ))}
          </SimpleGrid>
        </Stack>
      </Center>
    </MantineProvider>
  )
}

export default App
