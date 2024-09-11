import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { BackgroundBorder } from "./RiverClubV1FreezePlan";

const RiverClubV1PurchaseSuccess = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];
  return (
    <BlockDiv>
      <BlockDiv>
        <BackgroundBorder
          buttonItem={staticItem?.buttonItem}
          topItems={staticItem}
        >
          <RenderAtom
            item={staticItem2?.title}
            renderType="title"
            className={`font-bold text-[22px] mb-[20px] text-[#BAD405] uppercase`}
          />
          <RenderAtom
            item={staticItem2?.description}
            renderType="title"
            className={`font-normal text-[16px] `}
          />
        </BackgroundBorder>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1PurchaseSuccess;
