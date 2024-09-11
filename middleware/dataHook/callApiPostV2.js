import { message } from "antd";
import axios from "axios";
import useShowInfo from "./useShowInfo";
import https from "https";

export default async function callApiPostV2({
  api,
  headers,
  body,
  resultConfig = {
    notification: { duration: 4.5, placement: "topRight" },
  },
  event = {},
  notificationMessage = "",
  notificationDescription = "",
  silent = false,
}) {
  const hideMessage =
    typeof window !== "undefined"
      ? !silent && message.loading("Түр хүлээнэ үү...", 0) //Энийг useShowInfo руу ч юмуу шилжүүлэх хэрэгтэй юм байна.
      : () => {};

  let myResult = {};
  try {
    // const response = await axios.post(api, body, { headers });
    const response = await axios.post(api, body, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, // set to false
        keepAlive: true,
      }),
    });
    myResult = response.data?.response;
  } catch (error) {
    console.log("callApiPostV2 дотор алдаа гарлаа:", error);
    !silent && hideMessage();
  } finally {
    /* ----------------- hideLoadingMessage ----------------- */
    !silent && hideMessage();
  }

  const myEvent = {
    onSuccess: () => {},
    onError: () => {},
    ...event,
  };

  console.log("callApiPostV2 myResult", myResult);
  // console.log("callApiPostV2 notificationMessage", notificationMessage);

  switch (myResult.status) {
    case "error":
      !silent &&
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useShowInfo({
          type: "error",
          title: `Алдаа!`,
          description: myResult.text,
          resultConfig: resultConfig,
        });

      myEvent?.onError();
      return null;
    case "success":
      if (!silent) {
        switch (myResult?.result?.returncode) {
          case "401":
            useShowInfo({
              type: "error",
              title: `Алдаа!`,
              description: myResult?.result?.warnmessage,
              resultConfig: resultConfig,
            });
            return null;

          default:
            useShowInfo({
              type: "success",
              title: notificationMessage
                ? notificationMessage
                : "Амжилттай гүйцэтгэлээ",
              description: notificationDescription,
              resultConfig: resultConfig,
            });
          // return null;
        }
      }

      myEvent?.onSuccess();
      return myResult;
    default:
      return myResult;
  }
}
