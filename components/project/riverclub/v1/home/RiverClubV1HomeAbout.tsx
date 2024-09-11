import { useContext, useTransition } from "react";
import React from "react";
import { useRouter } from "next/router";
// import BlockSlider from "@components/common/Block/BlockSlider";
import BlockSlider from "@/components/common/Block/BlockSlider";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import _ from "lodash";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useTranslation } from "react-i18next";

const RiverClubV1HomeAbout = () => {
  const { query } = useRouter();
  const { t } = useTranslation("translate");
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];
  const staticItem = data?.[0];

  const readyData = readyDatasrc?.filter((item: any) => {
    return item?.booktypeid == "1000900803";
  });

  return (
    <BlockDiv className="py-10">
      <BlockSlider
        type="simple"
        customProps={{
          slickslideRawClass: {
            padding: "0 10px 0 0",
          },
          reactSlickSettings: {
            dots: true,
            infinite: false,
            variableWidth: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: true,
            loop: true,
          },
        }}
      >
        {_.map(readyData, (item: any, index: number) => {
          return (
            <BlockDiv
              className="flex flex-col items-center justify-center gap-y-6 bg-[#CACACA]"
              key={index}
            >
              <RenderAtom
                item={item?.imgurl}
                renderType="image"
                className={`w-full h-full max-h-[360px]`}
              />
              <BlockDiv className="px-[105px] mt-[26px] flex flex-col items-start justify-center ">
                <RenderAtom
                  item={t(item?.title)}
                  renderType="title"
                  className={`font-bold text-[20px] text-black mb-[18px] uppercase`}
                />
                <RenderAtom
                  item={t(item?.body)}
                  renderType="title"
                  className={`font-normal text-[16px] mb-[22px] text-start`}
                />
              </BlockDiv>
            </BlockDiv>
          );
        })}
      </BlockSlider>
    </BlockDiv>
  );
};

export default RiverClubV1HomeAbout;
