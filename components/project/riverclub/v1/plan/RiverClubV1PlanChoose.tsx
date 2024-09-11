import React from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const RiverClubV1PlanChoose = ({ planItems }: { planItems: any }) => {
  const { query } = useRouter();
  const { t } = useTranslation("translate");

  const { readyDatasrc } = useContext(WidgetWrapperContext);

  return (
    <BlockDiv className="bg-white py-[40px] px-[50px] gap-x-[40px] grid-cols-12 grid mx-[25px]">
      <BlockDiv className="col-span-8 w-full flex">
        <BlockDiv>
          <RenderAtom
            item={t(readyDatasrc[0]?.title)}
            renderType="title"
            className={`text-black text-[28px] font-bold mb-[15px] leading-[27px] uppercase`}
          />
          <RenderAtom
            item={t(readyDatasrc[0]?.description)}
            renderType="text"
            className={`text-[16px] font-[300] mt-[20px] text-[#303030] leading-[22px] text-justify`}
          />
        </BlockDiv>
      </BlockDiv>
      <div className="col-span-4 w-full">
        <img src="/images/addClass.png" />
      </div>
    </BlockDiv>
  );
};

export default RiverClubV1PlanChoose;
