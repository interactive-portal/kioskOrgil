import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _ from "lodash";
import { useToggle } from "react-use";
import RiverClubV1GetLocker from "./RiverClubV1GetLocker";
// import BlockModal2 from "@components/common/Block/BlockModal2";
import RiverClubV1Withdraw from "./RiverClubV1Withdraw";
import Cookies from "js-cookie";

const RiverClubV1ProfileSchedule = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];
  const staticItem3 = readyDatasrc[2];

  const user = Cookies.get("customer");

  return (
    <BlockDiv className="mx-[20px] my-[25px] bg-black w-[1040px] px-[36px] py-[33px]">
      <BlockDiv className="flex gap-x-[44px] items-center justify-between">
        {/* <RenderAtom
          item={staticItem?.mainimage}
          renderType="image"
          className={`w-[431px] h-[431px]`}
        /> */}

        <BlockDiv className="flex gap-x-[12px] mt-2 bg-black ">
          {/* энд сонгосон үйлчилгээs */}
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
        <BlockDiv>
          <EachCard
            item={staticItem2}
            lockerItem={staticItem.theData}
            withdrawItem={staticItem3}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

const EachCard = ({ item, lockerItem, withdrawItem }: any) => {
  const [showLockerModal, setShowLockerModal] = useToggle(false);
  const [showWithdrawModal, setShowWidthdrawModal] = useToggle(false);
  return (
    <BlockDiv className="grid grid-cols-2 gap-[24px]">
      {/* card 1 */}
      <BlockDiv className=" w-[216.96px] bg-[#BAD405] rounded-[12px] pt-[16px] px-[14px]">
        <RenderAtom
          item={item?.card1?.title}
          renderType="title"
          className={`text-black font-bold text-[30px] leading-6 uppercase`}
        />
        <RenderAtom
          item={item?.card1?.subtitle}
          renderType="title"
          className={`text-end -mt-5 text-[15px] font-normal`}
        />
        <RenderAtom
          item={item?.card1?.description}
          renderType="text"
          className={`text-end text-[15px] font-normal`}
        />
      </BlockDiv>
      {/* card2 */}
      <BlockDiv
        className="w-[216.96px] bg-[#BAD405] rounded-[12px] pt-[16px] px-[14px]"
        onClick={() => setShowLockerModal(true)}
      >
        <RenderAtom
          item={item?.card2?.title}
          renderType="title"
          className={`text-black font-bold text-[30px] leading-6 uppercase`}
        />
        <RenderAtom
          item={item?.card2?.count}
          renderType="text"
          className={`text-end -mt-5 text-[15px] font-normal`}
        />
      </BlockDiv>
      {/* card 3 */}
      <BlockDiv
        className="flex flex-col w-[216.96px] bg-[#BAD405] rounded-[12px] pt-[16px] px-[14px]"
        onClick={() => setShowWidthdrawModal(true)}
      >
        <RenderAtom
          item={item?.card3?.title}
          renderType="title"
          className={`text-black font-bold text-[30px] leading-6 uppercase`}
        />
        <BlockDiv className="flex items-center justify-between gap-x-2">
          <BlockDiv className="flex items-center gap-x-[2px]">
            <RenderAtom
              item={item?.card3?.bath.title}
              renderType="title"
              className={`font-normal text-[15px]`}
            />
            <RenderAtom
              item={`₮${item?.card3?.bath.price}K`}
              renderType="title"
              className={`text-[15px] font-extrabold flex items-center`}
            />
          </BlockDiv>
          <BlockDiv className="flex items-center gap-x-[2px]">
            <RenderAtom
              item={item?.card3?.towel.title}
              renderType="title"
              className={`font-normal text-[15px]`}
            />
            <RenderAtom
              item={`₮${item?.card3?.towel.price}K`}
              renderType="title"
              className={`text-[15px] font-extrabold flex items-center`}
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
      {/* card 4 */}
      <BlockDiv className="bg-[#BAD405] rounded-[12px] pt-[16px] px-[14px]">
        <RenderAtom
          item={item?.card4?.title}
          renderType="title"
          className={`text-black font-bold text-[30px] leading-6 uppercase`}
        />
        <BlockDiv className="flex flex-col items-end justify-end -mt-4">
          <RenderAtom
            item={item?.card4?.icon}
            renderType="image"
            className={`w-[63px]`}
          />
          <RenderAtom
            item={item?.card4?.description}
            renderType="text"
            className={`font-normal text-[15px] text-end`}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1ProfileSchedule;
