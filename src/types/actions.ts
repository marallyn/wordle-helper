import { Letter, LetterPoolTypes } from "./common";

export interface LetterDroppedPayload {
  fromType: LetterPoolTypes;
  toType: LetterPoolTypes;
  letter: Letter;
  index?: number;
}

export interface LetterDroppedAction {
  type: "LETTER_DROPPED";
  payload: LetterDroppedPayload;
}

export type LetterSelectedPayload = Letter | null;

export interface LetterSelectedAction {
  type: "LETTER_SELECTED";
  payload: LetterSelectedPayload;
}

export interface UpdateSuggestedWordsAction {
  type: "UPDATE_SUGGESTED_WORDS";
}

export type Action =
  | LetterDroppedAction
  | LetterSelectedAction
  | UpdateSuggestedWordsAction;
