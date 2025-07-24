import { useDrag, DragSourceMonitor, ConnectDragSource } from "react-dnd"
import { Letter, LetterPoolTypes } from "../types/common"
import { DnDTypes, DragCollectedProps, LetterItem } from "../types/drag-n-drop"

const typeClasses = (type: LetterPoolTypes) => {
  switch (type) {
    case "available":
      return "bg-blue-500 hover:bg-blue-600 text-white"
    case "correct-position":
      return "bg-green-500 text-white"
    case "wrong-place":
      return "bg-yellow-500 text-black"
    case "not-used":
      return "bg-gray-400 text-white"
  }
}

interface LetterProps {
  letter: Letter
  selectedLetter: Letter | null
  type: LetterPoolTypes
}

const LetterBox = ({ letter, selectedLetter, type }: LetterProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [{ isDragging }, drag]: [DragCollectedProps, ConnectDragSource] =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    useDrag<LetterItem, unknown, DragCollectedProps>(() => ({
      type: DnDTypes.LETTER,
      item: { letter, type },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }))

  const classes =
    letter === selectedLetter ? "bg-red-400 text-white" : typeClasses(type)

  return (
    <div
      ref={drag}
      className={`
        p-1 m-1 rounded-lg text-2xl font-bold w-10 h-10
        ${classes}
        ${isDragging ? "opacity-50" : "opacity-100"}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
    `}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {letter}
    </div>
  )
}

export default LetterBox
