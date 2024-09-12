import useSWR from "swr";

import { useRouter } from "next/router";
import Layout from "../kioskLayout";

// Define constants for the fields
const FIELDS = [
  { label: "ГЭРЭЭНИЙ ДУГААР", key: "contractcode" },
  { label: "СЕРИАЛ ДУГААР", key: "serialNumber" },

  { label: "ҮЙЛЧИЛГЭЭНИЙ НЭР", key: "itemname" },
  { label: "БАГЦЫН ХУГАЦАА", key: "durationtype" },
  { label: "ТӨЛӨВ", key: "wfmstatusname" },
  { label: "БАЙГУУЛСАН ОГНОО", key: "contractdate" },
  { label: "ЭХЛЭХ ДУУСАХ ОГНОО", key: "startdate" },
  // { label: "ДУУСАХ ОГНОО", key: "enddate" },
];
const DADA = [{ label: "ОВОГ", key: "lastname" }];
const DADE = [{ label: "РЕГИСТЕР", key: "stateregnumber" }];
const Contract = () => {
  const router = useRouter();
  const registerNumber = router.query?.c || "55";

  // Define the criteria dynamically based on the register number
  const criteria = JSON.stringify({
    filterRegNumber: [
      {
        operator: "=",
        operand: registerNumber,
      },
    ],
  });

  // Fetch data based on the dynamic criteria
  const { data: readyData, error } = useSWR(
    `/api/get-data?metaid=1722853892303075&criteria=${criteria}`
  );

  // Handle loading and error states
  if (error) return <div>Error loading data...</div>;

  // Debug output
  console.log("ReadyData:", readyData);

  // Helper function to render a field
  const renderField = (field: any) => {
    // Safeguard against undefined or null values
    const value = readyData?.result?.[0]?.[field.key] || "data";
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
      <div>
        <div className="text-center text-[#A68B5C] text-[64px]">ИЛЭРЦ</div>
        <div className="grid grid-cols-2 gap-6 rounded-lg w-full text-[32px] text-start text-white ">
          <div> {DADA.map(renderField)}</div>
          <div> {DADE.map(renderField)}</div>
        </div>
        <div className="flex text-[54px] justify-center rounded-lg w-full  text-start text-white py-[50px]">
          БАССЕЙН БАГЦ
        </div>
        <div className="text-white flex items-center justify-center min-w-[800px]">
          <div className="grid grid-cols-2 gap-4 rounded-lg w-full text-[32px] text-start justify-center items-end">
            {FIELDS.map(renderField)}
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/page/extend/userinfo/stretch")}
                className="mt-5 flex text-[40px] items-end h-[64px] bg-[#A68B5C] rounded-full w-[349px] text-white justify-center gap-10"
              >
                СУНГАЛТ ХИЙХ
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contract;
