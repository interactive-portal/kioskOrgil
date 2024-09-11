import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import useCallProcess from "@/middleware/dataHook/useCallProcess";
import { useContext, useState } from "react";

export default function Newsletter1() {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
    Title,
  } = useContext(WidgetWrapperContext);

  const { callProcess } = useCallProcess();
  const [value, setValue] = useState("");
  // console.log("Newsletter1 config", config);
  // console.log("Newsletter1 readyDatasrc", readyDatasrc);
  // console.log("Newsletter1 widgetnemgooReady", widgetnemgooReady);
  // console.log("Newsletter1 positionConfig", positionConfig);
  const Submit = async () => {
    const result = await callProcess({
      command: "ECM_SUBSCRIBE_001",
      parameter: {
        url: window.location.href,
        email: value,
      },
      notificationMessage: "Бүртгүүлсэнд баярлалаа",
      notificationDescription: "Өдрийг сайхан өнгөрүүлээрэй :)",
      resultConfig: {
        notification: {
          duration: 4.5,
          placement: "topRight",
        },
      },
    });
    if (result?.status === "success") {
      setValue("");
    }
  };

  // console.log("readyData", readyDatasrc);

  return (
    <>
      <BlockDiv customClassName="lg:w-2/4 xs:w-11/12 mx-auto">
        {readyDatasrc[0]?.position2 && (
          <BlockDiv customClassName="xl:w-1/2 md:mb-14 xl:mb-0 relative h-min flex items-center justify-center">
            <RenderAtom
              defaultAtom="image"
              item={readyDatasrc[0]?.position2}
              customClassName="h-full xl:w-full lg:w-1/2 w-full "
            />
          </BlockDiv>
        )}

        <BlockDiv customClassName="block w-full xl:w-full ">
          <BlockDiv customClassName="flex items-stretch my-[60px]">
            <input
              type="text"
              onChange={(e: any) => setValue(e.target.value)}
              value={value}
              className="rounded-[30px] rounded-r-none text-base leading-none bg-gray-100 text-gray-800 p-4 w-full border border-[#E1E1E1] focus:outline-none focus:ring-0 focus:ring-transparent"
              placeholder="Таны и-мэйл хаяг?"
            />
            {/* <RenderAtom
              item={{ placeholder: "Таны и-мейл хаяг", value: "asd" }}
              customProps={{ type: "input", placeholder: "Таны и-мейл хаяг" }}
              defaultAtom="input"
              customClassName="bg-gray-100 rounded-lg rounded-r-none text-base leading-none text-gray-800 p-5 w-full border border-transparent focus:outline-none focus:border-gray-500"
            /> */}
            <RenderAtom
              item={
                readyDatasrc[0]?.position10 || {
                  value: "Бүртгүүлэх",
                  icon: "fa-sharp fa-light",
                }
              }
              renderType="button"
              customClassName="w-auto hover:bg-[#699BF7] bg-[#699BF7] rounded-r-[30px] text-[16px] font-medium leading-none text-white p-4  focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-700 cursor-pointer focus:outline-0"
              customProps={{
                icon: "fa-sharp fa-light fa-heart",
              }}
              onClick={() => Submit()}
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </>
  );
}
