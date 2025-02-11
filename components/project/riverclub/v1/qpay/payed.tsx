import axios from "axios";
import Payment from "../payment/payment";
import { FC, useEffect, useState } from "react";
import { Spin, notification } from "antd";
import Cookies from "js-cookie";
import ReportTemplate from "@/middleware/ReportTemplate/ReportTemplate";
import Qpay from "../qpay/qpay";

type PropsType = {
  item?: any;
  payment?: any;
  type?: any;
};

const Payed: FC<PropsType> = ({ item, payment, type }) => {
  const [modalContent, setModalContent] = useState("pos");
  const [selectDateModal, setSelectDateModal] = useState<any>(false);
  const [paymentResult, setPaymentResult] = useState<any>();
  const [qpayResult, setQpayResult] = useState<any>();

  const [printOptions, setPrintOptions] = useState({
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
      pageSize: "a5",
      printType: "1col",
      templatemetaid: "170174656028110",
      templateIds: "170174656028110",
    },
  });
  const [contractId, setContractId] = useState();
  const [loading, setLoading] = useState(false);

  console.log("payment", payment);
  console.log("contract", item);

  const paymentProcess = async (payment: any, type: any) => {
    setLoading(true);
    const param =
      type == "pos"
        ? {
            subTotal: Number(item?.saleprice),
            total: Number(item?.saleprice),
            customerId: localStorage.getItem("cmrid"),
            vat: Number(item?.vat),
            contractId:Number(item?.contracttypeid),
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
            customerId: 12, // customerid
            vat: Number(item?.vat),
            contractId:Number(item?.contracttypeid),
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
    console.log(param);
    if (res?.data?.status == "success") {
      // console.log("processoos irsen resposne", res);
      setPrintOptions({
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
          pageSize: "a5",
          printType: "1col",
          templatemetaid: res?.data?.result?.templateId,
          templateIds: res?.data?.result?.templateId,
        },
      });

      const ebarimtResult = await axios.post(`/api/post-process`, {
        processcode: "kiosk_Ebarimt_Send",
        parameters: {
          id: res?.data?.result?.id,
        },
      });

      if (ebarimtResult?.data?.status == "success") {
        setLoading(false);
        setContractId(res?.data?.result?.id);
        setModalContent("ebarimt");
      }
    } else {
      // console.log("aldaaa", res);
    }
  };

  const printEbarimt = () => {
    var content: any = document.getElementById("portraid");
    const pri: any = (document.getElementById("content") as HTMLIFrameElement)
      .contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    setModalContent("pay");
  };

  // console.log(loading);
  // const deleteContract = async () => {
  //   const res = await axios.post(`/api/post-process`, {
  //     processcode: "fitKioskDeleteContract_DV_005",
  //     parameters: {
  //       id: contract,
  //     },
  //   });
  //   if (res?.data?.status == "success") {
  //     notification.success({
  //       message: "Амжилттай цуцлагдлаа",
  //     });
  //   } else {
  //     alert(res?.data?.error);
  //   }
  // };

  const content = () => {
    switch (modalContent) {
      case "success":
        return (
          <div className="flex items-center justify-center h-full mx-auto">
            <div
              className="w-[600px] h- box-border relative rounded"
              style={{
                background: "var(--202020, #202020)",
              }}
            >
              <div className="p-[30px]">
                <p className="text-[#BAD405] text-[22px] uppercase font-bold">
                  Манайхыг сонгосон танд баярлалаа
                </p>
                <div className="rounded-lg border border-[#DEDEDE]  mt-[50px]">
                  <p className="text-[18px] text-white p-[32px]">
                    {" "}
                    Тантай хийсэн үйлчилгээний гэрээ нь таны бүртгүүлсэн цахим
                    шуудан руу илгээгдсэн.
                  </p>
                </div>
              </div>
              <div className="pb-[20px] w-full flex gap-[16px] px-[64px] cursor-pointer">
                <div
                  className="w-full  text-[20px] text-center uppercase rounded font-medium py-2"
                  style={{
                    color: "var(--202020, #202020)",
                    background: "var(--green-main, #BAD405)",
                  }}
                  onClick={() => {
                    // setSelectDateModal(false);
                    // setModalContent("pay");
                    Cookies.remove("customer");
                  }}
                >
                  Дуусгах
                </div>
              </div>
            </div>
          </div>
        );
      case "ebarimt":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="w-[500px] bg-white overflow-scroll rounded-lg printContent">
              <iframe id="content" className="h-0 w-0 absolute"></iframe>
              <div id={"portraid"}>
                <ReportTemplate
                  options={printOptions}
                  data={{
                    contractId: contractId,
                    // contractId:
                    //   "170174683396510" ||
                    //   "17022810222312" ||
                    //   "170174688727410",
                  }}
                />
              </div>
              <p className="text-[20px] px-4 txt">Та баримтаа хэвлэж авна уу</p>
              <div className="py-[20px] w-full flex gap-[16px] px-[64px] cursor-pointer button">
                <div
                  className="w-full  text-[20px] text-center uppercase rounded font-medium py-2 btn"
                  style={{
                    color: "var(--202020, #202020)",
                    background: "var(--green-main, #BAD405)",
                  }}
                  onClick={() => {
                    printEbarimt();
                  }}
                >
                  Баримт хэвлэх
                </div>
              </div>
            </div>
            <style>
              {`
              @media print {
                body {
                  font-family: Arial, sans-serif;
                  font-size: 12pt;
                  color: black;
                  padding:40px;
                }

                  #portraid {
                    page-break-before: always;
                    page-break-inside: avoid;
                    padding:30px;
                  }

                  .button {
                    display: none;
                  }

                  .txt {
                    display: none;
                  }
                  img :{
                    display: none;
                  }
                }



              `}
            </style>
          </div>
        );
      default:
        return <div className=" h-full w-full">loading</div>;
    }
  };

  return (
    <>
      <div className="">
        <Spin
          className="text-[#BAD405] full-screen"
          fullscreen
          spinning={loading}
          size="large"
        />
      </div>
      {paymentProcess(item, "pos")}
    </>
  );
};

export default Payed;
