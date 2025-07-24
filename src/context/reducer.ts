import allPossibleWords from "../data/words"
import { Action, LetterDroppedAction } from "../types/actions"
import { AppState } from "../types/context"
import {
  Letter,
  LetterOrEmpty,
  LetterOrEmptyArray,
  Word,
} from "../types/common"
import { availableLetters as allAvailableLetters } from "../utils/utils"

export const initialState: AppState = {
  availableLetters: allAvailableLetters,
  correctLetters: ["", "", "", "", ""],
  remainingWords: allPossibleWords.sort(),
  selectedLetter: null,
  shortcutsModalOpen: false,
  unusedLetters: [],
  wrongLetters: [[], [], [], [], []],
}

const addToAvailable = (
  { availableLetters }: AppState,
  { payload: { letter } }: LetterDroppedAction,
): Letter[] => {
  if (availableLetters.includes(letter)) {
    return availableLetters
  }

  const newAvailableLetters: Letter[] = [...availableLetters, letter]
  newAvailableLetters.sort()

  return newAvailableLetters
}

const addToCorrectPosition = (
  { correctLetters }: AppState,
  { payload: { index, letter } }: LetterDroppedAction,
): LetterOrEmptyArray => {
  if (typeof index !== "number") {
    throw new Error("Letter dropped on correct position with no index?!?!?!")
  }

  const newCorrectLetters: LetterOrEmptyArray = [...correctLetters]
  newCorrectLetters[index] = letter

  return newCorrectLetters
}

const addToWrongPosition = (
  { wrongLetters }: AppState,
  { payload: { index, letter } }: LetterDroppedAction,
): Letter[][] => {
  if (typeof index !== "number") {
    throw new Error("Letter dropped on worng position with no index?!?!?!")
  }

  const newWrongLetters: Letter[][] = [...wrongLetters]
  newWrongLetters[index] = Array.from(
    new Set([...newWrongLetters[index], letter]),
  )

  return newWrongLetters
}

const addToUnused = (
  { unusedLetters }: AppState,
  { payload: { letter } }: LetterDroppedAction,
): Letter[] => {
  if (unusedLetters.includes(letter)) {
    return unusedLetters
  }

  const newUnusedLetters = [...unusedLetters, letter]
  newUnusedLetters.sort()

  return newUnusedLetters
}

const removeFromAvailable = (
  { availableLetters }: AppState,
  { payload: { letter } }: LetterDroppedAction,
): Letter[] => {
  return availableLetters.filter(l => l !== letter)
}

const removeFromUnused = (
  { unusedLetters }: AppState,
  { payload: { letter } }: LetterDroppedAction,
): Letter[] => {
  return unusedLetters.filter(l => l !== letter)
}

const removeFromCorrect = (
  { correctLetters }: AppState,
  { payload: { letter } }: LetterDroppedAction,
): LetterOrEmptyArray => {
  return correctLetters.map((l: LetterOrEmpty) =>
    l === letter ? "" : l,
  ) as LetterOrEmptyArray
}

const removeFromOneCorrectPosition = (
  { correctLetters }: AppState,
  { payload: { index, letter } }: LetterDroppedAction,
): LetterOrEmptyArray => {
  if (typeof index !== "number") {
    throw new Error("Letter dropped on worng position with no index?!?!?!")
  }

  if (correctLetters[index] !== letter) {
    return correctLetters
  }

  const newCorrectLetters: LetterOrEmptyArray = [...correctLetters]
  newCorrectLetters[index] = ""

  return newCorrectLetters
}

const removeFromWrongPositionAtIndex = (
  wrongLetters: Letter[][],
  index: number,
  letter: Letter,
): Letter[][] => {
  const wrongLettersOfIndex: Letter[] = wrongLetters[index]

  if (!wrongLettersOfIndex.includes(letter)) {
    return wrongLetters
  }

  const newWrongLetters: Letter[][] = [...wrongLetters]
  newWrongLetters[index] = wrongLettersOfIndex.filter(
    (wrongLetter: Letter) => wrongLetter !== letter,
  )

  return newWrongLetters
}

const removeFromOneWrongPosition = (
  { wrongLetters }: AppState,
  { payload: { index, letter } }: LetterDroppedAction,
): Letter[][] => {
  if (typeof index !== "number") {
    throw new Error("Letter dropped on worng position with no index?!?!?!")
  }

  return removeFromWrongPositionAtIndex(wrongLetters, index, letter)
}

const removeFromAllWrongPositions = (
  { wrongLetters }: AppState,
  { payload: { letter } }: LetterDroppedAction,
): Letter[][] => {
  let newWrongLetters: Letter[][] = [...wrongLetters]
  let index: number

  for (index = 0; index < 5; index++) {
    newWrongLetters = removeFromWrongPositionAtIndex(
      newWrongLetters,
      index,
      letter,
    )
  }

  return newWrongLetters
}

const wrongLetterSetFromWrongLetters = (
  wrongLetters: Letter[][],
): Set<Letter> => {
  const wrongLetterSet: Set<Letter> = new Set()

  wrongLetters.forEach((wrongLetters: Letter[]) => {
    wrongLetters.forEach((wrongLetter: Letter) =>
      wrongLetterSet.add(wrongLetter),
    )
  })

  return wrongLetterSet
}

const updateWords = ({
  correctLetters,
  unusedLetters,
  wrongLetters,
}: AppState): Word[] => {
  const wrongLetterSet: Set<Letter> =
    wrongLetterSetFromWrongLetters(wrongLetters)
  const unusedRe = new RegExp(`[${unusedLetters.join("")}]`)
  const correctRe = new RegExp(
    correctLetters.reduce(
      (str: string, letter: LetterOrEmpty) => str + (letter || "."),
      "",
    ),
  )

  const wrongRes: RegExp[] = wrongLetters.reduce(
    (res: RegExp[], letters: Letter[], index: number) => {
      if (letters.length === 0) {
        return res
      }

      const baseReArr = [".", ".", ".", ".", "."]
      const newRes = letters.map(letter => {
        const reArr = [...baseReArr]
        reArr[index] = letter

        return new RegExp(reArr.join(""))
      })

      return [...res, ...newRes]
    },
    [],
  )

  const containsAllWrongLettersRe = new RegExp(
    `${Array.from(wrongLetterSet).reduce(
      (str, letter) => `${str}(?=.*${letter})`,
      "",
    )}.+`,
  )

  const fewerWords: Word[] = allPossibleWords.filter(word => {
    const matchesUnused = !!word.match(unusedRe)
    if (matchesUnused) {
      return false
    }

    const doesNotMatchWrong = wrongRes.reduce((soWrong, wrongRe) => {
      const letterInWrongPlace = !!word.match(wrongRe)

      return soWrong && !letterInWrongPlace
    }, true)

    if (!doesNotMatchWrong) {
      return false
    }

    const containsAllWrongLetters = !!word.match(containsAllWrongLettersRe)
    if (wrongLetterSet.size > 0 && !containsAllWrongLetters) {
      return false
    }

    return !!word.match(correctRe)
  })

  return fewerWords
}

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "LETTER_DROPPED_ON_CORRECT_POSITION":
      return {
        ...state,
        availableLetters: addToAvailable(state, action),
        unusedLetters: removeFromUnused(state, action),
        correctLetters: addToCorrectPosition(state, action),
        wrongLetters: removeFromOneWrongPosition(state, action),
      }
    case "LETTER_DROPPED_ON_WRONG_POSITION":
      return {
        ...state,
        wrongLetters: addToWrongPosition(state, action),
        correctLetters: removeFromOneCorrectPosition(state, action),
        availableLetters: addToAvailable(state, action),
        unusedLetters: removeFromUnused(state, action),
      }
    case "LETTER_DROPPED_ON_AVAILABLE":
      return {
        ...state,
        availableLetters: addToAvailable(state, action),
        unusedLetters: removeFromUnused(state, action),
      }
    case "LETTER_DROPPED_ON_UNAVAILABLE":
      return {
        ...state,
        availableLetters: removeFromAvailable(state, action),
        unusedLetters: addToUnused(state, action),
        correctLetters: removeFromCorrect(state, action),
        wrongLetters: removeFromAllWrongPositions(state, action),
      }
    case "LETTER_SELECTED":
      return {
        ...state,
        selectedLetter: action.payload,
      }
    case "TOGGLE_SHORTCUT_MODAL":
      return {
        ...state,
        shortcutsModalOpen: action.payload,
      }
    case "UPDATE_SUGGESTED_WORDS":
      return {
        ...state,
        remainingWords: updateWords(state),
      }
    default:
      return state
  }
}
