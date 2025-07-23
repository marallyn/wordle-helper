import { useCallback, useEffect, useState } from "react";

import CorrectPositionPool from "../components/CorrectPositionPool";
import KeyboardShortcutsModal from "../components/KeyboardShortcutsModal";
import LetterPool from "../components/LetterPool";
import WordList from "../components/WordList";
import WrongPositionPool from "../components/WrongPositionPool";
import { initialState } from "../context/reducer";

import "./WordleHelper.css";
import useAppState from "../hooks/useAppState";
import useDispatch from "../hooks/useDispatch";
import useWordUpdater from "../hooks/useWordUpdater";
import { LetterDroppedPayload } from "../types/actions";

export default function WordleHelper() {
  const [shorcutsModalOpen, setShorcutsModalOpen] = useState(false);
  const {
    availableLetters,
    correctLetters,
    selectedLetter,
    unusedLetters,
    wrongLetters,
  } = useAppState();
  const dispatch = useDispatch();

  useWordUpdater();

  const handleLetterDropped = useCallback(
    (letterEvent: LetterDroppedPayload) => {
      dispatch({ type: "LETTER_DROPPED", payload: letterEvent });
    },
    [dispatch]
  );

  const handleShortcutModalClose = () => {
    setShorcutsModalOpen(false);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const wrongCommands = "!@#$%";
      const letterCommandKeys = `12345!@#$%ua`.split("");
      const otherCommandKeys = ["?", "Shift", "Escape"];
      const handledKeys = [
        ...initialState.availableLetters,
        ...letterCommandKeys,
        ...otherCommandKeys,
      ];
      const pressedKey = event.key;

      if (!handledKeys.includes(pressedKey)) {
        dispatch({ type: "LETTER_SELECTED", payload: null });

        return;
      }

      if (!selectedLetter && availableLetters.includes(pressedKey)) {
        dispatch({ type: "LETTER_SELECTED", payload: pressedKey });

        return;
      }

      if (otherCommandKeys.includes(pressedKey)) {
        event.preventDefault();
        switch (pressedKey) {
          case "Shift":
            break;
          case "?":
            setShorcutsModalOpen(true);
            break;
          case "Escape":
            setShorcutsModalOpen(false);
        }
        return;
      }

      if (selectedLetter && letterCommandKeys.includes(pressedKey)) {
        switch (pressedKey) {
          case "u":
            handleLetterDropped({
              letter: selectedLetter,
              fromType: "available",
              toType: "not-used",
            });
            break;
          case "a":
            handleLetterDropped({
              letter: selectedLetter,
              fromType: "not-used",
              toType: "available",
            });
            break;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
            handleLetterDropped({
              letter: selectedLetter,
              index: +pressedKey - 1,
              fromType: "available",
              toType: "correct-position",
            });
            break;
          case "!":
          case "@":
          case "#":
          case "$":
          case "%":
            handleLetterDropped({
              letter: selectedLetter,
              index: wrongCommands.indexOf(pressedKey),
              fromType: "available",
              toType: "wrong-place",
            });
            break;
        }
      }
      dispatch({ type: "LETTER_SELECTED", payload: null });
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleGlobalKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [availableLetters, selectedLetter, handleLetterDropped, dispatch]);

  return (
    <>
      <h1 className="text-white-800 mb-1">Wordle Helper</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-start">
          <CorrectPositionPool letters={correctLetters} />
          <WrongPositionPool letters={wrongLetters} />
          <LetterPool
            letters={availableLetters}
            onDropLetter={handleLetterDropped}
            selectedLetter={selectedLetter}
            title="Available Letters"
            type={"available"}
          />
        </div>
        <div className="flex flex-col justify-start">
          <LetterPool
            letters={unusedLetters}
            onDropLetter={handleLetterDropped}
            selectedLetter={selectedLetter}
            title="Unused Letters"
            type={"not-used"}
          />
          <WordList />
        </div>
      </div>
      <KeyboardShortcutsModal
        isOpen={shorcutsModalOpen}
        onClose={handleShortcutModalClose}
      />
    </>
  );
}
