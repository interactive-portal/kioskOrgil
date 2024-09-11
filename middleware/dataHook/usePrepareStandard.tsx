import { useCloud } from "hooks/use-cloud";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function usePrepareStandard() {
  const { data: session, status } = useSession();
  const cloudContext = useCloud();

  /* ------------------- URLQUERY бэлдэх ------------------ */
  const urlQueryTemp = cloudContext.cloudURL?.query;
  const { thisPageConfig } = cloudContext.cloudURL;

  // {
  // cool: "9999";
  // id: "1671156753192929";
  // jaak: "151545484848";
  // }
  // гэсэн object байгаа.
  // const tempURLQuery =
  const urlQueryReady: any = {};
  _.keys(urlQueryTemp).forEach((key) => {
    urlQueryReady[`urlquery${key}`] = urlQueryTemp[key];
  });

  // {
  // urlquerycool: "9999";
  // urlqueryid: "1671156753192929";
  // urlqueryjaak: "151545484848";
  // }
  // болж өөрчлөгдөнө.
  // console.log("🚀 ~ usePrepareStandard ~ urlQueryReady", urlQueryReady);

  /* -------------------- Prepare Ready ------------------- */

  const standard = useMemo(() => {
    return {
      customerid: session?.readyProfile?.clouderp?.customerid,
      crmuserid: session?.crmuserid,
      custuserid: session?.crmuserid,
      departmentid: session?.profile?.departmentid,
      companydepartmentid: session?.readyProfile?.clouderp?.companydepartmentid,
      pagedepartmentid: thisPageConfig?.departmentid,
      ...urlQueryReady, //тэр чигт нь Standard дотор тавьж өглөө.
    };
  }, [cloudContext]);

  return { standard };
}
