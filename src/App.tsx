import { Center, MantineProvider, SimpleGrid } from "@mantine/core"
import { GoogleLogin } from "@react-oauth/google"
import { bySeries } from "./books/views.js"
import BookGroup from "./components/BookGroup.js"

const App = () => {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
      <Center>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse)
          }}
          onError={() => {
            console.log("Login Failed")
          }}
        />
        <SimpleGrid cols={2} spacing="xl" verticalSpacing="xl" breakpoints={[{ maxWidth: 1700, cols: 1 }]} mt="xl" mb="xl">
          {bySeries.map((group) => (
            <BookGroup key={group.name} group={group} />
          ))}
        </SimpleGrid>
      </Center>
    </MantineProvider>
  )
}

export default App
