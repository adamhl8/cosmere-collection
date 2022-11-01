import { Chip } from "@mantine/core"

interface ReadChipProps {
  isRead: boolean
  setIsRead: React.Dispatch<React.SetStateAction<boolean>>
}

const ReadChip = ({ isRead, setIsRead }: ReadChipProps) => {
  return (
    <Chip variant="filled" checked={isRead} onChange={() => setIsRead((v) => !v)}>
      Read
    </Chip>
  )
}

export default ReadChip
