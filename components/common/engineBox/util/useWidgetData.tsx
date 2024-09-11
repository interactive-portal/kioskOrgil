// import { getDataView } from "@/service/serverFunctions";
import { jsonParse } from "@/util/helper";
import dataFetch from "./dataFetch";

export default function useWidgetData(listConfig: any) {
  //   console.log("widgetnemgoo :>> ", listConfig);
  const options = jsonParse(listConfig?.widgetnemgoo);
  let dataReady: any = options?.data || [];
  let error: any;
  let mutate: any = {};
  let aggregatecolumns: string = "";
  let paging: any = {};
  return dataFetch(listConfig);
}
