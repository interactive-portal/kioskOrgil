import Layout from "../kioskLayout";
import { useRouter } from "next/router";

const Help = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="uppercase text-[90px] text-[#A68B5C] mb-10">ТУСЛАМЖ</div>
      <div className="w-[836px] mx-auto flex flex-col gap-y-14 text-[64px] text-white">
        <p className="">МЕНЕЖЕР</p>
        <div className="bg-white rounded-[76px] text-[#525050] py-[40px]">
          8862-9032
        </div>
        <p className="">МЭДЭЭЛЭЛИЙН АЖИЛТАН</p>
        <div className="bg-white rounded-[76px] text-[#525050] py-[40px]">
          8862-9032
        </div>
      </div>
    </Layout>
  );
};

export default Help;
