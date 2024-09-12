import React from "react";
import { useRouter } from "next/router";
import ComboLayout from "./comboLayout";

const FitSauna: React.FC = () => {
  const router = useRouter();

  const datas = [
    {
      options: [{ duration: "6 САР", price: "1,150,000₮" }],
    },
    {
      options: [{ duration: "12 САР", price: "4,450,000₮" }],
    },
  ];

  return (
    <ComboLayout coverImagePath="/images/fitness.jpeg" title="ФИТНЕСС САУН">
      <div className="flex flex-col max-h-[1200px] overflow-auto p-2 mt-[150px]">
        <p className="text-[64px] text-[#A68B5C] text-center">ХОСОЛСОН БАГЦ</p>
        {datas.map((data, index) => (
          <div
            key={index}
            className="flex flex-col text-white uppercase py-10 "
          >
            <div className="grid grid-cols justify-center">
              {data.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex flex-col w-[876px] items-center rounded-[87px] bg-white/30 cursor-pointer"
                  onClick={() =>
                    router.push({
                      pathname: "/page/form",
                    })
                  }
                >
                  <span className="text-[64px]">{option.duration}</span>
                  <span className="text-[96px]">{option.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ComboLayout>
  );
};

export default FitSauna;
