import useDispatch from "../hooks/useDispatch"
import { LetterDroppedPayload } from "../types/actions"
import { Letter } from "../types/common"
import WrongPositionLetter from "./WrongPositionLetter"

interface WrongPositionPoolProps {
  letters: Letter[][]
}

export default function WrongPositionPool({ letters }: WrongPositionPoolProps) {
  const dispatch = useDispatch()
  const handleLetterDropped = (payload: LetterDroppedPayload) => {
    dispatch({
      type: "LETTER_DROPPED_ON_WRONG_POSITION",
      payload,
    })
  }

  return (
    <div className="border-2 border-dashed p-4 min-h-[150px] rounded-lg mb-2 border-gray-300 bg-gray-100">
      <h3 className="text-xl font-semibold mb-2 text-gray-700">
        Wrong Position
      </h3>
      <div className="flex justify-center space-x-2 p-2 bg-gray-200 rounded">
        {letters.map((letters, index) => (
          <WrongPositionLetter
            key={index}
            index={index}
            letters={letters}
            onLetterDropped={handleLetterDropped}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        (Drop a letter on one of the slots to mark its in-correct position.)
      </p>
    </div>
  )
}
