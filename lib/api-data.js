import {
  loadProcess as axiosLoadProcess,
  loadDataview,
} from "util/axiosFunction";
// import Member from "lib/api-member";

export const loadProcess = async (props) => {
  // console.log("props loadProcess", props);
  const myProcessResult = (await axiosLoadProcess(props)) || {};
  // console.log("myProcessResult", myProcessResult);
  return myProcessResult;
};

export const loadDataList = async (props = {}, rawObject = false) => {
  let myDataListObject =
    (await loadDataview({
      // systemmetagroupid: props.id || "",
      ...props,
      parameters: {
        showquery: "0",
        ignorepermission: "1",
        paging: {
          pagesize: props?.parameters?.paging?.pagesize || "12", //тоо
          offset: props?.parameters?.paging?.offset || "1", //хуудас
          sortcolumnnames: {
            [props?.parameters?.paging?.sortcolumnnames || "id"]: {
              sorttype: props?.parameters?.paging?.sorttype || "desc",
            },
          },
        },
        ...props.parameters,
      },
    })) || {};

  const myPaging = myDataListObject?.paging || {};
  const myAggregatecolumns = myDataListObject?.aggregatecolumns || {};

  delete myDataListObject["aggregatecolumns"];
  delete myDataListObject["paging"];

  const myResult = rawObject
    ? myDataListObject
    : Object.values(myDataListObject);

  return {
    list: myResult,
    paging: myPaging,
    aggregatecolumns: myAggregatecolumns,
  };
  // return { data: myDataList, config: myDataListConfig };
};
