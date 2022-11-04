import { Center, Group, Image, MantineProvider, SimpleGrid, Stack, Title } from "@mantine/core"
import ky from "ky"
import { useState } from "react"
import { bySeries } from "./books/views.js"
import BookGroup from "./components/BookGroup.js"
import GoogleLoginButton from "./components/GoogleLoginButton.js"

export const apiObj = { api: ky.create({ prefixUrl: "https://cosmerecollection.com/api" }) }

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [view, setView] = useState(bySeries)

  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
      <Center>
        <Stack align="center" justify="flex-start" mt="xl">
          <Group>
            <Image src="/cosmere_symbol.svg" width={50} styles={{ image: { filter: `brightness(0) invert(1)` } }}></Image>
            <Title>Cosmere Collection</Title>
          </Group>
          <GoogleLoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setView={setView} />
          <SimpleGrid cols={2} spacing="xl" verticalSpacing="xl" breakpoints={[{ maxWidth: 1700, cols: 1 }]} mt="xl" mb="xl">
            {view.map((group) => (
              <BookGroup key={group.name} group={group} view={view} />
            ))}
          </SimpleGrid>
        </Stack>
      </Center>
    </MantineProvider>
  )
}

export default App
