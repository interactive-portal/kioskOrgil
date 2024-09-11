import React, { useState } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import _ from "lodash";
import useCallProcess from "@/middleware/dataHook/useCallProcess";

interface BookData {
  id: string;
  booknumber: string;
}

interface ResultData {
  [key: string]: BookData;
}

const RiverClubV1GetLocker = ({
  item,
  showLockerModal,
  setShowLockerModal,
}: any) => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const { callProcess, isProcessWorking } = useCallProcess();
  return (
    <BlockDiv className="p-4 flex justify-center items-center bg-[#373737] rounded-xl">
      <BlockDiv className="w-[654px] p-4">
        <BlockDiv className="mr-[17px]  ml-[28px] flex items-center justify-between mb-[32px]">
          <RenderAtom
            item={item?.title}
            renderType="title"
            className={`text-[#BAD405] font-bold text-[22px]`}
          />
          <BlockDiv />
        </BlockDiv>
        <BlockDiv className="ml-[50px] mb-[17px]">
          {_.map(item?.description, (item: any, index: number) => {
            return (
              <RenderAtom
                item={item}
                renderType="text"
                className={`list-item text-lg font-[500] text-white w-[566px]`}
              />
            );
          })}
        </BlockDiv>
        <BlockDiv className="w-[612px] p-[20px] h-[265px] border border-[#DEDEDE] bg-[#2A2A2A] mx-auto rounded-[15px]">
          <BlockDiv className="flex flex-wrap gap-[6px]">
            {_.map(item?.numbers, (item: any, index: number) => {
              return (
                <RenderAtom
                  item={item}
                  renderType="text"
                  className={`text-[#BBD540] p-[11px] text-[30px] font-bold bg-[#424242] rounded-[11px] border border-[#BBD540]`}
                />
              );
            })}
          </BlockDiv>
        </BlockDiv>
        {/* button starts */}
        <BlockDiv className="mt-[25px] flex w-max mx-auto mb-[21px] gap-x-[26px]">
          <RenderAtom
            item={item?.buttonConfirm}
            renderType="button"
            className={`text-black bg-[#BAD405] px-[67px] font-bold text-[16px] py-[24px] rounded-[8px]`}
            onClick={() => setShowLockerModal(false)}
          />
          <RenderAtom
            item={item?.buttonCancel}
            renderType="button"
            className={`text-white bg-black px-[67px] font-bold text-[16px] py-[24px] rounded-[8px]`}
            onClick={() => setShowLockerModal(false)}
          />
        </BlockDiv>
      </BlockDiv>
      <RenderAtom
        item={`Test button`}
        renderType="button"
        className={`px-16 py-6 bg-gray-200 text-black absolute -bottom-20 rounded-lg text-2xl`}
        onClick={async () => {
          console.log(`Clicked`);
          const result = await callProcess({
            command: "PL_MDVIEW_005",
            parameter: { systemmetagroupcode: "fitLoyMemberBook_DV" },
          });
          console.log(`Result irsee`, result);

          // Extract "booknumber" values using Object.values and type safety
          const bookNumbers: string[] = Object.values(result)
            .map(({ item }: any) => item.booknumber)
            .filter(
              (booknumber): booknumber is string =>
                typeof booknumber === "string"
            );
          console.log(`Result book numbers:`, bookNumbers);
        }}

        // Дуусаагүй байгаа. Гэрээний процессыг түрүүлж хийх учир энийг түр дутуу үлдээсэн.
      />
    </BlockDiv>
  );
};

export default RiverClubV1GetLocker;
