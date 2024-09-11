import React, { useTransition } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, useState, useEffect } from "react";
import { useToggle } from "react-use";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import PaymentModal from "../plan/paymentModal";
import { Modal } from "antd";
// import BlockModal2 from "@components/common/Block/BlockModal2";

type RiverClubV1HomePurchaseProps = {
  item: any;
  modalTop: any;
  QRpay: any;
  purchaseAgeBtn: any;
};

const RiverClubV1HomePurchase = ({
  item,
  modalTop,
  QRpay,
  purchaseAgeBtn,
}: RiverClubV1HomePurchaseProps) => {
  let {
    data: readyData,
    error,
    mutate,
  } = useSWR(`
  /api/get-data?metaid=17122065849129
  `);

  const { query } = useRouter();
  const { t } = useTranslation("translate");
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [language, setLanguage] = useState(currentLanguage);
  const [openPayment, setOpenPayment] = useState(false);
  const [product, setProduct] = useState<any>();

  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

  const staticItem = data[0];

  return (
    <div className="px-[90px]">
      <BlockDiv className="flex items-center justify-center w-full ">
        <BlockDiv className=" my-[26px] py-[40px] px-[70px] bg-white flex items-center justify-between w-full">
          <BlockDiv className="flex flex-col gap-y-[18px]">
            <RenderAtom
              item={t(staticItem?.title || item?.title)}
              renderType="title"
              className={`uppercase text-[24px] font-bold`}
            />
            <RenderAtom
              item={t(staticItem?.description || item?.description)}
              renderType="text"
              className={`uppercase text-[16px] font-[300] w-[440px] text-justify leading-[22px]`}
            />
          </BlockDiv>
          <BlockDiv className="flex relative flex-col justify-between">
            <img src="/images/onemore.png" className="w-full" />
            <BlockDiv className="flex flex-col gap-y-2 gap-x-4 mt-6">
              <div
                className="py-[10px] px-[20px] italic bg-black text-white rounded-[6px] flex flex-col items-center justify-center text-[20px] font-[400] text-center tracking-widest leading-[16px] cursor-pointer "
                style={{
                  boxShadow: "4px 4px 4px 0px #00000040",
                }}
                onClick={() => {
                  setProduct(readyData?.result?.[0]), setOpenPayment(true);
                }}
              >
                ТОМ ХҮН
              </div>
              <div
                className="py-[10px] px-[20px] italic bg-[#BAD405] rounded-[6px] flex flex-col items-center justify-center text-[20px] font-[400] text-center tracking-widest leading-[16px] cursor-pointer "
                style={{
                  boxShadow: "4px 4px 4px 0px #00000040",
                }}
                onClick={() => {
                  setProduct(readyData?.result?.[1]), setOpenPayment(true);
                }}
              >
                ХҮҮХЭД
              </div>
            </BlockDiv>
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
      <Modal
        open={openPayment}
        footer={false}
        // title="ТӨЛБӨР ТӨЛӨХ"
        destroyOnClose
        width={900}
        onCancel={() => setOpenPayment(false)}
      >
        <div className="">
          <PaymentModal item={product} setSelectDateModal={setOpenPayment} />
        </div>
        <style>
          {`
				.ant-modal-content {
				background-color:#202020 !important;
        padding:0px !important;
				}
				.ant-modal-title {
					background-color:#202020 !important;
					color:#BAD405 !important;
					font-size:28px !important;
				}
				`}
        </style>
      </Modal>
    </div>
  );
};

export default RiverClubV1HomePurchase;

// export const QRPay = ({ item }: any) => {
//   return (
//     <BlockDiv className="flex items-center justify-center gap-16 w-full">
//       <BlockDiv className="flex flex-col items-center h-full justify-between gap-10">
//         <BlockDiv className="flex items-end justify-center gap-10">
//           <RenderAtom
//             item={item?.total}
//             renderType="title"
//             className={`font-bold text-[26px] text-white`}
//           />
//           <RenderAtom
//             item={`${item?.price}k`}
//             renderType="title"
//             className={`font-bold text-[26px] text-white`}
//           />
//         </BlockDiv>
//         <BlockDiv className="flex flex-col gap-4">
//           <RenderAtom
//             item={item?.button?.button1}
//             renderType="button"
//             className={`text-black font-bold text-[16px] px-[40px] py-[20px] bg-[#BAD405] rounded-[8px]`}
//           />
//           <RenderAtom
//             item={item?.button?.button2}
//             renderType="button"
//             className={`text-black font-bold text-[16px] px-[40px] py-[20px] bg-[#BAD405] rounded-[8px]`}
//           />
//         </BlockDiv>
//       </BlockDiv>
//       <BlockDiv className="flex items-center justify-center w-max h-max">
//         <RenderAtom item={item?.qr} renderType="image" className={``} />
//       </BlockDiv>
//     </BlockDiv>
//   );
// };
