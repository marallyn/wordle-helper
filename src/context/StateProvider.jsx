import { useReducer } from "react";
import { DispatchContext, StateContext } from "./contexts";
import { initialState, reducer } from "./reducer";

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext value={state}>
      <DispatchContext value={dispatch}>{children}</DispatchContext>
    </StateContext>
  );
};

export default StateProvider;
