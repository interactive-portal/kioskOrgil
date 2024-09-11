import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const RiverClubV1HomeExpand = () => {
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
  const staticItem = data[0];
  return (
    <BlockDiv className="mx-[26px] my-[44px] py-3 flex flex-row gap-x-[53px] bg-white">
      <Paragraph item={staticItem} />
      <RightSection item={staticItem} />
    </BlockDiv>
  );
};

const Paragraph = ({ item }: any) => {
  const { t } = useTranslation("translate");

  return (
    <BlockDiv className="flex flex-col gap-y-[6px] pl-[79px]">
      <RenderAtom
        item={t(item?.title)}
        renderType="title"
        className={`font-[400] text-[20px] uppercase `}
      />
      <RenderAtom
        item={t(item?.description)}
        renderType="text"
        className={`font-[400] text-[16px]`}
      />
    </BlockDiv>
  );
};

const RightSection = ({ item }: any) => {
  const { t } = useTranslation("translate");

  return (
    <BlockDiv className="rounded-[12px] mr-[79px] bg-[linear-gradient(180deg,_#00B0AB_0%,_#BAD405_100%)] leading-[17px] px-10 h-[108px] flex flex-col items-start">
      <RenderAtom
        item={`+1 CLASS`}
        renderType="text"
        className={`text-black font-[400] text-[12px] mt-5 mb-0 pb-0`}
      />
      <RenderAtom
        item={t(item?.button)}
        renderType="button"
        className={`font-[700] text-[28px] capitalize text-black w-max`}
      />
      <BlockDiv className="flex items-end gap-x-1">
        <RenderAtom
          item={`Off`}
          renderType="text"
          className={`font-[400] text-[16px] h-max`}
        />
        <RenderAtom
          item={`${item?.count}%`}
          renderType="text"
          className={`text-[36px] font-[700]`}
        />
        <RenderAtom
          item={`${t(item?.span)}`}
          renderType="text"
          className={`font-[400] text-[16px] w-max h-max`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1HomeExpand;
