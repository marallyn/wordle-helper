import useDropLetter from "../hooks/useDropLetter"
import { LetterDroppedPayload } from "../types/actions"
import { LetterOrEmpty } from "../types/common"

interface CorrectPositionLetterProps {
  index: number
  letter: LetterOrEmpty
  onLetterDropped: (payload: LetterDroppedPayload) => void
}

const CorrectPositionLetter = ({
  index,
  letter,
  onLetterDropped,
}: CorrectPositionLetterProps) => {
  const { drop } = useDropLetter({
    index,
    toType: "correct-position",
    onLetterDropped,
  })

  return (
    <div
      ref={drop}
      key={`correct-position-${index}`}
      className={`
        w-12 h-12 flex items-center justify-center border-2 rounded text-3xl font-bold
        ${
          letter
            ? "bg-green-500 text-white border-green-600"
            : "bg-gray-300 text-gray-600 border-gray-400"
        }
        `}
    >
      {letter || index + 1}
    </div>
  )
}

export default CorrectPositionLetter
