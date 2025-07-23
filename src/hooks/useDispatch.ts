import { useContext } from "react";
import { DispatchContext } from "../context/contexts";
import { Action } from "../types/actions";

export default function useDispatch(): React.Dispatch<Action> {
  const dispatchContext = useContext(DispatchContext);

  if (dispatchContext === undefined) {
    throw new Error("dispatch must be used within a DispatchProvider");
  }

  return dispatchContext.dispatch;
}
