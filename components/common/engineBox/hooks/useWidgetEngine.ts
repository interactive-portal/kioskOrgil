import { useContext, useEffect, useState } from "react";
import _ from "lodash";

export const useWidgetEngine = () => {
  const [myContextState, setMyContextState]: any = useState();

  const myPath = "WidgetUniversalWrapper";

  useEffect(() => {
    import(`../Wrapper/${myPath}`)
      .then((module: any) => {
        setMyContextState(module.default);
      })
      .catch((err) => {
        console.log("Алдаа гарчихлөө, WdigetContext олдохгүй байна.", err);
      });
  }, []);

  const widgetContext: any = !_.isEmpty(myContextState)
    ? useContext(myContextState)
    : { widgetnemgooReady: {}, isDataLoading: false };

  return widgetContext;
};
