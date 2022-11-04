import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { deepmerge } from "deepmerge-ts"
import { HTTPError, KyResponse } from "ky"
import { apiObj } from "../../App.js"
import books from "../../books/books.js"
import { BooksData, generateView, TBooksView } from "../../books/views.js"

export interface LoginFormProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setView: React.Dispatch<React.SetStateAction<TBooksView>>
}

const LoginForm = ({ setIsLoggedIn, setView }: LoginFormProps) => {
  const { api } = apiObj

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validateInputOnBlur: ["email"],

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? undefined : "Invalid email"),
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    let response: KyResponse | undefined
    try {
      response = await api.post("login", { json: values })
    } catch (error) {
      if (error instanceof HTTPError) {
        const { status } = error.response
        if (status === 404) form.setFieldError("email", "User does not exist")
        if (status === 401) form.setFieldError("password", "Incorrect password")
      } else throw error
    }

    if (!response) return

    setIsLoggedIn(true)
    apiObj.api = api.extend({ headers: { useremail: values.email } })

    const userData = await response.json()
    const updatedBooksData = deepmerge(books, userData)
    const updatedView = generateView(undefined, BooksData.parse(updatedBooksData))

    setView([...updatedView])
  }

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => void handleSubmit(values))}>
        <TextInput label="Email" placeholder="your@email.com" {...form.getInputProps("email")} />
        <PasswordInput mt="sm" label="Password" placeholder="Password" {...form.getInputProps("password")} />

        <Group position="right" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  )
}

export default LoginForm
