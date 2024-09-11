import { FC, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { DatePicker, DatePickerProps } from "antd";

type PropsType = {
  selectedItem?: any;
  setTemplateId?: any;
  setContractId?: any;
  setModal?: any;
  setSelectDateModal?: any;
  setActiveCheck?: any;
};

const DatePickerModal: FC<PropsType> = ({
  selectedItem,
  setTemplateId,
  setContractId,
  setModal,
  setSelectDateModal,
  setActiveCheck,
}) => {
  const customer = Cookies.getJSON("customer");
  const dateFormat = "YYYY-MM-DD";
  const [datePicker, setDatePicker] = useState(true);
  const [startDate, setStartDate] = useState<any>();

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setStartDate(dateString);
  };

  const createContract = async () => {
    const item = selectedItem;
    var inputDate = item?.enddate;

    var inputDate: any = item?.enddate;

    var dateParts = inputDate.split("-");

    // Extract the year, month, and day
    var year = parseInt("20" + dateParts[2], 10);
    var month: any = parseInt(dateParts[1], 10) - 1; // Subtracting 1 because months are zero-based
    var day: any = parseInt(dateParts[0], 10);

    var convertedDate = new Date(year, month, day);

    year = convertedDate.getFullYear();
    month = ("0" + (convertedDate.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
    day = ("0" + convertedDate.getDate()).slice(-2);

    var result = year + "-" + month + "-" + day;

    console.log("item", item);

    const param = {
      contracttypeid: item?.contracttypeid,
      contractTotalAmount: item?.saleprice,
      customerId: customer?.customerId,
      durationTypeId: item?.monthid,
      startDate: startDate,
      itemId: item?.id,
      price: item?.saleprice,
      amount: item?.saleprice,
    };

    const res = await axios.post(`/api/post-process`, {
      processcode: "fitKioskCreateContract_DV_001",
      parameters: param,
    });

    if (res?.data?.status == "success") {
      console.log("0createcontract", res);
      setTemplateId(res?.data?.result?.templateId);
      setContractId(res?.data?.result?.id);
      setModal("template");
    }
  };
  return (
    <div className="flex items-center justify-center h-full mx-auto">
      <div
        className="w-[424px] h-[600px] box-border relative"
        style={{
          background: "var(--202020, #202020)",
        }}
      >
        <div className="p-[64px]">
          <p className="text-white">Үйлчилгээ эхлэх өдрөө сонгоно уу</p>
          <DatePicker
            className={"w-full"}
            // placement="bottomLeft"
            format={dateFormat}
            open={datePicker}
            onSelect={() => setDatePicker(false)}
            onOpenChange={() => setDatePicker(!datePicker)}
            onChange={onChange}
            style={{
              color: "white",
              background: "var(--202020, #202020)",
            }}
            popupStyle={{
              inset: "837.5px auto auto 400px !important",
              background: "var(--202020, #202020)",
            }}
          />
        </div>
        <div className="absolute bottom-10 right-0 w-full flex gap-[16px] px-[64px]">
          <div
            className="w-full bg-[#272A32] text-[#C4C4C4] text-[20px] text-center uppercase rounded font-medium py-2 cursor-pointer"
            onClick={() => {
              setSelectDateModal(false), Cookies.remove("customer");
            }}
          >
            Болих
          </div>
          <div
            className="w-full  text-[20px] text-center uppercase rounded font-medium py-2 cursor-pointer"
            style={{
              color: "var(--202020, #202020)",
              background: "var(--green-main, #BAD405)",
            }}
            onClick={() => {
              createContract(), setActiveCheck(false);
            }}
          >
            Цааш
          </div>
        </div>
      </div>
      <style>
        {`
          .ant-picker-panel-layout {
            background:var(--202020, #202020);
            border:1px solid #3B414A;
            color:white !important;
          }
          .ant-picker-date-panel div {
            color:white !important;
          }
          .ant-picker-date-panel button {
            color:white !important;
          }
          .ant-picker-date-panel th {
            color:white !important;
          }
          .ant-picker-date-panel input {
            color:white !important;
          }
          `}
      </style>
    </div>
  );
};

export default DatePickerModal;
