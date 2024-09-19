import fetchJson from "@/util/helper";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, FC } from "react";
import useSWR from "swr";

type PropsType = {
  setOpenModal?: any;
};

const CheckUser: FC<PropsType> = ({ setOpenModal }) => {
  const [contentType, setContentType] = useState("");
  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState<any>({});

  // const fetchData = async (res: any) => {
  //   const param = JSON.stringify({
  //     customerId: res?.result?.customerId,
  //   });
  //   const result = await fetchJson(
  //     `/api/get-process?command=fit_ContractPackage_DV_004&parameters=${param}`
  //   );

  //   console.log(result);
  // };

  // let { data: readyData } = useSWR(
  //   `/api/get-process?command=fit_ContractPackage_DV_004&parameters=${param}`
  // );
  // console.log("userInfouserInfouserInfouserInfouserInfo", readyData);

  // if (readyData?.result == "success") {
  //   setContentType("success");
  //   setLoading(false);
  // }

  const router = useRouter();
  const clickCamera = () => {
    setContentType("opencamera");
    var ws = new WebSocket(`${process.env.NEXT_PUBLIC_FACECAMERA_URL}`);

    setOpenModal(true);

    ws.onopen = function () {
      ws.send('{"action":"GetPerson"}');
    };

    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);
      console.log("resresssssss", res);

      if (res?.status == "success") {
        setLoading(true);
        setCustomer(res?.result);
        Cookies.set("customer", res?.result);
        setContentType("success");
        // setImageToken(res?.result.image);
        // setValue(res?.result?.value);
        router.push({
          pathname: "/page/extend/userinfo",
          query: {
            c: res?.result?.customerId,
          },
        });
        ws.send('{"action":"Close"}');
      } else {
        setContentType("error");
      }
    };

    ws.onerror = function (event) {
      setOpenModal(false);
      // alert(event.data);
      // setContentType("error");
    };

    ws.onclose = function () {
      // setOpenModal(false);
      // setContentType("error");
      // console.log("Connection is closed");
      // }
    };
  };

  const content = () => {
    switch (contentType) {
      case "opencamera":
        return <></>;
      case "error":
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[20px]">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4 bg-slate-500"
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
            <div className="text-center mt-20">
              <span className="text-white text-[48px] text-center px-10">
                ЦАРАЙ ТАНИГДАХГҮЙ БАЙНА
              </span>
              <button
                className="p-8 rounded-[87px] bg-[#A68B5C] text-white text-[40px] uppercase mt-10"
                onClick={() => router.push("/page/price")}
              >
                гишүүн болох
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
                onClick={() =>
                  router.push({
                    pathname: "/page/extend/userinfo",
                    query: {
                      c: customer?.customerId,
                    },
                  })
                }
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
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[100px] text-black">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4"
              //   onClick={() => setOpenLogin(true)}
            />
            <span className=" text-[36px] text-center px-10">
              ЦАРАЙГАА ТАНИУЛЖ СУНГАЛТАА ҮРГЭЛЖЛҮҮНЭ ҮҮ!f
            </span>
            <button
              className="text-[64px] text-[#525050] rounded-[87px] w-full py-10 mx-10"
              onClick={() => clickCamera()}
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

  return (
    <div className="w-[900px]">
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
  );
};

export default CheckUser;
