import React from "react";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const RiverClubV1BioInputCondition = () => {
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
  const staticItem = data[0];
  return (
    <BlockDiv className="bg-white py-[20px] px-[123px] flex gap-x-2">
      <BlockDiv>
        <BlockDiv>
          <RenderAtom
            item={t(staticItem?.title)}
            renderType="title"
            className={`text-black text-[28px] font-bold mb-[15px] leading-[27px] uppercase`}
          />
          <RenderAtom
            item={t(staticItem?.description)}
            renderType="text"
            className={`text-[16px] font-normal mt-[20px] text-[#303030] leading-[22px]`}
          />
          {/* <BlockDiv className="flex gap-x-[26px] mt-[10px]">
            <BlockDiv className="w-[210px] h-[60px] bg-[#BAD405] cursor-pointer flex items-center justify-center rounded-[8px]">
              <RenderAtom
                item={staticItem?.buttonSelect}
                renderType="button"
                className={`text-black font-[700] text-[16px]`}
              />
            </BlockDiv>
            <BlockDiv className="w-[210px] h-[60px] bg-black cursor-pointer flex items-center justify-center rounded-[8px]">
              <RenderAtom
                item={staticItem?.buttonCancel}
                renderType="button"
                className={`text-white font-[700] text-[16px]`}
              />
            </BlockDiv>
          </BlockDiv> */}
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1BioInputCondition;
