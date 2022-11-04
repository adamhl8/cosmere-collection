import { Button, Modal } from "@mantine/core"
import { useState } from "react"

interface LoginModalProps {
  buttonText: string
  form: JSX.Element
}

const LoginModal = ({ buttonText, form }: LoginModalProps) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal
        styles={{ modal: { border: "1px solid #373A40" } }}
        radius="md"
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        shadow="md"
        opened={opened}
        onClose={() => setOpened(false)}
        title={buttonText}
      >
        {form}
      </Modal>

      <Button variant="default" radius="md" onClick={() => setOpened(true)}>
        {buttonText}
      </Button>
    </>
  )
}

export default LoginModal
