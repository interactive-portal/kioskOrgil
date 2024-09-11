import axios from "axios";
import formidable from "formidable";

async function saveFormData(fields: any, files: any) {
  // save to persistent data store
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      // httpsAgent: new https.Agent({
      //   rejectUnauthorized: false, // set to false
      // }),
    },
  };

  const param = {
    fileName: fields["fileName"][0],
    sessionId: fields["sessionId"][0],
    file: files,
  };

  console.log("fiel param :>> ", param);

  const ssssssssssssssssssssss = await axios.post(
    "https://cloudnew.veritech.mn:8181/erp-services/FileServlet",
    param
  );

  //   console.log("fiel sessionId :>> ", fields["sessionId"]);
  console.log("fiel ssssssssssssssssssssss :>> ", ssssssssssssssssssssss);

  return { status: "dddd", dddd: "ssssssssss" };
}

async function handlePostFormReq(req: any, res: any) {
  const form = formidable();

  const formData: any = new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject("error");
      }
      resolve({ fields, files });
    });
  });

  //   try {
  const { fields, files } = await formData;

  const ddddd = await saveFormData(fields, files);
  console.log("ddddd :>> ", ddddd);

  // try {
  //   const ddddd = await saveFormData(fields, files);
  //   console.log("ddddd :>> ", ddddd);
  //   res.status(200).json(ddddd);
  //   return;
  // } catch (e) {
  //   res.status(500).send({ status: "something went wrong" });
  //   return;
  // }
  //   } catch (e) {
  //     res.status(400).send({ status: "invalid submission" });
  //     return;
  //   }
}

export default async function handler(req: any, res: any) {
  if (req.method == "POST") {
    await handlePostFormReq(req, res);
  } else {
    res.status(404).send("method not found");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
