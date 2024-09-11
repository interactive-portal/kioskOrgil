//Энд Жава-тай холбогдох функцуудыг байлгая, Логин, жагсаалт, процесс дуудах г.м
import axios from "axios";
import https from "https";

export const runService = async (
  pCommand: string,
  pParameters: any,
  lang: any,
  pUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL as string
) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  let bodys = { ...pParameters };

  let requestBody: any = {
    request: {
      command: pCommand,
      languageCode: lang || "mn",
      // userToken: process.env.USER_TOKEN,
      username: process.env.METAHOST_USERNAME,
      password: process.env.METAHOST_PASSWORD,
      returnByStandartJson: "1",
      parameters: bodys,
    },
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  // const response = await axios
  //   .post(pUrl, requestBody, {
  //     httpsAgent: new https.Agent({
  //       rejectUnauthorized: false, // set to false
  //     }),
  //   })
  //   .then((res) => res.data)
  //   .catch((err) => console.log(`err: `, err));
  // console.log("resaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", requestOptions);

  let res: any = await fetch(pUrl, requestOptions);

  const response = await res.json();
  // console.log(
  //   "resaaasdddddddyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  //   response
  // );

  if (!res.ok) {
    const errorCode = res.ok ? false : res.status;
    throw new Error("Failed to fetch data");
  }

  // const response = await res.json();

  if (response && response.status === "error") {
    console.log("SERVICE_ERROR :", response.data.response.text);
    throw new Error(response.data.response.text);
  }

  return response;
};
export const runServiceLogin = async (
  pCommand: string,
  pParameters: any,
  lang: any,
  pUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL as string
) => {
  let bodys = { ...pParameters };

  let requestBody: any = {
    request: {
      command: pCommand,
      languageCode: lang || "mn",
      userToken: process.env.USER_TOKEN,
      // username: pce,
      // password: "Pass789*456",
      returnByStandartJson: "1",
      parameters: bodys,
    },
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const res = await fetch(pUrl, requestOptions);
  // console.log("res :>> ", res);

  if (!res.ok) {
    const errorCode = res.ok ? false : res.status;
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  if (response && response.status === "error") {
    console.log("SERVICE_ERROR :", response.data.response.text);
    throw new Error(response.data.response.text);
  }

  return response;
};

export const runServiceMetaVerse = async (
  pCommand: string,
  pParameters: any,
  lang: any,
  pUrl: string = process.env.METAVERSE_URL as string
) => {
  let bodys = { ...pParameters };

  let requestBody: any = {
    request: {
      command: pCommand,
      username: process.env.METAHOST_USERNAME,
      password: process.env.METAHOST_PASSWORD,
      parameters: bodys,
    },
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json;charset=UTF-8");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const res = await fetch(pUrl, requestOptions);

  if (!res.ok) {
    const errorCode = res.ok ? false : res.status;
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  if (response && response.status === "error") {
    console.log("SERVICE_ERROR :", response.data.response.text);
    throw new Error(response.data.response.text);
  }

  return response;
};

export const runServiceComment = async (
  pCommand: string,
  pParameters: any,
  lang: any,
  pUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL as string
) => {
  let bodys = { ...pParameters };

  let requestBody: any = {
    request: {
      command: pCommand,
      languageCode: lang || "mn",
      // userToken: process.env.USER_TOKEN,
      // sessionid: pParameters?.dbsessionid,
      userToken: process.env.USER_TOKEN,
      // username: "admin",
      // password: "Pass789*456",
      returnByStandartJson: "1",
      parameters: bodys,
    },
  };
  delete requestBody.request.parameters.dbsessionid;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const res = await fetch(pUrl, requestOptions);

  if (!res.ok) {
    const errorCode = res.ok ? false : res.status;
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  if (response && response.status === "error") {
    console.log("SERVICE_ERROR :", response.data.response.text);
    throw new Error(response.data.response.text);
  }

  return response;
};
