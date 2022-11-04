import { MultiSelect } from "@mantine/core"
import { useState } from "react"

const multiSelectValueStyle = {
  '.mantine-MultiSelect-value[value="eb"]': {
    color: "#1eff00",
  },

  '.mantine-MultiSelect-value[value="pb"]': {
    color: "#0070dd",
  },

  '.mantine-MultiSelect-value[value="hc"]': {
    color: "#a335ee",
  },

  '.mantine-MultiSelect-value[value="lb"]': {
    color: "#ff8000",
  },
}

interface OwnedMultiSelectProps {
  ownedFormats: string[]
  handleSetOwnedFormats: (ownedFormats: string[]) => Promise<void>
}

const OwnedMultiSelect = ({ ownedFormats, handleSetOwnedFormats }: OwnedMultiSelectProps) => {
  const [data, setData] = useState([
    { value: "eb", label: "eBook" },
    { value: "pb", label: "Paperback" },
    { value: "hc", label: "Hardcover" },
    { value: "lb", label: "Leatherbound" },
  ])

  return (
    <MultiSelect
      sx={multiSelectValueStyle}
      label="Owned Formats"
      data={data}
      placeholder="Select or add formats"
      searchable
      creatable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => {
        const item = { value: query, label: query }
        setData((current) => [...current, item])
        return item
      }}
      value={ownedFormats}
      onChange={(ownedFormats) => void handleSetOwnedFormats(ownedFormats)}
    />
  )
}

export default OwnedMultiSelect
