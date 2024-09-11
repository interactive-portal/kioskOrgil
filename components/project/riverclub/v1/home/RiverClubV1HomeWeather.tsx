import BlockDiv from "@/components/common/Block/BlockDiv";
import React, { useEffect, useState } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import _ from "lodash";

const RiverClubV1HomeWeather = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  const [dataWeater, setDataWeater] = useState([]);

  // useEffect(() => {
  //   setLanguage(currentLanguage);

  //   const fetchData = async () => {
  //     const response = await fetch("/api/scrape");
  //     const result = await response.json();
  //     setDataWeater(result.data);
  //   };

  //   // setInterval(() => {
  //   //   fetchData();
  //   // }, 10000);

  //   if (dataWeater.length <= 0) fetchData();
  // }, [dataWeater]);

  // console.log("dataWeater :>> ", dataWeater);

  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

  const staticItem = data[0];
  const staticItem2 = data[1];
  let nowDate = moment();

  return (
    <BlockDiv className="h-[38px] flex items-center justify-between bg-[#050505] py-[8px] px-[24px]">
      <BlockDiv className="flex gap-x-[7px] items-center">
        <RenderAtom
          item={staticItem?.day}
          renderType="text"
          className={`text-[#BAD405] text-[16px] font-[400]`}
        />
        <span className="text-[#BAD405] text-[16px] font-[400]">
          {nowDate.format("YYYY-MM-DD")}
        </span>
        {dataWeater[0] && (
          <RenderAtom
            item={{ value: dataWeater[0] + "C" }}
            renderType="text"
            className={`text-[#BAD405] text-[16px] font-[400]`}
          />
        )}

        {/* <RenderAtom
          item={staticItem?.day}
          renderType="text"
          className={`text-[#BAD405] text-[16px] font-[400]`}
        />
        <RenderAtom
          item={staticItem?.date}
          renderType="text"
          className={`text-[#BAD405] text-[16px] font-[400]`}
        />
        <RenderAtom
          item={staticItem?.temp}
          renderType="text"
          className={`text-[#BAD405] text-[16px] font-[400]`}
        />
        <RenderAtom
          item={staticItem?.sky}
          renderType="text"
          className={`text-[#BAD405] text-[16px] font-[400]`}
        /> */}
      </BlockDiv>
      <BlockDiv className="flex items-center gap-x-[7px]">
        <RenderAtom
          item={staticItem2?.title}
          renderType="text"
          className={`text-white text-[16px] font-[400]`}
        />
        <RenderAtom
          item={staticItem2?.description}
          renderType="text"
          className={`text-white text-[16px] font-[400]`}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1HomeWeather;
