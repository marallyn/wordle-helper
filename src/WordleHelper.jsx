import { useCallback, useEffect, useState } from "react";
import "./WordleHelper.css";
import LetterPool from "./components/LetterPool";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LetterPoolTypes } from "./constants/appConstants";

const initialLetters = "abcdefghijklmnopqrstuvwxyz".split("");

function WordleHelper() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [availableLetters, setAvailableLetters] = useState(initialLetters);
  const [unusedLetters, setUnusedLetters] = useState([]);
  // const [correctLetters, setCorrectLetters] = useState([]);
  // const [wrongLetters, setWrongLetters] = useState([]);

  const addToAvailable = useCallback((letterToAdd) => {
    setAvailableLetters((prevAvailableLetters) => {
      const newAvailableLetters = [...prevAvailableLetters, letterToAdd];
      newAvailableLetters.sort();

      return newAvailableLetters;
    });
  }, []);

  const removeFromAvailable = useCallback((letterToRemove) => {
    setAvailableLetters((prevAvailableLetters) =>
      prevAvailableLetters.filter((l) => l !== letterToRemove)
    );
  }, []);

  const addToUnused = useCallback((letterToAdd) => {
    setUnusedLetters((prevUnusedLetters) => {
      const newUnusedLetters = [...prevUnusedLetters, letterToAdd];
      newUnusedLetters.sort();
      return newUnusedLetters;
    });
  }, []);

  const removeFromUnused = useCallback((letterToRemove) => {
    setUnusedLetters((prevUnusedLetters) =>
      prevUnusedLetters.filter((l) => l !== letterToRemove)
    );
  }, []);

  const handleDropLetter = useCallback(
    ({ letter, fromType, toType }) => {
      if (fromType === LetterPoolTypes.AVAILABLE) {
        if (toType === LetterPoolTypes.NOT_USED) {
          removeFromAvailable(letter);
          addToUnused(letter);
        }
      }
      if (fromType === LetterPoolTypes.NOT_USED) {
        if (toType === LetterPoolTypes.AVAILABLE) {
          removeFromUnused(letter);
          addToAvailable(letter);
        }
      }
    },
    [addToUnused, removeFromAvailable, removeFromUnused, addToAvailable]
  );

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      const commandKeys = `12345!@#$%ua`.split("");
      const handledKeys = [...initialLetters, ...commandKeys];
      const pressedKey = event.key;

      if (!handledKeys.includes(pressedKey)) {
        setSelectedLetter(null);
        return;
      }

      if (!selectedLetter && initialLetters.includes(pressedKey)) {
        setSelectedLetter(pressedKey);
        return;
      }

      if (selectedLetter && commandKeys.includes(pressedKey)) {
        switch (pressedKey) {
          case "u":
            handleDropLetter({
              letter: selectedLetter,
              fromType: LetterPoolTypes.AVAILABLE,
              toType: LetterPoolTypes.NOT_USED,
            });
            break;
          case "a":
            handleDropLetter({
              letter: selectedLetter,
              fromType: LetterPoolTypes.NOT_USED,
              toType: LetterPoolTypes.AVAILABLE,
            });
            break;
        }
      }
      setSelectedLetter(null);
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleGlobalKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [availableLetters, selectedLetter, handleDropLetter]);

  return (
    <DndProvider backend={HTML5Backend}>
      <h1 className="text-purple-800">Wordle Solver</h1>
      <LetterPool
        letters={availableLetters}
        onDropLetter={handleDropLetter}
        selectedLetter={selectedLetter}
        title="Available Letters"
        type={LetterPoolTypes.AVAILABLE}
      />
      <LetterPool
        letters={unusedLetters}
        onDropLetter={handleDropLetter}
        selectedLetter={selectedLetter}
        title="Unused Letters"
        type={LetterPoolTypes.NOT_USED}
      />
    </DndProvider>
  );
}

export default WordleHelper;
