import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Statistic } from "antd";
import axios from "axios";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { QRCode } from "react-qrcode-logo";

export default function SocialPay({
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
  console.log("item :>> ", item);

  const [res, setDatasrc] = useState<any>({});
  const [response, setResponce] = useState<any>();
  const [statusPay, setStatusPayment] = useState<any>();

  const deadline = Date.now() + 1000 * 60 * 15;

  const qpayInfoData = async () => {
    let params = {
      terminalId: 19198148,
      amount: Number(item?.amount),
    };
    const { data } = await axios.post(`/api/post-process`, {
      processcode: "getInvoiceQrSocialPay",
      parameters: params,
    });

    if (data.status == "success") {
      setDatasrc(data.result);
      setResponce(data?.result?.response?.desc);
      // setModalContent("ebarimt");

      //   qpayMutate();
    } else {
      // setResError(data.text);
    }
  };

  // console.log("res :>> ", res);

  const paramsCheck = {
    id: res?.invoiceId,
    amount: Number(item?.amount),
    terminalId: 19198148,
  };

  const {
    data: statusPayment,
    error,
    mutate: socailMutate,
  } = useSWR(
    `/api/get-process?command=checkInvoiceSocialPay&parameters=${JSON.stringify(
      paramsCheck
    )}`,
    {
      refreshInterval: 3000,
      revalidateOnFocus: false,
    }
  );

  const checkInvoiceSocialPay = async (invoice: any) => {
    let params = {
      id: invoice,
      terminalId: 19198148,
      amount: Number(item?.amount),
    };
    const { data } = await axios.post(`/api/post-process`, {
      processcode: "checkInvoiceSocialPay",
      parameters: params,
    });

    if (data.status == "success") {
      console.log("object :>> ", data);
      // setDatasrc(data.result);
      // setResponce(data?.result?.response?.desc);
      // setModalContent("ebarimt");

      //   qpayMutate();
    } else {
      // setResError(data.text);
    }
  };

  useEffect(() => {
    if (_.isEmpty(res)) qpayInfoData();

    // setInterval(() => {
    //   if (_.isEmpty(res)) qpayInfoData();
    // }, 3000);
  }, [res]);
  //
  console.log("statusPayment :>> ", statusPayment);

  const Qwin = () => {
    const urlScan = _.values(res?.urls);
    const antIcon = <LoadingOutlined style={{ fontSize: 120 }} spin />;

    if (!response)
      return (
        <div className="min-h-[450px] flex flex-col space-y-8 items-center justify-center mx-auto">
          <Spin indicator={antIcon} />
        </div>
      );

    if (statusPayment?.status == "success") {
      setModalContent("ebarimt");
    }
    return (
      <>
        <div className="flex place-items-center justify-center my-4 flex-col">
          {response && (
            <QRCode
              size={300}
              style={{
                height: "auto",
                maxWidth: "70%",
                width: "100%",
                padding: "25px",
                margin: "auto",
              }}
              logoHeight={40}
              logoWidth={40}
              logoOpacity={1}
              enableCORS={true} // enabling CORS, this is the thing that will bypass that DOM check
              qrStyle="dots" // type of qr code, wether you want dotted ones or the square ones
              eyeRadius={10} // radius of the promocode eye
              id={"QR"}
              value={response}
              // viewBox={`0 0 256 256`}
            />
          )}
        </div>
        <div className="flex justify-center py-4 text-sm text-red-400 border-t  border-gray-300 ">
          {statusPayment?.text}
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
