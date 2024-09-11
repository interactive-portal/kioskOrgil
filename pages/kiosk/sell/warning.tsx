import React, { useState } from "react";
import Layout from "../kioskLayout";
import { useRouter } from "next/navigation";

const Warning = () => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      router.push("/kiosk/sell/ebarimt");
    }
  };

  const handleProceed = () => {
    if (isChecked) {
      router.push("/kiosk/sell/ebarimt");
    } else {
      alert("Please agree to the terms!");
    }
  };

  return (
    <Layout>
      <p className="text-[#F85348] text-[96px] mt-[350px]">санамж</p>
      <p className="text-[64px] px-[30px] text-white">
        ТА НӨАТ-ЫН БАРИМТАА АВСАНААР МӨНГӨН ХЭЛБЭРИЙН БУЦААЛТ БАЙХГҮЙ БОЛОХЫГ
        АНХААРНА УУ!!!
      </p>
      <div className="flex justify-center gap-5 mt-[200px] text-[36px] text-white items-center">
        <input
          type="checkbox"
          className="h-[30px] w-[30px] self-center mt-7"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <button
          className=" text-white font-bold py-2 px-4 rounded mt-7"
          onClick={handleCheckboxChange}
        >
          ЗӨВШӨӨРӨВ
        </button>
      </div>
    </Layout>
  );
};

export default Warning;
