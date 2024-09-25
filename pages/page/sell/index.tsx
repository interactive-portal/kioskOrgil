import useSWR from "swr";
import { useRouter } from "next/router";
import moment from "moment";
import Layout from "../kioskLayout";
import { useEffect, useState } from "react";
import { Spin, notification } from "antd";
import ReportTemplate from "@/middleware/ReportTemplate/ReportTemplate";
import fetchJson from "@/util/helper";
import Cookies from "js-cookie";
import axios from "axios";
import Pay from "./payment";
import Title from "@/components/common/Title";

const Sell = () => {
  const [item, setItem] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [templateId, setTemplateId] = useState("");
  const [contractId, setContractId] = useState("");
  const [activeCheck, setActiveCheck] = useState(false);
  const [nextButtonView, setNextButtonView] = useState(false);
  const [contentType, setContentType] = useState("contract");

  const customer: any = Cookies.getJSON("customer");
  const router = useRouter();
  const date = moment().format("YYYY-MM-DD");
  const cid = router.query?.id;
  const criteria = JSON.stringify({
    id: [
      {
        operator: "=",
        operand: router.query?.i,
      },
    ],
  });

  // reportTemplate дуудах
  const printOptions = {
    lang: {
      mn: "",
      en: "",
    },
    ishtml: 1,
    print_options: {
      numberOfCopies: "1",
      isPrintNewPage: "1",
      isSettingsDialog: "0",
      isShowPreview: "1",
      isPrintPageBottom: "0",
      isPrintPageRight: "0",
      pageOrientation: "portrait",
      isPrintSaveTemplate: "1",
      paperInput: "portrait",
      pageSize: "a4",
      printType: "1col",
      templatemetaid: templateId,
      templateIds: templateId,
    },
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  if (!cid)
    return (
      <>
        {" "}
        <Layout>
          <div className="mx-auto  flex flex-col py-6 px-10">
            <Title title="Гэрээ үүсээгүй байна"></Title>
          </div>
        </Layout>
      </>
    );

  const fetchData = async () => {
    const result = await fetchJson(
      `/api/get-data?metaid=1701156148201731&criteria=${criteria}`
    );
    if (result?.status == "success") {
      const readydata = result?.result?.[0];
      setItem(readydata);
      const param = {
        contracttypeid: readydata?.contracttypeid,
        contractTotalAmount: readydata?.saleprice,
        customerId: router.query?.c,
        durationTypeId: readydata?.monthid,
        startDate: date,
        itemId: readydata?.id,
        price: readydata?.saleprice,
        amount: readydata?.saleprice,
      };
      const res = await axios.post(`/api/post-process`, {
        processcode: "fitKioskCreateContract_DV_001",
        parameters: param,
      });
      if (res?.data?.status == "success") {
        setTemplateId(res?.data?.result?.templateId);
        setContractId(res?.data?.result?.id);
        setLoading(false);
      }
    }
  };

  const checkContract = async () => {
    setLoading(true);
    const res = await axios.post(`/api/post-process`, {
      processcode: "fitKioskContractIsConfirm_DV_001",
      parameters: {
        id: contractId,
        isComfirm: "1",
      },
    });
    if (res?.data?.status == "success") {
      setLoading(false);
      if (res?.data?.result?.isConfirm !== "0") {
        setNextButtonView(true);
      }
    }
  };

  // if (loading) {
  //   return (
  //     <Layout>
  //       <Spin fullscreen size="large" />
  //     </Layout>
  //   );
  // }

  const itemParent =
    (localStorage.getItem("price") &&
      JSON.parse(localStorage.getItem("price") || "")) ||
    {};

  console.log("itemParent :>> ", itemParent);

  return (
    <>
      <Layout>
        <div className="mx-auto  flex flex-col py-4 px-10">
          <Title title="ТӨЛБӨР ТӨЛӨХ"></Title>

          {/* {content()} */}
          <div className="flex flex-col gap-y-10 text-start mt-[50px] px-10">
            <div className="flex flex-col gap-y-4 text-white">
              <label className="text-[48px] mt-20">Үйлчилгээний төрөл</label>
              <input
                className="bg-[#D9D9D94D] border border-white min-h-[98px] rounded-[60px] px-10 text-[48px]"
                value={item?.itemname || itemParent?.name}
              />
            </div>
            <div className="flex flex-col gap-y-4 text-white">
              <label className="text-[48px]">Үнийн дүн</label>
              <input
                className="bg-[#D9D9D94D] border border-white min-h-[98px] rounded-[60px] px-10 text-[48px]"
                value={item?.saleprice || itemParent?.saleprice}
              />
            </div>
            <div className="flex flex-col gap-y-4 text-white">
              <label className="text-[48px]">Хугацаа</label>
              <input
                className="bg-[#D9D9D94D] border border-white min-h-[98px] rounded-[60px] px-10 text-[48px]"
                value={item?.monthname || itemParent?.durationtype}
              />
            </div>
          </div>
          <div
            className="bg-[#A68B5C] text-white text-[60px] rounded-[87px] mx-10 mt-[50px] py-4 cursor-pointer"
            onClick={() => router.push("/page/sell/payment ")}
          >
            ТӨЛБӨР ТӨЛӨХ
          </div>
        </div>
      </Layout>
    </>
    // <div
    //   className="w-full 2xl:w-[1000px]  2xl:h-[1800px] h-screen flex flex-col relative justify-center items-center overflow-hidden"
    //   style={{
    //     backgroundImage: "url(/images/home1.png)",
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
    //     fontFamily: "AG",
    //   }}
    // >
    //   <div className="w-full py-10 flex items-center justify-center uppercase">
    //     <img src="/images/logo.png" alt="home" />
    //   </div>
    //   <div className=" my-20 w-full px-20  uppercase h-full text-center">
    //     {content()}
    //   </div>
    //   <button
    //     className="absolute bottom-10 left-10 text-white uppercase text-[48px]"
    //     onClick={() => router.back()}
    //   >
    //     back
    //   </button>
    //   {nextButtonView && (
    //     <button
    //       className="absolute bottom-10 right-10 text-white uppercase text-[48px]"
    //       onClick={() => setContentType("pay")}
    //     >
    //       next
    //     </button>
    //   )}
    // </div>
  );
};

export default Sell;
