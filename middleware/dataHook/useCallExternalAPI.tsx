import { prepareApiStandard } from "@/util/prepareApiStandard";
import _ from "lodash";
import useSWR from "swr";
import usePrepareStandard from "./usePrepareStandard";

export default function useCallExternalAPI({
  externalApiNemgoo,
}: {
  externalApiNemgoo: any;
}) {
  if (_.isEmpty(externalApiNemgoo)) return [null];

  const { standard } = usePrepareStandard();
  const bodyTemp = externalApiNemgoo?.body || {};
  const bodyReady = prepareApiStandard(bodyTemp, standard);

  /* ------------------ call External API ----------------- */
  // const fetcher = async (url: string, options: any) => {
  //   const response = await fetch(url, options);
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // };

  // const apiUrl = externalApiNemgoo?.url?.baseUrl || "";
  // const method = externalApiNemgoo?.method || "Post";
  // const headers = {
  //   "Content-Type": "application/x-www-form-urlencoded",
  //   Accept: "application/json, text/plain, */*",
  //   ...externalApiNemgoo?.headers,
  // };
  // const body = JSON.stringify(bodyReady || {});

  // const {
  //   data: externalData,
  //   error: errorAPI,
  //   mutate: mutateAPI,
  // } = useSWR(apiUrl, (url: string) => fetcher(url, { method, headers, body }));

  const {
    data: externalData,
    error: errorAPI,
    mutate: mutateAPI,
  } = useSWR([
    externalApiNemgoo?.url?.baseUrl || "",
    // `https://dev.veritech.mn/restapi`,
    // `https://api.openweathermap.org/data/2.5/weather?q=ulaanbaatar&appid=b214f303ac6c943ed09cc62773370f94&units=metric`,
    {
      method: externalApiNemgoo?.method || "Post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json, text/plain, */*",
        ...externalApiNemgoo?.headers,
      },
      body: JSON.stringify(bodyReady || {}),
    },
  ]);

  const tempResult = _.get(
    externalData,
    externalApiNemgoo?.result?.getDataPath || "response.result",
    externalData
  );
  // console.log("🚀 ~ tempResultss:", tempResult);

  const datasrc = !_.isEmpty(tempResult)
    ? tempResult?.["0"] //Array хэлбэртэй жагсаалт бол
      ? _.values(tempResult || [])
      : [tempResult] //зүгээр дан Object гэсэн үг
    : [];

  // console.log("🚀 ~ datasrc:", datasrc);

  return [datasrc];
}
