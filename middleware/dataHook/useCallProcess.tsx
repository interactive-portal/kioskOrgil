import { useToggle } from "react-use";
import callApi from "./callApi";
import usePrepareStandard from "./usePrepareStandard";
import JSON5 from "json5";
import callApiPost from "./callApiPost";
import { useCloud } from "@/hooks/use-cloud";

export default function useCallProcess() {
  const cloudContext = useCloud();
  const metaNameV2 = process.env.HOSTOBJECTV2_METANAMEV2 || "PROD";
  const [isProcessWorking, setIsProcessWorking] = useToggle(false);
  const { standard } = usePrepareStandard();

  const callProcess = async ({
    command,
    parameter,
    moreRequest = null,
    // setIsWorking = (isWorking: boolean) => {},
    event = {},
    resultConfig = {
      notification: {
        duration: 4.5,
        placement: "bottomRight",
      },
    },
    notificationMessage = null,
    notificationDescription = null,
    silent = false,
    className = "",
    customProps = {}, //debug-тай холбоотой зүйлс байна.
    type = "param",
  }: {
    command: string;
    parameter: any;
    moreRequest?: any;
    event?: any;
    resultConfig?: any;
    notificationMessage?: any;
    notificationDescription?: any;
    silent?: boolean;
    className?: string;
    customProps?: any;
    type?: string;
  }) => {
    setIsProcessWorking(true);

    // console.log("--------------useCallProcess command", metaNameV2);
    // console.log("--------------useCallProcess parameter", parameter);

    const myParams = {
      command: command,
      parameter: encodeURIComponent(JSON.stringify(parameter)),
      moreRequest: JSON.stringify(moreRequest),
      standard: JSON.stringify(standard),
      customProps: JSON.stringify(customProps),
      metaNameV2: metaNameV2,
    };
    // console.log("🚀 ~ useCallProcess ~ myParams", myParams);
    // console.log("🚀 ~ useCallProcess ~ myParams.parameter", myParams.parameter);

    let result: any = {};
    try {
      result =
        type !== "post"
          ? await callApi({
              api: `/api/post-process?command=${myParams.command}&parameters=${myParams.parameter}&morerequest=${myParams.moreRequest}&standard=${myParams.standard}&customProps=${myParams.customProps}&metaNameV2=${myParams.metaNameV2}`,
              resultConfig,
              event,
              notificationMessage,
              notificationDescription,
              silent,
            })
          : await callApiPost({
              api: `/api/get-process?command=${myParams.command}&morerequest=${myParams.moreRequest}&standard=${myParams.standard}&customProps=${myParams.customProps}&metaNameV2=${myParams.metaNameV2}`,
              resultConfig,
              event,
              notificationMessage,
              notificationDescription,
              silent,
              body: parameter,
            });
    } catch (err) {
      console.log("useCallProcess дотор алдаа гарлаа: ", err);
      setIsProcessWorking(false);
    } finally {
      setIsProcessWorking(false);
    }

    return result;
  };
  return { callProcess, isProcessWorking };
}
