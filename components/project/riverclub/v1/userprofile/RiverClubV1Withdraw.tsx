import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import _ from "lodash";
// import { QRPay } from "../home/RiverClubV1HomePurchase";

const RiverClubV1Withdraw = ({ item, payment }: any) => {
  return (
    <BlockDiv className="p-6 flex justify-center items-center bg-[#373737]">
      <BlockDiv className="w-[654px] bg-[#202020] pb-[22px] flex items-center justify-center px-[21px]">
        <BlockDiv className="">
          <BlockDiv className="mr-[17px] mt-[19px] w-full flex items-center justify-between mb-[32px]">
            <RenderAtom
              item={item?.title}
              renderType="title"
              className={`text-[#BAD405] font-bold text-[22px]`}
            />
            {/* ene icon ni tsaanas zursan x button. gehdee blockmodal oor dere x button baigaa uchir teriig ashiglahaar shiidlee */}
            {/* <RenderAtom
              item={item?.icon}
              renderType="image"
              className={`w-[35px] h-[35px]`}
            /> */}
          </BlockDiv>
          <BlockDiv className="mb-[39px]">
            <RenderAtom
              item={item?.description}
              renderType="text"
              className={`text-lg font-[500] text-white w-[566px]`}
            />
          </BlockDiv>
          <BlockDiv className="flex w-full items-end flex-col mb-6 text-end">
            <RenderAtom
              item={item?.coupon?.title}
              renderType="title"
              className={`font-medium text-lg text-white`}
            />
            <input
              type="text"
              placeholder={`${item?.coupon?.description}`}
              className="placeholder:font-[300] placeholder:text-[16px] placeholder:text-[#BAD405] text-[#BAD405] bg-[#030303] focus:border-none focus:outline-none border-none outline-none"
            ></input>
          </BlockDiv>
          {/* <BigCard item={item} QRpay={payment} /> */}
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

const BigCard = ({ item, QRpay }: any, { total }: any) => {
  total = 0;

  item?.items.forEach((innerItem: any) => {
    innerItem.price = parseFloat(innerItem.price);
    total += innerItem.price;
  });

  return (
    <BlockDiv className="w-[611px] border rounded-[15px] mx-auto border-[#DEDEDE] p-[30px]">
      <BlockDiv className="flex flex-col border-b border-b-white mb-10">
        {/* each price of the product with name section on the top */}
        {_.map(item?.items, (innerItem: any, index: number) => {
          return (
            <BlockDiv className="flex items-center justify-between pb-[30px] w-full">
              <RenderAtom
                item={innerItem.title}
                renderType="title"
                className={`font-bold text-[26px] text-white`}
              />
              <RenderAtom
                item={`${innerItem.price}.0k`}
                renderType="title"
                className={`font-bold text-[26px] text-white`}
              />
            </BlockDiv>
          );
        })}
      </BlockDiv>

      {/* <QRPay item={QRpay} /> */}
    </BlockDiv>
  );
};

export default RiverClubV1Withdraw;
