import React, { useState } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _ from "lodash";
import { useRouter } from "next/router";
import BlockSlider from "@/components/common/Block/BlockSlider";
import useSWR from "swr";
import moment from "moment";

const RiverClubV1WorkoutsSchedule = () => {
  const router = useRouter();
  const { nemgooDatasrc, readyDatasrc } = useContext(WidgetWrapperContext);
  const [activeTab, setActiveTab] = useState(0);

  let {
    data: readyData,
    error,
    mutate,
  } = useSWR(
    `/api/get-process?command=fitKioskClassMainGet_004&parameters=${JSON.stringify(
      {
        filterId: 1,
      }
    )}`
  );

  console.log(readyData);

  return (
    <BlockDiv className="">
      <BlockDiv className=" flex items-center justify-center py-[20px] bg-black px-[40px]">
        <BlockDiv className="flex w-full ">
          {/* {_.map(
            [
              "Бүх хичээлүүд",
              "Бассейн",
              "Иогийн хичээл",
              "Кардио",
              "хүүхдийн хичээл",
            ],
            (item: any, index: number) => {
              return (
                <div
                  className="flex items-center"
                  key={index}
                  onClick={() => setActiveTab(index)}
                >
                  <RenderAtom
                    item={item}
                    renderType="button"
                    className={`${
                      index == activeTab ? "text-[#BAD405]" : "text-white"
                    } font-normal text-[24px] w-max uppercase leading-[26px]`}
                  />
                  <p className="text-white">|</p>
                </div>
              );
            }
          )} */}
        </BlockDiv>
      </BlockDiv>
      <BlockDiv className="even:bg-[#CACACA] px-[25px] mb-[35px]">
        <Card item={readyData?.result?.fitkioskclassmainlist} />
      </BlockDiv>
    </BlockDiv>
  );
};

const Card = ({ item }: any) => {
  const colors = [
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
  ];
  return (
    <BlockDiv className="w-full">
      <BlockDiv className="flex flex-col gap-y-[4px]">
        {_.map(item, (item: any, index: number) => {
          return (
            <div className="p-[10px]" key={index}>
              <BlockDiv
                className="grid grid-cols-12 w-full gap-x-4"
                key={index}
                customStyle={{
                  background: colors[index],
                }}
              >
                <div className="col-span-3">
                  <RenderAtom
                    item={item?.picture || "/images/aboutus.png"}
                    renderType="image"
                    className={`w-auto col-span-4 h-full`}
                  />
                </div>
                <div className="col-span-9 flex justify-between w-full p-[10px] gap-x-[20px]">
                  <MiddleText item={item} />
                  <ScheduleTable item={item?.fitkioskclassmaindtllist} />
                </div>
              </BlockDiv>
            </div>
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

const MiddleText = ({ item, language }: any) => {
  const cardColors = ["#FF7EC4", "#FF7898", "#92FFB7"];
  return (
    <BlockDiv className="w-max col-span-6 ">
      <BlockDiv className="flex flex-col gap-y-4">
        <RenderAtom
          item={item?.name}
          renderType="title"
          className={`font-[700] text-[32px]  uppercase leading-[32px]`}
        />
        <div className="flex items-center text-[16px] text-[#202020] font-[300] min-w-[400px] gap-x-10">
          <p>start {moment(item?.startat).format("YYYY-MM-DD")}</p>
          <p>{item?.dayleft}</p>
        </div>
        <RenderAtom
          item={item?.description}
          renderType="text"
          className={`text-[16px] font-[300] uppercase text-justify`}
        />
        <RenderAtom
          item={`дасгалжуулагч : ${item?.trainername}`}
          renderType="title"
          className={`text-black font-[700] text-[16px] uppercase`}
        />
        <BlockDiv className="flex items-center gap-x-2 w-full"></BlockDiv>
        {/* <RenderAtom
          item={item?.button}
          renderType="button"
          className={`bg-black text-white text-[20px] font-[400] max-w-[180px] text-center italic rounded-[6px] uppercase`}
        /> */}
      </BlockDiv>
    </BlockDiv>
  );
};

const ScheduleTable = ({ item }: any) => {
  return (
    <BlockDiv className="col-span-3 w-full items-center min-w-[200px]">
      <div className="mt-4 w-full">
        <BlockDiv className="flex flex-col">
          <div className="w-full text-right mb-4">
            <p className="text-[#202020] text-[26px]">
              {/* {innerItem?.classTitle} */}
            </p>
          </div>
          {_.map(item, (timetable: any, index: number) => {
            return (
              <BlockDiv
                className="flex items-center justify-end gap-x-2 mb-[2px]"
                key={index}
              >
                <RenderAtom
                  item={timetable?.week}
                  renderType="text"
                  className={`uppercase font-[300] text-[16px] text-[#414141]`}
                />
                <RenderAtom
                  item={timetable?.time}
                  renderType="text"
                  className={`uppercase font-[300] text-[16px] text-[#414141]`}
                />
              </BlockDiv>
            );
          })}
        </BlockDiv>
      </div>
      {/* view more button */}
      {/* <BlockDiv className=" flex items-end justify-end mt-6">
        {_.map(item?.classSchedule, (item: any, index: number) => {
          return (
            <RenderAtom
              key={index}
              item={item?.button}
              renderType="text"
              className={`text-[14px] w-max cursor-pointer font-normal text-[#414141] underline`}
            />
          );
        })}
      </BlockDiv> */}
    </BlockDiv>
  );
};

export default RiverClubV1WorkoutsSchedule;
