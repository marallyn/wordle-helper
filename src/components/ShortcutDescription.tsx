interface ShortcutDescriptionProps {
  colorClasses: string
  description: string
}

export default function ShortcutDescription({
  colorClasses,
  description,
}: ShortcutDescriptionProps) {
  return (
    <span className={`${colorClasses} px-3 py-1 rounded-full font-mono`}>
      {description}
    </span>
  )
}
