import Layout from "../kioskLayout";
import { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import CheckUser from "./checkUser";
import { useRouter } from "next/router";
import fetchJson from "@/util/helper";
import { LoadingOutlined } from "@ant-design/icons";
import Title from "@/components/common/Title";
import Contract from "@/components/common/contract";

const Extend = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [loading, setLoading] = useState(false); // State for loading
  const [user, setUser] = useState<any>(); // State for loading
  const [customerId, setCustomerId] = useState<any>(); // State for loading
  const [err, setErr] = useState<any>(false); // State for loading
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

        console.log("data :>> ", data);

        if (data.result.length > 0) {
          setErr(false);
          setUser(data.result);
          setLoading(false);
        } else {
          // alert("No user found for the given register number.");
          setLoading(false);
          setErr(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // alert("An error occurred while searching.");
        setErr(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderField = (field: any) => {
    const value = "No data";
    console.log("field :>> ", field);

    return (
      <div key={field.key} className="flex justify-between flex-col gap-y-2 ">
        <span>{field.customername}</span>
        <span className="bg-white px-10 py-4 rounded-full text-[#525050] ">
          {value}
        </span>
      </div>
    );
  };

  const clickCamera = async () => {
    // setContentType("opencamera");
    var ws = new WebSocket(`${process.env.NEXT_PUBLIC_FACECAMERA_URL}`);

    // setOpenModal(true);

    ws.onopen = function () {
      ws.send('{"action":"GetPerson"}');
    };

    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);
      console.log("resresssssss", res);

      if (res?.status == "success") {
        const customerId = res?.result?.customerId;

        // const data = await fetchData(customerId);
        setCustomerId(customerId);
        setLoading(true);
        // alert(res?.result);

        ws.send('{"action":"Close"}');
      } else {
        setErr(true);

        // setContentType("error");
      }
    };

    ws.onerror = function (event) {
      // setOpenModal(false);
      console.log("event :>> ", event);
      // alert(event.data);
      // setContentType("error");
    };

    ws.onclose = function () {
      // setOpenModal(false);
      // setContentType("error");
      console.log("Connection is closed");
      // }
    };
  };

  useEffect(() => {
    if (customerId) {
      fetchData(customerId);
    }
  }, [customerId]);

  return (
    <Layout>
      {user ? (
        <>
          <div className="mx-auto  flex flex-col py-6 px-6">
            <Title title="ИЛЭРЦ"></Title>
            <Contract data={user} />

            <div className="mt-[50px] flex flex-col space-y-6">
              {/* <div
                className="rounded-full md:text-[64px] xs:text-[28px] xs:px-6 py-5 cursor-pointer obtn"
                onClick={() =>
                  router.push({
                    pathname: "/page/extend/userinfo",
                    query: { user: user[0]?.contractcode }, // Pass user data as query parameter
                  })
                }
              >
                <p>БҮРТГЭЛТЭЙ ГЭРЭЭ</p>
              </div> */}
              <div
                className="rounded-full md:text-[36px]  py-4 cursor-pointer obtn"
                // onClick={() => router.push("/page/register/")}
                onClick={() =>
                  router.push({
                    pathname: "/page/register/",
                    query: { user: user[0]?.contractcode }, // Pass user data as query parameter
                  })
                }
              >
                ШИНЭ БАГЦ
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto  flex flex-col gap-10">
          <Title title="Сунгалт"></Title>
          <div className="relative w-2/3 mx-auto ">
            <i className="fa-solid fa-magnifying-glass absolute md:left-4 md:top-[35px] md:text-[42px] text-[#525050] xs:left-4 xs:top-1"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lg:py-16 text-[#525050] md:text-[36px] xs:text-[20px] rounded-full w-full pl-20 pr-10"
              placeholder="ХАЙЛТ"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <div className="text-white text-center md:text-[24px]">
            {err && (
              <span className="text-red-400 ">
                No user found for the given register number
              </span>
            )}
            <p>REGISTER OR SERIAL NUMBER</p>
          </div>
          <div className="w-full text-center flex justify-center relative">
            <button
              className="flex items-center bg-[#A68B5C] rounded-full md:w-[443px] text-white md:px-10 md:py-6 xs:px-10 xs:py-2 justify-center gap-10"
              // // onClick={handleSearch}
              // onClick={() => setOpenModal(true)}
              // disabled={loading}
              onClick={() => clickCamera()}
            >
              <p className="md:text-[40px] xs:text-[20px]">ХАЙЛТ</p>
              <img
                src="/images/Face_id_white.png"
                className="md:max-w-[80px] md:max-h-[80px] xs:max-w-[35px]"
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

          {/* <Modal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            title={false}
            footer={false}
            destroyOnClose
          >
            <CheckUser setOpenModal={setOpenModal} />
          </Modal> */}
        </div>
      )}
    </Layout>
  );
};

export default Extend;
