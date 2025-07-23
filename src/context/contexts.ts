import React, { createContext } from "react";
import { AppState, DispatchState } from "../types/context";
import { initialState } from "./reducer";
import { Action } from "../types/actions";

const defaultDispatch: React.Dispatch<Action> = () => {
  throw new Error("dispatch must be used within a DispatchProvider");
};

export const DispatchContext = createContext<DispatchState>({
  dispatch: defaultDispatch,
});

export const StateContext = createContext<AppState>(initialState);
