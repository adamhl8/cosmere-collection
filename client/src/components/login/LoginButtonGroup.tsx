import { Button } from "@mantine/core"
import { TBooksView } from "../../books/views.js"
import LoginForm from "./LoginForm.js"
import LoginModal from "./LoginModal.js"
import RegistrationForm from "./RegistrationForm.js"

interface LoginButtonGroupProps {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setView: React.Dispatch<React.SetStateAction<TBooksView>>
}

const LoginButtonGroup = ({ isLoggedIn, setIsLoggedIn, setView }: LoginButtonGroupProps) => {
  return isLoggedIn ? (
    <></>
  ) : (
    <>
      <Button.Group mt="xl">
        <LoginModal buttonText="Login" form={<LoginForm setIsLoggedIn={setIsLoggedIn} setView={setView} />} />
        <LoginModal buttonText="Register" form={<RegistrationForm setIsLoggedIn={setIsLoggedIn} />} />
      </Button.Group>
    </>
  )
}

export default LoginButtonGroup
