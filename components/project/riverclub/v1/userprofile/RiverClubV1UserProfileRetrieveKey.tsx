import React from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { useContext, useState, useEffect } from "react";
import _ from "lodash";

const RiverClubV1GetLocker = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  return (
    <BlockDiv className="fixed inset-0 bg-opacity-75 z-40 backdrop-blur-sm p-4 flex justify-center items-center">
      <BlockDiv className="w-[654px] bg-[#373737]">
        <BlockDiv className="mr-[17px] mt-[19px] ml-[28px] flex items-center justify-between mb-[32px]">
          <RenderAtom
            item={staticItem?.title}
            renderType="title"
            className={`text-[#BAD405] font-bold text-[22px]`}
          />
          <RenderAtom
            item={staticItem?.icon}
            renderType="image"
            className={`w-[35px] h-[35px]`}
          />
        </BlockDiv>
        <BlockDiv className="ml-[50px] mb-[17px]">
          <RenderAtom
            item={staticItem?.description}
            renderType="text"
            className={`list-item text-lg font-[500] text-white w-[566px]`}
          />
        </BlockDiv>
        <BlockDiv className="w-[612px] p-[40px]  border border-[#DEDEDE] bg-[#2A2A2A] mx-auto rounded-[15px]">
          {_.map(staticItem?.items, (item: any, index: number) => {
            return (
              <RenderAtom
                item={item}
                renderType="text"
                className={`list-item text-lg font-[500] text-white w-[566px]`}
              />
            );
          })}
        </BlockDiv>
        <BlockDiv className="mt-[25px] flex w-max mx-auto mb-[21px] gap-x-[26px]">
          <RenderAtom
            item={staticItem?.buttonConfirm}
            renderType="button"
            className={`text-black bg-[#BAD405] px-[67px] font-bold text-[16px] py-[24px] rounded-[8px]`}
          />
          <RenderAtom
            item={staticItem?.buttonCancel}
            renderType="button"
            className={`text-white bg-black px-[67px] font-bold text-[16px] py-[24px] rounded-[8px]`}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1GetLocker;
