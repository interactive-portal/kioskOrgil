import { getProcessCustom, getProcessData } from "@/service/serverFunctions";

export default async (req: any, res: any) => {
  const metaName: string = req?.query?.metaName || "metaProd";
  const processcode = req.body.processcode || "";
  const parameters = req.body.parameters || {};
  const config = req.body.headerParam || "";

  // const metaName: string = req?.query?.metaName || "metaProd";

  // const ourMetaConstant = (metaConfig as any)[metaName];
  let user: any = null;

  // const result = await serverData(
  //   "",
  //   processcode,
  //   parameters,
  //   ourMetaConstant,
  //   config
  // );

  try {
    const result = await getProcessCustom(processcode, parameters);

    if (result.status == "success") {
      let param = {
        filterCustomerId: result.result.sessioncrmuserid || "",
      };

      const { result: hash } = await getProcessData(
        "getCrmCustomerIdDv_004",
        param
      );
      user = {
        ...hash,
        ...result,
      };
    }
    res.status(200).json(user || result);
  } catch (error) {
    res.status(500).json({ error });
  }

  // if (result.status == "success") {
  //   console.log("resultresultresult :>> ", result);
  //   let param = {
  //     filterCustomerId: result.result.sessioncrmuserid || "",
  //   };

  //   // const { result: hash } = await serverData(
  //   //   "",
  //   //   "getCrmCustomerIdDv_004",
  //   //   param,
  //   //   ourMetaConstant,
  //   //   config,
  //   //   { returnByStandartJson: 1 }
  //   // );
  //   // user = {
  //   //   ...hash,
  //   //   ...result,
  //   // };
  // }
  // delete user?.result?.sessionvalues;
  // delete user?.result?.sessionid;

  // res.status(200).json(user || result);
};
