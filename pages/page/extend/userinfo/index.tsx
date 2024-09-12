import { useState, useEffect } from "react";
import Layout from "../../kioskLayout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const FIELDS = [
  { label: "ГЭРЭЭНИЙ ДУГААР", key: "contractcode" },
  { label: "СЕРИАЛ ДУГААР", key: "serialNumber" },
  { label: "ОВОГ", key: "lastname" },
  { label: "НЭР", key: "customername" },
  { label: "РЕГИСТЕР", key: "stateregnumber" },
  { label: "ҮЙЛЧИЛГЭЭНИЙ НЭР", key: "itemname" },
  { label: "БАГЦЫН ХУГАЦАА", key: "durationtype" },
  { label: "ТӨЛӨВ", key: "wfmstatusname" },
  { label: "БАЙГУУЛСАН ОГНОО", key: "contractdate" },
  { label: "ЭХЛЭХ ДУУСАХ ОГНОО", key: "startdate" },
];

const UserInfo = () => {
  const router = useRouter();
  const { user } = router.query;

  const userString = Array.isArray(user) ? user[0] : user;
  let userData = null;

  try {
    userData = userString ? JSON.parse(decodeURIComponent(userString)) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    userData = null;
  }

  if (Array.isArray(userData)) {
    userData = userData[0];
  }

  const contractData = userData?.result || [];
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all customers associated with the contract ID
  const criteria = JSON.stringify({
    filterContractId: [
      {
        operator: "=",
        operand: contractData[0]?.contractid,
      },
    ],
  });

  const { data: customersData, error: fetchError } = useSWR(
    contractData.length
      ? `/api/get-data?metaid=1723089346622229&criteria=${criteria}`
      : null,
    {
      onLoadingSlow: () => setLoading(true),
      onSuccess: () => setLoading(false),
      onError: () => setLoading(false),
    }
  );

  // useEffect(() => {
  //   if (fetchError) {
  //     setError("Failed to fetch customer data.");
  //   }

  //   if (customersData) {
  //     // Ensure customersData is an array
  //     if (!Array.isArray(customersData)) {
  //       setError("Fetched data is not in the expected format.");
  //     }
  //   }

  //   if (contractData.length > 0) {
  //     console.log("Contract ID:", contractData.length);
  //   }
  // }, [contractData, customersData, fetchError]);

  const handleExtendClick = () => {
    if (contractData.length > 1) {
      router.push({
        pathname: "/page/member/stretch",
        query: {
          contractid: contractData[0].contractid,
          itemname: contractData[0].itemname,
          customername: contractData[0].customername,
          stateregnumber: contractData[0].stateregnumber,
          lastname: contractData[0].lastname,
          serialNumber: contractData[0].serialNumber,
        },
      });
    } else if (contractData.length === 1) {
      router.push({
        pathname: "/page/extend/userinfo/stretch",
        query: {
          contractid: contractData[0].contractid,
          itemname: contractData[0].itemname,
          customername: contractData[0].customername,
          stateregnumber: contractData[0].stateregnumber,
          lastname: contractData[0].lastname,
          serialNumber: contractData[0].serialNumber,
        },
      });
    } else {
      setError("No unique customer IDs found.");
    }
  };

  const renderField = (field: any, data: any) => {
    const value = data[field.key] || "No data";
    return (
      <div key={field.key} className="flex justify-between flex-col gap-y-2">
        <span>{field.label}</span>
        <span className="bg-white px-5 rounded-[20px] text-[#525050]">
          {value}
        </span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex flex-col">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#000000a0] z-50">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 50, color: "white" }}
                  spin
                />
              }
            />
          </div>
        )}
        <div className="text-center text-[#A68B5C] text-6xl font-bold mb-10">
          ИЛЭРЦ
        </div>
        {error && (
          <div className="text-center text-red-500 text-[32px] mt-8">
            {error}
          </div>
        )}
        {contractData.length > 0 ? (
          contractData.map((contract: any, index: number) => (
            <div key={index} className="mb-10 px-[120px] overscroll-contain">
              <div className="text-center text-[#A68B5C] text-5xl mb-10">
                {contract.itemname || "No item name available"}
              </div>
              <div className="text-white flex items-center justify-center min-w-[800px]">
                <div className="grid grid-cols-2 gap-4 rounded-lg w-full text-[32px] text-start items-start">
                  {FIELDS.map((field) => renderField(field, contract))}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleExtendClick}
                  className="mt-14 flex text-[40px] items-center h-[64px] bg-[#A68B5C] rounded-full w-[349px] text-white justify-center gap-10"
                >
                  СУНГАЛТ ХИЙХ
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-[#A68B5C] text-[32px] mt-8">
            No contracts available.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserInfo;
