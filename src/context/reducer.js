import { LetterPoolTypes } from "../constants/appConstants";
import c from "./constants";
import words from "../data/words";

export const initialState = {
  availableLetters: "abcdefghijklmnopqrstuvwxyz".split(""),
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
  { correctLetters },
  { payload: { index, letter } }
) => {
  const newCorrectLetters = [...correctLetters];
  newCorrectLetters[index] = letter;

  return newCorrectLetters;
};

const addToWrongPosition = (
  { wrongLetters },
  { payload: { index, letter } }
) => {
  const newWrongLetters = [...wrongLetters];
  newWrongLetters[index] = Array.from(
    new Set([...newWrongLetters[index], letter])
  );

  return newWrongLetters;
};

const addToUnused = ({ unusedLetters }, { payload: { letter } }) => {
  const newUnusedLetters = [...unusedLetters, letter];
  newUnusedLetters.sort();

  return newUnusedLetters;
};

const removeFromAvailable = ({ availableLetters }, { payload: { letter } }) => {
  return availableLetters.filter((l) => l !== letter);
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
}) => {
  const unusedRe = new RegExp(`[${unusedLetters}]`);
  const correctRe = new RegExp(
    correctLetters.reduce((str, letter) => str + (letter || "."), "")
  );

  const wrongRes = wrongLetters.reduce((res, letters, index) => {
    if (letters.length === 0) {
      return res;
    }

    const baseReArr = [".", ".", ".", ".", "."];
    const newRes = letters.map((letter) => {
      const reArr = [...baseReArr];
      reArr[index] = letter;

      return new RegExp(reArr.join(""));
    });

    return [...res, ...newRes];
  }, []);

  const containsAllWrongLettersRe = new RegExp(
    `${Array.from(wrongLetterSet).reduce(
      (str, letter) => `${str}(?=.*${letter})`,
      ""
    )}.+`
  );

  const fewerWords = remainingWords.filter((word) => {
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

export const reducer = (state, action) => {
  switch (action.type) {
    case c.LETTER_DROPPED:
      if (
        action.payload.fromType === LetterPoolTypes.AVAILABLE &&
        action.payload.toType === LetterPoolTypes.NOT_USED
      ) {
        return {
          ...state,
          availableLetters: removeFromAvailable(state, action),
          unusedLetters: addToUnused(state, action),
        };
      } else if (
        action.payload.fromType === LetterPoolTypes.NOT_USED &&
        action.payload.toType === LetterPoolTypes.AVAILABLE
      ) {
        return state;
        // return {
        //   ...state,
        //   availableLetters: addToAvailable(state, action),
        //   unusedLetters: removeFromUnused(state, action),
        // };
      } else if (
        action.payload.fromType === LetterPoolTypes.AVAILABLE &&
        action.payload.toType === LetterPoolTypes.CORRECT_POSITION
      ) {
        return {
          ...state,
          correctLetters: addToCorrectPosition(state, action),
        };
      } else if (
        action.payload.fromType === LetterPoolTypes.AVAILABLE &&
        action.payload.toType === LetterPoolTypes.WRONG_PLACE
      ) {
        return {
          ...state,
          wrongLetters: addToWrongPosition(state, action),
          wrongLetterSet: state.wrongLetterSet.add(action.payload.letter),
        };
      }

      return state;
    case c.LETTER_SELECTED:
      return {
        ...state,
        selectedLetter: action.payload,
      };
    case c.UPDATE_SUGGESTED_WORDS:
      return {
        ...state,
        remainingWords: updateWords(state, action),
      };
    default:
      return state;
  }
};
