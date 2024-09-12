import Title from "@/components/common/Title";
import Layout from "../page/kioskLayout";

const SaunaPrice = () => {
  return (
    <Layout>
      <div>
        <Title title="САУН"></Title>
      </div>
      <div className="mt-[70px] xs:flex xs:flex-col">
        <img
          src="/images/saunTarip1.png"
          alt="Fitness Price"
          className="lg:h-[300px] xs:h-[150px] xs:w-[400px] lg:w-full hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <img
          src="/images/saunTarip.png"
          alt="Fitness Price"
          className="lg:h-[300px] xs:h-[150px] xs:w-[400px] lg:w-full  hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div className="grid justify-center w-full">
          <img
            src="/images/fitnessSanamj.png"
            alt="Fitness Sanamj"
            className="lg:h-[300px] xs:h-[150px] xs:w-[400px] lg:w-full   hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <img
            src="/images/fitnessHunglult.png"
            alt="Fitness Hunglult"
            className="lg:h-[300px] xs:h-[150px] xs:w-[400px] lg:w-full  hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>
    </Layout>
  );
};

export default SaunaPrice;
