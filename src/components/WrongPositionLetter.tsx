import { useDrag, DragSourceMonitor, ConnectDragSource } from "react-dnd"
import { DnDTypes, DragCollectedProps, LetterItem } from "../types/drag-n-drop"
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

  const hasLetters = letters.length > 0
  const letterToDrag = hasLetters ? letters[letters.length - 1] : undefined

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [{ isDragging }, drag]: [DragCollectedProps, ConnectDragSource] =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    useDrag<LetterItem, unknown, DragCollectedProps>(() => ({
      type: DnDTypes.LETTER,
      item: { letter: letterToDrag as Letter, type: "wrong-place" },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }), [letterToDrag])

  const refCallback = (el: HTMLDivElement | null) => {
    drop(el)
    if (hasLetters) {
      drag(el)
    }
  }

  return (
    <div
      ref={refCallback}
      key={`wrong-position-${index}`}
      className={`
        w-12 h-12 flex items-center justify-center border-2 rounded text-3xl font-bold select-none
        ${
          hasLetters
            ? "bg-yellow-300 text-white border-yellow-400 cursor-grab active:cursor-grabbing"
            : "bg-gray-300 text-gray-600 border-gray-400"
        }
        ${isDragging ? "opacity-50" : "opacity-100"}
        `}
    >
      {letters.join(",") || index + 1}
    </div>
  )
}

export default WrongPositionLetter
