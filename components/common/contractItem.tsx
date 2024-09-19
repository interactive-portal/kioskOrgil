// components/WelcomeTitle.tsx
import moment from "moment";
import React from "react";

interface TitleProps {
  data: any;
}

const ContractItem: React.FC<TitleProps> = ({ data }) => {
  console.log("data :>> ", data);
  return (
    <div className="border p-6 rounded-2xl space-y-8 ">
      <h3 className="text-white text-[40px]"> {data.itemname || "--"}</h3>
      <div className="text-2xl text-white text-start grid md:grid-cols-2 xs:grid-cols-1 w-full  gap-4 ">
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>ГЭРЭЭНИЙ ДУГААР</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {data.contractid || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>СЕРИАЛ ДУГААР</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {/* {user[0]?.customername} */}
            {data.serialnumber || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>ОВОГ</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {data.lastname || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>НЭР</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {data.customername || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>ҮЙЛЧИЛГЭЭНИЙ НЭР</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {data.itemname || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>БАГЦЫН ХУГАЦАА</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {data.durationtype || "--"}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>БАЙГУУЛСАН ОГНОО</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {moment(data?.contractdate).format("YYYY-MM-DD")}
          </span>
        </div>
        <div className="flex justify-between flex-col gap-y-2 ">
          <span>ЭХЛЭХ ДУУСАХ ОГНОО</span>
          <span className="bg-[#d9d9d94f] text-white px-6 py-2 rounded-3xl">
            {moment(data?.startdate).format("YYYY-MM-DD")} /<> </>
            {moment(data?.endate).format("YYYY-MM-DD")}
          </span>
        </div>
      </div>
      <button className=" bg-[#A68B5C] text-white px-6 py-2 rounded-full mt-5  hover:bg-white hover:text-[#A68B5C]">
        Cунгалт хийх
      </button>
    </div>
  );
};

export default ContractItem;
