import React, { useState, useContext, useEffect } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useRouter } from "next/router";
import _ from "lodash";
import BlockSlider from "@/components/common/Block/BlockSlider";
import RiverLoginModal from "./RiverLoginModal";
import { notification } from "antd";
import Cookies from "js-cookie";
import RiverLoginConfirm from "./RiverLoginConfirm";
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";

const RiverClubV1HomeWelcome = () => {
  const { query } = useRouter();
  const { t } = useTranslation("translate");
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";
  const [openModal, setOpenModal] = useState(false);
  const [needSignUp, setNeedSignUp] = useState(false);

  const [language, setLanguage] = useState(currentLanguage);

  const { readyDatasrc } = useContext(WidgetWrapperContext);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const staticItem = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

  const readyData = readyDatasrc?.filter((item: any) => {
    return item?.booktypeid == "1000900805";
  });

  const dataSrc = _.isEmpty(readyData) ? readyDatasrc : readyData;

  if (_.isEmpty(dataSrc)) {
    return;
  }

  return (
    <BlockDiv className="arrowCustomStyle">
      <BlockSlider
        divNumber="RiverHomeSliderBlock"
        customProps={{
          reactSlickSettings: {
            arrows: true,
            dots: false,
            variableWidth: false,
            infinite: false,
            swipeToSlide: true,
          },
          arrowClassName: "bg-transparent",
        }}
      >
        {dataSrc?.map((item: any, index: number) => {
          return (
            <RiverHomeBanner
              key={index}
              item={item}
              openModal={openModal}
              setOpenModal={setOpenModal}
              // clickCamera={clickCamera}
            />
          );
        })}
      </BlockSlider>
      <RiverLoginConfirm
        openModal={openModal}
        setOpenModal={setOpenModal}
        setNeedSignUp={setNeedSignUp}
        needSignUp={needSignUp}
      />
    </BlockDiv>
  );
};

export default RiverClubV1HomeWelcome;

const RiverHomeBanner = ({
  item,
  openModal,
  setOpenModal,
  clickCamera,
}: any) => {
  const { t } = useTranslation("translate");

  return (
    <BlockDiv className="h-[570px] flex items-center justify-center relative bg-gray-200">
      <RenderAtom
        item={
          item?.imgurl ||
          "storage/uploads/metavalue/photo_original/photo_15843279694444230.jpg"
        }
        renderType="image"
        customClassName={"w-[1080px] h-full absolute top-0 left-0"}
      />
      {/* <RenderAtom
        item={{ value: `${item?.imgurl}` }}
        renderType="image"
        customClassName={"w-[1080px] h-full absolute top-0 left-0"}
      /> */}
      {/* <img
        src={`/images/homebanner.jpg`}
        alt=""
        className="w-[1080px] h-full absolute top-0 left-0"
      /> */}
      <BlockDiv className="z-20 w-full flex items-center justify-center flex-col h-max px-[216px]">
        <RenderAtom
          item={item?.title}
          renderType="title"
          className={`text-[52px] font-[700] mb-[50px] text-white text-center font-roboto uppercase leading-[50px]`}
        />
        {/* <RenderAtom
          item={t(item?.description)}
          renderType="text"
          className={`text-white font-[400] text-[26px] text-center mb-[74px]`}
        /> */}
        <RenderAtom
          item={{
            value: `${t("WPD_0009")}`,
            // positionnemgoo: {
            //   url: {
            //     path: `/bioinput`,
            //   },
            // },
          }}
          renderType="button"
          className={`bg-[#BAD405] rounded-[8px] px-[42px] py-[35px] text-black uppercase text-[16px] font-[700] cursor-pointer`}
          onClick={(e: any) => setOpenModal(true)}
        />
        {/* <BlockDiv className="flex gap-[9px]">
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white" />
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white bg-gray-200" />
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white" />
        </BlockDiv> */}
      </BlockDiv>
    </BlockDiv>
  );
};
