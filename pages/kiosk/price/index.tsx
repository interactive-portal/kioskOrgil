import { useRouter } from "next/router";
import Layout from "../kioskLayout";
import Title from "@/components/common/Title";
import ButtonList from "@/components/common/ButtonList";

const Page = () => {
  const router = useRouter();
  const homeData = [
    {
      pageName: "БАССЕЙН",
      path: "/kiosk/price/poolPrice",
      bgColor: "#D9D9D9",
      textColor: "#525050",
    },
    {
      pageName: "ФИТНЕСС",
      path: "/kiosk/price/fitnessPrice",
      bgColor: "#D9D9D9",
      textColor: "#525050",
    },
    {
      pageName: "   САУН",
      path: "/kiosk/price/saunaPrice",
      bgColor: "#D9D9D9",
      textColor: "#525050",
    },
  ];

  return (
    <Layout>
      <div className="text-[64px] flex flex-col gap-y-10  ">
        <Title title="ҮНИЙН МЭДЭЭЛЭЛ"></Title>
        <div className="flex flex-col  w-4/5 mx-auto  space-y-4 ">
          {homeData.map((item, index) => (
            <ButtonList
              key={index}
              pageName={item.pageName}
              path={item.path}
              bgColor={item.bgColor}
              textColor={item.textColor}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
