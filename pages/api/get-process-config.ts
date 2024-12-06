import { getProcessData } from "@/service/serverFunctions";
import { jsonParse } from "@/util/jsonParse";
import { prepareApiStandard } from "@/util/prepareApiStandard";
import _ from "lodash";
// import usePrepareStandard from "@/middleware/dataHook/usePrepareStandard";

const getProcess = async (req: any, res: any) => {
  const metaName: string = req?.query?.metaName || "metaProd";
  const processcode = req.query?.command || "";
  let parameters =
    req.body.parameters || jsonParse(req.query?.parameters) || "{}";

  const crmsssssssssss = parameters?.crm || "";

  const debug = req.query?.debug || false;
  const standard = jsonParse(req.query?.standard);

  delete parameters.slug;

  const readyParameters = prepareApiStandard(parameters, standard);

  console.log("readyParameters", crmsssssssssss);

  const result = await getProcessData(processcode, readyParameters);
  let getData: any = {};

  if (result?.status == "success") {
    const param: any = _.values(result?.result?.meta_process_default_get);
    const command = result?.meta_process_default_get?.code;
    // const parampath = result?.meta_process_default_get[0]?.parampath;

    const parameters = {
      filterCustomerId: crmsssssssssss,
    };

    const resultsss = await getProcessData(
      "fitKioskFindCustomerDtlData_GET_004",
      parameters
    );
    getData = resultsss.result;
  }

  res.status(200).json({ result, getData });
};

export default getProcess;
