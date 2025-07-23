import { Action } from "./actions"
import { Letter, LetterOrEmptyArray, Word } from "./common"

export interface AppState {
  availableLetters: Letter[]
  correctLetters: LetterOrEmptyArray
  remainingWords: Word[]
  selectedLetter: Letter | null
  shortcutsModalOpen: boolean
  unusedLetters: Letter[]
  wrongLetters: Letter[][]
  wrongLetterSet: Set<Letter>
}

export interface DispatchState {
  dispatch: React.Dispatch<Action>
}
