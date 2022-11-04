import { Chip } from "@mantine/core"

interface ReadChipProps {
  isRead: boolean
  handleSetIsRead: () => Promise<void>
}

const ReadChip = ({ isRead, handleSetIsRead }: ReadChipProps) => {
  return (
    <Chip variant="filled" checked={isRead} onChange={() => void handleSetIsRead()}>
      Read
    </Chip>
  )
}

export default ReadChip
