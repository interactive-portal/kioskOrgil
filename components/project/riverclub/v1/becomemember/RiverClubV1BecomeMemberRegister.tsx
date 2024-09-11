import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

const RiverClubV1BecomeMemberRegister = ({ item }: any, { planData }: any) => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];

  return (
    <BlockDiv className="">
      <BlockDiv className="">
        <RenderAtom
          item={item?.title || staticItem?.title}
          renderType="title"
          className={`text-white underline text-[34px]`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1BecomeMemberRegister;
