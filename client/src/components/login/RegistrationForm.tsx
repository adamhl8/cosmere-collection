import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { HTTPError } from "ky"
import { apiObj } from "../../App.js"

export interface RegistrationFormProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const RegistrationForm = ({ setIsLoggedIn }: RegistrationFormProps) => {
  const { api } = apiObj

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validateInputOnBlur: ["email"],
    validateInputOnChange: ["confirmPassword"],

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? undefined : "Invalid email"),
      confirmPassword: (value, values) => (value !== values.password ? "Passwords do not match" : undefined),
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const { email, password } = values

    try {
      await api.post("register", { json: { email, password } })
    } catch (error) {
      if (error instanceof HTTPError) {
        if (error.response.status === 409) form.setFieldError("email", "User already exists")
      } else throw error
    }

    setIsLoggedIn(true)
    apiObj.api = api.extend({ headers: { useremail: email } })
  }

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => void handleSubmit(values))}>
        <TextInput label="Email" placeholder="your@email.com" {...form.getInputProps("email")} />
        <PasswordInput mt="sm" label="Password" placeholder="Password" {...form.getInputProps("password")} />
        <PasswordInput mt="sm" label="Confirm password" placeholder="Confirm password" {...form.getInputProps("confirmPassword")} />

        <Group position="right" mt="md">
          <Button type="submit">Register</Button>
        </Group>
      </form>
    </Box>
  )
}

export default RegistrationForm
