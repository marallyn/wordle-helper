import useDispatch from "../hooks/useDispatch"
import { LetterDroppedPayload } from "../types/actions"
import { LetterOrEmpty } from "../types/common"
import CorrectPositionLetter from "./CorrectPositionPoolLetter"

interface CorrectPositionPoolProps {
  letters: LetterOrEmpty[]
}

const CorrectPositionPool = ({ letters }: CorrectPositionPoolProps) => {
  const dispatch = useDispatch()
  const handleLetterDropped = (payload: LetterDroppedPayload) => {
    dispatch({
      type: "LETTER_DROPPED_ON_CORRECT_POSITION",
      payload,
    })
  }

  return (
    <div className="border-2 border-dashed p-4 min-h-[150px] rounded-lg mb-2 border-gray-300 bg-gray-100">
      <h3 className="text-xl font-semibold mb-2 text-gray-700">
        Correct Position
      </h3>
      <div className="flex justify-center space-x-2 p-2 bg-gray-200 rounded">
        {letters.map((letter, index) => (
          <CorrectPositionLetter
            key={index}
            index={index}
            letter={letter}
            onLetterDropped={handleLetterDropped}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        (Drop a letter on one of the slots to mark its correct position.)
      </p>
    </div>
  )
}

export default CorrectPositionPool
