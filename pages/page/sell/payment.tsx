import React, { useEffect, useState } from "react";
import Layout from "../kioskLayout";
import Qpay from "@/components/project/riverclub/v1/qpay/qpay";
import { useRouter } from "next/navigation";
import Title from "@/components/common/Title";
import SocialPay from "@/components/project/riverclub/v1/qpay/socailpay";
import axios from "axios";
import Payment from "@/components/project/riverclub/v1/payment/payment";
import PosTerminal from "@/components/project/riverclub/v1/qpay/posTerminal";
import EbarimtPrint from "@/components/project/riverclub/v1/qpay/ebarimt";

const PaymentPage = () => {
  const router = useRouter();
  const [view, setView] = useState("payment");
  const LOCAL_STORAGE_KEY = "orderInfo";

  const [order, setOrder] = useState<any>();
  const [product, setProduct] = useState<any>();
  const [payType, setPayType] = useState<any>(2);
  const [paymentProcess, setPaymentProcess] = useState<any>();

  useEffect(() => {
    const orderData = localStorage.getItem("orderInfo");
    if (orderData) setOrder(localStorage.getItem("orderInfo"));

    const product = localStorage.getItem("price");
    if (product) setProduct(localStorage.getItem("price"));
    // console.log("object :>> ", localStorage.getItem("orderInfo"));
  }, [order]);

  const jsonData = order ? JSON.parse(order) : {};
  const jsonDataProduct = product ? JSON.parse(product) : {};

  // console.log("jsonDataProduct :>> ", jsonDataProduct);
  console.log("jsonData :>> ", jsonData);

  if (!jsonData)
    return (
      <>
        <Layout>
          <Title title="not order info "></Title>
        </Layout>
      </>
    );
  // console.log("order :>> ", jsonData);

  const handleQpayPayment = async () => {
    setView("receipt");
  };

  const renderDefaultView = () => (
    <>
      <div className=" flex gap-6">
        <button
          className="h-[174px] bg-white text-[#525050] rounded-full text-[64px] w-full px-10"
          onClick={() => setView("payment")}>
          ХУВЬ ХҮН
        </button>
        <button
          className="h-[174px]  bg-white text-[#525050] rounded-full text-[64px] w-full px-10"
          onClick={() => setView("organization")}>
          БАЙГУУЛЛАГА
        </button>
      </div>
    </>
  );

  const renderOrganizationView = () => (
    <div className="mt-[150px]">
      <Title title="e-barimt"></Title>
      <div>
        <div>
          <p className="text-white text-[46px] text-start px-10 ">
            БАЙГУУЛЛАГЫН РЕГИСТЕР
          </p>
          <input className="bg-[#D9D9D94D] border text-white border-white min-h-[118px] rounded-full px-10 text-[48px] w-full" />
        </div>
        <div>
          <p className="text-white text-[46px] text-start px-10 mt-[50px]">
            БАЙГУУЛЛАГЫН НЭР
          </p>
          <input className="bg-[#D9D9D94D] text-white border border-white min-h-[118px] rounded-full px-10 text-[48px]  w-full" />
        </div>
      </div>

      <button
        className="h-[154px] text-white w-[744px] bg-[#A68B5C] rounded-full text-[64px] mt-[300px]"
        onClick={() => setView("payment")}>
        БАТЛАХ
      </button>
    </div>
  );

  const renderPaymentView = () => (
    <div className="flex flex-col">
      <button
        className="h-[174px]  bg-white w-[480px] rounded-full text-[#525050] text-[64px] uppercase px-10"
        onClick={() => setView("card")}>
        Карт
      </button>
      {/* <button
        className=" uppercase h-[174px]  text-[#525050] bg-white rounded-full text-[64px] mt-[50px] px-10"
        onClick={() => setView("socialPay")}
      >
        Social Pay
      </button> */}
      <button
        className="uppercase h-[174px] text-[#525050]  w-[480px]  bg-white rounded-full text-[64px] mt-[50px] px-10"
        onClick={() => setView("qpay")}>
        QPay
      </button>
    </div>
  );

  const renderReceiptView = () => (
    <div className="min-h-[900px] flex items-center justify-center mt-[250px]">
      <p className="text-white text-[64px]">ТА ТӨЛБӨРИЙН БАРИМТАА АВНА УУ!</p>ss
    </div>
  );

  const renderCardReceiptView = () => (
    <div className="min-h-[900px] flex items-center justify-center mt-[250px]">
      <p
        className="text-white text-[64px] "
        //  onClick={() => checkPayment()}
      >
        ТА КАРТАА УНШУУЛНА УУ!
      </p>
    </div>
  );

  return (
    <Layout>
      <div className="mx-auto  flex flex-col py-6 px-6">
        {view === "default" && renderDefaultView()}
        {view === "organization" && renderOrganizationView()}
        {view === "payment" && renderPaymentView()}
        {view === "receipt" && renderReceiptView()}
        {view === "ebarimt" && (
          <EbarimtPrint
            item={jsonData}
            content={jsonDataProduct}
            type={payType}
          />
        )}
        {view === "card" && (
          <PosTerminal
            item={jsonData}
            setModalContent={setView}
            content={jsonDataProduct}
          />
        )}
        {view === "qpay" && (
          <Qpay
            item={jsonData}
            setModalContent={setView}
            setPayType={payType}
            setPay={setPaymentProcess}
          />
        )}
        {view === "socialPay" && (
          <SocialPay
            item={jsonData}
            setModalContent={setView}
            setPay={setPaymentProcess}
          />
        )}
      </div>

      {/* {view === "qpay" && <Qpay onPaymentSuccess={handleQpayPayment} />} */}
    </Layout>
  );
};

export default PaymentPage;
