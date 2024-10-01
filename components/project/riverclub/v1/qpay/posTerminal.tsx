import { notification, Spin, Statistic } from "antd";
import axios from "axios";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import Payment from "@/components/project/riverclub/v1/payment/payment";
import Payed from "./payed";
export default function PosTerminal({
  item,
  close,
  status,
  content,
  setPay,
  paymentProcess,
  setModalContent,
}: {
  item?: any;
  close?: any;
  status?: any;
  content?: any;
  setPay?: any;
  paymentProcess?: any;
  setModalContent?: any;
}) {
  console.log("item :>> ", item);

  Payment(
    Number("100"),
    // Number(item?.amount),
    process.env.NEXT_PUBLIC_TERMINAL_ID,
    process.env.NEXT_PUBLIC_DEVICE_TYPE,
    function (item: any) {
      // console.log("payment result backasdasdasd", item);
      if (item?.status == "success") {
        // setPaymentResult(item);
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
