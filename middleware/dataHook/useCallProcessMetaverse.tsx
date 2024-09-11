import { prepareApiStandard } from "@/util/prepareApiStandard";
import _ from "lodash";
import { useToggle } from "react-use";
import callApiPostV3 from "./callApiPostV3";
import { prepareQueryString } from "@/util/widgetHelper";

export default function useCallProcessMetaverse() {
  const [isProcessWorking, setIsProcessWorking] = useToggle(false);

  const callMetaverseProcess = async ({
    // type = "get",
    metaverseNemgoo,
    event = {},
    resultConfig = {
      notification: {
        duration: 4.5,
        placement: "bottomRight",
      },
    },
    notificationMessage = null,
    notificationDescription = null,
    silent = false,
  }: {
    // type: "get" | "insert" | "edit" | "delete";
    metaverseNemgoo?: any;
    event?: any;
    resultConfig?: any;
    notificationMessage?: any;
    notificationDescription?: any;
    silent?: boolean;
  }) => {
    if (_.isEmpty(metaverseNemgoo)) return null;

    setIsProcessWorking(true);

    const commands: any = {
      get: "",
      insert: "kpiIndicatorDataSave",
      edit: "kpiIndicatorDataSave",
      delete: "kpiIndicatorRemoveData",
      // kpiIndicatorDataListConfig
      // kpiIndicatorConfig
      // kpiIndicatorDataListFilterConfig
      // kpiIndicatorDataList
      // kpiIndicatorDataSave
      // kpiIndicatorGetData
      // kpiIndicatorRemoveData
      // kpiIndicatorGetMetaInfo
      // kpiIndicatorModuleMenu
      // kpiIndicatorChildMenu
      // kpiIndicatorChartDataConfig
      // kpiIndicatorDashboardConfig
      // kpiIndicatorDashboardFilterConfig
      // kpiIndicatorCharts
      // kpiIndicatorExcelExport
    };

    const myParamsReady = {
      // provider: "dev", //"cloudnew",
      provider: metaverseNemgoo?.provider || "dev", //"cloudnew",
      command: commands[metaverseNemgoo?.type],
    };

    const result = await callApiPostV3({
      api: `/api/get-metaverseprocess-v2?${prepareQueryString(myParamsReady)}`,
      headers: null,
      resultConfig,
      event,
      notificationMessage,
      notificationDescription,
      silent,
      body: metaverseNemgoo?.parameters,
    });

    console.log("EEEEEEEEEEEEEEE result", result);

    setIsProcessWorking(false);

    return result;
  };

  return { callMetaverseProcess, isProcessWorking };
}
