import Title from "@/components/common/Title";
import KioskLayout from "../kioskLayout";

const PoolPrice = () => {
  return (
    <KioskLayout>
      <div className="mt-[30px]">
        <Title title="    БАССЕЙН"></Title>
      </div>
      <div className="mt-[70px]">
        <div className="flex justify-center p-2 lg:h-[300px] xs:h-[150px] xs:w-[400px] lg:w-full  ">
          <img
            src="/images/PoolPrice.png"
            alt="Fitness Price"
            className="hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="flex justify-center lg:h-[300px] xs:h-[150px] xs:w-[400px] lg:w-full   p-2">
          <img
            src="/images/3,4peoplePrice.png"
            alt="Fitness Hunglult"
            className="hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="flex justify-center lg:h-[300px] xs:h-[150px] xs:w-[400px] lg:w-full   p-2">
          <img
            src="/images/5peoplePrice.png"
            alt="Fitness Hunglult"
            className="hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="flex">
          <img
            src="/images/fitnessSanamj.png"
            alt="Fitness Sanamj"
            className="lg:h-[168px] xs:h-[100px] lg:w-[506px] xs:w-[200px] hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <img
            src="/images/fitnessHunglult.png"
            alt="Fitness Hunglult"
            className="lg:h-[168px] xs:h-[100px] lg:w-[506px]  xs:w-[200px] hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>
    </KioskLayout>
  );
};

export default PoolPrice;
