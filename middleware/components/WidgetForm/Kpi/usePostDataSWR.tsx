import useSWR from "swr";

const usePostDataSWR = (comand?: any, param?: any) => {
  const parameters = `&parameters=${JSON.stringify(param)}`;

  let { data, error, mutate } = useSWR(
    `/api/get-process?processcode=${comand}&${parameters}`
  );
  /* -------------------- prepare Data -------------------- */
  let aggregatecolumns: string = "";
  let paging: any = {};

  // let dataReady = data;
  // if (data) {
  // 	aggregatecolumns = dataReady?.aggregatecolumns;
  // 	paging = dataReady?.paging;
  // 	dataReady = _.values(_.omit(dataReady, ["aggregatecolumns", "paging"]));
  // }

  let dataReady = data;
  if (data) {
    dataReady = {
      ...data,
      // kpitemplate: _.values(data?.kpitemplate),
    };
  }

  // return [dataReady, error, mutate];

  /* ----------------------- return ----------------------- */
  return [dataReady, error, mutate, paging, aggregatecolumns];
};

export default usePostDataSWR;
