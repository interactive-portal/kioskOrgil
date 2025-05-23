import Layout from "../kioskLayout";
import { useEffect, useState } from "react";
import { DatePicker, DatePickerProps, Modal, Spin } from "antd";
import CheckUser from "./checkUser";
import { useRouter } from "next/router";
import fetchJson, { numberWithCommas } from "@/util/helper";
import { LoadingOutlined } from "@ant-design/icons";
import Title from "@/components/common/Title";
import Contract from "@/components/common/contract";
import _ from "lodash";
import axios from "axios";

const Ext = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [loading, setLoading] = useState(false); // State for loading
  const [dataSrc, setDataSrc] = useState<any>([]); // State for loading
  const [customerId, setCustomerId] = useState<any>(); // State for loading
  const [err, setErr] = useState<any>(false); // State for loading
  const router = useRouter();
  const [val, setVal] = useState<any>();
  // SWR fetcher function for search
  const fetchData = async () => {
    setLoading(true);
    try {
      // const data = await fetchData(searchQuery);
      let data = await fetchJson(
        `/api/get-process?command=kioskContractMainGET_3_004&parameters=${JSON.stringify(
          {
            id: router.query.contractid, //"1", ///|| router.query.contractid,
          }
        )}`
      );
      if (data.status == "success") {
        data = _.values(data.result.kioskcontractmaingetdtl_3);
        setDataSrc(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  const cid: any = router.query.contractid;
  // console.log('dataSrc :>> ', dataSrc);

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  const paymentProcess = async (item: any) => {
    setLoading(true);
    localStorage?.setItem("price", item?.price);
    const param = {
      contractId: cid,
      itemId: item?.itemid,
      startDate: val,
      customerId: router.query.crm,
    };
    const res = await axios.post(`/api/post-process`, {
      processcode: "kioskContractMainDV_3",
      parameters: param,
    });
    console.log("param", res);
    if (res?.data?.status == "success") {
      const conid = res?.data?.result?.contractid;
      // localStorage?.setItem("cid", conid);
      window.location.href = `/page/sell?id=${conid}`;
    } else {
      // console.log("aldaaa", res);
    }
  };

  // console.log("dataSrc :>> ", dataSrc);
  if (dataSrc.length == 0)
    return (
      <>
        <Layout>
          <div className="mx-auto  flex flex-col ">
            <Title title="No Data"></Title>
            <div className="relative mx-auto w-full  inline-block">...</div>
          </div>
        </Layout>
      </>
    );

  const onchange: DatePickerProps["onChange"] = (date, dateString) => {
    setVal(dateString);
    // console.log("obj?.pathname :>> ", obj?.pathname);
  };

  return (
    <Layout>
      <div className="mx-auto  flex flex-col ">
        <Title title="Сунгалт"></Title>
        <div className="relative mx-auto w-full  inline-block">
          <div className="flex flex-col space-y-6 ">
            <div className="flex flex-col gap-8">
              <p className="text-2xl">Эхлэх огноог оруулна уу</p>
              <DatePicker
                placeholder={`Эхлэх огноо сонгох`}
                className=" placeholder:text-white rounded-full xl text-white"
                onChange={onchange}
                // // onSelect={field.value}
                // // defaultValue={value}
                // value={val}
                style={{
                  border: "1px solid #e5e7eb",
                  padding: "17px 16px 17px 16px",
                  color: "#fff",
                  backgroundColor: "#D9D9D94F",
                }}
              />
            </div>

            {val &&
              dataSrc?.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => paymentProcess(item)}
                  className="rounded-full text-[35px] xs:text-[30px] py-3 xs:px-6 cursor-pointer obtn px-10  ">
                  {item?.itemname || item?.name}
                  {item.price && (
                    <p className="p-0 m-0"> {numberWithCommas(item.price)}₮</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ext;
