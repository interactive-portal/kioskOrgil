import { getDataView } from "@/service/serverFunctions";
import { jsonParse } from "@/util/helper";

const getData = async (req: any, res: any) => {
  const lang = req.query?.lang || "mn";
  const debug = req.query?.debug || false;

  let parameters = {
    systemMetaGroupId: req.query?.metaid || "",
    ignorepermission: "1",
    showQuery: "0",
    pagingWithoutAggregate: req.query?.pagingwithoutaggregate || "0",
    criteria: {
      ...jsonParse(req.query?.criteria),
    },

    paging: {
      ...jsonParse(req.query?.paging || ""),
    },
  };

  try {
    const result = await getDataView(parameters, lang);
    // console.log("imnBannerList :>> ", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getData;
