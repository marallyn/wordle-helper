import words from "../data/words";
import { Action, LetterDroppedAction } from "../types/actions";
import { AppState } from "../types/context";
import { Letter, LetterOrEmpty, LetterOrEmptyArray } from "../types/common";

const availableLetters: Letter[] = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .map(char => {
    return char as Letter;
  });

export const initialState: AppState = {
  availableLetters,
  correctLetters: ["", "", "", "", ""],
  remainingWords: words.sort(),
  selectedLetter: null,
  unusedLetters: [],
  wrongLetters: [[], [], [], [], []],
  wrongLetterSet: new Set(),
};

// const addToAvailable = ({ availableLetters }, { payload: { letter } }) => {
//   const newAvailableLetters = [...availableLetters, letter];
//   newAvailableLetters.sort();

//   return newAvailableLetters;
// };

const addToCorrectPosition = (
  { correctLetters }: AppState,
  { payload: { index, letter } }: LetterDroppedAction
): LetterOrEmptyArray => {
  if (typeof index !== "number") {
    throw new Error("Letter dropped on correct position with no index?!?!?!");
  }

  const newCorrectLetters: LetterOrEmptyArray = [...correctLetters];
  newCorrectLetters[index] = letter;

  return newCorrectLetters;
};

const addToWrongPosition = (
  { wrongLetters }: AppState,
  { payload: { index, letter } }: LetterDroppedAction
) => {
  if (typeof index !== "number") {
    throw new Error("Letter dropped on worng position with no index?!?!?!");
  }

  const newWrongLetters = [...wrongLetters];
  newWrongLetters[index] = Array.from(
    new Set([...newWrongLetters[index], letter])
  );

  return newWrongLetters;
};

const addToUnused = (
  { unusedLetters }: AppState,
  { payload: { letter } }: LetterDroppedAction
) => {
  const newUnusedLetters = [...unusedLetters, letter];
  newUnusedLetters.sort();

  return newUnusedLetters;
};

const removeFromAvailable = (
  { availableLetters }: AppState,
  { payload: { letter } }: LetterDroppedAction
) => {
  return availableLetters.filter(l => l !== letter);
};

// const removeFromUnused = ({ unusedLetters }, { payload: { letter } }) => {
//   unusedLetters.filter((l) => l !== letter);
// };

const updateWords = ({
  correctLetters,
  remainingWords,
  unusedLetters,
  wrongLetters,
  wrongLetterSet,
}: AppState) => {
  const unusedRe = new RegExp(`[${unusedLetters}]`);
  const correctRe = new RegExp(
    correctLetters.reduce(
      (str: string, letter: LetterOrEmpty) => str + (letter || "."),
      ""
    )
  );

  const wrongRes: RegExp[] = wrongLetters.reduce(
    (res: RegExp[], letters: Letter[], index: number) => {
      if (letters.length === 0) {
        return res;
      }

      const baseReArr = [".", ".", ".", ".", "."];
      const newRes = letters.map(letter => {
        const reArr = [...baseReArr];
        reArr[index] = letter;

        return new RegExp(reArr.join(""));
      });

      return [...res, ...newRes];
    },
    []
  );

  const containsAllWrongLettersRe = new RegExp(
    `${Array.from(wrongLetterSet).reduce(
      (str, letter) => `${str}(?=.*${letter})`,
      ""
    )}.+`
  );

  const fewerWords = remainingWords.filter(word => {
    const matchesUnused = !!word.match(unusedRe);
    if (matchesUnused) {
      return false;
    }

    const doesNotMatchWrong = wrongRes.reduce((soWrong, wrongRe) => {
      const letterInWrongPlace = !!word.match(wrongRe);

      return soWrong && !letterInWrongPlace;
    }, true);

    if (!doesNotMatchWrong) {
      return false;
    }

    const containsAllWrongLetters = !!word.match(containsAllWrongLettersRe);
    if (wrongLetterSet.size > 0 && !containsAllWrongLetters) {
      return false;
    }

    return !!word.match(correctRe);
  });

  return fewerWords;
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "LETTER_DROPPED":
      if (
        action.payload.fromType === "available" &&
        action.payload.toType === "not-used"
      ) {
        return {
          ...state,
          availableLetters: removeFromAvailable(state, action),
          unusedLetters: addToUnused(state, action),
        };
      } else if (
        action.payload.fromType === "not-used" &&
        action.payload.toType === "available"
      ) {
        return state;
        // return {
        //   ...state,
        //   availableLetters: addToAvailable(state, action),
        //   unusedLetters: removeFromUnused(state, action),
        // };
      } else if (
        action.payload.fromType === "available" &&
        action.payload.toType === "correct-position"
      ) {
        return {
          ...state,
          correctLetters: addToCorrectPosition(state, action),
        };
      } else if (
        action.payload.fromType === "available" &&
        action.payload.toType === "wrong-place"
      ) {
        return {
          ...state,
          wrongLetters: addToWrongPosition(state, action),
          wrongLetterSet: state.wrongLetterSet.add(action.payload.letter),
        };
      }

      return state;
    case "LETTER_SELECTED":
      return {
        ...state,
        selectedLetter: action.payload,
      };
    case "UPDATE_SUGGESTED_WORDS":
      return {
        ...state,
        remainingWords: updateWords(state),
      };
    default:
      return state;
  }
};
