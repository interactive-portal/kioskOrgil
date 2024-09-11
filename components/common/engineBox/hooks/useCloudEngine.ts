import { useContext, useEffect, useState } from "react";
import _ from "lodash";

export const useCloudEngine = () => {
  const [myContextState, setMyContextState]: any = useState();
  const myPath = "CloudContext";
  useEffect(() => {
    import(`../Context/${myPath}`)
      .then((module: any) => {
        setMyContextState(module.default);
      })
      .catch((err) => {
        console.log(" CloudContext олдохгүй байна.", err);
      });
  }, []);

  const cloudContext: any = !_.isEmpty(myContextState)
    ? useContext(myContextState)
    : { ddddd: "dsssdsdsdsd", killer: "ssdsdsdwewe" };

  return cloudContext;
};
