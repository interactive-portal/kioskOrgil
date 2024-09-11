import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Modal, Input } from "antd";
import useSWR from "swr";

interface MembersProps {
  number: number;
  name: string;
  registration: string;
  serialnumber: string;
  handleChange: (index: number, field: string, value: string) => void;
}

const Members: React.FC<MembersProps> = ({
  number,
  name,
  registration,
  serialnumber,
  handleChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedRegistration, setEditedRegistration] = useState(registration);
  const [editedSerial, setEditedSerial] = useState(serialnumber);

  const handleInputChange =
    (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(number - 1, field, e.target.value);
    };

  const router = useRouter();
  const criteria = JSON.stringify({
    classificationname: [
      {
        operator: "=",
        operand: router.query.n,
      },
    ],
  });

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, mutate } = useSWR(
    criteria
      ? `/api/get-data?metaid=17138556014631&criteria=${criteria}`
      : null,
    fetcher
  );

  const readyData = data ? data.result : [];

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (confirmed) {
      // Clear the member's data from the parent component
      handleChange(number - 1, "name", "");
      handleChange(number - 1, "registration", "");
      handleChange(number - 1, "serial", "");

      console.log(`Deleted member ${number}`);
    }
  };

  const handleModalSave = async () => {
    try {
      const response = await fetch(`/api/update-member/${number}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedName,
          registration: editedRegistration,
          serialnumber: editedSerial,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update member");
      }

      // Update parent component's state
      handleChange(number - 1, "name", editedName);
      handleChange(number - 1, "registration", editedRegistration);
      handleChange(number - 1, "serial", editedSerial);

      await mutate(); // Ensure mutate waits for completion
      console.log(`Updated member ${number}`, {
        editedName,
        editedRegistration,
        editedSerial,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 w-full text-white mb-4">
      <p className="text-[40px] mb-4 text-start">ГИШҮҮН {number}</p>
      <div className="grid grid-cols-2 gap-4 items-center">
        <div>
          <p className="text-[32px] text-white text-start">ОВОГ</p>
          <input
            type="text"
            value={name}
            onChange={handleInputChange("name")}
            className="flex text-[30px] justify-end items-center rounded-3xl px-4 h-[43px] w-[349px] bg-white text-black"
          />
        </div>
        <div>
          <p className="text-[32px] text-white text-start">РЕГИСТЕР</p>
          <input
            type="text"
            value={registration}
            onChange={handleInputChange("registration")}
            className="flex text-[30px] justify-end items-center rounded-3xl px-4 h-[43px] w-[349px] bg-white text-black"
          />
        </div>
        <div>
          <p className="text-[32px] text-white text-start">СЕРИАЛ ДУГААР</p>
          <input
            type="text"
            value={serialnumber}
            onChange={handleInputChange("serialnumber")}
            className="flex text-[30px] justify-end items-center rounded-3xl px-4 h-[43px] w-[349px] bg-white text-black"
          />
        </div>
        <div className="flex justify-center gap-8 mt-10">
          <button className="text-[60px] p-2 rounded-full" onClick={handleEdit}>
            <MdEdit />
          </button>
          <button
            className="text-[60px] p-2 rounded-full"
            onClick={handleDelete}
          >
            <MdDelete />
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={`Edit Member ${number}`}
        visible={isModalOpen}
        onOk={handleModalSave}
        onCancel={handleModalClose}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="mb-4">
          <label className="block mb-2">ОВОГ</label>
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">РЕГИСТЕР</label>
          <Input
            value={editedRegistration}
            onChange={(e) => setEditedRegistration(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">СЕРИАЛ ДУГААР</label>
          <Input
            value={editedSerial}
            onChange={(e) => setEditedSerial(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Members;
