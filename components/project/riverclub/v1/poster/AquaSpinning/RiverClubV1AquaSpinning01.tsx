import React, { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import _ from "lodash";

const RiverClubV1AquaSpinning = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];
  const staticItem3 = readyDatasrc[2];
  return (
    <BlockDiv
      divNumber="RiverClubV1AquaSpinning1Outer"
      className="bg-[#008599] w-[2160px] min-h-[2700px]"
    >
      <BlockDiv
        divNumber="RiverClubV1AquaSpinning1Inner"
        className="flex flex-col items-center justify-between py-4"
      >
        <Header item={staticItem} />
        <Section1 item={staticItem2} />
        <BlockDiv className="relative w-full h-[893px] mt-[15px] flex items-center justify-center">
          <Section2 item={staticItem2} />
          <BlockDiv className="flex w-[1761px] items-center justify-between">
            <Section2Text item={staticItem3} />
            <BlockDiv />
          </BlockDiv>
        </BlockDiv>
        <Section3 item={staticItem2} />
      </BlockDiv>
      <Footer item={staticItem3} />
    </BlockDiv>
  );
};

// Header component is here

const Header = ({ item }: any) => {
  return (
    <BlockDiv
      divNumber="Header"
      className="flex w-full justify-between items-center px-10 py-6"
    >
      <RenderAtom
        item={item?.logo}
        renderType="image"
        className={`w-[449px] h-[113.85px]`}
      />
      <BlockDiv className="flex items-center gap-4">
        <BlockDiv className="w-[50.75px] h-[50.75px] bg-[#67D540] rounded-full" />
        <RenderAtom
          item={item?.title}
          renderType="title"
          className={`font-bold text-6xl text-white uppercase font-mogul`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

// Header done

// section1 start

const Section1 = ({ item }: any) => {
  return (
    <BlockDiv className="relative w-full h-[770px] flex flex-col items-center justify-center">
      <BlockDiv className="flex items-center w-[1761px] mx-auto justify-center h-full">
        <RenderAtom
          item={item.mainimage[0]}
          renderType="image"
          className={`w-full h-max absolute top-0 left-0 z-10`}
        />
        <BlockDiv className="relative w-full z-20 h-full flex items-center justify-between">
          <RenderAtom
            item={item?.title}
            renderType="title"
            className={`font-mogul font-semibold text-[#002F76] text-6xl px-10 bg-white/80 scale-y-150`}
          />
          <RenderAtom
            item={item?.price}
            renderType="text"
            className={`font-mogul font-semibold text-[#002F76] text-6xl px-10 bg-white/80 scale-y-150`}
          />
        </BlockDiv>
      </BlockDiv>
      <Section1Schedule item={item} />
    </BlockDiv>
  );
};

const Section1Schedule = ({ item }: any) => {
  return (
    <BlockDiv className="w-[1761px] bg-white/80  absolute -bottom-28 z-20">
      <BlockDiv className="px-[89px] py-[69px] grid items-center justify-center grid-cols-3 w-full">
        {_.map(item?.schedule, (item: any, index: number) => {
          return (
            <BlockDiv className="flex flex-col items-center justify-center">
              <RenderAtom
                item={item?.title}
                renderType="title"
                className={`font-mogul font-semibold text-[#002F76] text-5xl scale-y-150`}
              />
              <RenderAtom
                item={item?.time}
                renderType="text"
                className={`font-courier font-medium text-[#002F76] text-5xl tracking-widest`}
              />
            </BlockDiv>
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

// section1 done here :D

// Section2 start
const Section2 = ({ item }: any, { text }: any) => {
  return (
    <BlockDiv className="">
      <RenderAtom
        item={item?.mainimage[1]}
        renderType="image"
        className={`w-full h-max absolute top-0 left-0 z-10`}
      />
    </BlockDiv>
  );
};

const Section2Text = ({ item }: any) => {
  return (
    <BlockDiv className="absolute z-20">
      <BlockDiv className="flex flex-col gap-16">
        {_.map(item?.title, (item: any, index: number) => {
          return (
            <RenderAtom
              item={item}
              renderType="title"
              className={`text-[#002F76] text-6xl font-bold font-tomorrow scale-y-150 px-10 w-max bg-white`}
            />
          );
        }).slice(0, 2)}
        {_.map(item?.title, (item: any, index: number) => {
          return (
            <RenderAtom
              item={item}
              renderType="title"
              className={`text-[#002F76] text-6xl font-medium font-tomorrow scale-y-150 px-10  bg-white`}
            />
          );
        }).slice(-1)}
      </BlockDiv>
    </BlockDiv>
  );
};

// Section2 done here

// Section3 begins then

const Section3 = ({ item }: any) => {
  return (
    <BlockDiv className="relative z-10 w-full h-[686px] mt-[15px]">
      <BlockDiv>
        <RenderAtom
          item={item?.mainimage[2]}
          renderType="image"
          className={`w-full h-max absolute top-0 left-0 z-10`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

// Section3 done

// Footer comes here

const Footer = ({ item }: any) => {
  return (
    <BlockDiv className="z-10 relative w-full bottom-0">
      <BlockDiv className="w-full flex gap-32">
        <RenderAtom
          item={item?.footer}
          renderType="text"
          className={`text-white text-6xl`}
        />
        <RenderAtom
          item={item?.footer}
          renderType="text"
          className={`text-white text-6xl`}
        />
        <RenderAtom
          item={item?.footer}
          renderType="text"
          className={`text-white text-6xl`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1AquaSpinning;
