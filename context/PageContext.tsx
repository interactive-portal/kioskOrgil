import { createContext, useRef, useState } from "react";

type PropsContextType = {
  [x: string]: any;
  // rawWidgetList?: any;
  // managementWidgetList?: any;
  ddd?: any;
  setDdd?: any;
  kkk?: any;
  setKkk?: any;
  killer?: any;
};

const PageContext = createContext<PropsContextType>({});

export const PageStore = ({ children }: { children?: any }) => {
  const [ddd, setDdd] = useState([]); //rawWidgetList
  const [kkk, setKkk] = useState({}); //managementWidgetList

  const { current: killer } = useRef([]);

  // const { current: rawWidgetList } = useRef([]);
  // const { current: managementWidgetList } = useRef({});

  // console.log("PAGECONTEXT ~ rawWidgetList", ddd);
  // console.log("PAGECONTEXT ~ managementWidgetList", kkk);

  return (
    <PageContext.Provider
      value={{
        // rawWidgetList,
        // managementWidgetList,
        ddd,
        setDdd,
        kkk,
        setKkk,
        killer,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
const Comment = createContext<PropsContextType>({});

export default PageContext;
