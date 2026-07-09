import { useDrag, DragSourceMonitor, ConnectDragSource } from "react-dnd"
import { DnDTypes, DragCollectedProps, LetterItem } from "../types/drag-n-drop"
import useDropLetter from "../hooks/useDropLetter"
import { LetterDroppedPayload } from "../types/actions"
import { LetterOrEmpty, Letter } from "../types/common"

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [{ isDragging }, drag]: [DragCollectedProps, ConnectDragSource] =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    useDrag<LetterItem, unknown, DragCollectedProps>(() => ({
      type: DnDTypes.LETTER,
      item: { letter: letter as Letter, type: "correct-position" },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }), [letter])

  const refCallback = (el: HTMLDivElement | null) => {
    drop(el)
    if (letter) {
      drag(el)
    }
  }

  return (
    <div
      ref={refCallback}
      key={`correct-position-${index}`}
      className={`
        w-12 h-12 flex items-center justify-center border-2 rounded text-3xl font-bold select-none
        ${
          letter
            ? "bg-green-500 text-white border-green-600 cursor-grab active:cursor-grabbing"
            : "bg-gray-300 text-gray-600 border-gray-400"
        }
        ${isDragging ? "opacity-50" : "opacity-100"}
        `}
    >
      {letter || index + 1}
    </div>
  )
}

export default CorrectPositionLetter
