import { notification, Spin, Statistic } from "antd";
import axios from "axios";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import Payment from "@/components/project/riverclub/v1/payment/payment";
import Payed from "./payed";
import BankIpTerminalTransfer from "./terminal";

export default function PosTerminal({
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
  console.log("item  pos:>> ", item);

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

  const paymentProcess = async (payment: any, type: any) => {
    const param = {
      subTotal: Number(item?.amount),
      total: Number(item?.amount),
      customerId: localStorage.getItem("cmrid"),
      vat: Number(item?.vat),
      contractId:Number(item?.contracttypeid),
      fitKioskSalesDtlNew_DV: {
        productId: item?.id,
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

    const res = await axios.post(`/api/post-process`, {
      processcode: "fitKioskSalesNew_DV_001",
      parameters: param,
    });

    console.log("paramvposssss", param);

    if (res?.data?.status == "success") {
      console.log("processoos irsen resposne", res);

      const ebarimtResult = await axios.post(`/api/post-process`, {
        processcode: "kiosk_Ebarimt_Send",
        parameters: {
          id: res?.data?.result?.id,
        },
      });

      if (ebarimtResult?.data?.status == "success") {
        console.log("object :>> ");
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

  BankIpTerminalTransfer(
    Number(item?.amount),
    process.env.NEXT_PUBLIC_TERMINAL_ID,
    process.env.NEXT_PUBLIC_DEVICE_TYPE,
    function (res: any) {
      console.log("payment result", res);
      paymentProcess(res, "pos");
      if (res?.status == "success") {
        // paymentProcess(res, "pos");
        Payed(item, "pos");
      } else {
        notification.error({
          message: item?.text,
        });
      }
    }
  );

  return (
    <>
      <div className="min-h-[900px] flex items-center justify-center mt-[250px]">
        <p className="text-white text-[64px]">ТА КАРТАА УНШУУЛНА УУ !</p>
      </div>
    </>
  );
}
