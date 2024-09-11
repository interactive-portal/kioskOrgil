import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import { useRouter } from "next/router";
// import BlockSlider from "@components/common/Block/BlockSlider";
import BlockSlider from "@/components/common/Block/BlockSlider";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const RiverClubV1PlanHero = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];
  const staticItem = readyDatasrc?.[0]?.[0];

  return (
    <BlockDiv className="relative w-full h-[300px] flex items-center justify-center">
      <BlockSlider
        divNumber="RiverHomeSliderBlock"
        customProps={{
          reactSlickSettings: {
            arrows: false,
            dots: false,
            variableWidth: false,
            infinite: true,
            swipeToSlide: true,
            autoplay: true,
            speed: 300,
          },
          arrowClassName: "bg-transparent",
        }}
      >
        {_.map(readyDatasrc, (item: any, index: number) => {
          return <RiverPlanBanner key={index} item={item} />;
        })}
      </BlockSlider>
    </BlockDiv>
  );
};

export default RiverClubV1PlanHero;

const RiverPlanBanner = ({ item }: any) => {
  const { t } = useTranslation("translate");
  return (
    <BlockDiv className="h-[300px] flex items-center justify-center relative bg-gray-200">
      <BlockDiv className="h-full bg-black/30">
        <img
          src={item?.mainimage}
          className="w-[1080px] h-full absolute inset-0 bg-black/30"
        />
        {/* <RenderAtom
          item={"/images/bannerInput.png"}
          renderType="image"
          customClassName="w-[1080px] h-full absolute inset-0 bg-black/30"
        /> */}
      </BlockDiv>
      <BlockDiv className="z-20 w-full  flex items-center justify-center flex-col h-max">
        <RenderAtom
          item={t(item?.title)}
          renderType="title"
          className={`text-[52px] font-[700] mb-[50px] text-white text-center font-roboto uppercase leading-[50px] px-20`}
        />
        <RenderAtom
          item={t(item?.description)}
          renderType="text"
          className={`text-white font-[400] text-[26px] text-center mb-[74px]`}
        />
        <RenderAtom
          item={{
            value: t(item?.button),
            positionnemgoo: {
              url: {
                path: `/bioinput`,
              },
            },
          }}
          renderType="button"
          className={`bg-[#BAD405] rounded-[8px] px-[42px] py-[35px] text-black uppercase text-[16px] font-[700] mb-[30px]`}
        />
        {/* <BlockDiv className="flex gap-[9px]">
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white" />
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white bg-gray-200" />
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white" />
        </BlockDiv> */}
      </BlockDiv>
    </BlockDiv>
  );
};
