import LetterBox from "./LetterBox"
import { Letter, LetterPoolTypes } from "../types/common"
import { LetterDroppedPayload } from "../types/actions"
import useDropLetter from "../hooks/useDropLetter"

interface LetterPoolProps {
  letters: Letter[]
  onLetterDropped: (payload: LetterDroppedPayload) => void
  selectedLetter: Letter | null
  title: string
  type: LetterPoolTypes
}

export default function LetterPool({
  letters,
  onLetterDropped,
  selectedLetter,
  title,
  type,
}: LetterPoolProps) {
  const { drop, isOver } = useDropLetter({
    toType: type,
    onLetterDropped,
  })

  return (
    <div
      ref={drop}
      className={`
        border-2 border-dashed p-4 min-h-[150px] rounded-lg mb-2
        ${isOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-100"}
        flex flex-wrap items-start content-start
      `}
    >
      <h3 className="w-full text-xl font-semibold mb-2 text-gray-700">
        {title}
      </h3>

      {letters.map(letter => (
        <LetterBox
          key={`letter-${letter}`}
          letter={letter}
          selectedLetter={selectedLetter}
          type={type}
        />
      ))}
    </div>
  )
}
