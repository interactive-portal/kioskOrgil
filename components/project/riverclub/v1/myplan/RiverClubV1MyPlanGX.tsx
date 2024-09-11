import React from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { useContext } from "react";
import _ from "lodash";

const RiverClubV1MyPlanGX = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];

  return (
    <div className="px-[20px]">
      <BlockDiv className=" my-[26px] bg-black w-full min-h-[503px] text-white p-[26px]">
        <BlockDiv className="flex items-end justify-between h-[51px]">
          {/* Deed talin garchig heseg button toigoo tsug */}
          <BlockDiv className="flex items-center gap-x-3">
            <BlockDiv className="flex items-center">
              {/* ene 3 ni title */}
              <RenderAtom
                item={staticItem?.title[0]}
                renderType="title"
                className={`text-[32px] font-normal`}
              />
              <RenderAtom
                item={staticItem?.title[1]}
                renderType="title"
                className={`text-[42px] font-bold mr-[19px] ml-[6px]`}
              />
              <RenderAtom
                item={staticItem?.title[2]}
                renderType="title"
                className={`font-normal text-[15px]`}
              />
            </BlockDiv>
            {/* enchee button bn */}
            <BlockDiv className="bg-[#BAD405] w-[130px] h-[62px] rounded-[12px] cursor-pointer">
              <RenderAtom
                item={staticItem?.buttonContinue.title}
                renderType="button"
                className={`font-[700] text-black text-[16px] leading-4 text-start uppercase`}
              />
              <RenderAtom
                item={staticItem?.buttonContinue.description}
                renderType="text"
                className={`text-end text-black w-max font-normal text-[10px]`}
              />
            </BlockDiv>
          </BlockDiv>
          <BlockDiv className="flex gap-x-[12px] mt-2">
            {_.map(staticItem?.cards, (item: any, index: number) => {
              return (
                <BlockDiv
                  className="bg-[#BAD405] w-[130px] h-[62px] rounded-[12px] cursor-pointer"
                  key={index}
                >
                  <RenderAtom
                    item={item?.title}
                    renderType="button"
                    className={`font-[700] text-black text-[16px] leading-4 text-start uppercase`}
                  />
                  <RenderAtom
                    item={item?.description}
                    renderType="text"
                    className={`text-end text-black w-max font-normal text-[10px]`}
                  />
                </BlockDiv>
              );
            })}
          </BlockDiv>
        </BlockDiv>
        <BlockDiv>
          <EachCard item={staticItem2} />
        </BlockDiv>
      </BlockDiv>
    </div>
  );
};

const EachCard = ({ item }: any) => {
  return (
    <BlockDiv className="">
      <BlockDiv
        className={`grid grid-cols-2 gap-[28px] mt-[16px] pr-[30px] ${
          item?.cards.length === 4 ? "" : "flex flex-col"
        }`}
      >
        {_.map(item?.cards, (item: any, index: number) => {
          return (
            <BlockDiv className="flex items-center justify-between" key={index}>
              <BlockDiv
                className={`${
                  item?.isActive
                    ? "flex border border-dashed p-[18px] justify-between"
                    : "hidden"
                } ${item?.isSchedule ? "w-[538px]" : "w-[318px]"}`}
              >
                <BlockDiv className="flex flex-col">
                  <RenderAtom
                    item={item?.title}
                    renderType="title"
                    className={`text-[#BBD540] mb-[15px] font-normal text-[32px] uppercase`}
                  />
                  <BlockDiv className="flex gap-x-[24px]">
                    <RenderAtom
                      item={item?.dayStart}
                      renderType="text"
                      className={`text-[#DEDEDE] text-[15px] font-normal`}
                    />
                    <RenderAtom
                      item={item?.time}
                      renderType="text"
                      className={`text-[#DEDEDE] text-[15px] font-normal`}
                    />
                  </BlockDiv>
                  {/* exercise type */}
                  <BlockDiv className="mt-[10px]">
                    <RenderAtom
                      item={item?.type.title}
                      renderType="title"
                      className={`font-bold text-[14px]`}
                    />
                    <BlockDiv className="flex gap-x-[26px]">
                      {_.map(item?.type.items, (item: any, index: number) => {
                        return (
                          <RenderAtom
                            key={index}
                            item={item}
                            renderType="text"
                            className={`text-lg font-normal w-max text-white lowercase`}
                          />
                        );
                      })}
                    </BlockDiv>
                  </BlockDiv>
                </BlockDiv>
                {/* schedule section start here */}
                <BlockDiv
                  className={`${
                    item?.isSchedule
                      ? "flex flex-col gap-y-[15px]  items-end"
                      : "hidden"
                  }`}
                >
                  <RenderAtom
                    item={item?.classNumber}
                    renderType="text"
                    className={`font-bold text-[10px] px-[8px] py-[5px] text-black bg-[#BAD405] w-max rounded-[2px]`}
                  />

                  {_.map(item?.schedule, (innerItem: any, index: number) => {
                    return (
                      <BlockDiv
                        className="flex flex-col w-[160px] justify-between"
                        key={index}
                      >
                        <BlockDiv className="flex items-center justify-between">
                          <RenderAtom
                            item={innerItem?.day}
                            renderType="text"
                            className={`font-normal text-[14px]`}
                          />
                          <RenderAtom
                            item={innerItem?.time}
                            renderType="text"
                            className={`font-normal text-end text-[14px]`}
                          />
                        </BlockDiv>
                      </BlockDiv>
                    );
                  })}
                </BlockDiv>
              </BlockDiv>
            </BlockDiv>
          );
        })}
      </BlockDiv>
      <BlockDiv></BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1MyPlanGX;
