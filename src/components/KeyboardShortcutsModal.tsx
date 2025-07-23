import { ShortcutEntry, ShortcutEntryProps } from "./ShortcutEntry"

const shortcutEntries: ShortcutEntryProps[] = [
  {
    keys: "? / Esc",
    colorClasses: "bg-green-200 text-green-800",
    description: "show / hide Shortcuts (this modal!)",
  },
  {
    keys: "a-z",
    colorClasses: "bg-blue-200 text-blue-800",
    description: "selects the available letter",
  },
  {
    keys: "With letter selected...",
    description: "",
    colorClasses: "",
  },
  {
    keys: "a",
    colorClasses: "bg-purple-200 text-purple-800",
    description: "move selected letter to available pool",
  },
  {
    keys: "u",
    colorClasses: "bg-purple-200 text-purple-800",
    description: "move selected letter to unused pool",
  },
  {
    keys: "1, 2, 3, 4, 5",
    colorClasses: "bg-purple-200 text-purple-800",
    description: "adds letter to position 1-5 in the ,correct letter pool",
  },
  {
    keys: "shift + 1, 2, 3, 4, 5",
    colorClasses: "bg-purple-200 text-purple-800",
    description: "adds letter to position 1-5 in the ,wrong letter pool",
  },
]

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

const KeyboardShortcutsModal = ({
  isOpen,
  onClose,
}: KeyboardShortcutsModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full transform transition-all duration-300 scale-100 opacity-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={() => onClose()}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition-colors duration-200"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="text-gray-700 text-lg">
          <ul className="list-none space-y-3 text-sm">
            {shortcutEntries.map(
              (
                { keys, colorClasses, description }: ShortcutEntryProps,
                index: number,
              ) => (
                <ShortcutEntry
                  key={index}
                  keys={keys}
                  colorClasses={colorClasses}
                  description={description}
                />
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default KeyboardShortcutsModal
