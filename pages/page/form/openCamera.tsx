import { notification } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, FC } from "react";
import Layout from "../kioskLayout";
import CameraLayout from "./cameraLayout";

type PropsType = {
  setProcessParam?: any;
  processParam?: any;
  birthday?: any;
  setLoading?: any;
};

const OpenCamera: FC<PropsType> = ({
  setProcessParam,
  processParam,
  birthday,
  setLoading,
}) => {
  const [contentType, setContentType] = useState("");
  const router = useRouter();
  const saved = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const param = {
      ...processParam,
      birthday: birthday,
    };

    const res = await axios.post(`/api/post-process`, {
      // processcode: "fitCrmCustomerKiosk_DV_001",
      parameters: param,
    });

    console.log("res ---->", res);
    // fitKioskCreateContractUpdate_DV_001;
    // fitCrmCustomerKiosk_DV_001
    if (res.data?.status == "success") {
      setLoading(false);
      router.push({
        pathname: "/kiosk/sell",
        query: {
          i: router.query?.i,
          c: res?.data?.result?.id,
        },
      });

      notification.success({
        message: "Бүртгэл амжилттай хийгдлээ",
      });
    } else {
      console.log("Aldaa ------->", res);
      setLoading(false);
      alert(res?.data?.text);
    }
  };

  const clickCamera = () => {
    setContentType("opencamera");
    var ws = new WebSocket(`${process.env.NEXT_PUBLIC_FACECAMERA_URL}`);

    ws.onopen = function () {
      ws.send('{"action":"GetImage"}');
    };
    console.log(processParam);
    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);

      if (res?.result.image != null) {
        setProcessParam({
          ...processParam,
          image: res?.result?.image,
          value: res?.result?.value,
        });
        // setImageToken(res?.result.image);
        // setValue(res?.result?.value);
        ws.send('{"action":"Close"}');
        setContentType("success");
      } else {
        setContentType("error");
      }
    };

    ws.onerror = function (event) {
      // alert(event.data);
      setContentType("success");
    };

    ws.onclose = function () {
      setContentType("success");

      // console.log("Connection is closed");
      // }
    };
  };
  const content = () => {
    switch (contentType) {
      case "opencamera":
        return (
          // <div className="flex items-center justify-center text-[48px] text-white">
          //   <img
          //     src="/images/cameraMan.jpeg"
          //     alt="man"
          //     className="h-[702px] w-[828px] rounded-2xl"
          //   />
          //   ТА КАМЕР ЛУУ ХАРНА УУ!
          // </div>
          <></>
        );
      case "error":
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[20px]">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4"
              //   onClick={() => setOpenLogin(true)}
            />
            <span className="text-white text-[36px] text-center px-10">
              ЦАРАЙ ТАНИГДАХГҮЙ БАЙНА
            </span>
            <span className="text-white text-[32px] text-center px-10">
              ДАХИН ОРОЛДОНО УУ!
            </span>
            <div className="flex items-center gap-x-2 justify-between w-full">
              <button
                className="text-[36px] text-[#525050] bg-white rounded-[87px] w-full py-2"
                onClick={() => clickCamera()}
              >
                ДАХИН ОРОЛДОХ
              </button>
              <button
                className="text-[36px] text-[#525050] bg-white rounded-[87px] w-full py-2"
                onClick={() => clickCamera()}
              >
                БОЛИХ
              </button>
            </div>
            <style>
              {`
				.ant-modal-body {
				width:100%;
				}
				`}
            </style>
          </div>
        );
      case "success":
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[20px]">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4"
              //   onClick={() => setOpenLogin(true)}
            />
            <span className="text-white text-[48px] text-center px-10">
              ЦАРАЙ ТАНИЛТ АМЖИЛТТАЙ
            </span>
            <span className="text-white text-[32px]">ТАНД БАЯРЛАЛАА</span>
            <div className="uppercase mt-[200px]">
              <button
                className="p-8 rounded-[87px] bg-[#A68B5C] text-white text-[40px] uppercase"
                onClick={(e) => saved(e)}
              >
                дараагийн хуудас
              </button>
            </div>
            <style>
              {`
    .ant-modal-body {
    width:100%;
    }
    `}
            </style>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[100px]">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4"
              //   onClick={() => setOpenLogin(true)}
            />
            <span className="text-white text-[36px] text-center px-10">
              ЦАРАЙГАА ТАНИУЛСНААР БҮРТГЭЛ ДУУСНА. ЦААШИД КЛУБ НЭВТРЭХДЭЭ
              ЦАРАЙff ТАНИУЛЖ НЭВТРЭХ ТУЛ ЗААВРЫГ АНХААРАЛТАЙ ДАГААРАЙ.
            </span>
            <button
              className="text-[64px] text-[#525050] bg-white rounded-[87px] w-full py-10 mx-10"
              onClick={
                () => clickCamera()
                // saved(e)
              }
            >
              ЦАРАЙ ТАНИУЛАХ
            </button>
          </div>
        );
    }
  };
  return (
    <CameraLayout>
      <div className="mt-[200px]">
        {content()}
        <style>
          {`
						.ant-modal-body {
						display:flex;
						justify-content:center;
						align-items:center;
						font-family:AG;
						}
						`}
        </style>
      </div>
    </CameraLayout>
  );
};

export default OpenCamera;
