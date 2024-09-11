import React, { useEffect, useState } from "react";
import Layout from "../kioskLayout";
import { useRouter } from "next/router";
import { Spin } from "antd"; // Import the Spin component
import { LoadingOutlined } from "@ant-design/icons";
import Title from "@/components/common/Title";
import ButtonList from "@/components/common/ButtonList";

const FIELDS = [
  { label: "ОВОГ", key: "lastname" },
  { label: "НЭР", key: "customername" },
];

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add loading state

  const { user } = router.query;
  const userString = Array.isArray(user) ? user[0] : user;
  let userData = {};
  // console.log("USER======>>> ", userString);

  // try {
  //   userData = userString ? JSON.parse(decodeURIComponent(userString)) : null;
  // } catch (error) {
  //   console.error("Error parsing user data:", error);
  //   userData = null;
  // }

  // if (Array.isArray(userData)) {
  //   userData = userData[0];
  // }

  // const contractData = userData?.result?.[0] || {};

  // if (!userData) return <div>No user data available</div>;

  const renderField = (field: any) => {
    const value = "No data";

    return (
      <div key={field.key} className="flex justify-between flex-col gap-y-2 ">
        <span>{field.label}</span>
        <span className="bg-white px-10 py-4 rounded-full text-[#525050] ">
          {value}
        </span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="px-16">
        <Title title="ИЛЭРЦ"></Title>
        <div className="flex">
          <div className="lg:text-4xl text-white text-start grid md:grid-cols-2 xs:grid-cols-1 w-full  gap-8  ">
            {FIELDS.map(renderField)}
          </div>
        </div>
        <div className="mt-[70px] flex flex-col space-y-8">
          <div
            className="rounded-full md:text-[64px] xs:text-[28px] xs:px-6 py-5 cursor-pointer obtn"
            onClick={() =>
              router.push({
                pathname: "/kiosk/extend/userinfo",
                query: { user: JSON.stringify(userData) }, // Pass user data as query parameter
              })
            }
          >
            <p>БҮРТГЭЛТЭЙ ГЭРЭЭ</p>
          </div>
          <div
            className="rounded-full md:text-[64px] xs:text-[28px] py-5 cursor-pointer obtn"
            // onClick={() => router.push("/kiosk/register/")}
            onClick={() =>
              router.push({
                pathname: "/kiosk/register/",
                query: { user: JSON.stringify(userData) }, // Pass user data as query parameter
              })
            }
          >
            ШИНЭ БАГЦ
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
