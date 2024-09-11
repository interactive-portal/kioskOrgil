import { useState } from "react";
import CloudLoginForm from "./cloudLoginForm";
// import CloudRegisterForm from "./cloudRegisterForm";
import { Modal } from "antd";
// import RenderWidgetProcess from "@middleware/components/WidgetForm/RenderWidgetProcess";
import Link from "next/link";

export default function CloudLoginPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);

  const onClickOpenRegister = () => {
    setVisibleModal(true);
  };
  const onClose = () => {
    setVisibleModal(false);
  };
  return (
    <div className="w-full flex flex-col  justify-center items-center">
      <div className="bg-white w-full h-full p-8 pb-0 flex flex-col items-center">
        <img src="/logo.png" className="w-auto h-auto block mx-auto mb-10" />
        <div className="w-full">
          <div className="text-[#699BF7] text-2xl font-semibold">
            Сайн байна уу?
          </div>
          <div className="text-gary-500 text-sm font-semibold">
            Танд энэ өдрийн мэндийг хүргэе.
          </div>
        </div>

        <div className="mt-5 w-full">
          <CloudLoginForm />
          {/* {pageIndex == 0 && <CloudLoginForm />}
          {pageIndex == 1 && <CloudRegisterForm />} */}
        </div>
      </div>
      <div className="p-10 bg-white">
        <div className="flex items-center gap-8 justify-center w-full h-full text-black">
          <p>Шинэ хэрэглэгчээр </p>
          <Link
            href="/login/register"
            as="/login/register"
            className="hover:text-blue-400 text-xl font-bold cursor:pointer text-[#699BF7]"
          >
            Бүртгүүлэх
          </Link>
        </div>
      </div>

      {/* <Modal
        open={visibleModal}
        width={620}
        title="Бүртгүүлэх"
        centered
        footer={false}
        onCancel={onClose}
      >
        {
          <RenderWidgetProcess
            dialog={true}
            listConfig={{ metadataid: "1650443355719672" }}
          />
        }
      </Modal> */}
    </div>
  );
}

const tabData = [
  { title: "Нэвтрэх", icon: "" },
  { title: "Бүртгүүлэх", icon: "" },
];
