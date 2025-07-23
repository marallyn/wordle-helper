import { useContext, useEffect, useRef } from "react";
import { DispatchContext, StateContext } from "../context/contexts";

export default function useWordUpdater() {
  const initialMount = useRef(true);
  const { availableLetters, correctLetters, wrongLetters } =
    useContext(StateContext);

  const { dispatch } = useContext(DispatchContext);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;

      return;
    }

    dispatch({ type: "UPDATE_SUGGESTED_WORDS" });
  }, [dispatch, availableLetters, correctLetters, wrongLetters]);
}
