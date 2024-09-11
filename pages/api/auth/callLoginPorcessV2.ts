import callApi from "@/middleware/dataHook/callApi";
import _ from "lodash";

/* ------------------------------------------------------ */
/*                    CALLLOGINPROCESS                    */
/* ------------------------------------------------------ */
export const callLoginProcess = async ({
  credentials,
}: {
  credentials: any;
}) => {
  const command = credentials?.command || "login";

  const parameter = !_.isEmpty(credentials?.parameter)
    ? {
        ...JSON.parse(credentials?.parameter),
      }
    : {
        iscustomer: credentials?.iscustomer || false,
        username: credentials?.username,
        password: credentials?.password || credentials?.passwordhash,
        // isldap: credentials?.isLdap || 0,
        isHash: credentials?.isHash || 0,
      };
  const moreRequest = !_.isEmpty(credentials?.moreRequest)
    ? {
        ...JSON.parse(credentials?.moreRequest),
      }
    : {};
  const metaNameV2 = credentials?.metaNameV2 || "PROD";

  const myParams = {
    command: command,
    parameter: JSON.stringify(parameter),
    moreRequest: JSON.stringify(moreRequest),
    metaNameV2: "DEV",
  };

  // console.log(myParams);

  const URL = process.env.URL;

  let result: any = await callApi({
    api: `${URL}/api/get-process?command=${myParams.command}&parameters=${myParams.parameter}&morerequest=${myParams.moreRequest}&metaNameV2=${myParams.metaNameV2}`,
  });
  if (result?.userkeys) {
    delete result.userkeys;
  }

  delete result?.result.sessionvalues;
  // console.log("et-process :>> ", result);

  return result?.result;
};

/* ------------------------------------------------------ */
/*                   CALLLOGINPROCESSV2                   */
/* ------------------------------------------------------ */
export const callLoginProcessV2 = async ({
  user,
  type,
}: {
  user: any;
  type: string;
}) => {
  const command = "cozyLoginAndCreate";

  const parameter = {
    userName: user?.profile?.userName,
    passwordHash: user?.profile?.passwordHash,
    isOnlyCozyLogin: "0",

    // email: user?.profile?.userName,
    // lastName: "",
    // firstName: user?.profile?.name,
    // phoneNumber: "",
    // password: "89",
    // passwordConfirm: "89",

    KYC_DTL: [
      {
        userName: user?.profile?.email,
        kycType: type,
        kycKey: "email",
        kycValue: user?.profile?.email,
      },
      {
        userName: user?.profile?.email,
        kycType: type,
        kycKey: "name",
        kycValue: user?.profile?.name,
      },
      {
        userName: user?.profile?.email,
        kycType: type,
        kycKey: "image",
        kycValue: user?.profile?.picture,
      },
    ],
  };

  const moreRequest = {};
  const metaNameV2 = user?.metaNameV2 || "PROD";

  const myParams = {
    command: command,
    parameter: JSON.stringify(parameter),
    moreRequest: JSON.stringify(moreRequest),
    standard: undefined,
    customProps: undefined,
    metaNameV2: metaNameV2,
  };

  const URL = process.env.URL;

  let result: any = {};

  try {
    const response: any = await callApi({
      api: `${URL}/api/get-process?command=${myParams.command}&parameter=${myParams.parameter}&morerequest=${myParams.moreRequest}&standard=${myParams.standard}&customProps=${myParams.customProps}&metaNameV2=${myParams.metaNameV2}`,
      silent: true,
    });

    if (response && response?.result && response?.result?.result) {
      result = response?.result?.result;
    }
  } catch (error) {
    // Handle any API call errors here
  }

  if (result?.sessionvalues) {
    delete result.sessionvalues;
  }

  return result;
};
