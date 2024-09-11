import { FC, useEffect } from "react";
import { Modal, notification } from "antd";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type PropsType = {
  openModal: any;
  setOpenModal: any;
  setNeedSignUp?: any;
  needSignUp?: any;
  selectDateModal?: any;
  setSignIn?: any;
};

const RiverLoginConfirm: FC<PropsType> = ({
  openModal,
  setOpenModal,
  setNeedSignUp,
  needSignUp,
  setSignIn,
  selectDateModal,
}) => {
  useEffect(() => {
    if (openModal) clickCamera();
  }, [openModal]);

  const clickCamera = () => {
    var ws = new WebSocket(`${process.env.NEXT_PUBLIC_FACECAMERA_URL}`);

    ws.onopen = function () {
      ws.send('{"action":"GetPerson"}');
    };

    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);

      if (res?.status == "success") {
        ws.send('{"action":"Close"}');

        Cookies.set("customer", res?.result);
        notification.success({
          message: "Амжилттай нэвтэрлээ",
        });
        router.push(`/userprofile/profile`);
        if (selectDateModal) {
          selectDateModal(true);
        }
        setOpenModal(false);
        setSignIn(true);
      } else {
        ws.send('{"action":"Close"}');

        setNeedSignUp(true);
      }
    };

    ws.onerror = function (event) {
      ws.send('{"action":"Close"}');
    };

    ws.onclose = function () {
      console.log("Connection is closed");
      // if (!needSignUp) {
      //   setOpenModal(false);
      // }
    };
  };

  const router = useRouter();
  const needSignUpModal = () => {
    return (
      <div className="">
        <div className="text-center mt-[20px]">
          <p className="uppercase text-[34px] underline text-center text-white font-semibold">
            Царай танигдахгүй байна
          </p>
          <p className="text-[30px] text-white uppercase">дахин оролдоно уу!</p>
          <div className=" w-full flex gap-[16px] px-[64px] mt-[30px]">
            <div
              className="w-full  text-[20px] text-center uppercase rounded font-medium py-2 cursor-pointer "
              style={{
                color: "var(--202020, #202020)",
                background: "var(--green-main, #BAD405)",
              }}
              onClick={() => {
                setNeedSignUp(false);
                clickCamera();
              }}
            >
              дахин оролдох
            </div>
            <div
              className="w-full bg-[#272A32] text-[#C4C4C4]  text-[20px] text-center uppercase rounded font-medium py-2 cursor-pointer"
              // style={{
              //   color: "var(--202020, #202020)",
              //   background: "var(--green-main, #BAD405)",
              // }}
              onClick={() => {
                setOpenModal(false);
              }}
            >
              болих
            </div>
          </div>
        </div>
        <p
          className="uppercase text-[32px] text-start text-white mt-[70px] font-bold leading-[32px]"
          style={{
            boxShadow: " 0px 0px 5px 0px #0000001A",
          }}
        >
          клубын бүртгэл?
        </p>
        <div className="bg-white px-[40px] py-[27px] flex flex-col mt-[20px] ">
          <div>
            <p className="text-[20px] text-black uppercase leading-[29px]">
              Ривер клубт тавтай морил
            </p>
            <p className="text-[16px] leading-[22px] text-black mt-[20px] mr-[50px]">
              Манай клубын олон төрлийн фитнесс, кардио, иог, бассейний
              хичээлүүдээс сонгон өөрийн төлөвлөгөөг гаргаарай.
            </p>
          </div>
          <div className="mt-6 flex gap-x-[20px] items-center">
            <button
              className="italic text-[20px] leading-[16px] uppercase bg-[#BAD405] rounded-[6px] p-4"
              style={{
                boxShadow: " 4px 4px 4px 0px #00000040",
              }}
              onClick={() => {
                setOpenModal(false);

                router.push({
                  pathname: "/bioinput",
                });
              }}
            >
              гишүүн болох
            </button>
            <button
              className="italic text-[14px] leading-[16px] uppercase bg-black text-white rounded-[6px] p-4"
              style={{
                boxShadow: " 4px 4px 4px 0px #00000040",
              }}
              onClick={() => {
                router.push({
                  pathname: "/price",
                });
              }}
            >
              Үнэ харах
            </button>
          </div>
          {/* <div
            className="bg-[#BAD405] p-[10px] rounded-[10px] cursor-pointer"
            onClick={() => router.push("/bioinput")}
          >
            <p className="uppercase text-black font-bold text-[30px] leading-[28px]">
              гишүүн болох
            </p>
            <p className="text-[15px] leading-[35px] text-black text-right">
              онлайн бүртгэл
            </p>
          </div> */}
        </div>
      </div>
    );
  };
  return (
    <>
      <Modal
        open={openModal}
        width={1080}
        onCancel={() => setOpenModal(false)}
        footer={false}
        destroyOnClose
        afterClose={() => setNeedSignUp(false)}
      >
        <div className="w-full h-full bg-black/50 pt-[150px] flex justify-center relative">
          <div className="absolute top-[40%] left-[20%] text-[50px] font-medium text-[#BAD405]">
            {!needSignUp && <p className="">Та камер луу харна уу !</p>}
          </div>
          <div className="w-[640px] h-[480px] bg-black/70 rounded-lg flex items-center justify-center">
            <img src="/images/Face_id_white.png" />
          </div>
          <div
            className={`fixed top-[50%] ${
              needSignUp ? "opacity-1" : "opacity-0"
            }  max-w-[640px] mx-auto duration-75`}
          >
            {needSignUpModal()}
          </div>
          {/* <div className="absolute top-5 right-10">
            <i
              className="fa-regular fa-xmark fa-5x  cursor-pointer text-gray-400 hover:text-white duration-150"
              onClick={() => {
                // var ws = new WebSocket(
                //   `${process.env.NEXT_PUBLIC_FACECAMERA_URL}`
                // );

                setOpenModal(!openModal);
              }}
            ></i>
          </div> */}
          {/* <div className="fixed bottom-4 max-w-[640px] mx-auto translate-y-[100%]">
            <p className="uppercase text-[34px] underline text-start text-white">
              клубын бүртгэл?
            </p>
            <div className="bg-white px-[40px] py-[27px] flex mt-[20px] ">
              <div>
                <p className="text-[20px] text-black uppercase leading-[29px]">
                  Ривер клубт тавтай морил
                </p>
                <p className="text-[16px] leading-[22px] text-black mt-[20px] mr-[50px]">
                  Манай клубын олон төрлийн фитнесс, кардио, иог, бассейний
                  хичээлүүдээс сонгон өөрийн төлөвлөгөөг гаргаарай.
                </p>
              </div>
              <div className="bg-[#BAD405] p-[10px] rounded-[10px] cursor-pointer">
                <p className="uppercase text-black font-bold text-[30px] leading-[28px]">
                  гишүүн болох
                </p>
                <p className="text-[15px] leading-[35px] text-black text-right">
                  онлайн бүртгэл
                </p>
              </div>
            </div>
          </div> */}
        </div>
        <style>
          {`
		:where(.css-dev-only-do-not-override-3mqfnx).ant-modal .ant-modal-content {
			padding:0px;
			border-radius:0px;
		}
		.ant-modal, .ant-modal-content {
			height: 100vh;
			width: 1080px;
			margin: 0;
			top: 0;
			bottom:0;
			border:none;
			padding:0px;
      background:#00000080 !important;
		   }
		   .ant-modal-body {
			height: 100%;
		   }
		`}
        </style>
      </Modal>
    </>
  );
};

export default RiverLoginConfirm;
