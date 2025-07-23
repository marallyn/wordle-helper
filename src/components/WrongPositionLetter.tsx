import { Letter } from "../types/common"
import { LetterDroppedPayload } from "../types/actions"
import useDropLetter from "../hooks/useDropLetter"

interface WrongPositionLetterProps {
  index: number
  letters: Letter[]
  onLetterDropped: (payload: LetterDroppedPayload) => void
}

const WrongPositionLetter = ({
  index,
  letters,
  onLetterDropped,
}: WrongPositionLetterProps) => {
  const { drop } = useDropLetter({
    index,
    toType: "wrong-place",
    onLetterDropped,
  })

  return (
    <div
      ref={drop}
      key={`correct-position-${index}`}
      className={`
        min-w-16 h-16 flex items-center justify-center border-2 rounded text-3xl font-bold
        ${
          letters.length > 0
            ? "bg-yellow-300 text-white border-yellow-400"
            : "bg-gray-300 text-gray-600 border-gray-400"
        }
        `}
    >
      {letters.join(",") || index + 1}
    </div>
  )
}

export default WrongPositionLetter
