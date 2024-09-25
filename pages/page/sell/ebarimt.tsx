import React, { useState } from "react";
import Layout from "../kioskLayout";
import Qpay from "@/components/project/riverclub/v1/qpay/qpay";
import { useRouter } from "next/navigation";

const Ebarimt = () => {
  const router = useRouter();
  const [view, setView] = useState("default");

  const renderDefaultView = () => (
    <div className="mt-[350px]">
      <p className="text-[90px] text-[#A68B5C]">e-barimt</p>
      <button
        className="h-[174px] w-[844px] bg-white text-[#525050] rounded-full text-[64px] mt-[80px]"
        onClick={() => setView("payment")}
      >
        ХУВЬ ХҮН
      </button>
      <button
        className="h-[174px] w-[844px] bg-white text-[#525050] rounded-full text-[64px] mt-[50px]"
        onClick={() => setView("organization")}
      >
        БАЙГУУЛЛАГА
      </button>
    </div>
  );

  const renderOrganizationView = () => (
    <div className="mt-[150px]">
      <p className="text-[90px] text-[#A68B5C] mb-[100px]">E-barimt</p>
      <div>
        <div>
          <p className="text-white text-[46px] text-start px-10 ">
            БАЙГУУЛЛАГЫН РЕГИСТЕР
          </p>
          <input className="bg-[#D9D9D94D] border text-white border-white min-h-[118px] rounded-full px-10 text-[48px] w-[788px]" />
        </div>
        <div>
          <p className="text-white text-[46px] text-start px-10 mt-[50px]">
            БАЙГУУЛЛАГЫН НЭР
          </p>
          <input className="bg-[#D9D9D94D] text-white border border-white min-h-[118px] rounded-full px-10 text-[48px]  w-[788px]" />
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
    <div className="mt-[300px]">
      <p className="text-[90px] text-[#A68B5C]">ТӨЛБӨР ТӨЛӨХ </p>
      <button
        className="h-[174px] w-[844px] bg-white rounded-full text-[#525050] text-[64px] mt-[80px] uppercase"
        onClick={() => setView("card")}
      >
        Карт
      </button>
      <button
        className=" uppercase h-[174px] w-[844px] text-[#525050] bg-white rounded-full text-[64px] mt-[50px]"
        onClick={() => setView("qpay")}
      >
        Social Pay
      </button>
      <button
        className="uppercase h-[174px] text-[#525050] w-[844px] bg-white rounded-full text-[64px] mt-[50px]"
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
      {renderPaymentView()}
      {/* {view === "default" && renderDefaultView()}
      {view === "organization" && renderOrganizationView()}
      {view === "payment" && renderPaymentView()}
      {view === "receipt" && renderReceiptView()}
      {view === "card" && renderCardReceiptView()} */}
      {/* {view === "qpay" && <Qpay onPaymentSuccess={handleQpayPayment} />} */}
    </Layout>
  );
};

export default Ebarimt;
