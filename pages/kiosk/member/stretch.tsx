// import React, { useState, useEffect } from "react";
// import Layout from "../kioskLayout";
// import Members from "./members";
// import { useRouter } from "next/router";
// import { Modal, Input, Button } from "antd";

// const Stretch = () => {
//   const router = useRouter();
//   const [members, setMembers] = useState([
//     { name: "", registration: "", serial: "" },
//   ]);
//   const [showModal, setShowModal] = useState(false);
//   const [newMember, setNewMember] = useState({
//     name: "",
//     registration: "",
//     serial: "",
//   });

//   useEffect(() => {
//     if (router.isReady) {
//       const { itemname, customername, stateregnumber, serialNumber } =
//         router.query;

//       const getStringValue = (value: string | string[] | undefined): string => {
//         if (Array.isArray(value)) {
//           return value[0];
//         }
//         return value ?? "No data";
//       };

//       setMembers([
//         {
//           name: getStringValue(customername),
//           registration: getStringValue(stateregnumber),
//           serial: getStringValue(serialNumber),
//         },
//       ]);
//     }
//   }, [router.isReady, router.query]);

//   const handleChange = () => {
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewMember({ ...newMember, [name]: value });
//   };

//   const handleAddMember = () => {
//     setMembers([...members, newMember]);
//     setNewMember({ name: "", registration: "", serial: "" });
//     setShowModal(false);
//   };

//   return (
//     <Layout>
//       <p className="text-[64px] font-medium text-[#A68B5C] text-center mb-8">
//         {router.query.itemname || "No item name"}
//       </p>
//       <div className="self-start">
//         {members.map((member, index) => (
//           <Members
//             key={index}
//             number={index + 1}
//             name={member.name}
//             registration={member.registration}
//             serial={member.serial}
//             handleChange={() => {}} // Provide a no-op function here
//           />
//         ))}
//       </div>

//       <div className="flex justify-center mb-8 mt-[80px]">
//         <button
//           className="text-black bg-white text-[40px] h-[80px] w-[378px] rounded-2xl"
//           onClick={handleChange}
//         >
//           ГИШҮҮН НЭМЭХ
//         </button>
//       </div>
//       <div className="flex justify-center">
//         <button
//           onClick={() => router.push("/kiosk/extend/userinfo")}
//           className="bg-[#A68B5C] text-white h-[80px] rounded-2xl text-[40px] w-[378px]"
//         >
//           СУНГАЛТ ХИЙХ
//         </button>
//       </div>
//       <div className="flex justify-center mt-6">
//         <p className="text-[#525050] text-[40px] mt-[50px]">
//           НЭГ БАГЦ 3-5 ГИШҮҮНТЭЙ БАЙНА.
//         </p>
//       </div>

//       {/* Ant Design Modal */}
//       <Modal
//         title="Шинэ гишүүн нэмэх"
//         visible={showModal}
//         onCancel={handleModalClose}
//         footer={[
//           <Button key="back" onClick={handleModalClose}>
//             Хаах
//           </Button>,
//           <Button
//             className="bg-black"
//             key="submit"
//             type="primary"
//             onClick={handleAddMember}
//           >
//             Нэмэх
//           </Button>,
//         ]}
//       >
//         <Input
//           name="name"
//           value={newMember.name}
//           onChange={handleInputChange}
//           placeholder="Гишүүний нэр"
//           className="mb-4"
//         />
//         <Input
//           name="registration"
//           value={newMember.registration}
//           onChange={handleInputChange}
//           placeholder="Регис дугаар"
//           className="mb-4"
//         />
//         <Input
//           name="serial"
//           value={newMember.serial}
//           onChange={handleInputChange}
//           placeholder="Серийн дугаар"
//           className="mb-4"
//         />
//       </Modal>
//     </Layout>
//   );
// };

// export default Stretch;

// import React, { useState, useEffect } from "react";
// import Layout from "../kioskLayout";
// import Members from "./members";
// import { useRouter } from "next/router";
// import { Modal, Input, Button, notification } from "antd";
// import useSWR from "swr";

// const Stretch = () => {
//   const router = useRouter();
//   const [members, setMembers] = useState([
//     { name: "", registration: "", serial: "" },
//   ]);
//   const [showModal, setShowModal] = useState(false);
//   const [newMember, setNewMember] = useState({
//     name: "",
//     registration: "",
//     serial: "",
//   });
//   const [searchingRegistration, setSearchingRegistration] = useState("");

//   const fetcher = (url: string) => fetch(url).then((res) => res.json());

//   const handleSearchMember = async (registerNumber: string) => {
//     const criteria = JSON.stringify({
//       registration: [
//         {
//           operator: "=",
//           operand: registerNumber,
//         },
//       ],
//     });

//     const { data, error } = useSWR(
//       `/api/get-data?metaid=17138556014631&criteria=${criteria}`,
//       fetcher
//     );

//     if (error) {
//       console.error("Error fetching member data:", error);
//       notification.error({ message: "Error fetching member data." });
//     }

//     if (data?.result?.length > 0) {
//       // If member is found, populate the modal with member data
//       const memberData = data.result[0];
//       setNewMember({
//         name: memberData.name || "",
//         registration: memberData.registration || "",
//         serial: memberData.serial || "",
//       });
//       setShowModal(true);
//     } else {
//       // If member is not found, redirect to /kiosk/form2
//       router.push("/kiosk/form2");
//     }
//   };

//   const handleChange = () => {
//     // Open the modal to search and add a member
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewMember({ ...newMember, [name]: value });
//   };

//   const handleAddMember = () => {
//     setMembers([...members, newMember]);
//     setNewMember({ name: "", registration: "", serial: "" });
//     setShowModal(false);
//   };

//   useEffect(() => {
//     if (router.isReady) {
//       const { itemname, customername, stateregnumber, serialNumber } =
//         router.query;

//       const getStringValue = (value: string | string[] | undefined): string => {
//         if (Array.isArray(value)) {
//           return value[0];
//         }
//         return value ?? "No data";
//       };

//       setMembers([
//         {
//           name: getStringValue(customername),
//           registration: getStringValue(stateregnumber),
//           serial: getStringValue(serialNumber),
//         },
//       ]);
//     }
//   }, [router.isReady, router.query]);

//   return (
//     <Layout>
//       <p className="text-[64px] font-medium text-[#A68B5C] text-center mb-8">
//         {router.query.itemname || "No item name"}
//       </p>
//       <div className="self-start">
//         {members.map((member, index) => (
//           <Members
//             key={index}
//             number={index + 1}
//             name={member.name}
//             registration={member.registration}
//             serial={member.serial}
//             handleChange={() => {}} // Provide a no-op function here
//           />
//         ))}
//       </div>

//       <div className="flex justify-center mb-8 mt-[80px]">
//         <button
//           className="text-black bg-white text-[40px] h-[80px] w-[378px] rounded-2xl"
//           onClick={handleChange}
//         >
//           ГИШҮҮН НЭМЭХ
//         </button>
//       </div>
//       <div className="flex justify-center">
//         <button
//           onClick={() => router.push("/kiosk/extend/userinfo")}
//           className="bg-[#A68B5C] text-white h-[80px] rounded-2xl text-[40px] w-[378px]"
//         >
//           СУНГАЛТ ХИЙХ
//         </button>
//       </div>
//       <div className="flex justify-center mt-6">
//         <p className="text-[#525050] text-[40px] mt-[50px]">
//           НЭГ БАГЦ 3-5 ГИШҮҮНТЭЙ БАЙНА.
//         </p>
//       </div>

//       {/* Ant Design Modal */}
//       <Modal
//         title="Шинэ гишүүн нэмэх"
//         visible={showModal}
//         onCancel={handleModalClose}
//         footer={[
//           <Button key="back" onClick={handleModalClose}>
//             Хаах
//           </Button>,
//           <Button
//             key="submit"
//             type="primary"
//             onClick={() => handleSearchMember(newMember.registration)}
//           >
//             Нэмэх
//           </Button>,
//         ]}
//       >
//         <Input
//           name="registration"
//           value={newMember.registration}
//           onChange={handleInputChange}
//           placeholder="Бүртгэлийн дугаар"
//           className="mb-4"
//         />
//         <Input
//           name="name"
//           value={newMember.name}
//           onChange={handleInputChange}
//           placeholder="Гишүүний нэр"
//           className="mb-4"
//         />
//         <Input
//           name="serial"
//           value={newMember.serial}
//           onChange={handleInputChange}
//           placeholder="Серийн дугаар"
//           className="mb-4"
//         />
//       </Modal>
//     </Layout>
//   );
// };

// export default Stretch;

import React, { useState, useEffect } from "react";
import Layout from "../kioskLayout";
import Members from "./members";
import { useRouter } from "next/router";
import { Modal, Input, Button, notification, Spin } from "antd";
import fetchJson from "@/util/helper"; // Assuming fetchJson is defined

const Stretch = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([
    { name: "", registration: "", serial: "" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    registration: "",
    serial: "",
  });

  useEffect(() => {
    if (router.isReady) {
      const { itemname, customername, stateregnumber, serialNumber } =
        router.query;

      const getStringValue = (value: string | string[] | undefined): string => {
        if (Array.isArray(value)) {
          return value[0];
        }
        return value ?? "No data";
      };

      setMembers([
        {
          name: getStringValue(customername),
          registration: getStringValue(stateregnumber),
          serial: getStringValue(serialNumber),
        },
      ]);
      console.log("setmember", setMembers);
    }
  }, [router.isReady, router.query]);

  const handleChange = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleSearchMember = async () => {
    const { registration } = newMember;
    console.log("Searching for registration:", registration);
    if (registration) {
      setLoading(true); // Set loading to true before starting the request

      try {
        const response = await fetchJson(
          `/api/get-data?metaid=1722853892303075&criteria=${JSON.stringify({
            filterRegNumber: [
              {
                operator: "=",
                operand: registration,
              },
            ],
          })}`
        );

        console.log("API response:", response); // Log the response

        if (response && response.result && response.result.length > 0) {
          // If member is found, populate the modal with member data
          const memberData = response.result[0];
          console.log("member data", memberData);

          setNewMember({
            name: memberData.customername || "",
            registration: memberData.stateregnumber || "",
            serial: memberData.serialnumber || "",
          });

          // Add new member to the list
          setMembers([
            ...members,
            {
              name: memberData.customername || "data",
              registration: memberData.stateregnumber || "data",
              serial: memberData.serialnumber || "data",
            },
          ]);

          notification.success({
            message: "Success",
            description: "Хэрэглэгч амжилттай нэмэгдлээ.",
          });

          setShowModal(false);
        } else {
          // If member is not found, redirect to /kiosk/form2
          router.push("/kiosk/form2");
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
        notification.error({ message: "Error fetching member data." });
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    }
  };

  const handleGoToRegister = () => {
    // Extract itemname or contractid from the router query
    const { itemname, contractid } = router.query;

    // Redirect to /kiosk/form2 with query parameters
    router.push({
      pathname: "/kiosk/form2",
      query: { itemname, contractid },
    });

    // Close the modal
    setShowModal(false);
  };

  return (
    <Layout>
      <p className="text-[64px] font-medium text-[#A68B5C] text-center mb-8">
        {router.query.itemname || "No item name"}
      </p>
      <div className="self-start">
        {members.map((member, index) => (
          <Members
            key={index}
            number={index + 1}
            name={member.name}
            registration={member.registration}
            serialnumber={member.serial}
            handleChange={() => {}}
          />
        ))}
      </div>

      <div className="flex justify-center mb-8 mt-[80px]">
        <button
          className="text-black bg-white text-[40px] h-[80px] w-[378px] rounded-2xl"
          onClick={handleChange}
        >
          ГИШҮҮН НЭМЭХ
        </button>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => router.push("/kiosk/extend/userinfo")}
          className="bg-[#A68B5C] text-white h-[80px] rounded-2xl text-[40px] w-[378px]"
        >
          СУНГАЛТ ХИЙХ
        </button>
      </div>
      <div className="flex justify-center mt-6">
        <p className="text-[#525050] text-[40px] mt-[50px]">
          НЭГ БАГЦ 3-5 ГИШҮҮНТЭЙ БАЙНА.
        </p>
      </div>

      {/* Ant Design Modal */}
      <Modal
        title="Шинэ гишүүн нэмэх"
        visible={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="search" onClick={handleSearchMember} disabled={loading}>
            {loading ? <Spin size="small" /> : "Бүртгэлээр хайх"}
          </Button>,
          <Button key="register" onClick={handleGoToRegister}>
            Шинэ бүртгэл үүсгэх
          </Button>,
          <Button key="back" onClick={handleModalClose}>
            Хаах
          </Button>,
        ]}
      >
        <Input
          name="registration"
          value={newMember.registration}
          onChange={handleInputChange}
          placeholder="Регистер дугаараар хайх"
          className="mb-4"
        />
      </Modal>
    </Layout>
  );
};

export default Stretch;
