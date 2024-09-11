import { prepareApiStandard } from "@/util/prepareApiStandard";
import _ from "lodash";
import useSWR from "swr";
import usePrepareStandard from "./usePrepareStandard";
import {
  prepareCriteriaMultiValue,
  removeEmptyOperand,
} from "@/util/prepareSWR";
import { prepareQueryString } from "@/util/widgetHelper";

export default function useCallListMetaverse({
  metaverseNemgoo,
  indicatorId,
  command = "kpiIndicatorDataList",
}: {
  metaverseNemgoo?: any;
  indicatorId?: string;
  command?: string;
}) {
  const { standard } = usePrepareStandard();

  if (_.isEmpty(metaverseNemgoo) && _.isEmpty(indicatorId)) return {};

  const paramTempPagingCriteria = {
    ...metaverseNemgoo?.list?.parameters,
  };

  let myParamsPagingCriteria = prepareApiStandard(
    paramTempPagingCriteria,
    standard
  );
  // console.log("🚀 ~ myParamsPagingCriteria:", myParamsPagingCriteria);

  myParamsPagingCriteria.criteria = prepareCriteriaMultiValue(
    myParamsPagingCriteria?.criteria
  );

  if (!_.isEmpty(myParamsPagingCriteria?.criteria)) {
    myParamsPagingCriteria.criteria = removeEmptyOperand(
      myParamsPagingCriteria?.criteria
    );
  }

  const myParamsReady = {
    // provider: "dev", //"cloudnew",
    provider: metaverseNemgoo?.provider || "dev", //"cloudnew",
    command: command,
    indicatorId: indicatorId || metaverseNemgoo?.list?.indicatorId,
    paging: JSON.stringify(myParamsPagingCriteria?.paging),
    criteria: JSON.stringify(myParamsPagingCriteria?.criteria),
  };

  // console.log(
  //   "OOOOOOOOdO 🚀 ~ myParamsReady:",
  //   prepareQueryString(myParamsReady)
  // );
  /* ------------------ call External API ----------------- */
  const {
    data: metaverseData,
    error: errorAPI,
    mutate: mutateAPI,
  } = useSWR(`/api/get-metaverse-v2?${prepareQueryString(myParamsReady)}`);

  // console.log("🚀 ~ metaverseData:", metaverseData);

  // const rowsData = convertKeysToLowercase(resultReady?.rows);
  const rowsData = metaverseData?.rows || [];
  const pagingData = metaverseData?.paging || {};
  const detailData = metaverseData?.detail || [];

  return {
    dataSrcMetaverse: rowsData,
    pagingMetaverse: pagingData,
    detailMetaverse: detailData,
    errorAPI,
    mutateAPI,
  };
}
