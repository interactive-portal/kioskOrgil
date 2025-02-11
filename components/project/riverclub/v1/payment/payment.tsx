// Borluulalt

import moment from "moment";

export default function bankIpTerminalTransfer(
  amount: any,
  terminalId: any,
  deviceType: any,
  callback: any
) {
  if ("WebSocket" in window) {
    console.log(
      "WebSocket is supported by your Browser!",
      amount,
      terminalId,
      deviceType
    );
    // Let us open a web socket
    var ws = new WebSocket("ws://localhost:58324/socket");
    var dvctype = "";

    if (deviceType == "khanbank") {
      dvctype = "databank";
    }
    if (deviceType == "golomtbank") {
      dvctype = "GLMT";
    }
    bankCheckIpTerminal(terminalId, deviceType, function () {
      //   console.log("as");
       console.log("deviceType",deviceType);
       console.log("terminalId",terminalId);
    });
    // else if (deviceType == "golomtbank") {
    //   dvctype = "glmt";
    // } else if (deviceType == "xacbank") {
    //   dvctype = "khas_paxA35";
    //   terminalId = "123";
    // } else if (deviceType == "tdbank") {
    //   dvctype = "tdb_paxs300";
    // }

    if (typeof callback === "undefined") {
      return { status: "error", text: "Not found callback function!" };
    }

    if (!amount) {
      callback({ status: "error", code: "", text: "Дүн хоосон байна!" });
      return;
    }

    if (!terminalId) {
      callback({ status: "error", code: "", text: "TerminalId хоосон байна!" });
      return;
    }

    if (!dvctype) {
      callback({
        status: "error",
        code: "",
        text: "Банкны төрөл хоосон байна!",
      });
      return;
    }

    //   Core.blockUI({
    // 	message: "МЭДЭЭЛЭЛ ДАМЖУУЛЖ БАЙНА...",
    // 	boxed: true,
    //   });

    //   if (deviceType == "tdbank") {
    // 	tdbPosSale(amount, callback);
    // 	return;
    //   }

    ws.onopen = function () {
      var currentDateTime = moment.now();
      ws.send(
        '{"command":"bank_terminal_pos_sale", "dateTime":"' +
          currentDateTime +
          '", details: [{"key": "devicetype", "value": "' +
          dvctype +
          '"},{"key": "terminalid", "value": "' +
          terminalId +
          '"},{"key": "totalamount", "value": "' +
          amount +
          '"}]}'
      );
    };
    let isAcceptPrintPos = false;

    ws.onmessage = function (evt) {
      // Core.unblockUI();
      var received_msg = evt.data;
      var jsonData = JSON.parse(received_msg);

      console.log("smsm", jsonData);

      if (jsonData.status == "success") {
        var getParse = JSON.parse(jsonData.details[0].value);
        var resultIpTerminal: any = { status: "success" };

        console.log("resultIpTerminal", getParse);

        if (dvctype === "databank") {
          if (
            getParse.status &&
            getParse["response"]["response_code"] == "000"
          ) {
            resultIpTerminal["rrn"] = getParse["response"]["rrn"];
            resultIpTerminal["pan"] = getParse["response"]["pan"];
            resultIpTerminal["authcode"] = getParse["response"]["auth_code"];
            resultIpTerminal["terminalid"] =
              getParse["response"]["terminal_id"];
            resultIpTerminal["traceno"] = getParse["response"]["trace_no"];
            callback(resultIpTerminal);
            return;
          } else {
            callback({
              status: "error",
              code: getParse["response"]["response_code"],
              text: getParse["response"]["response_msg"],
            });
            return;
          }
        }

        if (dvctype === "tdb_paxs300") {
          if (getParse["code"] == "0") {
            resultIpTerminal["rrn"] = getParse["data"]["RRN"];
            resultIpTerminal["pan"] = getParse["data"]["PAN"];
            resultIpTerminal["authcode"] = getParse["data"]["Trace"];
            resultIpTerminal["terminalid"] = getParse["data"]["TerminalID"];
            resultIpTerminal["traceno"] = getParse["data"]["ApprovalCode"];
            callback(resultIpTerminal);
            return;
          } else {
            callback({
              status: "error",
              code: getParse["code"],
              text: "TDB terminal: " + getParse["message"],
            });
            return;
          }
        }

        if (dvctype === "khas_paxA35") {
          if (getParse["Code"] == "0") {
            resultIpTerminal["rrn"] = getParse["RRN"];
            resultIpTerminal["pan"] = getParse["CardNumber"];
            resultIpTerminal["authcode"] = getParse["ApprovalCode"];
            resultIpTerminal["terminalid"] = getParse["Terminal"];
            resultIpTerminal["traceno"] = getParse["ApprovalCode"];
            callback(resultIpTerminal);
            return;
          } else {
            callback({
              status: "error",
              code: getParse["Code"],
              text: "TDB terminal: " + getParse["Description"],
            });
            return;
          }
        }

        if (dvctype === "glmt") {
          resultIpTerminal["rrn"] = getParse["RRN"];
          resultIpTerminal["pan"] = getParse["PAN"];
          resultIpTerminal["authcode"] = getParse["AuthCode"];
          resultIpTerminal["terminalid"] = getParse["TerminalId"];
          resultIpTerminal["traceno"] = "";
          callback(resultIpTerminal);
        }
      } else {
        callback({ status: "error", code: "", text: jsonData.description });
        return;
      }
    };

    ws.onerror = function (event: any) {
      console.log(event);
      var resultJson = {
        Status: "Error",
        Error: event.code,
      };
      console.log(JSON.stringify(resultJson));
    };

    ws.onclose = function () {
      console.log("Connection is closed...");
    };
  } else {
    var resultJson = {
      Status: "Error",
      Error: "WebSocket NOT supported by your Browser!",
    };
  }
}

function bankCheckIpTerminal(terminalId: any, deviceType: any, callback: any) {
  if ("WebSocket" in window) {
    var dvctype = "";

    if (deviceType == "khanbank") {
      dvctype = "databank";
    } else if (deviceType == "golomtbank") {
      dvctype = "GLMT";
    } else if (deviceType == "xacbank") {
      dvctype = "khas_paxA35";
      terminalId = "123";
      callback({
        status: "success",
        text: "IPPOS terminal холболт амжилттай хийгдлээ. [" + deviceType + "]",
      });
      return;
    } else if (deviceType == "tdbank") {
      dvctype = "tdb_paxs300";
      callback({
        status: "success",
        text: "IPPOS terminal холболт амжилттай хийгдлээ. [" + deviceType + "]",
      });
    }

    if (typeof callback === "undefined") {
      return { status: "error", text: "Not found callback function!" };
    }

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

      console.log("received_msg", received_msg);

      if (jsonData.status == "success") {
        callback({
          status: "success",
          text:
            "IPPOS terminal холболт амжилттай хийгдлээ. [" + deviceType + "]",
        });
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
          "]: Veritech Client асаагүй байна!!!",
      });
      return;
    };

    ws.onclose = function () {
      console.log("Connection is closed...");
    };
  } else {
    var resultJson = {
      Status: "Error",
      Error: "WebSocket NOT supported by your Browser!",
    };

    console.log(JSON.stringify(resultJson));
  }
}
