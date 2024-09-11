import React from "react";
import { useRouter } from "next/router";
import PriceLayout from "../price/priceLayout";
import RegisterLayout from "./registerLayout";

const Sauna: React.FC = () => {
  const router = useRouter();

  const packages = [
    {
      title: "ТОМ ХҮН",
      options: [
        { duration: "6 САР", price: "1,150,000₮" },
        { duration: "12 САР", price: "1,800,000₮" },
      ],
    },
    {
      title: "ГЭР БҮЛ /4 ГИШҮҮН/",
      options: [
        { duration: "6 САР", price: "2,650,000₮" },
        { duration: "12 САР", price: "4,450,000₮" },
      ],
    },
  ];

  return (
    <RegisterLayout coverImagePath="/images/sauna.jpeg" title="САУН">
      <div className="mt-[150px] w-screen px-[100px]">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="flex flex-col w-[full] gap-y-3 text-white uppercase py-10"
          >
            <div className="text-[40px] text-start ">{pkg.title}</div>
            <div className="flex gap-4">
              {pkg.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-[40px] rounded-[87px] bg-white/30 w-full px-10 "
                  onClick={() =>
                    router.push({
                      pathname: "/kiosk/form",
                      query: { i: `${pkg.title}-${option.duration}` },
                    })
                  }
                >
                  <span>{option.duration}</span>
                  <span>{option.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RegisterLayout>
  );
};

export default Sauna;
