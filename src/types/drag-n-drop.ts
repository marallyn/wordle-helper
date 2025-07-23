import { Letter, LetterPoolTypes } from "./common"

export const DnDTypes = {
  LETTER: "letter",
}

export interface LetterItem {
  letter: Letter
  type: LetterPoolTypes
}

export interface DragCollectedProps {
  isDragging: boolean
}

export interface DropCollectedProps {
  isOver: boolean
}
