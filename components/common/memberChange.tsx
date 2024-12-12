// components/WelcomeTitle.tsx
import WidgetKiosk from "@/middleware/components/WidgetForm/widgetKiosk";
import fetchJson from "@/util/helper";
import { Empty, Modal, notification } from "antd";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface TitleProps {
  dataSrc: any;
  setOpenModal: any;
}

const MemberChange: React.FC<TitleProps> = ({ dataSrc, setOpenModal }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const methods: any = useForm({});

  const [searchValue, setSearchValue] = useState<any>();
  const [resultList, setResultList] = useState<any>();
  const [newMember, setNewMember] = useState<any>();
  const [val, setVal] = useState<any>();

  const handleChangeV = (e: any) => {
    // console.log("e :>> ", e);
    setSearchValue(e);
  };
  const handleChange = (e: any, item: any) => {
    e.preventDefault();
    // const linkPath = item?.position3?.valsetVal

    // setVal(item.name)
    setNewMember(item);
    setSearchValue("");
  };

  const fetchData = async () => {
    let criteria = {
      filterPath: [
        {
          operator: "=",
          operand: searchValue,
        },
      ],
    };

    // console.log("criteria :>> ", criteria);
    const data = await fetchJson(
      `/api/get-data?metaid=1543807989239385&criteria=${JSON.stringify(
        criteria
      )}`
    );
    if (data.status == "success") {
      setResultList(data?.result);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchValue]);

  //   console.log("newMember :>> ", newMember);
  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      //   const datadd = await axios.post(`/api/post-process`, {
      //     processcode: "fitKioskChangeCustomerMain_DV_006",
      //     parameters: {
      //       contractId: dataSrc?.contractid,
      //       oldCustomerId: dataSrc?.item?.id,
      //       newCustomerId: newMember?.id,
      //       description: "",
      //     },
      //   });

      console.log("dataSrcdataSrcdataSrc :>> ", dataSrc);
    } catch (error) {
      console.error("Error in saved function", error);
      notification.error({
        message: "Сүлжээний алдаа гарлаа",
      });
    } finally {
      setLoading(false);
    }

    // setOpenModal(true);
  };

  return (
    <div className=" rounded-2xl space-y-8 mt-10 h-[650px] ">
      {/* <pre> {JSON.stringify(data, null, 4)}</pre> */}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-10">
            <div className=" text-lg bg-[#24273a] text-white px-6 py-2 rounded-3xl mt-2 text-left relative">
              <p className="flex ">
                ОВОГ: <span>{dataSrc?.item?.firstname}</span>
              </p>
              <p>
                {" "}
                НЭР: <span>{dataSrc?.item?.lastname}</span>
              </p>
              <p>
                {" "}
                РЕГИСТЕР: <span>{dataSrc?.item?.firstname}</span>
              </p>
            </div>
            <div>
              {" "}
              <div className={`  `}>
                <span className="relative -top-2">
                  <>
                    <div className="w-full  ">
                      <div className="relative px-2">
                        <input
                          className="rounded-3xl border-black text-[18px] focus:ring-0  border text-black w-full px-10 py-3 "
                          type="text"
                          placeholder="Бүртгэлтэй гишүүн хайх"
                          //   value={val}
                          onChange={(event) =>
                            handleChangeV(event.target.value)
                          }
                        />
                        <i className="fa-sharp fa-light fa-magnifying-glass  absolute text-base top-2 right-5 cursor-pointer text-black"></i>
                      </div>
                    </div>
                  </>
                  {searchValue?.length > 0 && (
                    <div className="absolute  top-10    w-[400px] rounded-2xl border bg-[#2e343f] text-black mt-10 overflow-hidden z-[9999]  shadow  text-left">
                      <div className="relative rounded-xl overflow-auto ">
                        <div className="overflow-y-scroll  h-[350px] relative max-w-sm mx-auto   shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5 scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin hover:scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full ">
                          {resultList?.length > 0 ? (
                            <>
                              {resultList?.map((item: any, index: number) => {
                                return (
                                  <li
                                    onClick={(e) => handleChange(e, item)}
                                    className="bg-[#d9d9d94f] flex items-center gap-4  text-white cursor-pointer hover:text-blue-400 my-2 p-4 rounded-xl text-sm hover:"
                                    key={item?.id || index}
                                  >
                                    <div className="flex flex-col">
                                      <p>Овог: {item?.lastname}</p>
                                      <p>Нэр: {item?.name}</p>
                                      <p>Регистр: {item?.stateregnumber}</p>
                                    </div>
                                  </li>
                                );
                              })}
                            </>
                          ) : (
                            <Empty description={"Хайлтын илэрц олдсонгүй"} />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </span>
              </div>{" "}
            </div>

            <button
              type="submit"
              className="px-6 py-1 float-right bg-white border-[#A68B5C] border text-[#A68B5C]   justify-center text-[18px] w-[200px] rounded-full mx-auto"
            >
              Хадгалах
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MemberChange;
