import { Button } from "@mantine/core"
import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import { IconBrandGoogle } from "@tabler/icons"
import { deepmerge } from "deepmerge-ts"
import { apiObj } from "../App.js"
import books from "../books/books.js"
import { BooksData, generateView, TBooksView } from "../books/views.js"

interface GoogleLoginButtonProps {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setView: React.Dispatch<React.SetStateAction<TBooksView>>
}

const GoogleLoginButton = ({ isLoggedIn, setIsLoggedIn, setView }: GoogleLoginButtonProps) => {
  const { api } = apiObj

  const handleLogin = async (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
    const response = await api.post("login", { headers: { Authorization: tokenResponse.access_token } })
    if (!response.ok) return

    const userid = response.headers.get("userid")
    if (!userid) return
    setIsLoggedIn(true)
    apiObj.api = api.extend({ headers: { userid } })

    const userData = await response.json()
    const updatedBooksData = deepmerge(books, userData)
    const updatedView = generateView(undefined, BooksData.parse(updatedBooksData))

    setView([...updatedView])
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => void handleLogin(tokenResponse),
    scope: "https://www.googleapis.com/auth/userinfo.email",
  })

  return isLoggedIn ? (
    <></>
  ) : (
    <Button leftIcon={<IconBrandGoogle size={20} />} variant="light" radius="md" mt="xl" onClick={() => login()}>
      Login with Google
    </Button>
  )
}

export default GoogleLoginButton
