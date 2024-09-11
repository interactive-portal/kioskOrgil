import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

const RiverClubV1WorkoutsWelcome = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  return (
    <BlockDiv>
      <BlockDiv className="bg-[linear-gradient(180deg,_#00B0AB_0%,_#BAD405_100%)] w-full rounded-[12px]">
        <RenderAtom
          item={staticItem?.button}
          renderType="button"
          className={`font-[700] text-[30px] text-start text-black uppercase`}
        />
        <RenderAtom
          item={staticItem?.description}
          renderType="text"
          className={`font-normal w-max text-[15px] text-end`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1WorkoutsWelcome;
