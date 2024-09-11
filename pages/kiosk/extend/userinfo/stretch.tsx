import useSWR from "swr";
import Layout from "../../kioskLayout";
import { useRouter } from "next/router";

interface UserData {
  itemname: string;
  stateregnumber: string;
  lastname: string;
  serialNumber: string;
  customername: string;
  [key: string]: string; // Allows additional properties
}

const Stretch = () => {
  const router = useRouter();
  const {
    contractid,
    itemname,
    stateregnumber,
    lastname,
    serialNumber,
    customername,
  } = router.query;

  const userData: UserData = {
    itemname: Array.isArray(itemname) ? itemname[0] : itemname || "No data",
    stateregnumber: Array.isArray(stateregnumber)
      ? stateregnumber[0]
      : stateregnumber || "No data",
    lastname: Array.isArray(lastname) ? lastname[0] : lastname || "No data",
    serialNumber: Array.isArray(serialNumber)
      ? serialNumber[0]
      : serialNumber || "No data",
    customername: Array.isArray(customername)
      ? customername[0]
      : customername || "No data",
  };
  const criteria = JSON.stringify({
    filterContractId: [
      {
        operator: "=",
        operand: contractid,
      },
    ],
  });

  const { data, error } = useSWR(
    `/api/get-data?metaid=1723089346622229&criteria=${criteria}`
  );

  if (error) return <div>Error loading data...</div>;

  const contractData = data?.result?.[0] || {};

  const FIELDS = [
    { label: "СЕРИАЛ ДУГААР", key: "serialNumber" },
    { label: "РЕГИСТЕР", key: "stateregnumber" },
  ];

  const COMING = [
    { label: "ХУГАЦАА СОНГОХ", key: "startdate" },
    { label: "ҮНИЙН МЭДЭЭЛЭЛ", key: "price" },
    { label: "ТӨЛӨВ", key: "isactive" },
    { label: "БАЙГУУЛСАН ОГНОО", key: "createddate" },
    { label: "ЭХЛЭХ ОГНОО", key: "startdate" },
    { label: "ДУУСАХ ОГНОО", key: "enddate" },
  ];

  const renderField = (field: any) => {
    const value = userData[field.key as keyof UserData] || "aaaa";
    return (
      <div key={field.key} className="flex justify-between flex-col gap-y-2">
        <span>{field.label}</span>
        <span className="bg-white px-5 rounded-[20px] text-[#525050]">
          {value}
        </span>
      </div>
    );
  };

  const renderComingField = (field: any) => {
    const value = contractData[field.key] || "aaaa";
    return (
      <div
        key={field.key}
        className="grid grid-cols-2 items-center text-white mt-[25px]"
      >
        <p>{field.label}</p>
        <span className="bg-white px-5 rounded-[20px] text-[#525050]">
          {value}
        </span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="text-center text-[#A68B5C] text-[64px]">СУНГАЛТ</div>

      <div className="text-white px-[100px] flex items-center justify-center min-w-[800px]">
        <div className="grid grid-cols-2 gap-4 p-6 rounded-lg w-full text-[32px] text-start">
          {FIELDS.map(renderField)}
          <div className="flex justify-between flex-col gap-y-2">
            <span>ОВОГ</span>
            <span className="bg-white px-5 rounded-[20px] text-[#525050]">
              {userData.lastname}
            </span>
          </div>
          <div className="flex justify-between flex-col gap-y-2">
            <span>НЭР</span>
            <span className="bg-white px-5 rounded-[20px] text-[#525050]">
              {contractData.customername}
            </span>
          </div>
        </div>
      </div>

      <div className="px-[100px] mt-[100px] w-full text-[40px] text-start">
        <div className="grid grid-cols-2 items-center text-white mt-[25px]">
          <p>ҮЙЛЧИЛГЭЭНИЙ НЭР</p>
          <span className="bg-white px-5 rounded-[20px] text-[#525050]">
            {userData.itemname}
          </span>
        </div>
        {COMING.map(renderComingField)}
      </div>

      <div className="flex mt-[80px] justify-center">
        <button
          className="flex text-[54px] items-center bg-[#A68B5C] h-[100px] rounded-2xl w-[519px] text-white justify-center gap-10"
          onClick={() => router.push("/kiosk/sell/warning/")}
        >
          ТӨЛБӨР ТӨЛӨХ
        </button>
      </div>
    </Layout>
  );
};

export default Stretch;
