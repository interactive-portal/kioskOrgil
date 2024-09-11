import React, { useState } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, FC } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import Link from "next/link";

type PropsType = {
  data?: any;
  options?: any;
  mutate?: any;
};

const RiverClubV1MasterHeader: FC<PropsType> = ({ data, options, mutate }) => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const { t } = useTranslation("translate");

  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [thisLanguage, setThisLanguage] = useState(currentLanguage);
  const staticItem = thisLanguage === "mn" ? data?.mn : data?.en;

  React.useEffect(() => {
    setThisLanguage(currentLanguage);
  }, [currentLanguage]);

  const logo = staticItem?.[0];
  const menu = staticItem?.[1];
  const button = staticItem?.[2];
  const language = staticItem?.[3];

  const { widgetnemgooReady } = options || {};

  // console.log("optios", options);

  const customer = Cookies.get("customer");

  return (
    <div className="relative h-[98px] w-full">
      <BlockDiv
        customClassName={`${widgetnemgooReady?.design?.className} z-[99] flex justify-between w-full mr-[30px] `}
      >
        <BlockDiv className="bg-black  w-[1080px] h-max flex flex-col items-end">
          <LanguageSetting item={language} />
          <BlockDiv className="flex bg-[#202020] w-full h-max items-center justify-between pl-[57px]">
            <RenderAtom
              item={{
                value: logo?.mainimage,
                positionnemgoo: {
                  url: {
                    path: `${logo?.slug}`,
                  },
                },
              }}
              renderType="image"
              className={`w-[142px] cursor-pointer h-[36px] my-[10px] mr-[45px]`}
            />
            <Menu item={menu} t={t} />
            {/* {customer ? (
            <i className="fa-solid fa-user fa-xl mr-6 text-[#BAD405]"></i>
          ) : ( */}
            <MemberButton item={button} t={t} />
            {/* )} */}
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </div>
  );
};

const LanguageSetting = ({ item }: any) => {
  const router = useRouter();
  const { query } = router;
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const onChangeLanguage = (lang: string) => (e: any) => {
    // console.log("langlanglanglanglanglanglanglanglanglang", lang);

    e.preventDefault();
    router.push(router.asPath, undefined, { locale: lang });
  };

  return (
    <BlockDiv className="flex w-max mr-10 gap-x-4">
      <span onClick={onChangeLanguage("en")}>
        <p
          className={`font-[700] text-[17px] w-max cursor-pointer ${
            router?.locale === "en" ? "text-[#BAD405]" : "text-white"
          }`}
        >
          ENG
        </p>
      </span>
      <span onClick={onChangeLanguage("mn")}>
        <p
          // href={router?.asPath}
          className={`font-[700] text-[17px] w-max cursor-pointer
        ${router?.locale === "mn" ? "text-[#BAD405]" : "text-white"}
        `}
        >
          MNG
        </p>
      </span>
    </BlockDiv>
  );
};

const Menu = ({ item, t }: any) => {
  return (
    <BlockDiv className="flex justify-between w-full mr-[30px] px-8">
      {_.map(item, (item: any, index: number) => {
        return (
          <RenderAtom
            key={item?.id || index}
            item={{
              value: t(item?.title),
              positionnemgoo: {
                atom: {
                  type: "title",
                  className: "",
                  props: { maxLength: 20 },
                },
                url: {
                  path: `${item?.slug}`,
                },
              },
            }}
            renderType="title"
            className={`font-[400] cursor-pointer text-[18px] uppercase w-max ${
              window.location?.pathname == `${item?.slug}/`
                ? "text-[#BAD405]"
                : "text-white"
            } `}
          />
        );
      })}
    </BlockDiv>
  );
};

const MemberButton = ({ item, t }: any) => {
  return (
    <BlockDiv className="">
      <RenderAtom
        item={{
          value: t(item?.title),
          positionnemgoo: {
            url: {
              path: `${item?.slug}`,
            },
          },
        }}
        renderType="button"
        className={`text-black text-[16px] font-[400] p-[24px] rounded-[8px] w-max italic uppercase bg-[#BAD405]`}
      />
    </BlockDiv>
  );
};

export default RiverClubV1MasterHeader;
