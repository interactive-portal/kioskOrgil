import React from "react";
import Layout from "../page/kioskLayout";
import Title from "@/components/common/Title";

const FitnessPrice = () => {
  return (
    <Layout>
      <div className="mt-[100px]">
        <Title title="ФИТНЕСС"></Title>
      </div>
      <div className="mt-[90px] ">
        <img
          src="/images/fitnessPrice.png"
          alt="Fitness Price"
          className="lg:h-[300px] xs:h-[150px] xs:w-[400px] lg:w-full   hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div className="grid justify-center w-full">
          <img
            src="/images/fitnessSanamj.png"
            alt="Fitness Sanamj"
            className="lg:h-[300px] xs:h-[150px] xs:w-[400px] lg:w-full  hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <img
            src="/images/fitnessHunglult.png"
            alt="Fitness Hunglult"
            className="lg:h-[300px] xs:h-[150px] xs:w-[400px] lg:w-full w-full  hover:transform hover:scale-105 transition-transform duration-300 ease-in-out "
          />
        </div>
      </div>
    </Layout>
  );
};

export default FitnessPrice;
