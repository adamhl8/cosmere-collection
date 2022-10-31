import { MantineProvider } from "@mantine/core"

const App = () => {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
      <h1>:)</h1>
    </MantineProvider>
  )
}

export default App
