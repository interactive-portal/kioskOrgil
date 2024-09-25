import Qpay from "@/components/project/riverclub/v1/qpay/qpay";
import axios from "axios";
import Cookies from "js-cookie";
import { FC, useState } from "react";
import Layout from "../kioskLayout";
import { useRouter } from "next/navigation";
import Warning from "./warning";

type PropsType = {
  item?: any;
  contractId?: any;
};

const Pay: FC<PropsType> = ({ item, contractId }) => {
  const router = useRouter();
  const [contentType, setContentType] = useState("");
  const [isCardScanned, setIsCardScanned] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const session: any = Cookies.getJSON("customer");

  const paymentProcess = async (payment: any, type: any) => {
    const param =
      type === "pos"
        ? {
            subTotal: Number(item?.saleprice),
            total: Number(item?.saleprice),
            customerId: session?.customerId,
            vat: Number(item?.vat),
            contractId: contractId,
            fitKioskSalesDtlNew_DV: {
              productId: item?.id,
              sectionId: item?.sectionid,
              unitPrice: Number(item?.saleprice),
              lineTotalPrice: Number(item?.saleprice),
              percentVat: "10",
              uniVat: item?.vat,
              lineTotalVat: item?.vat,
              unitAmount: Number(item?.saleprice),
              lineTotalAmount: Number(item?.saleprice),
            },
            fitKioskSalesPaymentNew_DV: {
              paymentMethodCode: payment?.pan,
              bankId: 500000,
              amount: Number(item?.saleprice),
              paymentTypeId: "2",
              confirmCode: payment?.authcode,
              refenceNumber: payment?.rrn,
              terminalNumber: payment?.terminalid,
              extTransactionId: payment?.traceno || payment?.invoice_id,
            },
          }
        : {
            subTotal: Number(item?.saleprice),
            total: Number(item?.saleprice),
            customerId: session?.customerId,
            vat: Number(item?.vat),
            contractId: contractId,
            fitKioskSalesDtlNew_DV: {
              productId: item?.id,
              sectionId: item?.sectionid,
              unitPrice: Number(item?.saleprice),
              lineTotalPrice: Number(item?.saleprice),
              percentVat: "10",
              uniVat: item?.vat,
              lineTotalVat: item?.vat,
              unitAmount: Number(item?.saleprice),
              lineTotalAmount: Number(item?.saleprice),
            },
            fitKioskSalesPaymentNew_DV: {
              amount: Number(item?.saleprice),
              paymentTypeId: "40",
              extTransactionId: payment?.invoice_id,
            },
          };

    const res = await axios.post(`/api/post-process`, {
      processcode: "fitKioskSalesNew_DV_001",
      parameters: param,
    });

    if (res?.data?.status === "success") {
      const ebarimtResult = await axios.post(`/api/post-process`, {
        processcode: "kiosk_Ebarimt_Send",
        parameters: {
          id: res?.data?.result?.id,
        },
      });

      if (ebarimtResult?.data?.status === "success") {
        setShowWarning(true);
        setTimeout(() => {
          setIsCardScanned(true);
        }, 2000); // Show warning for 2 seconds before navigating
      }
    } else {
      console.log("Payment failed", res);
    }
  };

  const content = () => {
    if (isCardScanned) {
      router.push("/page/sell/ebarimt");
      return null;
    }

    switch (contentType) {
      case "choose":
        return (
          <div className="flex flex-col gap-y-20 uppercase mt-[20%] text-[64px]">
            <div
              className="bg-white rounded-[87px] text-[#525050] py-10"
              onClick={() => {
                setContentType("card");
              }}
            >
              карт
            </div>
            <div
              className="bg-white rounded-[87px] text-[#525050] py-10"
              onClick={() => {
                setContentType("qpay");
              }}
            >
              Qpay
            </div>
          </div>
        );
      case "qpay":
        return <Qpay item={item} paymentProcess={paymentProcess} />;
      case "card":
        return (
          <div className="min-h-[900px] flex items-center justify-center mt-20">
            <Warning />
          </div>
        );
      default:
        return (
          <>
            <div className="flex flex-col gap-y-10 text-start mt-[50px]">
              <div className="flex flex-col gap-y-4 text-white">
                <label className="text-[48px] mt-20">Үйлчилгээний төрөл</label>
                <input
                  className="bg-[#D9D9D94D] border border-white min-h-[118px] rounded-[23px] px-10 text-[48px]"
                  value={item?.itemname}
                />
              </div>
              <div className="flex flex-col gap-y-4 text-white">
                <label className="text-[48px]">үнийн дүн</label>
                <input
                  className="bg-[#D9D9D94D] border border-white min-h-[118px] rounded-[23px] px-10 text-[48px]"
                  value={item?.saleprice}
                />
              </div>
              <div className="flex flex-col gap-y-4 text-white">
                <label className="text-[48px]">хугацаа</label>
                <input
                  className="bg-[#D9D9D94D] border border-white min-h-[118px] rounded-[23px] px-10 text-[48px]"
                  value={item?.monthname}
                />
              </div>
            </div>
            <div
              className="bg-[#A68B5C] text-white text-[70px] rounded-[87px]  mt-[200px] py-8"
              onClick={() => router.push("/page/sell/warning")}
            >
              ТӨЛБӨР ТӨЛӨХ
            </div>
          </>
        );
    }
  };

  return (
    <Layout>
      <p className="text-[90px] text-[#A68B5C] ">ТӨЛБӨР ТӨЛӨХ</p>
      {content()}
    </Layout>
  );
};

export default Pay;
