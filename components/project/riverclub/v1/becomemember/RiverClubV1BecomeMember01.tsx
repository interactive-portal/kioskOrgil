import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

const RiverClubV1BecomeMember01 = ({ item }: any) => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];

  return (
    <BlockDiv className="flex items-center justify-center z-10">
      <BlockDiv className="flex items-center justify-center flex-col">
        <RenderAtom
          item={item?.face}
          renderType="image"
          className={`w-[214px] h-[214px] mb-[60px]`}
        />
        <BlockDiv className="flex flex-col items-center mb-[50px] justify-center text-center">
          <RenderAtom
            item={item?.faceFailed || staticItem?.faceFailed}
            renderType="title"
            className={`font-[600] text-[45px] text-white`}
          />
          <RenderAtom
            item={item?.tryAgainMsg || staticItem?.tryAgainMsg}
            renderType="text"
            className={`font-normal text-white text-[34px]`}
          />
        </BlockDiv>
        {/* buttons here :D */}
        <BlockDiv className="flex items-center justify-between gap-x-[28px]">
          <BlockDiv className="bg-[#BAD405] w-[210px] h-[60px] flex items-center justify-center rounded-[8px]">
            <RenderAtom
              item={item?.buttonTryAgain || staticItem?.buttonTryAgain}
              renderType="button"
              className={`font-bold text-[16px] uppercase text-black p-0 m-0`}
            />
          </BlockDiv>
          <BlockDiv className="bg-black w-[210px] h-[60px] flex items-center justify-center rounded-[8px]">
            <RenderAtom
              item={item?.buttonCancel || staticItem?.buttonCancel}
              renderType="button"
              className={`font-bold text-[16px] uppercase text-white p-0 m-0`}
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1BecomeMember01;
