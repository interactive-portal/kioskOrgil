import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext, useEffect } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _, { set } from "lodash";
import { useState } from "react";
import { useRouter } from "next/router";
import useCallProcess from "@/middleware/dataHook/useCallProcess";
import RiverLoginModal from "../home/RiverLoginModal";
import { notification } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { Modal, DatePicker, DatePickerProps } from "antd";
import ReportTemplate from "@/middleware/ReportTemplate/ReportTemplate";
import Payment from "../payment/payment";
import PaymentModal from "./paymentModal";
import DatePickerModal from "./datePickerModal";
import { useEvent } from "react-use";
import convertDate from "../bioinput/convertData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RiverClubV1PlanPrice = () => {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const type = widgetnemgooReady?.type;

  // Cookies.set("customer", { customerId: "1522748739210" });

  const { callProcess, isProcessWorking } = useCallProcess();
  const [selectDateModal, setSelectDateModal] = useState(false);

  const customer = Cookies.getJSON("customer");

  const groupByData = _.chain(readyDatasrc)
    .groupBy("classificationname")
    .map((value, key, wrapped) => {
      return { [key]: value };
    })
    .value();

  const upperData = _.values(groupByData).filter(
    (item, key, index) =>
      _.keys(item)[0] == "Алтан" ||
      _.keys(item)[0] == "Гэр бүл" ||
      _.keys(item)[0] == "Платинум"
  );

  const bottomData = _.values(groupByData).filter(
    (item, key, index) =>
      _.keys(item)[0] != "Алтан" &&
      _.keys(item)[0] != "Гэр бүл" &&
      _.keys(item)[0] != "Платинум"
  );

  const { query } = useRouter();
  const router = useRouter();

  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  // useEffect(() => {
  //   Cookies.remove("customer");
  // }, [router]);

  const [activeIndex, setactiveIndex] = useState<any>(0);
  const [openLogin, setOpenLogin] = useState(false);
  const [selectedItem, setSelectItem] = useState<any>();
  const [templateId, setTemplateId] = useState<any>();
  const [contractId, setContractId] = useState<any>("");
  const [needSignUp, setNeedSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const [modal, setModal] = useState("date");

  const { nemgooDatasrc } = useContext(WidgetWrapperContext);

  // багцыг select хийх эсвэл login хийх
  const selectItem = async (e: any, item: any) => {
    // setSignIn(false);
    setOpenLogin(true);
    // if (signIn) {
    //   setSelectDateModal(true);
    // }
    setTemplateId(null);
    setSelectItem(_.values(item)?.[0]?.[activeIndex]);
  };

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
  const [activeCheck, setActiveCheck] = useState(false);

  const template = (
    <div>
      <ReportTemplate
        options={printOptions}
        data={{ contractId: contractId }}
      />
    </div>
  );

  // гэрээний нөхцөлийг шалгах
  const checkContract = async () => {
    if (activeCheck) {
      const res = await axios.post(`/api/post-process`, {
        processcode: "fitKioskContractIsConfirm_DV_001",
        parameters: {
          id: contractId,
          isComfirm: activeCheck ? "1" : "0",
        },
      });
      if (res?.data?.status == "success") {
        if (res?.data?.result?.isConfirm == "0") {
        } else {
          setActiveCheck(false);
          setModal("payment");
        }
      }
    } else {
      notification.info({
        message: "Үйлчилгээний нөхцөлийг зөвшөөрч гэрээ байгуулах боломжтой",
      });
    }
  };

  // гэрээний template дуудсан Modal content
  const templateContent = (
    <div className="flex items-center justify-center h-full mx-auto relative max-w-[960px] overflow-hidden">
      <div
        className=" h-[75%]  overflow-y-scroll "
        style={{
          background: "white",
        }}
      >
        {template}
      </div>
      <div></div>
      <div className="absolute bottom-10 right-0 w-full ">
        <div className="px-[64px] flex items-center mb-8 cursor-pointer">
          <div
            className={`w-[30px] h-[30px] rounded-lg flex items-center justify-center ${
              activeCheck ? "bg-blue-300" : "bg-[#202020]"
            } `}
            onClick={() => setActiveCheck(!activeCheck)}
          >
            {activeCheck ? (
              <i className="fa-solid fa-check fa-xl text-white"></i>
            ) : (
              ""
            )}
          </div>
          <p className="text-[#202020] text-[20px] ml-4">
            Үйлчилгээний нөхцөлийг хүлээн зөвшөөрч байна
          </p>
        </div>
        <div className="flex justify-between gap-[16px] px-[64px] cursor-pointer">
          <div
            className="w-full bg-[#272A32] text-[#C4C4C4] text-[20px] text-center uppercase rounded font-medium py-2"
            onClick={() => {
              setSelectDateModal(false), setModal("date"), deleteContract();
            }}
          >
            Болих
          </div>
          <div
            className="w-full  text-[20px] text-center uppercase rounded font-medium py-2 cursor-pointer"
            style={{
              color: "var(--202020, #202020)",
              background: "var(--green-main, #BAD405)",
            }}
            onClick={() => checkContract()}
          >
            Цааш
          </div>
        </div>
      </div>
    </div>
  );

  const deleteContract = async () => {
    if (contractId) {
      const res = await axios.post(`/api/post-process`, {
        processcode: "fitKioskDeleteContract_DV_005",
        parameters: {
          id: contractId,
        },
      });
      if (res?.data?.status == "success") {
        notification.success({
          message: "Амжилттай цуцлагдлаа",
        });
      } else {
        alert(res?.data?.error);
      }
    }
  };

  const modalContent = () => {
    switch (modal) {
      case "date":
        return (
          <DatePickerModal
            // onChange={onChange}
            selectedItem={selectedItem}
            setActiveCheck={setActiveCheck}
            setContractId={setContractId}
            setModal={setModal}
            setSelectDateModal={setSelectDateModal}
            setTemplateId={setTemplateId}
            // startDate={startDate}
          />
        );
      case "template":
        return templateContent;
      case "payment":
        return (
          <PaymentModal
            item={selectedItem}
            setSelectDateModal={setSelectDateModal}
            setModal={setModal}
            contract={contractId}
          />
        );
    }
  };

  // Үндсэн content хэсэг
  return (
    <BlockDiv className="mx-[20px] flex flex-col mb-[30px]">
      <UpperSection
        item={upperData}
        dark={type == "dark" ? true : false}
        setactiveIndex={setactiveIndex}
        selectItem={selectItem}
      />
      <BottomSection
        item={bottomData}
        dark={type == "dark" ? true : false}
        setactiveIndex={setactiveIndex}
        selectItem={selectItem}
      />
      <RiverLoginModal
        openModal={openLogin}
        setOpenModal={setOpenLogin}
        selectDateModal={setSelectDateModal}
        needSignUp={needSignUp}
        setNeedSignUp={setNeedSignUp}
        setSignIn={setSignIn}
      />
      <Modal
        open={selectDateModal}
        footer={false}
        onCancel={() => {
          {
            setSelectDateModal(false), setModal("date"), deleteContract();
          }
        }}
        afterOpenChange={() => setModal("date")}
        destroyOnClose
      >
        {modalContent()}
        <style>
          {`
          .ant-picker-input >input{
            color:white !important;
          }
          .checkbox-round {
              border-radius:10px
          }
          .ant-modal-body {
            overflow:hidden;
          }
          .ant-modal {
            width: auto !important;
            max-width:100% !important
          }
          .ant-modal-content {
            background-color:transparent !important;
            box-shadow:none !important;
          }
          `}
        </style>
      </Modal>
    </BlockDiv>
  );
};

const UpperSection = ({ item, dark, setactiveIndex, selectItem }: any) => {
  return (
    <BlockDiv className="w-full mb-[28px]">
      <Swiper
        slidesPerView={2}
        spaceBetween={60}
        modules={[Navigation, Pagination]}
      >
        {/* <BlockDiv className=" grid grid-cols-3 items-center gap-x-[60px]  "> */}
        {_.values(item)?.map((obj: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <Card
                item={obj}
                dark={dark}
                key={index}
                setactiveIndex={setactiveIndex}
                selectItem={selectItem}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* </BlockDiv> */}
    </BlockDiv>
  );
};

const Card = ({
  item,
  callProcess,
  myResult,
  dark,
  setactiveIndex,
  selectItem,
}: any) => {
  const title = _.keys(item)[0];
  const readyData = _.values(item)[0];

  // const kFormatter = (num: number) => {
  //   return Math.abs(num) > 999
  //     ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
  //     : Math.sign(num) * Math.abs(num);
  // };

  // const

  return (
    <BlockDiv
      className={`flex flex-col  items-start ${
        dark ? "h-[500px]" : "h-[350px] "
      } ${dark ? "bg-black" : "bg-white"}  px-[20px] py-[50px] rounded-[6px]`}
    >
      <RenderAtom
        item={{ value: "ЭРЭЛТТЭЙ" }}
        renderType="title"
        className={`font-normal text-[12px] uppercase ${
          dark ? "text-white" : "text-black"
        }`}
      />
      <RenderAtom
        item={{ value: title }}
        renderType="title"
        className={`font-[600] text-[22px] uppercase ${
          dark ? "text-white" : "text-black"
        }`}
      />

      <BlockDiv className="flex flex-col items-start justify-center mt-[20px] min-h-[130px]">
        <CardItem
          readyData={readyData}
          dark={dark}
          setactiveIndex={setactiveIndex}
        />
      </BlockDiv>
      {dark ? (
        <>
          <BlockDiv className="flex flex-col gap-y-[4px] h-[70px] justify-end mt-[30px] align-text-top">
            {_.map([""], (innerItem: any, index: number) => {
              return (
                <BlockDiv className="flex items-center" key={index}>
                  <div className="">
                    <i
                      className={`fa-solid fa-check w-[18px] fa-xs  h-[18px] mr-[8px] p-[3px] flex items-center justify-center  rounded-full ${
                        dark
                          ? "text-black bg-[#B3B3B3]"
                          : "bg-[#B3B3B3] text-black"
                      }`}
                      style={{
                        display: "flex !important",
                      }}
                    />
                  </div>
                  <RenderAtom
                    item={{ value: "ФИТНЕСС" }}
                    renderType="text"
                    className={`font-medium text-[12px] ${
                      dark ? "text-[#B3B3B3]" : "text-black"
                    }`}
                  />
                </BlockDiv>
              );
            })}
            <style>
              {`
            .fa-check{
              display:flex !important
            }
            `}
            </style>
          </BlockDiv>

          <RenderAtom
            item={{
              value: "Цагийн хязгааргүй фитнес болон бассейнээр үйлчлүүлнэ.",
            }}
            renderType="text"
            className={`font-medium text-[12px] mt-[36px] h-[70px] ${
              dark ? "text-[#B3B3B3]" : "text-black"
            }`}
          />
        </>
      ) : (
        ""
      )}

      <RenderAtom
        item={{
          value: dark ? "Багц сонгох" : "Cонгох",
        }}
        renderType="button"
        className={`font-[400] text-[20px] text-black italic bg-[#BAD405] uppercase mt-[16px] px-10 py-1 rounded-[8px] cursor-pointer hover:bg-opacity-20 w-max`}
        onClick={(e: any) => selectItem(e, item)}
      />
    </BlockDiv>
  );
};

const CardItem = ({ readyData, dark, kFormatter, setactiveIndex }: any) => {
  const [active, setActive] = useState(0);

  function displayInThousands(number: any) {
    // Divide the number by 1000 and format it with commas
    if (number % 1000) {
      return number + "₮";
    }

    return (
      (number / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 }) +
      "K"
    );
  }
  return (
    <>
      {readyData?.map((obj: any, index: number) => {
        return (
          <RenderAtom
            key={index}
            item={`<sup className="text-[16px] font-normal">₮</sup>${displayInThousands(
              Number(obj?.saleprice)
            )} <span className="text-[16px]"> / ${obj?.monthname}</span>`}
            renderType="title"
            className={`text-[36px] cursor-pointer font-bold flex items-center leading-[24px]  ${
              obj?.priceSeason && obj?.priceHalfYear
                ? "flex"
                : `items-center justify-center`
            }
      ${
        active === index
          ? `${dark ? "text-white" : "text-black"}`
          : "text-[#B3B3B3]"
      }
      `}
            onClick={() => {
              setActive(index);
              setactiveIndex(index);
            }}
            customStyle={
              dark &&
              active == index && {
                background: "linear-gradient(180deg, #ADFF00 0%, #0CB1AB 100%)",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }
            }
          />
        );
      })}
    </>
  );
};

const BottomSection = ({ item, dark, setactiveIndex, selectItem }: any) => {
  return (
    <BlockDiv className="">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        modules={[Pagination]}
        pagination={true}
      >
        {/* <BlockDiv className=" grid grid-cols-3 items-center gap-x-[60px]  "> */}
        {_.values(item)?.map((obj: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <Card
                item={obj}
                dark={dark}
                key={index}
                setactiveIndex={setactiveIndex}
                selectItem={selectItem}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* </BlockDiv> */}
    </BlockDiv>
  );
};

export default RiverClubV1PlanPrice;
