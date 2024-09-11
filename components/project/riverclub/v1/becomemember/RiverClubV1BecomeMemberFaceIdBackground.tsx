import React from "react";
import { useContext } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import RiverClubV1BecomeMember01 from "./RiverClubV1BecomeMember01";
import RiverClubV1HomePurchase from "../home/RiverClubV1HomePurchase";
import { useRouter } from "next/router";

const RiverClubV1BecomeMemberFaceIdBackground = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem = readyDatasrc[0];
  const retry = readyDatasrc[1];
  const notMember = readyDatasrc[2];
  const purchase = readyDatasrc[3];

  const dataRetry = language === "mn" ? retry?.mn : retry?.en;

  const plan =
    language === "mn" ? notMember?.planItems?.mn : notMember?.planItems?.en;

  const PurchData =
    language === "mn"
      ? purchase?.purchaseItems?.mn
      : purchase?.purchaseItems?.en;

  console.log(`test for data`, purchase);

  const backgroundStyle = {
    backgroundImage: `url(${staticItem?.mainimage})`,
    backgroundRepeat: "no-repeat",
    position: "absolute",
    top: 100,
    left: 0,
    width: "1080px",
    height: "1747px",
  };

  return (
    <BlockDiv
      className="flex items-center justify-center"
      style={backgroundStyle}
    >
      <BlockDiv className="flex flex-col items-center justify-center w-full mx-auto z-20 mt-96">
        <RiverClubV1BecomeMember01 item={dataRetry} />
        <BlockDiv className="w-[950px] mt-[54px]">
          <RenderAtom
            item={language === "mn" ? notMember?.titleMN : notMember?.title}
            renderType="title"
            className={`text-white underline uppercase font-normal text-[34px] mb-[34px] ml-5`}
          />
          <BlockDiv className="bg-white flex w-full items-center justify-between p-6">
            <BlockDiv className="w-[500px]">
              <RenderAtom
                item={plan[1]?.title}
                renderType="title"
                className={`font-normal text-[20px]`}
              />
              <RenderAtom
                item={plan[1]?.description}
                renderType="text"
                className={`text-[16px] font-normal mt-5 `}
              />
            </BlockDiv>
            <BlockDiv className="w-[300px] text-[30px] p-2 uppercase h-[108.48px] rounded-[12px] bg-[#BAD405]">
              <RenderAtom
                item={plan[2]?.button}
                renderType="button"
                className={`font-bold leading-6 text-wrap`}
              />
              <RenderAtom
                item={plan[2]?.description}
                renderType="text"
                className={`text-[15px] font-normal mt-10 text-end`}
              />
            </BlockDiv>
          </BlockDiv>
        </BlockDiv>
        <BlockDiv className="mt-[54px] flex flex-col items-start">
          <RenderAtom
            item={language === "mn" ? purchase?.titleMN : purchase?.title}
            renderType="title"
            className={`text-white ml-24 underline uppercase font-normal text-[34px] mb-[34px]`}
          />
          <RiverClubV1HomePurchase
            item={PurchData[0]}
            modalTop={PurchData[1]}
            QRpay={PurchData[3]}
            purchaseAgeBtn={PurchData[2]}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1BecomeMemberFaceIdBackground;
