import Layout from "../../kioskLayout";
import { useRouter } from "next/router";

const Combo = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="uppercase text-[90px] text-[#A68B5C] mt-[250px]">
        ХОСОЛСОН БАГЦ
      </div>
      <div className="w-[836px] mx-auto flex flex-col gap-y-14 text-[64px] mt-[130px]">
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[30px] "
          onClick={() => router.push("/kiosk/register/combo/basseinFit")}
        >
          <p> БАССЕЙН ФИТНЕСС </p>
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[30px]"
          onClick={() => router.push("/kiosk/register/combo/fitSauna")}
        >
          <p>ФИТНЕСС САУН</p>
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[30px]"
          onClick={() => router.push("/kiosk/register/combo/basseinSaun")}
        >
          <p>САУН БАССЕЙН</p>
        </div>
      </div>
    </Layout>
  );
};

export default Combo;
