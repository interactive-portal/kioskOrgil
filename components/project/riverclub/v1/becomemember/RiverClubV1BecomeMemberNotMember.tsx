import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";

const RiverClubV1BecomeMemberNotMember = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];
  return (
    <BlockDiv className="w-[1080px] flex flex-col items-center justify-start">
      <BlockDiv className="flex items-center justify-center relative z-20">
        <BlockDiv className="absolute inset-auto -translate-y-[350px] bottom-auto m-auto flex flex-col items-start mb-[30px] justify-center h-max w-max">
          <RenderAtom
            item={staticItem?.subtitle}
            renderType="title"
            className={`underline text-white uppercase font-normal text-[34px] mb-10`}
          />
          <BlockDiv className="w-[855px] min-h-[189px] flex gap-x-[63px] py-[25px] px-[40px] bg-white">
            <BlockDiv className="flex flex-col">
              <RenderAtom
                item={staticItem?.title}
                renderType="title"
                className={`text-[20px] font-normal uppercase text-black mb-6`}
              />
              <RenderAtom
                item={staticItem?.description}
                renderType="text"
                className={`text-[16px] font-normal text-black`}
              />
            </BlockDiv>
            <BlockDiv className="flex flex-col px-[14px] rounded-[12px] cursor-pointer py-[10px] items-end w-max bg-[#BAD405] justify-center">
              <RenderAtom
                item={staticItem?.button}
                renderType="title"
                className={`text-[30px] font-[700] text-black uppercase w-max text-start`}
              />
              <RenderAtom
                item={staticItem?.btnSubtitle}
                renderType="text"
                className={`font-normal text-[16px] text-black text-end`}
              />
            </BlockDiv>
          </BlockDiv>
          <RenderAtom
            item={staticItem2?.title}
            renderType="title"
            className={`underline text-white uppercase font-normal text-[34px] my-10`}
          />
          <RenderAtom
            item={staticItem2?.purchaseForAWhile}
            renderType="image"
            className={``}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1BecomeMemberNotMember;
