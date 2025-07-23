import { ConnectDropTarget, DropTargetMonitor, useDrop } from "react-dnd"
import { DnDTypes, DropCollectedProps, LetterItem } from "../types/drag-n-drop"
import { LetterPoolTypes } from "../types/common"
import { LetterDroppedPayload } from "../types/actions"

interface useDropLetterProps {
  onLetterDropped: (payload: LetterDroppedPayload) => void
  // onLetterDropped: (item: LetterItem, index: number) => void
  index?: number
  toType: LetterPoolTypes
}

export default function useDropLetter({
  index,
  onLetterDropped,
  toType,
}: useDropLetterProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [collectedProps, drop]: [DropCollectedProps, ConnectDropTarget] =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    useDrop<LetterItem, void, DropCollectedProps>(() => ({
      accept: DnDTypes.LETTER,
      drop: (item: LetterItem) =>
        onLetterDropped({
          fromType: item.type,
          letter: item.letter,
          toType,
          index,
        }),
      collect: (monitor: DropTargetMonitor): DropCollectedProps => ({
        isOver: monitor.isOver(),
      }),
    }))

  return { drop, isOver: collectedProps.isOver }
}
