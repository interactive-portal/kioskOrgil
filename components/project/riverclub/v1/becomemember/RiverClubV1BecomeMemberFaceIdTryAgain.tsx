import BlockDiv from "@/components/common/Block/BlockDiv";
import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

const RiverClubV1BecomeMemberFaceIdTryAgain = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  return (
    <BlockDiv className="flex flex-col w-[1080px] items-center justify-center relative z-20">
      <BlockDiv className="absolute inset-auto -translate-y-[1000px] bottom-auto m-auto flex flex-col items-center justify-center h-max w-max">
        <RenderAtom
          item={staticItem?.mainimage}
          renderType="image"
          className={`w-[214px] h-[214px] mb-[90px]`}
        />
        <RenderAtom
          item={staticItem?.title}
          renderType="title"
          className={`text-[46px] font-[600] text-white capitalize text-center mb-[2px]`}
        />
        <RenderAtom
          item={staticItem?.subtitle}
          renderType="text"
          className={`text-[34.52px] font-normal text-white mb-[54px]`}
        />

        <BlockDiv className="flex gap-x-[26px]">
          <RenderAtom
            item={staticItem?.button?.tryAgain}
            renderType="button"
            className={`px-[27px] py-[24px] bg-[#BAD405] text-black font-[700] rounded-[8px] text-[16px]`}
          />
          <RenderAtom
            item={staticItem?.button?.cancel}
            renderType="button"
            className={`px-[76px] py-[24px] text-white bg-black rounded-[8px]`}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1BecomeMemberFaceIdTryAgain;
