import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import { useToggle } from "react-use";
import { ReactNode } from "react";
// import BlockModal2 from "@components/common/Block/BlockModal2";
// import RiverClubV1BioInputTerms from "../BioInput/RiverClubV1BioInputTerms";
import { useRouter } from "next/router";

const RiverClubV1WorkoutsExpand = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

  const staticItem = data[1];
  const staticItem2 = data[0];
  const [showModal, setShowModal] = useToggle(false);
  return (
    <BlockDiv className="px-[35px] py-[20px] mb-[120px] flex w-full items-center justify-between bg-white">
      <RenderAtom
        item={staticItem?.title}
        renderType="title"
        className={`font-normal text-[20px]`}
      />
      <BlockDiv className="flex gap-x-[16px]">
        <RenderAtom
          item={`<sup className="text-[16px] font-normal">₮</sup>${staticItem?.priceMonth}k <span className="text-[16px]"> /30 days</span>`}
          renderType="title"
          className={`text-black font-[700] text-[36px]`}
        />
        <RenderAtom
          item={staticItem?.button}
          renderType="button"
          className={`px-[38px] py-[20px] bg-[#BBD540] rounded-[8px] text-black font-[700]`}
          onClick={() => setShowModal(true)}
        />
        {/* <BlockModal2 isShowModal={showModal} setIsShowModal={setShowModal}>
          <RiverClubV1BioInputTerms item={staticItem2?.termsData} />
        </BlockModal2> */}
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1WorkoutsExpand;
