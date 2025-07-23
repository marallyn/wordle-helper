import { useCallback, useEffect } from "react"
import useAppState from "./useAppState"
import useDispatch from "./useDispatch"
import { Letter, LetterPoolTypes } from "../types/common"
import { availableLetters as allAvailableLetters } from "../utils/utils"
import { LetterDroppedAction, LetterDroppedPayload } from "../types/actions"

const correctPositionCommands = ["1", "2", "3", "4", "5"]
const wrongPositionCommands = ["!", "@", "#", "$", "%"]
const moveLetterCommands = ["u", "a"]
const otherCommands = ["?", "Shift", "Escape"]

export default function useKeyboardShortcuts() {
  const { availableLetters, selectedLetter } = useAppState()
  const dispatch = useDispatch()

  const handleCorrectLetterDropped = useCallback(
    (payload: LetterDroppedPayload) => {
      dispatch({ type: "LETTER_DROPPED_ON_CORRECT_POSITION", payload })
    },
    [dispatch],
  )

  const handleWrongLetterDropped = useCallback(
    (payload: LetterDroppedPayload) => {
      dispatch({ type: "LETTER_DROPPED_ON_WRONG_POSITION", payload })
    },
    [dispatch],
  )

  const handleMoveLetterDropped = useCallback(
    (payload: LetterDroppedPayload) => {
      const action: LetterDroppedAction =
        payload.toType === "available"
          ? { type: "LETTER_DROPPED_ON_AVAILABLE", payload }
          : { type: "LETTER_DROPPED_ON_UNAVAILABLE", payload }
      dispatch(action)
    },
    [dispatch],
  )

  const handleLetterSelected = useCallback(
    (letter: Letter | null) => {
      dispatch({ type: "LETTER_SELECTED", payload: letter })
    },
    [dispatch],
  )

  const handleToggleShortcutModal = useCallback(
    (toggle: boolean) => {
      dispatch({ type: "TOGGLE_SHORTCUT_MODAL", payload: toggle })
    },
    [dispatch],
  )

  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const pressedKey = event.key

      const isCorrectPositionCommand =
        correctPositionCommands.includes(pressedKey)
      const isWrongPositionCommand = wrongPositionCommands.includes(pressedKey)
      const isMoveLetterCommand = moveLetterCommands.includes(pressedKey)
      const isOtherCommand = otherCommands.includes(pressedKey)
      const isLetter = allAvailableLetters.includes(pressedKey as Letter)
      const isAvailableLetter = availableLetters.includes(pressedKey as Letter)

      if (selectedLetter && isCorrectPositionCommand) {
        const index = +pressedKey - 1
        const fromType: LetterPoolTypes = isAvailableLetter
          ? "available"
          : "not-used"
        handleCorrectLetterDropped({
          letter: selectedLetter,
          index,
          fromType,
          toType: "correct-position",
        })
      } else if (selectedLetter && isWrongPositionCommand) {
        const index = wrongPositionCommands.indexOf(pressedKey)
        handleWrongLetterDropped({
          letter: selectedLetter,
          index,
          fromType: "available",
          toType: "wrong-place",
        })
      } else if (selectedLetter && isMoveLetterCommand) {
        const fromType: LetterPoolTypes = isAvailableLetter
          ? "available"
          : "not-used"
        const toType: LetterPoolTypes =
          pressedKey === "u" ? "not-used" : "available"
        handleMoveLetterDropped({
          letter: selectedLetter,
          fromType,
          toType,
        })
      } else if (isLetter) {
        handleLetterSelected(pressedKey as Letter)
        return
      } else if (isOtherCommand && pressedKey === "?") {
        handleToggleShortcutModal(true)
      } else if (isOtherCommand && pressedKey === "Escape") {
        handleToggleShortcutModal(false)
      } else if (isOtherCommand && pressedKey === "Shift") {
        return
      }

      handleLetterSelected(null)
    },
    [
      selectedLetter,
      dispatch,
      handleCorrectLetterDropped,
      handleLetterSelected,
      handleMoveLetterDropped,
      handleToggleShortcutModal,
      handleWrongLetterDropped,
    ],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleGlobalKeyDown)

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown)
    }
  }, [handleGlobalKeyDown])
}
