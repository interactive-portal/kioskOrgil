import Layout from "../kioskLayout";
import { useState } from "react";
import { Modal, Spin } from "antd";
import CheckUser from "./checkUser";
import { useRouter } from "next/router";
import fetchJson from "@/util/helper";
import { LoadingOutlined } from "@ant-design/icons";
import Title from "@/components/common/Title";

const Extend = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter(); // Next.js router for redirection

  // SWR fetcher function for search
  const fetchData = async (query: any) => {
    const response = await fetchJson(
      `/api/get-data?metaid=1722853892303075&criteria=${JSON.stringify({
        filterRegNumber: [
          {
            operator: "=",
            operand: query,
          },
        ],
      })}`
    );
    return response;
  };

  const handleSearch = async () => {
    if (searchQuery) {
      setLoading(true);
      try {
        const data = await fetchData(searchQuery);

        if (data) {
          router.push({
            pathname: "/kiosk/member",
            query: { u: JSON.stringify(data) },
          });
        } else {
          alert("No user found for the given register number.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while searching.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      <div className="mx-auto  flex flex-col gap-10">
        <Title title="Сунгалт"></Title>
        <div className="relative w-2/3 mx-auto ">
          <i className="fa-solid fa-magnifying-glass absolute md:left-4 md:top-[35px] md:text-[42px] text-[#525050] xs:left-4 xs:top-1"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="lg:py-10 text-[#525050] md:text-[36px] xs:text-[20px] rounded-full w-full pl-20 pr-10"
            placeholder="ХАЙЛТ"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="text-white text-center md:text-[24px]">
          <p>REGISTER OR SERIAL NUMBER</p>
        </div>
        <div className="w-full text-center flex justify-center relative">
          <button
            className="flex items-center bg-[#A68B5C] rounded-full md:w-[443px] text-white md:px-10 md:py-6 xs:px-10 xs:py-2 justify-center gap-10"
            // onClick={handleSearch}
            onClick={() => setOpenModal(true)}
            disabled={loading}
          >
            <p className="md:text-[40px] xs:text-[20px]">ХАЙЛТ</p>
            <img
              src="/images/Face_id_white.png"
              className="md:max-w-[80px] md:max-h-[80px] xs:max-w-[40px]"
            />
          </button>
        </div>

        {/* Full-screen loading spinner */}
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

        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          title={false}
          footer={false}
          destroyOnClose
        >
          <CheckUser setOpenModal={setOpenModal} />
        </Modal>
      </div>
    </Layout>
  );
};

export default Extend;
