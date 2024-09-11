import React, { createContext, useReducer, FC } from "react";
import { MetaReducer } from "./MetaReducer";
import ACTIONS from "./MetaActions";

const MetaContext = createContext({});
const initialState = {};
type PropsType = { children?: any };

export const MetaContextProvider: FC<PropsType> = ({ children }) => {
  const [state, dispatch] = useReducer(MetaReducer, initialState);

  const runAction = (payload: any, key: string, action: string) => {
    dispatch({ type: action, payload, key });
  };

  const setInitialValue = (payload: any) => {
    dispatch({ type: ACTIONS.INITIAL_VALUE, payload });
  };

  const contextValues = {
    runAction,
    setInitialValue,
    state,
  };

  return (
    <MetaContext.Provider value={contextValues}>
      {children}
    </MetaContext.Provider>
  );
};

export default MetaContext;
