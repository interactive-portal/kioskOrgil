import axios from "axios";
import formidable, { Formidable } from "formidable";

async function saveFormData(fields: any, files: any) {
  // save to persistent data store

  // console.log("formData", fields);

  const formData = new FormData();

  const config = {
    headers: {
      "content-type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      // httpsAgent: new https.Agent({
      //   rejectUnauthorized: false, // set to false
      // }),
    },
  };

  formData.append(fields["fileName"][0], files, fields["fileName"][0]);
  formData.append(
    "userToken",
    "9bQhBLpxRXuIXWd1op3hYkyZ1j6ckWGjD1jj1hCJ27M=:VjYhKWZUbjddbl5lQnJmeQ=="
  );
  formData.append("fileName", fields["fileName"][0]);

  const param = {
    fileName: fields["fileName"][0],
    sessionId: fields["sessionId"][0],
    file: files,
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_FILE_URL}`,
    formData,
    config
  );

  //   console.log("fiel sessionId :>> ", fields["sessionId"]);
  console.log("fiel resresresresres :>> ", res);

  return { status: "dddd", dddd: "ssssssssss" };
}

async function handlePostFormReq(req: any, res: any) {
  const form = new Formidable();

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
