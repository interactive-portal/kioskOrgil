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
    <BlockDiv className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40 backdrop-blur-lg p-4 flex justify-center items-center">
      <BlockDiv className="">
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
        <BlockDiv className="ml-[28px] mb-[39px]">
          <RenderAtom
            item={staticItem?.description}
            renderType="text"
            className={`text-lg font-[500] text-white w-[566px]`}
          />
        </BlockDiv>
        <BlockDiv className="flex gap-x-[51px] mx-auto items-center w-max">
          {_.map(staticItem?.items, (item: any, index: number) => {
            return (
              <BlockDiv className="w-[217px] h-[200px] relative">
                <BlockDiv>
                  {/* image product */}
                  <RenderAtom
                    item={item?.mainimage}
                    renderType="image"
                    className={`w-[217px] h-[200px]`}
                  />
                </BlockDiv>
                <BlockDiv className="w-[217px] min-h-[68px] pt-[9px] px-[14px] bg-[#BAD405] rounded-[11px] absolute bottom-0 -mt-4">
                  <RenderAtom
                    item={item?.title}
                    renderType="title"
                    className={`uppercase font-bold text-[26px]`}
                  />
                  {/* - 1 + add minus button */}
                  <BlockDiv className="flex items-center justify-between ml-1">
                    <BlockDiv className="flex gap-x-[1px] items-center justify-center w-[60px]">
                      <RenderAtom
                        item={`-`}
                        renderType="button"
                        className={`text-[20px] text-black font-bold`}
                      />
                      <RenderAtom
                        item={`1`}
                        renderType="text"
                        className={`text-[20px] text-black font-bold`}
                      />
                      <RenderAtom
                        item={`+`}
                        renderType="button"
                        className={`text-[20px] text-black font-bold`}
                      />
                    </BlockDiv>
                    <BlockDiv>
                      <RenderAtom
                        item={`₮${item?.price}K`}
                        renderType="title"
                        className={``}
                      />
                    </BlockDiv>
                  </BlockDiv>
                </BlockDiv>
              </BlockDiv>
            );
          })}
        </BlockDiv>
        {/* buttons here */}
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
