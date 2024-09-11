import React from "react";
import { useContext } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

const RiverClubV1FaceRegister01 = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  return (
    <BlockDiv className="relative w-full h-[1779px]">
      <RenderAtom
        item={staticItem?.mainimage}
        renderType="image"
        className={`absolute`}
      />
      <BlockDiv className="z-10 mx-[180px] absolute m-auto top-[1116px] left-[181px]">
        <RenderAtom
          item={staticItem?.title}
          renderType="title"
          className={`font-normal text-[34px] text-white mb-[55px] underline`}
        />
        <RenderAtom
          item={staticItem?.subtitle}
          renderType="text"
          className={`font-normal text-[28px] text-white mb-[21px] underline`}
        />
        <RenderAtom
          item={staticItem?.description}
          renderType="text"
          className={`font-normal text-[26px] text-white`}
        />
        <RenderAtom
          item={staticItem?.loadImage}
          renderType="image"
          className={`w-[120px] h-[120px] ml-[300px] mt-[19px]`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1FaceRegister01;
