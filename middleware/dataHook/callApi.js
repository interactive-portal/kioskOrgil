import { message } from "antd";
import useShowInfo from "./useShowInfo";

export default async function callApi({
  api,
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

  /* ------------------------------------------------------ */
  /*                       FETCH DATA                       */
  /* ------------------------------------------------------ */
  let myResult = {};
  try {
    const response = await fetch(api);
    myResult = await response.json();
  } catch (err) {
    console.log("callApi дотор алдаа гарлаа:", err);
  } finally {
    /* ----------------- hideLoadingMessage ----------------- */
    !silent && hideMessage();
  }

  const myEvent = {
    onSuccess: () => {},
    onError: () => {},
    ...event,
  };

  // console.log("callApi myResult", myResult);
  // console.log("callApi notificationMessage", notificationMessage);

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
      break;

    case "success":
      if (!silent) {
        switch (myResult?.result?.returncode) {
          case "401":
            useShowInfo({
              type: "warning",
              title: `Анхаар`,
              description: myResult?.result?.warnmessage,
              resultConfig: resultConfig,
            });
            myEvent?.onError();
            break;

          default:
            useShowInfo({
              type: "success",
              title: notificationMessage
                ? notificationMessage
                : "Амжилттай гүйцэтгэлээ",
              description: notificationDescription,
              resultConfig: resultConfig,
            });
            myEvent?.onSuccess();
            break;
        }
      }

      return myResult;
    default:
      return myResult;
  }
}

// myResult?.result?.result?.returncode
// useShowInfo({
//   type: "success",
//   title: notificationMessage
//     ? notificationMessage
//     : "Амжилттай гүйцэтгэлээ",
//   description: notificationDescription,
//   resultConfig: resultConfig,
// });
