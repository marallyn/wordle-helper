import { useEffect, useRef } from "react";
import useDispatch from "./useDispatch";
import useAppState from "./useAppState";

export default function useWordUpdater() {
  const initialMount = useRef(true);
  const { availableLetters, correctLetters, wrongLetters } = useAppState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;

      return;
    }

    dispatch({ type: "UPDATE_SUGGESTED_WORDS" });
  }, [dispatch, availableLetters, correctLetters, wrongLetters]);
}
