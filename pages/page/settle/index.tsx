import { useRouter } from "next/router";
import moment from "moment";
import Layout from "../kioskLayout";
import { useEffect, useState } from "react";
import { Spin, notification } from "antd";
import fetchJson from "@/util/helper";
import Cookies from "js-cookie";
import axios from "axios";
import Title from "@/components/common/Title";
import _ from "lodash";

const Index = () => {
  const [item, setItem] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [templateId, setTemplateId] = useState("");
  const [contractId, setContractId] = useState("");
  const [info, setIfno] = useState<any>();
  const router = useRouter();
  const date = moment().format("YYYY-MM-DD");
  const cid = router.query?.id;

  const fetchData = async () => {
    const params = JSON.stringify({
      id: cid,
      // id: cid,
    });

    const result = await fetchJson(
      `/api/get-process?command=fitKioskContractDtlData_GET_004&parameters=${params}`
    );
    if (result?.status == "success") {
      const res = await axios.post(`/api/post-process`, {
        processcode: "fitKioskContractIsConfirm_DV_001",
        parameters: {
          id: cid,
          isComfirm: "1",
        },
      });

      console.log("res :>> ", res);

      localStorage.setItem("orderInfo", JSON.stringify(result.result));
      setItem(result.result);
    }
  };

  function sendSetlement(terminalId: any, deviceType: any, callback: any) {
    var dvctype = "GLMT";

    if (!terminalId) {
      callback({ status: "error", text: "TerminalId хоосон байна!" });
      return;
    }

    if (!dvctype) {
      callback({ status: "error", text: "Банкны төрөл хоосон байна!" });
      return;
    }

    console.log("WebSocket is supported by your Browser!");
    // Let us open a web socket
    var ws = new WebSocket("ws://localhost:58324/socket");

    ws.onopen = function () {
      var currentDateTime = moment.now();
      ws.send(
        '{"command":"bank_terminal_pos_connect", "dateTime":"' +
          currentDateTime +
          '", details: [{"key": "devicetype", "value": "' +
          dvctype +
          '"},{"key": "terminalid", "value": "' +
          terminalId +
          '"}]}'
      );
    };

    ws.onmessage = function (evt) {
      // Core.unblockUI();
      var received_msg = evt.data;
      var jsonData = JSON.parse(received_msg);

      if (jsonData.status == "success") {
        console.log("received_msg ne", evt);
        // callback({
        //   status: "success",
        //   text:
        //     "IPPOS terminal холболт амжилттай хийгдлээ. [" + deviceType + "]",
        // });
        printSetlement(terminalId, deviceType, callback);

        return;
      } else {
        callback({
          status: "error",
          text:
            "Bank terminal error [" + deviceType + "]: " + jsonData.description,
        });
        return;
      }
    };

    ws.onerror = function (event: any) {
      var resultJson = {
        Status: "Error",
        Error: event.code,
      };

      //   Core.unblockUI();
      callback({
        status: "error",
        text:
          "Bank terminal error [" +
          deviceType +
          "]: pos Client асаагүй байна!!!",
      });
      return;
    };

    ws.onclose = function () {
      console.log("Connection is closed...");
    };
  }

  function printSetlement(terminalId: any, deviceType: any, callback: any) {
    // console.log("terminalId", terminalId);
    if ("WebSocket" in window) {
      //console.log("WebSocket  settle is supported by your Browser!");

      var dvctype = "";
      var ws = new WebSocket("ws://localhost:58324/socket");
      if (deviceType == "golomtbank") {
        dvctype = "GLMT";
      }

      ws.onopen = function () {
        let nowDate = moment();

        let currentDateTime = nowDate.format("YYYY-MM-DD HH:mm:ss");

        const param = {
          dateTime: currentDateTime,
          terminalid: terminalId,
        };

        // console.log("param", param);

        ws.send(
          '{"command":"bank_terminal_pos_settlement", "dateTime":"' +
            currentDateTime +
            '", details: [{"key": "devicetype", "value": "GLMT"},{"key": "terminalid", "value": "' +
            terminalId +
            '"}]}'
        );
      };

      ws.onmessage = function (evt) {
        var received_msg = evt.data;
        var jsonData = JSON.parse(received_msg);

        // console.log("jsonDatajsonDatajsonDatajsonData", jsonData);
        if (jsonData.status == "success") {
          var getParse = JSON.parse(jsonData.details[0].value);
          var $dialogName = "pos-preview-print-setlement";

          console.log("getParse", getParse);

          if (getParse.ReceiptData == "") {
            notification.error({
              message: "Нэгтгэл хийх гүйлгээ байхгүй",
            });
            // PNotify.removeAll();
            // new PNotify({
            //   title: "Warning",
            //   text: "Нэгтгэл хийх гүйлгээ байхгүй",
            //   type: "warning",
            //   sticker: false,
            //   addclass: "pnotify-center",
            // });
            return;
          }
          callback({
            status: "success",
            text: "success",
            ...getParse,
          });
        } else {
          notification.error({
            message: "Bank terminal error",
          });
        }
      };

      ws.onerror = function (event: any) {
        var resultJson = {
          Status: "Error",
          Error: event.code,
        };
        console.log("error", JSON.stringify(resultJson));
      };
    }
  }

  const printSettlement = () => {
    printSetlement(
      process.env.NEXT_PUBLIC_TERMINAL_ID,
      process.env.NEXT_PUBLIC_DEVICE_TYPE,
      function (res: any) {
        console.log("payment result", res);
      }
    );
  };

  return (
    <>
      <Layout>
        <div className="mx-auto  flex flex-col py-4 px-10">
          <h2 className="text-4xl px-6">SETTLEMENT</h2>
          <div
            className="bg-[#A68B5C] text-white text-[60px] rounded-[87px] mx-10 mt-[50px] py-4 cursor-pointer px-10"
            // onClick={() => router.push("/page/sell/payment")}
            // onClick={() =>
            //   router.push({
            //     pathname: "/page/sell/payment",
            //     query: {
            //       selid: cid,
            //     },
            //   })
            // }
            onClick={() => {
              printSettlement();
            }}>
            Хэвлэх
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
// {
//   "command": "bank_terminal_pos_settlement",
//   "dateTime": "2025/03/26 12:30:58",
//   "status": "success",
//   "description": null,
//   "planText": null,
//   "cypherText": null,
//   "details": [
//       {
//           "key": "result",
//           "value": "{\"RRN\":null,\"PAN\":null,\"TerminalId\":\"13175351\",\"MerchantId\":\"000009733998991\",\"AuthCode\":null,\"Amount\":null,\"TransactionDate\":\"20250326120126\",\"Operation\":\"SALE\",\"ReceiptData\":\"\",\"Status\":1,\"ResponseHostCode\":\"ER3\",\"TextResponse\":\"\"}"
//       }
//   ]
// }
