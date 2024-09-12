import { jsonParse, toBoolean } from "@/util/helper";
import { useCloud } from "@/hooks/use-cloud";
import _ from "lodash";
import { useMemo } from "react";
import useSWR from "swr";
import * as prepareSWR from "@/util/prepareSWR";
import usePrepareStandard from "./usePrepareStandard";

const useWidgetGetProcessSWR = (listConfig?: any) => {
  const cloudContext = useCloud();
  const { standard } = usePrepareStandard();
  const widgetnemgooReady = listConfig?.widgetnemgooReady;
  const criteria = widgetnemgooReady?.criteria;
  const metaName = widgetnemgooReady?.metaConfig?.host?.metaName || "metaProd";

  /* ------------------------------------------------------ */
  /*                  PREPARE PARAMETERS V2                 */
  /* ------------------------------------------------------ */
  // const myParametersV2 = prepareSWR.prepareParametersV2(
  //   widgetnemgooReady?.parameters
  // );
  /* --------------------- metaNameV2 --------------------- */
  const metaNameV2 = cloudContext.hostObject.metaNameV2;

  const myParams = {
    command: listConfig?.metadatacode,
    parameter: prepareSWR.prepareCriteriaProcess(criteria),
    // metaName: metaName,
    standard: JSON.stringify(standard),
    moreRequest: null,
    customProps: JSON.stringify(widgetnemgooReady?.apiConfig || {}),
    metaName: metaNameV2,
  };

  /* --------------------- Call useSWR -------------------- */
  const { data, error, mutate } = useSWR(
    `/api/get-process?command=${myParams.command}&parameters=${myParams.parameter}&standard=${myParams.standard}`
  );

  // console.log("🚀 ~ useWidgetGetProcessSWR ~ data:", myParams);

  const processConfigNemgoo = widgetnemgooReady?.processConfig || undefined;

  let dataSrcLast: Array<any>;
  let detailRowsList: any;
  let headerData: any;

  if (processConfigNemgoo) {
    /* -------------------- prepare Data -------------------- */
    const dataReady = data ? [data] : [];
    dataSrcLast = dataReady[0]?.result || [];

    //header detailrows гэсэн бүтэцтэй байвал хоёр салгасан Data гаргах ёстой.

    if (processConfigNemgoo?.detail) {
      //detail буюу дэд List байгаа юм байна.
      const detailListName = processConfigNemgoo?.detail; //clsdmsalesorderdtl гэх мэт

      detailRowsList = useMemo(
        () => _.values(_.get(dataSrcLast, detailListName)),
        [dataSrcLast]
      );
    }

    if (toBoolean(processConfigNemgoo?.header)) {
      headerData = dataSrcLast;
      headerData = _.omit(headerData, [processConfigNemgoo?.detail]);
    }
  } else {
    dataSrcLast = [data?.result || {}];
  }

  // console.log("88888888888888888 ~ useWidgetGetProcessSWR ~ data", data);
  // console.log(
  //   "88888888888888888 ~ useWidgetGetProcessSWR ~ dataSrcLast",
  //   dataSrcLast
  // );

  /* ----------------------- return ----------------------- */
  return [detailRowsList || dataSrcLast, headerData, error, mutate];
};

export default useWidgetGetProcessSWR;
