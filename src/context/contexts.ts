import { createContext } from "react";
import { AppState, DispatchState } from "../types/context";
import { initialState } from "./reducer";

export const DispatchContext = createContext<DispatchState | undefined>(
  undefined
);

export const StateContext = createContext<AppState>(initialState);
