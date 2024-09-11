import BlockDiv from "@/components/common/Block/BlockDiv";
import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _ from "lodash";
import { useRouter } from "next/router";
// import { useTranslation } from "react-i18next";
import { decode } from "html-entities";
import parseHtml from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

const RiverClubV1HomeCards = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const { readyDatasrc } = useContext(WidgetWrapperContext);
  // const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

  // const staticItem = data[0];
  const readyData = readyDatasrc?.filter((item: any, index: number) => {
    return item?.booktypeid == "1000900801";
  });

  // console.log("readyData", readyDatasrc);

  return (
    <BlockDiv className="px-[43px] mb-[200px] z-0 relative">
      <BlockDiv>
        <Card item={readyData} />
      </BlockDiv>
    </BlockDiv>
  );
};

const Card = ({ item }: any) => {
  // const { t } = useTranslation("translate");

  return (
    <BlockDiv className="w-full">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        className="z-0"
        modules={[Navigation, Pagination]}
        pagination={true}
      >
        {item?.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <BlockDiv className="flex flex-col items-center  bg-white cursor-pointer h-[465px]">
                <RenderAtom
                  item={item?.imgurl || "/noimage.png"}
                  renderType="image"
                  className={`w-full min-h-[290px] max-h-[290px] mb-[11px] object-cover`}
                />
                <div className="px-4">
                  <RenderAtom
                    item={item?.title}
                    renderType="title"
                    className={`mb-[11px] font-normal text-[20px] text-center uppercase`}
                  />
                  <p className="line-clamp-4 max-h-[100px] overflow-y-scroll scrollHide">
                    {parseHtml(decode(item?.body))}
                  </p>
                  <RenderAtom
                    item={item?.button}
                    renderType="button"
                    className={`font-normal text-black text-[16px] uppercase underline`}
                  />
                </div>
              </BlockDiv>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style>
        {`
          .scrollHide::-webkit-scrollbar {
            width:5px;
            background:white;
          }
          .scrollHide::-webkit-scrollbar-thumb {
            background:#E0E0E0;
            border-radius:10px;
          }
        `}
      </style>
    </BlockDiv>
  );
};

export default RiverClubV1HomeCards;
