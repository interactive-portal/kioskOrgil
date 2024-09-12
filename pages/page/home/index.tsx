// pages/page/Home.tsx
import React from "react";
import KioskLayout from "../kioskLayout";
import ButtonList from "@/components/common/ButtonList";
import Title from "@/components/common/Title";

const Home = () => {
  const homeData = [
    {
      pageName: "БҮРТГЭЛТЭЙ ГИШҮҮН",
      path: "/page/extend",
      bgColor: "#D9D9D9",
      textColor: "#525050",
    },
    {
      pageName: "ШИНЭЭР БҮРТГҮҮЛЭХ",
      path: "/page/register",
      bgColor: "#D9D9D9",
      textColor: "#525050",
    },
    {
      pageName: "ҮНИЙН МЭДЭЭЛЭЛ",
      path: "/price",
      bgColor: "#A68B5C",
      textColor: "#ffffff",
    },
  ];

  return (
    <KioskLayout>
      <div className="mx-auto flex flex-col gap-10">
        <Title title="Welcome" />
        {/* Or use any text */}
        {/* <WelcomeTitle title="Any Custom Title" /> */}
        <div className="w-4/5 mx-auto flex flex-col gap-6 text-center px-4">
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
    </KioskLayout>
  );
};

export default Home;
