import _ from "lodash";
import { useRouter } from "next/router";
import fetchJson, { jsonParse } from "@/util/helper";
import { useEffect, useState } from "react";
import { config } from "process";

const dataFetch = (listConfig?: any) => {
  const { locale } = useRouter();
  const options = jsonParse(listConfig?.widgetnemgoo);
  const [dataReady, setReadyData] = useState<any>();
  const [dataMetaVerse, setDataMetaVerse] = useState<any>();
  const widgetnemgooReady = listConfig?.widgetnemgooReady;
  const metadataid = listConfig?.metadataid;
  const criteriaNemgoo = widgetnemgooReady?.criteria;
  const pagingNemgoo = widgetnemgooReady?.paging;
  const metaName = widgetnemgooReady?.metaConfig?.host?.metaName || "metaDev";
  const myDebug = widgetnemgooReady?.metaConfig?.debug || "0";
  const metaV = widgetnemgooReady?.metaverse;

  const myCriteria = JSON.stringify(criteriaNemgoo);
  const myPaging = JSON.stringify(pagingNemgoo);

  const fetchData = async () => {
    if (metadataid) {
      const data = await fetchJson(
        `/api/get-data?metaid=${metadataid}&criteria=${myCriteria}&pagingwithoutaggregate=1&paging=${myPaging}&lang=${locale}`
      );
      //   console.log("data :>> ", data);
      setReadyData(data.result);
    } else {
      setReadyData(options?.data);
    }
    // if (metaV) {
    //   const result = await fetchJson(
    //     `/api/get-indicator?command=kpiIndicatorDataList&criteria=${myCriteria}&pagingwithoutaggregate=1&paging=${myPaging}&lang=${locale}`
    //   );
    // }

    // console.log("fetchData fetchData", data);
  };
  // console.log("config :>> ", dataReady);

  useEffect(() => {
    if (!dataReady) fetchData();
  }, []);

  /* --------------------- Call useSWR -------------------- */
  let { error, mutate }: any = {};

  /* -------------------- prepare Data -------------------- */
  let aggregatecolumns: string = "";
  let paging: any = {};

  /* ----------------------- return ----------------------- */
  return [dataReady, error, mutate, paging, aggregatecolumns];
};

export default dataFetch;
