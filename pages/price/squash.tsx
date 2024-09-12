import React from "react";
import Layout from "../page/kioskLayout";

const SquashPrice = () => {
  return (
    <Layout>
      <div>
        <div className="mt-[100px]">
          <p className="flex justify-center text-[#A68B5C] text-[64px]">
            СКУАШ
          </p>
        </div>
        <div className="mt-[70px] ">
          <div className="flex justify-center p-2 h-[300px]">
            <img
              src="/images/squashPrice.png"
              alt="Fitness Price"
              className=" hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
          <div className="flex justify-center h-[300px] p-2 ">
            <img
              src="/images/squashPrice1.png"
              alt="Fitness Hunglult"
              className=" hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
          <div className="flex justify-center h-[300px] p-2  ">
            <img
              src="/images/5peoplePrice.png"
              alt="Fitness Hunglult"
              className=" hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SquashPrice;
