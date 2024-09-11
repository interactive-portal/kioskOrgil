import React from "react";
import { useRouter } from "next/router";
import RegisterLayout from "./registerLayout";
import useSWR from "swr";
import Cookies from "js-cookie";
import _ from "lodash";

const Fitness: React.FC = () => {
  const router = useRouter();
  const criteria = JSON.stringify({
    filterItemTypeId: [
      {
        operator: "=",
        operand: 1565658520388,
      },
    ],
  });
  let { data, error, mutate } = useSWR(`
    /api/get-data?metaid=1722854127801134&criteria=${criteria}
    `);

  const readyData = data ? data?.result : [];

  Cookies.set("customer", { customerId: "1587024272980" });

  const groupByData = _.chain(readyData)
    .groupBy("classificationname")
    .map((value, key, wrapped) => {
      return { [key]: value };
    })
    .value();

  console.log("first=====>", data);

  const datas = [
    {
      title: "ЦАГЫН ХЯЗГААРТАЙ /07:00-16:00/",
      options: [
        { month: "1 САР", price: "260,000₮" },
        { month: "3 САР", price: "600,000₮" },
        { month: "6 САР", price: "830,000₮" },
        { month: "12 САР", price: "1,400,000₮" },
      ],
    },
    {
      title: "ЦАГЫН ХЯЗГААРГҮЙ",
      options: [
        { month: "1 САР", price: "320,000₮" },
        { month: "3 САР", price: "780,000₮" },
        { month: "6 САР", price: "1,100,000₮" },
        { month: "12 САР", price: "1,900,000₮" },
      ],
    },
    {
      title: "НАЙЗУУДЫН БАГЦ /07:00-16:00/",
      options: [
        { month: "3 САР", price: "1,500,000₮" },
        { month: "6 САР", price: "2,100,000₮" },
        { month: "12 САР", price: "3,900,000₮" },
      ],
    },
    {
      title: "НАЙЗУУДЫН БАГЦ /ХЯЗГААРГҮЙ/",
      options: [
        { month: "3 САР", price: "1,800,000₮" },
        { month: "6 САР", price: "2,850,000₮" },
        { month: "12 САР", price: "4,500,000₮" },
      ],
    },
  ];

  return (
    <RegisterLayout coverImagePath="/images/fitness.jpeg" title="ФИТНЕСС">
      <div className="mt-[80px] px-[50px]">
        {datas.map((data, index) => (
          <div
            key={index}
            className="flex flex-col gap-y-1 text-white uppercase mt-[30px] text-start  "
          >
            <div className="text-[40px] ">{data.title}</div>
            <div className="items-center gap-x-4 grid grid-cols-3 gap-4">
              {data.options.map((option, idx) => (
                <button
                  key={idx}
                  className=" items-center  w-[300px]  text-[40px] rounded-[87px] bg-white/30 px-10 text-center "
                  onClick={() =>
                    router.push({
                      pathname: "/kiosk/form",
                      query: { i: `${data.title}-${option.month}` },
                    })
                  }
                >
                  {option.month} <br />
                  {option.price}
                  {/* <span>{option.month}</span>
                  <span className="mb-[20px]">{option.price}</span> */}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RegisterLayout>
    // <RegisterLayout coverImagePath="/images/pool.png" title={"БАССЕЙН"}>
    //   <div className="mt-[80px]">
    //     {groupByData?.map((obj: any, ind: number) => {
    //       const rowData = _.values(obj)?.[0];
    //       return (
    //         <div
    //           className="flex flex-col gap-y-1 text-white uppercase mt-[30px] text-start  "
    //           key={ind}
    //         >
    //           <div className="text-[40px]">{_.keys(obj)?.[0]}</div>
    //           <div className="flex items-center gap-x-4">
    //             {rowData?.map((rowItem: any, rowInd: number) => {
    //               console.log(rowItem);
    //               return (
    //                 <div
    //                   className="flex flex-col items-center text-[40px] h-[120px] rounded-[87px] bg-white/30 px-12 "
    //                   key={rowInd}
    //                   onClick={() =>
    //                     router.push({
    //                       pathname: "/kiosk/form",
    //                       query: {
    //                         i: rowItem?.id,
    //                       },
    //                     })
    //                   }
    //                 >
    //                   <span>{rowItem?.monthname}</span>
    //                   <span>{rowItem?.saleprice}</span>
    //                 </div>
    //               );
    //             })}
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </RegisterLayout>
  );
};

export default Fitness;
