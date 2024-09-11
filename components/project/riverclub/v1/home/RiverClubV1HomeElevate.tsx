import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, useTransition } from "react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const RiverClubV1HomeElevate = () => {
  const { query } = useRouter();
  const { t } = useTranslation("translate");

  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const { options } = widgetnemgooReady;

  const readyData = readyDatasrc?.filter((item: any) => {
    return item?.booktypeid == "1000900801";
  });

  return (
    <BlockDiv className="flex flex-col gap-y-[40px] mx-[105px] my-[40px]">
      {readyData?.map((item: any, index: number) => {
        let number = 0;
        if (options?.contentOrigin == "left") {
          number = 1;
        }
        if (index % 2 == number) {
          return <UpperSection item={item} key={index} />;
        } else {
          return (
            <div key={index}>
              <BottomSection item={item} />
            </div>
          );
        }
      })}
    </BlockDiv>
  );
};

const UpperSection = ({ item }: any) => {
  const { t } = useTranslation("translate");
  return (
    <BlockDiv className="flex gap-x-[50px]">
      <RenderAtom
        item={item?.imgurl}
        renderType="image"
        className={`min-w-[397px] h-[398px] max-w-[397px]`}
      />
      <BlockDiv className="flex flex-col gap-y-[30px] mt-[20px]">
        <RenderAtom
          item={t(item?.title)}
          renderType="title"
          className={`font-[700] text-[28px] text-black uppercase leading-[28px]`}
        />
        <RenderAtom
          item={t(item?.subtitle)}
          renderType="text"
          className={`font-[400] text-[16px]`}
        />
        <RenderAtom
          item={t(item?.body)}
          renderType="text"
          className={`font-[400] text-[16px] text-justify`}
        />
        <RenderAtom
          item={{
            value: t("хичээлүүд харах"),
            positionnemgoo: {
              url: {
                path: `/selectplan`,
              },
            },
          }}
          renderType="button"
          className={`text-[14px] font-[400] bg-black w-[175px] py-[14px] px-[18px] uppercase rounded-[6px]`}
          // customStyle={{
          //   boxShadow: "#000000 25%",
          // }}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

const BottomSection = ({ item }: any) => {
  const { t } = useTranslation("translate");
  return (
    <BlockDiv className="flex gap-x-[50px]">
      <BlockDiv className="flex flex-col gap-y-[30px] mt-[20px]">
        <RenderAtom
          item={t(item?.title)}
          renderType="title"
          className={`font-[700] text-[28px] text-black uppercase  leading-[28px]`}
        />
        <RenderAtom
          item={t(item?.subtitle)}
          renderType="text"
          className={`font-[400] text-[16px] `}
        />
        <RenderAtom
          item={t(item?.body)}
          renderType="text"
          className={`font-[400] text-[16px] text-justify`}
        />
        <RenderAtom
          item={{
            value: t("үнэ харах"),
            positionnemgoo: {
              url: {
                path: `/price`,
              },
            },
          }}
          renderType="button"
          className={`text-[14px] font-[400] bg-black w-[175px] py-[14px] px-[18px] uppercase rounded-[6px]`}
        />
      </BlockDiv>
      <RenderAtom
        item={item?.imgurl}
        renderType="image"
        className={`min-w-[397px] max-w-[397px] h-[398px]`}
      />
    </BlockDiv>
  );
};

export default RiverClubV1HomeElevate;
