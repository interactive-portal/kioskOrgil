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
import _ from "lodash";

const Sell = () => {
  const [item, setItem] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [templateId, setTemplateId] = useState("");
  const [contractId, setContractId] = useState("");
  const [info, setIfno] = useState<any>();
  const [activeCheck, setActiveCheck] = useState(false);
  const [nextButtonView, setNextButtonView] = useState(false);
  const [contentType, setContentType] = useState("contract");

  const customer: any = Cookies.getJSON("customer");
  const router = useRouter();
  const date = moment().format("YYYY-MM-DD");
  const cid = router.query?.id;

  const fetchData = async () => {
    const params = JSON.stringify({
      id: cid,
    });

    const result = await fetchJson(
      `/api/get-process?command=fitKioskContractDtlData_GET_004&parameters=${params}`
    );
    if (result?.status == "success") {
      const res = await axios.post(`/api/post-process`, {
        processcode: "fitKioskContractIsConfirm_DV_001",
        parameters: {
          id: cid,
          isComfirm: "1",
        },
      });

      console.log("res :>> ", res);

      localStorage.setItem("orderInfo", JSON.stringify(result.result));
      setItem(result.result);
    }
  };

  useEffect(() => {
    if (!cid) {
      return;
    }
    fetchData();

    if (localStorage) {
      let prrr: any = localStorage.getItem("price");
      let pp: any = prrr ? JSON.parse(prrr) : {};
      setIfno(pp);
      // console.log("pp :>> ", pp);
    }
  }, [cid]);

  // console.log("item :>> ", item);
  if (!item) {
    return (
      <Layout>
        No order id
        <Spin fullscreen size="large" />
      </Layout>
    );
  }

  // console.log("itemParent :>> ", cid);

  return (
    <>
      <Layout>
        <div className="mx-auto  flex flex-col py-4 px-10">
          <Title title="ТӨЛБӨР ТӨЛӨХ"></Title>
          <div className="flex flex-col gap-y-10 text-start mt-[50px] px-10">
            <div className="flex flex-col gap-y-4 text-white">
              <label className="text-[48px] mt-20">Үйлчилгээний төрөл</label>
              <input
                className="bg-[#D9D9D94D] border border-white min-h-[98px] rounded-[60px] px-10 text-[48px]"
                value={item?.contracttypename}
              />
            </div>
            <div className="flex flex-col gap-y-4 text-white">
              <label className="text-[48px]">Үнийн дүн</label>
              <input
                className="bg-[#D9D9D94D] border border-white min-h-[98px] rounded-[60px] px-10 text-[48px]"
                value={item?.amount}
              />
            </div>
            <div className="flex flex-col gap-y-4 text-white">
              <label className="text-[48px]">Хугацаа</label>
              <input
                className="bg-[#D9D9D94D] border border-white min-h-[98px] rounded-[60px] px-10 text-[48px]"
                value={item?.month || info?.durationtype}
              />
            </div>
          </div>
          <div
            className="bg-[#A68B5C] text-white text-[60px] rounded-[87px] mx-10 mt-[50px] py-4 cursor-pointer"
            // onClick={() => router.push("/page/sell/payment")}

            onClick={() =>
              router.push({
                pathname: "/page/sell/payment",
                query: {
                  selid: cid,
                },
              })
            }
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
