interface ShortcutKeysProps {
  keys: string
}

export default function ShortcutKeys({ keys }: ShortcutKeysProps) {
  return <span className="font-semibold text-left">{keys}</span>
}
