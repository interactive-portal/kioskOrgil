import { getProcessData } from "@/service/serverFunctions";
import { jsonParse } from "@/util/jsonParse";
import { prepareApiStandard } from "@/util/prepareApiStandard";
// import usePrepareStandard from "@/middleware/dataHook/usePrepareStandard";

const getProcess = async (req: any, res: any) => {
  const metaName: string = req?.query?.metaName || "metaProd";
  const processcode = req.query?.command || "";
  let parameters =
    req.body.parameters || jsonParse(req.query?.parameters) || "{}";
  const debug = req.query?.debug || false;
  const standard = jsonParse(req.query?.standard);

  delete parameters.slug;

  const readyParameters = prepareApiStandard(parameters, standard);

  // console.log("readyParameters", readyParameters);

  const result = await getProcessData(processcode, readyParameters);

  res.status(200).json(result);
};

export default getProcess;
