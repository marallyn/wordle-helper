import { useContext } from "react";
import { StateContext } from "../context/contexts";
import { AppState } from "../types/context";

export default function useAppState(): AppState {
  return useContext(StateContext);
}
