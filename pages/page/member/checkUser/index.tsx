import fetchJson from "@/util/helper";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, FC, useEffect } from "react";
// import CameraLayout from "../../form/cameraLayout";

type PropsType = {
  setOpenModal?: any;
};

const CheckUser: FC<PropsType> = ({ setOpenModal }) => {
  const [contentType, setContentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<any>({});
  const [redirect, setRedirect] = useState(false); // State for redirection
  const router = useRouter();

  const clickCamera = () => {
    setContentType("opencamera");
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_FACECAMERA_URL}`);

    ws.onopen = () => {
      ws.send('{"action":"GetPerson"}');
    };

    ws.onmessage = (event) => {
      const res = JSON.parse(event.data);
      console.log("WebSocket Response:", res);

      if (res?.status === "success") {
        setLoading(true);
        setCustomer(res?.result);
        Cookies.set("customer", { customerId: "1575493964507" });
        setContentType("success");

        router.push({
          pathname: "/page/member/",
          query: {
            firstName: res?.result?.firstName,
            lastName: res?.result?.lastName,
            customerId: 1575493964507,
          },
        });

        ws.send('{"action":"Close"}');
      } else {
        setContentType("error");
      }
    };

    ws.onerror = () => {
      setContentType("error");
      setRedirect(true); // Trigger redirection on error
    };

    ws.onclose = () => {
      if (redirect) {
        router.push("/page/extend"); // Redirect to the extended page if needed
      }
    };
  };

  useEffect(() => {
    if (redirect) {
      router.push("/page/extend"); // Redirect if redirect state is true
    }
  }, [redirect, router]);

  const content = () => {
    switch (contentType) {
      case "opencamera":
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[100px]">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4"
            />
            <span className="text-white text-[36px] text-center px-10">
              ЦАРАЙГАА ТАНИУЛЖ СУНГАЛТАА ҮРГЭЛЖЛҮҮНЭ ҮҮ!
            </span>
            <button
              className="text-[64px] text-[#525050] bg-white rounded-[87px] w-full py-10 mx-10"
              onClick={clickCamera}
            >
              SCAN
            </button>
          </div>
        );
      case "error":
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[20px]">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4"
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
                onClick={clickCamera}
              >
                ДАХИН ОРОЛДОХ
              </button>
              <button
                className="text-[36px] text-[#525050] bg-white rounded-[87px] w-full py-2"
                onClick={clickCamera}
              >
                РЕГИСТР ДУГААРААР ХАЙХ
              </button>
            </div>
          </div>
        );
      case "success":
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[20px]">
            <img
              src="/images/cameraMan.jpeg"
              className="w-[366px] h-[366px] mt-4"
            />
            <span className="text-white text-[48px] text-center px-10">
              ЦАРАЙ ТАНИЛТ АМЖИЛТТАЙ
            </span>
            <span className="text-white text-[32px]">ТАНД БАЯРЛАЛАА</span>
            <div className="uppercase mt-[200px]">
              <button
                className="p-8 rounded-[87px] bg-[#A68B5C] text-white text-[40px] uppercase"
                onClick={() =>
                  router.push({
                    pathname: "/page/member/",
                    query: {
                      firstName: customer?.firstName,
                      lastName: customer?.lastName,
                      customerId: 1575493964507,
                    },
                  })
                }
              >
                дараагийн хуудас
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[100px]">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4"
            />
            <span className="text-white text-[36px] text-center px-10">
              ЦАРАЙГАА ТАНИУЛЖ СУНГАЛТАА ҮРГЭЛЖЛҮҮНЭ ҮҮ!
            </span>
            <button
              className="text-[64px] text-[#525050] bg-white rounded-[87px] w-full py-10 mx-10"
              onClick={clickCamera}
            >
              SCAN
            </button>
          </div>
        );
    }
  };

  if (loading) {
    return <Spin fullscreen size="large" />;
  }

  return <>dd cameraLayout</>;
};

export default CheckUser;
