// components/WelcomeTitle.tsx
import WidgetKiosk from "@/middleware/components/WidgetForm/widgetKiosk";
import fetchJson from "@/util/helper";
import { Modal } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MemberChange from "./memberChange";
import _ from "lodash";

interface TitleProps {
  data: any;
}

const ContractItem: React.FC<TitleProps> = ({ data }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState<any>();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [loading, setLoading] = useState(false); // State for loading
  const [user, setUser] = useState<any>(); // State for loading
  const [customerId, setCustomerId] = useState<any>(); // State for loading
  const [err, setErr] = useState<any>(false); // State for loading

  const fetchData = async (query: any) => {
    if (query) {
      setLoading(true);
      console.log('query :>> ', query);
      try {
        const data = await fetchJson(
          `/api/get-data?metaid=17333082985953&criteria=${JSON.stringify({
            id: [
              {
                operator: "=",
                operand: query,
              },
            ],
          })}&paging=${JSON.stringify({
            offset: 1,
            pageSize: 20,
          })}`
        );
        console.log("datassssssssss :>> ", data);
        if (data?.status =='success') {

          let datas= data?.result;
              delete datas.aggregatecolumns;
                delete datas.paging;
                datas = _.values(datas);
                console.log('data.resultdata.result :>> ', datas);
          setErr(false);
          setUser(datas);
          setCustomerId(data.result[0]?.customerid);
          setLoading(false);
        } else {
          // alert("No user found for the given register number.");
          setLoading(false);
          setErr(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErr(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const onClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (data) {
      localStorage.clear();
      fetchData(data?.contractid);
    }
  }, [customerId]);

  const handlerChangeEvent = (e: any, item: any) => {
    const mergeData = { ...data, item };
    setContent(
      <>
        <MemberChange dataSrc={mergeData} setOpenModal={setContent} />
      </>
    );
    setOpenModal(true);
  };

  console.log("user :>> ", user);
  console.log("data :>> ", data);
  return (
    <div className="border p-6 rounded-2xl space-y-8 mt-10 ">
      <h3 className="text-white text-[40px]"> {data.itemname || "--"}</h3>
      <div className="text-2xl text-white text-start grid md:grid-cols-2 xs:grid-cols-1 w-full  gap-4 ">
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>ГЭРЭЭНИЙ ДУГААР</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {data.contractid || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>СЕРИАЛ ДУГААР</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {/* {user[0]?.customername} */}
            {data.serialnumber || data.contractcode || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>ОВОГ</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {data.lastname || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>НЭР</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {data.customername || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>ҮЙЛЧИЛГЭЭНИЙ НЭР</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {data.itemname || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>БАГЦЫН ХУГАЦАА</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {data.durationtype || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>БАЙГУУЛСАН ОГНОО</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {moment(data?.contractdate).format("YYYY-MM-DD")}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>ЭХЛЭХ ДУУСАХ ОГНОО</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {moment(data?.startdate).format("YYYY-MM-DD")} /<> </>
            {moment(data?.enddate).format("YYYY-MM-DD")}
          </span>
        </div>
      </div>

      {user && (
        <div className="flex flex-col">
          <span className="text-2xl text-white text-start uppercase">
            Бүртгэлтэй гишүүд
          </span>
          <div className="flex flex-col my-2">
            {user.map((item: any, itemIndex: any) => (
              <div className=" text-lg bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl mt-2 text-left relative">
                <p key={itemIndex} className="flex ">
                  ОВОГ: <span>{item?.firstname}</span>
                </p>
                <p>
                  {" "}
                  НЭР: <span>{item?.lastname}</span>
                </p>
                <p>
                  {" "}
                  РЕГИСТЕР: <span>{item?.firstname}</span>
                </p>
                {/* <div className="">
                  <span
                    // onClick={() => setOpenModal(true)}
                    onClick={(e) => handlerChangeEvent(e, item)}
                    className=" bg-[#A68B5C] cursor-pointer text-white px-6 py-1 rounded-full mt-5  hover:bg-white hover:text-[#A68B5C] absolute right-5 top-5"
                  >
                    Cолих
                  </span>{" "}
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        className=" bg-[#A68B5C] text-white px-6 py-2 rounded-full mt-5  hover:bg-white hover:text-[#A68B5C]"
        onClick={() =>
          router.push({
            pathname: "/page/extend/ext",
            query: { crm: data.customerid, contractid: data?.contractid },
          })
        }
      >
        Cунгалт хийх
      </button>
      <Modal
        open={openModal}
        width={600}
        title="Бүртгэлтэй гишүүн солих"
        // centered
        footer={false}
        onCancel={onClose}
      >
        <div> {content}</div>
      </Modal>
    </div>
  );
};

export default ContractItem;
