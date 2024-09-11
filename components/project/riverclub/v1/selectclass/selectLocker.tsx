import { Modal, notification } from "antd";
import { FC, useEffect, useState } from "react";
import LockerList from "./lockerList";
import Cookies from "js-cookie";
import axios from "axios";
import ReportTemplate from "@/middleware/ReportTemplate/ReportTemplate";
import { Spin } from "antd";
import fetchJson from "@/util/helper";

type PropsType = {
  open?: any;
  setOpen?: any;
};

const SelectLocker: FC<PropsType> = ({ open, setOpen }) => {
  const [contine, setContine] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState<any>();
  const [contractId, setContractId] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const session = Cookies.getJSON("customer");

  const param = JSON.stringify({
    filterCustomerId: session?.customerId,
  });

  useEffect(() => {
    if (session) getMale();
  }, [session]);

  const getMale = async () => {
    const result = await fetchJson(
      `/api/get-process?command=fitKioskFindGenderGet_004&parameters=${param}`
    );
    setGender(result?.result?.gender);
  };

  console.log(gender);

  const printOptions = {
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
      templatemetaid: "1712217398127902",
      templateIds: "1712217398127902",
    },
  };

  const clicked = async () => {
    if (contine) {
      const param = {
        customerId: session?.customerId,
        cardId: selectedLocker?.lockerid,
      };
      const result = await axios.post(`/api/post-process`, {
        processcode: "fitKioskLockerCheckIn_DV_001",
        parameters: param,
      });
      if (result?.data?.status == "success") {
        setLoading(true);

        setContractId(result?.data?.result?.id);
        setTimeout(function () {
          setLoading(false);

          printed();
        }, 2000);
      } else {
        setLoading(false);
      }
    } else {
      if (selectedLocker) {
        setContine(!contine);
      } else {
        notification.info({
          message: "Локер сонгоно уу ?",
        });
      }
    }
  };

  const printed = () => {
    var content: any = document.getElementById("portraid");
    const pri: any = (document.getElementById("content") as HTMLIFrameElement)
      .contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    setContine(false);
    setOpen(false);
  };

  const cancel = () => {
    if (contine) {
      setContine(false);
    } else {
      setOpen(false);
      setSelectedLocker(null);
    }
  };

  return (
    <Modal
      open={open}
      title={
        contine ? "**ЛОКЕРЫН ДУГААР ХЭВЛЭХ:**" : "**ТА ЛОКЕРОО СОНГОНО УУ:**"
      }
      footer={false}
      width={634}
      onCancel={() => {
        setOpen(false), setContine(false);
      }}
      destroyOnClose
    >
      <div className="">
        <Spin
          className="text-[#BAD405] full-screen"
          fullscreen
          spinning={loading}
          size="large"
        />
      </div>

      <div className="mt-6 border py-5 px-[10px] border-[#00B0AB] rounded-[15px] uppercase text-white flex flex-col gap-y-5">
        <p className="text-base mx-10">
          {contine
            ? "Та локерийн дугаар хэвлэсэн цаасыг үйлчилгээний зөвлөхөд өгж локерын түлхүүрээ авна уу !"
            : " Сонгосон локерийн дугаарыг идэвхжүүлж локер авах товчыг дарна уу."}
        </p>
        <div className="border border-[#DEDEDE] py-4 px-8 rounded-[11px] text-sm font-light leading-[22px]">
          <p className="">
            Хэрэв та локерийн түлхүүрийг хаясан бол үйлчилгээний зөвлөхөд
            мэдэгдэгнэ үү! гээгдүүлсэн тохиолдолд ₮50.0к төгрөгийн торгууль
            төлөхийг анхаарна уу !{" "}
          </p>
        </div>
        {!contine && (
          <div className="border border-[#DEDEDE] py-4 px-8 rounded-[11px] text-sm">
            <LockerList
              selected={selectedLocker}
              setSelected={setSelectedLocker}
              gender={gender}
            />
          </div>
        )}
        {/* {gender == "Эмэгтэй" && (
          <div className="mt-2 px-10">
            <p>Түлхүүрийн тайлбар</p>
            <div className="flex items-center gap-x-4 mt-2">
              <div className="p-3 border border-[#BBD540] rounded-[11px] text-[28px] font-bold bg-[#424242]">
                <div
                  className=""
                  style={{
                    background:
                      "linear-gradient(180deg, #ADFF00 0%, #0CB1AB 100%)",
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  GX
                </div>
              </div>
              <div className="p-3 border border-[#BBD540] rounded-[11px] text-[28px] font-bold bg-[#424242]">
                <div
                  className=""
                  style={{
                    background:
                      "linear-gradient(180deg, #AE4A00 25.42%, #DB00FF 116.62%)",
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  FITNESS
                </div>
              </div>
            </div>
          </div>
        )} */}
        <div className="mx-10 flex items-center justify-between text-[20px] gap-x-4">
          <button
            className="w-full text-[#C4C4C4] uppercase bg-[#272A32] rounded-[8px]"
            onClick={() => cancel()}
          >
            болих
          </button>
          <button
            className="w-full bg-[#BAD405] text-black uppercase rounded-[8px]"
            onClick={clicked}
          >
            {contine ? "хэвлэх" : "үргэлжлүүлэх"}
          </button>
        </div>{" "}
        <div className="w-[200px] h-[100px] bg-black overflow-scroll rounded-lg printContent hidden">
          <iframe id="content" className="h-0 w-0 absolute"></iframe>
          <div id={"portraid"}>
            <ReportTemplate
              options={printOptions}
              data={{
                contractId: contractId,
              }}
            />
          </div>
        </div>
      </div>

      <style>
        {`
				.ant-modal-content {
				background-color:#202020 !important;
				}
				.ant-modal-title {
					background-color:#202020 !important;
					color:#BAD405 !important;
					font-size:28px !important;
				}
				`}
      </style>
    </Modal>
  );
};

export default SelectLocker;
