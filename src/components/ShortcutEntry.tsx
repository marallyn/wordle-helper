import ShortcutDescription from "./ShortcutDescription"
import ShortcutKeys from "./ShortcutKeys"

export interface ShortcutEntryProps {
  keys: string
  description: string
  colorClasses: string
}

export function ShortcutEntry({
  colorClasses,
  description,
  keys,
}: ShortcutEntryProps) {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
      <ShortcutKeys keys={keys} />
      <ShortcutDescription
        colorClasses={colorClasses}
        description={description}
      />
    </li>
  )
}
