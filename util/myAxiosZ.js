import axios from "@/util/axiosConfig";
import https from "https";

const myAxiosZ = (myPlainParams) => {
  return new Promise((resolve, reject) => {
    const myLastParam = {
      ...myPlainParams,
      request: {
        ...myPlainParams.request,
        // zip: 1,
      },
    };

    console.log("myLastParammyLastParam", myLastParam);

    // const myLastRequest = ecomZ(myLastParam);
    const myLastRequest = myLastParam;

    axios
      .post("", myLastRequest, {
        headers: { "Content-Type": "application/json" },
        // strictSSL: false,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      })
      .then((response) => {
        // console.log("ppppppp", response);
        // const myData = decomZ(response.data);
        const myData = response.data;
        // console.log("sssssssss", myData);
        resolve(myData);
        // return myData;
      })
      .catch((error) => {
        console.log("Error", error);
        // message.error(error.toString(), 7);
        reject(error);
      });
  });
};

export default myAxiosZ;
