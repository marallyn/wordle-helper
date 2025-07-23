import { useCallback, useState } from "react"
import CorrectPositionPool from "../components/CorrectPositionPool"
import KeyboardShortcutsModal from "../components/KeyboardShortcutsModal"
import LetterPool from "../components/LetterPool"
import WordList from "../components/WordList"
import WrongPositionPool from "../components/WrongPositionPool"
import useAppState from "../hooks/useAppState"
import useDispatch from "../hooks/useDispatch"
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts"
import useWordUpdater from "../hooks/useWordUpdater"
import { LetterDroppedPayload } from "../types/actions"
import "./WordleHelper.css"

export default function WordleHelper() {
  const {
    availableLetters,
    correctLetters,
    selectedLetter,
    shortcutsModalOpen,
    unusedLetters,
    wrongLetters,
  } = useAppState()
  const dispatch = useDispatch()

  useWordUpdater()
  useKeyboardShortcuts()

  const handleLetterDropped = useCallback(
    (letterEvent: LetterDroppedPayload) => {
      switch (letterEvent.toType) {
        case "available":
          dispatch({
            type: "LETTER_DROPPED_ON_AVAILABLE",
            payload: letterEvent,
          })
          break
        case "not-used":
          dispatch({
            type: "LETTER_DROPPED_ON_UNAVAILABLE",
            payload: letterEvent,
          })
          break
        case "correct-position":
          dispatch({
            type: "LETTER_DROPPED_ON_CORRECT_POSITION",
            payload: letterEvent,
          })
          break
        case "wrong-place":
          dispatch({
            type: "LETTER_DROPPED_ON_WRONG_POSITION",
            payload: letterEvent,
          })
          break
      }
    },
    [dispatch],
  )

  const handleShortcutModalClose = () => {
    dispatch({ type: "TOGGLE_SHORTCUT_MODAL", payload: false })
  }

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
        isOpen={shortcutsModalOpen}
        onClose={handleShortcutModalClose}
      />
    </>
  )
}
