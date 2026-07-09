import { useCallback } from "react"
import CorrectPositionPool from "../components/CorrectPositionPool"
import HowToPlayModal from "../components/HowToPlayModal"
import KeyboardShortcutsModal from "../components/KeyboardShortcutsModal"
import LetterPool from "../components/LetterPool"
import WordList from "../components/WordList"
import WrongPositionPool from "../components/WrongPositionPool"
import useAppState from "../hooks/useAppState"
import useDispatch from "../hooks/useDispatch"
import useHowToPlayModal from "../hooks/useHowToPlayModal"
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
  const {
    isOpen: howToPlayOpen,
    closeModal: closeHowToPlay,
    openModal: openHowToPlay,
  } = useHowToPlayModal()

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
        // these cases will not happen
        case "correct-position":
        case "wrong-place":
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
      <div className="flex justify-between items-center w-full max-w-6xl mb-4">
        <h1 className="text-white-800 text-3xl font-extrabold">Wordle Helper</h1>
        <button
          onClick={openHowToPlay}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition-colors duration-150"
        >
          How to Play
        </button>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-start">
          <CorrectPositionPool letters={correctLetters} />
          <WrongPositionPool letters={wrongLetters} />
          <LetterPool
            letters={availableLetters}
            onLetterDropped={handleLetterDropped}
            selectedLetter={selectedLetter}
            title="Available Letters"
            type={"available"}
          />
        </div>
        <div className="flex flex-col justify-start">
          <LetterPool
            letters={unusedLetters}
            onLetterDropped={handleLetterDropped}
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
      <HowToPlayModal
        isOpen={howToPlayOpen}
        onClose={closeHowToPlay}
      />
    </>
  )
}
