import { message } from "antd";
import useShowInfo from "./useShowInfo";

export default async function callApiPost({
  api,
  resultConfig = {
    notification: { duration: 4.5, placement: "topRight" },
  },
  event = {},
  notificationMessage = "",
  notificationDescription = "",
  silent = false,
  body,
}) {
  const hideMessage =
    typeof window !== "undefined"
      ? !silent && message.loading("Түр хүлээнэ үү...", 0) //Энийг useShowInfo руу ч юмуу шилжүүлэх хэрэгтэй юм байна.
      : () => {};

  /* ------------------------------------------------------ */
  /*                       FETCH DATA                       */
  /* ------------------------------------------------------ */
  console.log("CCCCCCCCCCCCCCCCCCCCCCC body", body);
  // энийг үзнэ.
  // const response = await fetch(api);
  let myResult = {};
  try {
    const response = await fetch(api, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify(body || {}),
    });
    myResult = await response.json();
  } catch (error) {
    console.log("callApiPost дотор алдаа гарлаа:", error);
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

  // console.log("callApiPost myResult", myResult);
  // console.log("callApiPost notificationMessage", notificationMessage);

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
