import { Letter, LetterPoolTypes } from "./common"

export interface LetterDroppedPayload {
  fromType: LetterPoolTypes
  toType: LetterPoolTypes
  letter: Letter
  index?: number
}

export interface LetterDroppedOnCorrectPositionAction {
  type: "LETTER_DROPPED_ON_CORRECT_POSITION"
  payload: LetterDroppedPayload
}

export interface LetterDroppedOnWrongPositionAction {
  type: "LETTER_DROPPED_ON_WRONG_POSITION"
  payload: LetterDroppedPayload
}

export interface LetterDroppedOnAvailableAction {
  type: "LETTER_DROPPED_ON_AVAILABLE"
  payload: LetterDroppedPayload
}

export interface LetterDroppedOnUnAvailableAction {
  type: "LETTER_DROPPED_ON_UNAVAILABLE"
  payload: LetterDroppedPayload
}

export type LetterSelectedPayload = Letter | null

export interface LetterSelectedAction {
  type: "LETTER_SELECTED"
  payload: LetterSelectedPayload
}

export interface ToggleShortcutModalAction {
  type: "TOGGLE_SHORTCUT_MODAL"
  payload: boolean
}

export interface UpdateSuggestedWordsAction {
  type: "UPDATE_SUGGESTED_WORDS"
}

export type LetterDroppedAction =
  | LetterDroppedOnAvailableAction
  | LetterDroppedOnUnAvailableAction
  | LetterDroppedOnCorrectPositionAction
  | LetterDroppedOnWrongPositionAction

export type Action =
  | LetterDroppedAction
  | LetterSelectedAction
  | ToggleShortcutModalAction
  | UpdateSuggestedWordsAction
