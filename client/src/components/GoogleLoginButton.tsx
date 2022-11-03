import { GoogleOutlined } from "@ant-design/icons"
import { Button } from "@mantine/core"
import { TokenResponse, useGoogleLogin } from "@react-oauth/google"
import ky from "ky"
import { URL } from "../App.js"

interface GoogleLoginButtonProps {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const GoogleLoginButton = ({ isLoggedIn, setIsLoggedIn }: GoogleLoginButtonProps) => {
  const handleLogin = async (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
    const response = await ky
      .post(`${URL}/api/login`, {
        headers: { Authorization: tokenResponse.access_token },
      })
      .json()
    console.log(response)
    setIsLoggedIn(true)
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => void handleLogin(tokenResponse),
    scope: "https://www.googleapis.com/auth/userinfo.email",
  })

  return isLoggedIn ? (
    <></>
  ) : (
    <Button leftIcon={<GoogleOutlined />} variant="light" radius="md" mt="xl" onClick={() => login()}>
      Login with Google
    </Button>
  )
}

export default GoogleLoginButton
