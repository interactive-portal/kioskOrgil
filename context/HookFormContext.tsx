import { createContext, useRef, useState } from "react";

type PropsContextType = {
  formList?: any;
  fff?: any;
  setFff?: any;
};

const HookFormContext = createContext<PropsContextType>({});

export const HookFormStore = ({ children }: { children?: any }) => {
  const { current: formList } = useRef({});
  const [fff, setFff] = useState({});

  return (
    <HookFormContext.Provider
      value={{
        formList,
        fff,
        setFff,
      }}
    >
      {children}
    </HookFormContext.Provider>
  );
};

export default HookFormContext;
