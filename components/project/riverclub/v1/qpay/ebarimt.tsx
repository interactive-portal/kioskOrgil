import ReportTemplate from "@/middleware/ReportTemplate/ReportTemplate";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Statistic } from "antd";
import axios from "axios";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
// import SuccessCard from "../../card/successCard";
// import {Statistic} from "antd";

export default function EbarimtPrint({
  item,
  close,
  status,
  content,
  setPay,
  setModalContent,
}: {
  item?: any;
  close?: any;
  status?: any;
  content?: any;
  setPay?: any;
  setModalContent?: any;
}) {
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

  const [loading, setLoading] = useState(false);
  const [conId, setConId] = useState();

  const paymentProcess = async (payment: any) => {
    const param = {
      subTotal: Number(item?.amount),
      total: Number(item?.amount),
      customerId: localStorage.getItem("cmrid"),
      vat: Number(item?.vat),
      contractId: localStorage.getItem("conId") || item.id,
      fitKioskSalesDtlNew_DV: {
        productId: content?.itemid,
        sectionId: item?.sectionid,
        unitPrice: Number(item?.amount),
        lineTotalPrice: Number(item?.amount),
        percentVat: "10",
        uniVat: item?.vat,
        lineTotalVat: item?.vat,
        unitAmount: Number(item?.amount),
        lineTotalAmount: Number(item?.amount),
      },
      fitKioskSalesPaymentNew_DV: {
        paymentMethodCode: payment?.pan,
        bankId: 500000,
        amount: Number(item?.amount),
        paymentTypeId: "2",
        confirmCode: payment?.authcode,
        refenceNumber: payment?.rrn,
        terminalNumber: payment?.terminalid,
        extTransactionId: payment?.traceno || payment?.invoice_id,
      },
    };

    const { data } = await axios.post(`/api/post-process`, {
      processcode: "fitKioskSalesNew_DV_001",
      parameters: param,
    });

    // console.log("param", data);

    if (data?.status == "success") {
      console.log("processoos irsen resposne", data);

      const { data: ebarimtResult } = await axios.post(`/api/post-process`, {
        processcode: "kiosk_Ebarimt_Send",
        parameters: {
          id: data?.result?.id,
        },
      });
      setLoading(true);
      console.log("ebarimt  :>> ", ebarimtResult);
      if (ebarimtResult?.status == "success") {
        setLoading(false);
        // setLoading(true);
        setConId(ebarimtResult?.result?.id);

        // setLoading(true);
      }
    } else {
      // console.log("aldaaa", res);
    }
  };

  // console.log("item :>> ", item);
  console.log("con :>> ", conId);

  const printEbarimt = () => {
    var content: any = document.getElementById("portraid");
    const pri: any = (document.getElementById("content") as HTMLIFrameElement)
      .contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    // Cookies.remove("customer");
    // if (setModal) {
    //   setModal("date");
    // }
     window.location.href="/"
  };

  useEffect(() => {
    // checkFile(value);
    if (item) paymentProcess(item);
  }, []);

  console.log("item :>> ", loading);
  // if (loading == false)
  //   return (
  //     <>
  //       {" "}
  //       <div className="flex items-center border rounded-xl justify-center w-[500px] min-h-[400px]  h-[350px] flex-col">
  //         <Spin
  //           className="text-[#BAD405] full-screen"
  //           fullscreen
  //           size="large"
  //         />
  //         <p> түр хүлээнэ үү ...</p>{" "}
  //       </div>
  //     </>
  //   );

  return (
    <>
      <div className="flex items-center border rounded-xl justify-center h-full">
        <>
          <div className="w-[500px] min-h-[400px] rounded-lg printContent py-10">
            <iframe id="content" className="h-0 w-0 absolute"></iframe>
            <div id={"portraid"} className="h- w-[260px] mx-auto">
              <ReportTemplate
                options={printOptions}
                data={{
                  contractId: conId, // || "17304644323913",
                  // contractId:
                  //   "170174683396510" ||
                  //   "17022810222312" ||
                  //   "170174688727410",
                }}
              />
            </div>
            <p className="text-[20px] mt-6 px-4 text-white">
              Та баримтаа хэвлэж авна уу
            </p>
            <div className="py-[20px] w-full flex gap-[16px] px-[64px] cursor-pointer button">
              <div
                className="px-6 py-1 float-right bg-white border-[#A68B5C] border text-[#A68B5C]   justify-center text-[18px] w-[200px] rounded-full mx-auto"
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

                  #portraid {
                    page-break-before: always;
                    page-break-inside: avoid;
                    padding:30px;
                    background:#fff;
                    color:#000;
                  }
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
                    background:#fff;
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
        </>
      </div>
    </>
  );
}
