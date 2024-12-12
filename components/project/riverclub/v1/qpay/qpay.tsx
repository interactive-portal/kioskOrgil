import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Statistic } from "antd";
import axios from "axios";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
// import SuccessCard from "../../card/successCard";
// import {Statistic} from "antd";

export default function Qpay({
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
  if (_.isEmpty(item)) return <>Not Data</>;

  const { Countdown } = Statistic;

  // console.log("item :>> ", item);

  const [res, setDatasrc] = useState<any>({});
  const [statusPay, setStatusPayment] = useState<any>();
  // const [resError, setResError] = useState<any>();

  // console.log("item :>> ", item);

  const orderid = item.contractcode;
  const salesorder = item.contractcode;
  const deadline = Date.now() + 1000 * 60 * 15;

  const qpayInfoData = async () => {
    let params = {
      sender_invoice_no: orderid,
      invoice_receiver_code: item?.contractcode,
      invoice_description: item?.contracttypename,
      storeId: "1574647073339",
      amount: "100", //|| Number(item?.amount),
      callback_url: "http://localhost:4000/",
    };
    const { data } = await axios.post(`/api/post-process`, {
      processcode: "QPAY_V2_CREATEINVOICE_SIMPLE",
      parameters: params,
    });

    if (data.status == "success") {
      setDatasrc(data.result);
      qpayMutate();
    } else {
      // setResError(data.text);
      alert(data.text);
    }
  };

  useEffect(() => {
    if (_.isEmpty(res)) qpayInfoData();
  }, [res]);

  const paramsCheck = {
    object_id: res.invoice_id,
    storeId: "1574647073339",
  };

  const {
    data: statusPayment,
    error,
    mutate: qpayMutate,
  } = useSWR(
    `/api/get-process?command=qpay_v2_checkPayment&parameters=${JSON.stringify(
      paramsCheck
    )}`,
    {
      refreshInterval: 3000,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (statusPayment) {
      setStatusPayment(statusPayment);
      if (setPay) {
        setPay(statusPayment);
      }
    }
  }, [statusPayment]);

  // console.log("statusPayment :>> ", statusPayment);

  if (!_.isEmpty(statusPayment?.result?.rows)) {
    // alert("tolbor tologdlosadasdasdasdasdsao");
    console.log(statusPayment?.rows);
    setModalContent("ebarimt");
    // paymentProcess(res, "qpay");
  }

  const onClickScan = (link: any) => {
    window.open(link);
  };

  function onFinish() {
    window.location.reload();
  }

  const Qwin = () => {
    const urlScan = _.values(res?.urls);
    const antIcon = <LoadingOutlined style={{ fontSize: 120 }} spin />;

    if (!res.qr_image)
      return (
        <div className="min-h-[450px] flex flex-col space-y-8 items-center justify-center mx-auto">
          <Spin indicator={antIcon} />
        </div>
      );
    return (
      <>
        <div className="flex place-items-center justify-center my-4 flex-col">
          {/* <pre> {JSON.stringify(res, null, 2)}</pre> */}
          <div className="flex justify-center text-center py-1 text-2xl border-b border-gray-300 text-white">
            <Countdown
              title="Нэхэмжлэхийн дуусах хугацаа"
              value={deadline}
              onFinish={onFinish}
              style={{
                color: "white !important",
                zIndex: 50,
                position: "relative",
              }}
            />
          </div>
          {res && (
            <Image
              unoptimized
              src={`data:image/jpeg;base64,${res.qr_image}`}
              alt="QR Code"
              width={280}
              height={280}
            />
          )}
        </div>
        <div className="flex justify-center py-4 text-lg border-t  border-gray-300 text-white">
          QR код уншуулна уу
        </div>
        <style>
          {`
          .ant-statistic-content-value {
          color:white !important;
          }
          `}
        </style>
      </>
    );
  };
  return <>{Qwin()}</>;
}
