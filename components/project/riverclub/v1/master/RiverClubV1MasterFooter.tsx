import BlockDiv from "@/components/common/Block/BlockDiv";
import React, { useState, useTransition } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, FC } from "react";
import { useRouter } from "next/router";
import RiverLoginConfirm from "../home/RiverLoginConfirm";
import { useTranslation } from "react-i18next";

type PropsType = {
  data?: any;
  options?: any;
  mutate?: any;
};

const RiverClubV1MasterFooter: FC<PropsType> = ({ data, options, mutate }) => {
  // const { readyDatasrc } = useContext(WidgetWrapperContext);
  const router = useRouter();
  const { t } = useTranslation("translate");

  const { widgetnemgooReady } = options || {};
  const [openModal, setOpenModal] = useState(false);
  const [needSignUp, setNeedSignUp] = useState(false);

  const staticItem = data?.[0];
  const staticItem2 = data?.[1];
  const staticItem3 = data?.[2];

  return (
    <div className="h-[206px] pt-[20px] bg-[#CACACA]">
      <BlockDiv
        customClassName={`${widgetnemgooReady?.design?.className} z-50`}
      >
        <BlockDiv className="w-[1080px] bg-[#202020] min-h-[90px]">
          <BlockDiv className="flex items-center justify-between gap-x-[18px] mx-[20px]">
            <BlockDiv className="flex bg-[#BBD540] px-[30px] py-[14px] rounded-[11px] items-center justify-between my-[23px]">
              <RenderAtom
                item={staticItem?.icon}
                renderType="icon"
                className={`text-black text-2xl`}
              />
              <RenderAtom
                item={`${t("WPD_0059")}`}
                renderType="button"
                className={`font-[700] text-[24px] text-black w-max italic`}
                onClick={() => {
                  router.back();
                }}
              />
              {/* Justify-between ashiglaj align hiihin tuld enche hoosn div hiiv */}
              <BlockDiv />
            </BlockDiv>
            <RenderAtom
              item={staticItem3?.mainimage}
              renderType="image"
              className={``}
            />
            <BlockDiv
              className="flex bg-[#BBD540] px-[30px] py-[14px] rounded-[11px] items-center justify-between my-[23px]"
              onClick={() => setOpenModal(!openModal)}
            >
              {/* Justify-between ashiglaj align hiihin tuld enche hoosn div hiiv */}
              <BlockDiv />
              <RenderAtom
                item={`${t("WPD_0060")}`}
                renderType="button"
                className={`font-[700] text-[24px] text-black w-max italic`}
              />
              <RenderAtom
                item={staticItem2?.icon}
                renderType="icon"
                className={`text-black text-2xl`}
              />
            </BlockDiv>
          </BlockDiv>
        </BlockDiv>
        <RiverLoginConfirm
          openModal={openModal}
          setOpenModal={setOpenModal}
          setNeedSignUp={setNeedSignUp}
          needSignUp={needSignUp}
        />
      </BlockDiv>
    </div>
  );
};

export default RiverClubV1MasterFooter;
