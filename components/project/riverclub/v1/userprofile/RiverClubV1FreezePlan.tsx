import React, { ReactNode } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

const RiverClubV1FreezePlan = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];
  return (
    <BlockDiv className="fixed inset-0 bg-gray-700 text-white bg-opacity-50 z-40 backdrop-blur-lg p-4 flex justify-center items-center">
      <BlockDiv className="bg-[#373737] p-[14px] rounded-[11px] w-[654px]">
        {/* Top section here  */}
        <BlockDiv>
          <BlockDiv className="mt-[19px] mx-[24px] flex items-center justify-between mb-[32px]">
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
          <BlockDiv className="mb-[39px] w-[549px] ml-[24px]">
            <RenderAtom
              item={staticItem?.description}
              renderType="text"
              className={`text-lg font-[500] text-white`}
            />
          </BlockDiv>
        </BlockDiv>
        {/* top section duusav */}
        {/* content starts here */}
        <BlockDiv className="m-[30px] p-[30px] gap-y-1 rounded-[15px] border border-[#DEDEDE]">
          <RenderAtom
            item={staticItem2?.title}
            renderType="title"
            className={`font-normal text-[20px] uppercase`}
          />
          <RenderAtom
            item={staticItem2?.description}
            renderType="title"
            className={`font-normal text-[16px] `}
          />
        </BlockDiv>
        {/* 2 button ni enche bn */}
        <BlockDiv className="flex gap-x-[16px] mx-auto w-max mt-[53px]">
          <BlockDiv className="w-[154px] h-[56px] bg-black rounded-[11px] cursor-pointer flex items-center justify-center">
            <RenderAtom
              item={staticItem?.buttonFreeze}
              renderType="button"
              className={`text-lg font-medium text-white`}
            />
          </BlockDiv>
          <BlockDiv className="w-[154px] h-[56px] bg-[#BAD405] rounded-[11px] cursor-pointer flex items-center justify-center">
            <RenderAtom
              item={staticItem?.buttonCancel}
              renderType="button"
              className={`text-lg font-medium text-black`}
            />
          </BlockDiv>
          {/* button done */}
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1FreezePlan;

interface BackgroundBorderProps {
  children: ReactNode;
  topItems: any;
  buttonItem: any;
}

export const BackgroundBorder: React.FC<BackgroundBorderProps> = ({
  children,
  topItems,
  buttonItem,
}) => {
  return (
    <BlockDiv className="fixed w-[1080px] inset-0 bg-gray-700 text-white bg-opacity-50 z-40 backdrop-blur-lg p-4 flex justify-center items-center">
      <BlockDiv className="bg-[#373737] p-[14px] rounded-[11px] w-[654px]">
        {/* Top section here  */}
        <BlockDiv>
          <BlockDiv className="mt-[19px] mx-[24px] flex items-center justify-between mb-[32px]">
            <RenderAtom
              item={topItems.title}
              renderType="title"
              className={`text-[#BAD405] font-bold text-[22px] uppercase`}
            />
            <RenderAtom
              item={topItems.icon}
              renderType="image"
              className={`w-[35px] h-[35px]`}
            />
          </BlockDiv>
          <BlockDiv className="mb-[39px] w-[549px] ml-[24px]">
            <RenderAtom
              item={topItems.description}
              renderType="text"
              className={`text-lg font-[500] text-white`}
            />
          </BlockDiv>
        </BlockDiv>
        {/* top section duusav */}
        {/* content starts here */}
        <BlockDiv className="m-[30px] p-[30px] gap-y-1 rounded-[15px] border border-[#DEDEDE]">
          {children}
        </BlockDiv>
        {/* content done here */}
        {/* 2 button ni enche bn */}
        <BlockDiv className="flex gap-x-[16px] mx-auto w-max mt-[53px]">
          <BlockDiv className="w-[154px] h-[56px] bg-black rounded-[11px] cursor-pointer flex items-center justify-center">
            <RenderAtom
              item={buttonItem?.button1}
              renderType="button"
              className={`text-lg font-medium text-white`}
            />
          </BlockDiv>
          <BlockDiv className="w-[154px] h-[56px] bg-[#BAD405] rounded-[11px] cursor-pointer flex items-center justify-center">
            <RenderAtom
              item={buttonItem?.button2}
              renderType="button"
              className={`text-lg font-medium text-black`}
            />
          </BlockDiv>
          {/* button done */}
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};
