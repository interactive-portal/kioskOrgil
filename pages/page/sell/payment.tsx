import React, { useState } from "react";
import Layout from "../kioskLayout";
import Qpay from "@/components/project/riverclub/v1/qpay/qpay";
import { useRouter } from "next/navigation";
import Title from "@/components/common/Title";

const Ebarimt = () => {
  const router = useRouter();
  const [view, setView] = useState("default");

  const renderDefaultView = () => (
    <>
      <Title title="e-barimt төрөл"></Title>
      <div className=" flex gap-6">
        <button
          className="h-[174px] bg-white text-[#525050] rounded-full text-[64px] w-full"
          onClick={() => setView("payment")}
        >
          ХУВЬ ХҮН
        </button>
        <button
          className="h-[174px]  bg-white text-[#525050] rounded-full text-[64px] w-full"
          onClick={() => setView("organization")}
        >
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
        onClick={() => setView("payment")}
      >
        БАТЛАХ
      </button>
    </div>
  );

  const renderPaymentView = () => (
    <div className="flex flex-col">
      <button
        className="h-[174px]  bg-white rounded-full text-[#525050] text-[64px] uppercase"
        onClick={() => setView("card")}
      >
        Карт
      </button>
      <button
        className=" uppercase h-[174px]  text-[#525050] bg-white rounded-full text-[64px] mt-[50px]"
        onClick={() => setView("qpay")}
      >
        Social Pay
      </button>
      <button
        className="uppercase h-[174px] text-[#525050]  bg-white rounded-full text-[64px] mt-[50px]"
        onClick={() => setView("qpay")}
      >
        QPay
      </button>
    </div>
  );

  const handleQpayPayment = async () => {
    setView("receipt");
  };

  const renderReceiptView = () => (
    <div className="min-h-[900px] flex items-center justify-center mt-[250px]">
      <p className="text-white text-[64px]">ТА ТӨЛБӨРИЙН БАРИМТАА АВНА УУ!</p>
    </div>
  );

  const renderCardReceiptView = () => (
    <div className="min-h-[900px] flex items-center justify-center mt-[250px]">
      <p className="text-white text-[64px]">ТА КАРТАА УНШУУЛНА УУ!</p>
    </div>
  );

  return (
    <Layout>
      <div className="mx-auto  flex flex-col py-6 px-6">
        {view === "default" && renderDefaultView()}
        {view === "organization" && renderOrganizationView()}
        {view === "payment" && renderPaymentView()}
        {view === "receipt" && renderReceiptView()}
        {view === "card" && renderCardReceiptView()}

        {view === "qpay" && <Qpay />}
      </div>

      {/* {view === "qpay" && <Qpay onPaymentSuccess={handleQpayPayment} />} */}
    </Layout>
  );
};

export default Ebarimt;
