import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import _ from "lodash";

const RiverClubV1BioInputTerms = ({ item }: any) => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = item[0];
  const staticItem2 = item[1];
  return (
    <BlockDiv className="text-white bg-none flex justify-center items-center mt-[20vh]">
      <BlockDiv className="bg-[#373737] p-[14px] rounded-[11px] w-[654px]">
        {/* Top section here  */}
        <BlockDiv>
          <BlockDiv className="mt-[19px] mx-[24px] flex items-center justify-between mb-[32px]">
            <RenderAtom
              item={staticItem?.title}
              renderType="title"
              className={`text-[#BAD405] font-bold text-[22px]`}
            />
            {/* <RenderAtom
              item={staticItem?.icon}
              renderType="image"
              className={`w-[35px] h-[35px]`}
            /> */}
          </BlockDiv>
          <BlockDiv className="mb-[39px] w-[549px] ml-[24px]">
            <RenderAtom
              item={staticItem?.description}
              renderType="text"
              className={`text-lg font-[500] text-white`}
            />
          </BlockDiv>
        </BlockDiv>
        {/* top section duusav */}
        {/* Content starts here */}
        <BlockDiv className="mx-[24px] my-[27px] rounded-[15px] border border-[#DEDEDE] p-[10px]">
          <BlockDiv className="p-[42px]">
            {_.map(staticItem?.items, (item: any, index: number) => {
              return (
                <RenderAtom
                  item={item}
                  renderType="title"
                  className={`list-decimal font-normal text-[16px]`}
                />
              );
            })}
          </BlockDiv>

          {/* dotor ni bga arai ondor block ni */}
          <BlockDiv className="rounded-[15px] border border-[#DEDEDE] p-4">
            {/* <BlockDiv className="">
              <RiverClubV1Contract item={staticItem3} />
            </BlockDiv> */}
            {/* deerh blockdivd geree baigaa */}

            {/* <RenderAtom
              item={staticItem?.title}
              renderType="title"
              className={`font-semibold text-[32px]`}
            /> */}
            {/* Доорх blockdiv д дизайн дээр байсан dummy тэкст байгаа */}
            <BlockDiv className="mt-[53px] flex flex-col gap-y-[16px]">
              {_.map(staticItem2, (item: any, index: number) => {
                return (
                  <BlockDiv>
                    <RenderAtom
                      item={item?.title}
                      renderType="title"
                      className={`font-semibold text-[16px]`}
                    />
                    <RenderAtom
                      item={item?.description}
                      renderType="title"
                      className={`font-normal text-[16px]`}
                    />
                  </BlockDiv>
                );
              })}
            </BlockDiv>
            {/* dummy text ends */}
            {/* Гэрээг харуулж буй widget */}

            {/* 2 button ni enche bn */}
            <BlockDiv className="flex gap-x-[16px] mx-auto w-max mt-[53px]">
              <BlockDiv className="w-[154px] h-[56px] bg-black rounded-[11px] cursor-pointer flex items-center justify-center">
                <RenderAtom
                  item={staticItem?.buttonDecline}
                  renderType="button"
                  className={`text-lg font-medium uppercase text-white`}
                />
              </BlockDiv>
              <BlockDiv className="w-[154px] h-[56px] bg-[#BAD405] rounded-[11px] cursor-pointer flex items-center justify-center">
                <RenderAtom
                  item={staticItem?.buttonAgree}
                  renderType="button"
                  className={`text-lg font-medium uppercase text-black`}
                />
              </BlockDiv>
              {/* button done */}
            </BlockDiv>
            {/* dotorh ondor block duusav */}
          </BlockDiv>
          {/* content duusav */}
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1BioInputTerms;

// export const RiverClubV1Contract = ({ item }: any) => {
//   return (
//     <BlockDiv className="w-full text-xl font-medium">
//       <OuterContract item={item?.outerTop} />
//       <BlockDiv className="h-[300px] overflow-y-auto">
//         <ContractInfo item={item?.contractInfo} />
//       </BlockDiv>
//     </BlockDiv>
//   );
// };

// const OuterContract = ({ item }: any) => {
//   return (
//     <BlockDiv>
//       <BlockDiv className="flex flex-col">
//         <RenderAtom item={item?.logo} renderType="image" className={``} />
//         <BlockDiv className="flex flex-col text-center mt-10 gap-2">
//           <RenderAtom
//             item={item?.address?.address1}
//             renderType="title"
//             className={`leading-4 `}
//           />
//           <RenderAtom
//             item={item?.address?.address2}
//             renderType="title"
//             className={`leading-4`}
//           />
//         </BlockDiv>
//         <RenderAtom
//           item={item?.title}
//           renderType="title"
//           className={`text-2xl font-bold text-center mt-10`}
//         />
//       </BlockDiv>
//     </BlockDiv>
//   );
// };

// const ContractInfo = ({ item }: any) => {
//   return (
//     <BlockDiv className="mt-10 rounded">
//       <BlockDiv className="border border-white rounded">
//         <RenderAtom
//           item={item?.title}
//           renderType="title"
//           className={`text-center text-2xl font-bold`}
//         />
//       </BlockDiv>
//       <BlockDiv className="flex flex-col gap-10">
//         <BlockDiv className="border border-white rounded">
//           <Card1 item={item?.card1} />
//         </BlockDiv>
//         <BlockDiv className="border border-white rounded">
//           <Card2 item={item?.card2} />
//         </BlockDiv>
//       </BlockDiv>
//     </BlockDiv>
//   );
// };
// const Card1 = ({ item }: any) => {
//   return (
//     <BlockDiv className="grid grid-cols-2">
//       {/* left */}
//       <BlockDiv className="flex gap-[6px] border-r flex-wrap text-lg">
//         <RenderAtom
//           item={item?.left?.title}
//           renderType="title"
//           className={`text-2xl font-semibold`}
//         />
//         <RenderAtom
//           item={item?.left?.value}
//           renderType="title"
//           className={`font-medium`}
//         />
//       </BlockDiv>
//       {/* right */}
//       <BlockDiv className="grid grid-rows-3 border border-white">
//         <BlockDiv className="grid grid-cols-2">
//           <RenderAtom
//             item={item?.right?.time?.title}
//             renderType="title"
//             className={`text-end border-r border-b border-white ml-1`}
//           />
//           <RenderAtom
//             item={item?.right?.time?.value}
//             renderType="title"
//             className={`text-end border-b border-white ml-1`}
//           />
//         </BlockDiv>
//         <BlockDiv className="grid grid-cols-2">
//           <RenderAtom
//             item={item?.right?.start?.title}
//             renderType="title"
//             className={`text-end border-r border-b border-white ml-1`}
//           />
//           <RenderAtom
//             item={item?.right?.start?.value}
//             renderType="title"
//             className={`text-end border-b border-white ml-1`}
//           />
//         </BlockDiv>
//         <BlockDiv className="grid grid-cols-2">
//           <RenderAtom
//             item={item?.right?.end?.title}
//             renderType="title"
//             className={`text-end border-r border-white ml-1`}
//           />
//           <RenderAtom
//             item={item?.right?.end?.value}
//             renderType="title"
//             className={`text-end border-b border-white ml-1`}
//           />
//         </BlockDiv>
//       </BlockDiv>
//     </BlockDiv>
//   );
// };
// const Card2 = ({ item }: any) => {
//   return (
//     <BlockDiv>
//       <BlockDiv className="grid grid-cols-2">
//         {/* left */}
//         <BlockDiv className="flex gap-[6px] border-r flex-wrap text-lg">
//           <RenderAtom
//             item={item?.left?.title}
//             renderType="title"
//             className={`text-2xl font-semibold`}
//           />
//           <RenderAtom
//             item={item?.left?.value}
//             renderType="title"
//             className={`font-medium`}
//           />
//         </BlockDiv>
//         {/* right */}
//         <BlockDiv className="grid grid-rows-3 border border-white">
//           <BlockDiv className="grid grid-cols-2">
//             <RenderAtom
//               item={item?.right?.price?.title}
//               renderType="title"
//               className={`text-end border-r border-b border-white ml-1`}
//             />
//             <RenderAtom
//               item={item?.right?.price?.value}
//               renderType="title"
//               className={`text-end border-b border-white ml-1`}
//             />
//           </BlockDiv>
//           <BlockDiv className="grid grid-cols-2">
//             <RenderAtom
//               item={item?.right?.discount?.title}
//               renderType="title"
//               className={`text-end border-r border-b border-white ml-1`}
//             />
//             <RenderAtom
//               item={item?.right?.discount?.value}
//               renderType="title"
//               className={`text-end border-b border-white ml-1`}
//             />
//           </BlockDiv>
//           <BlockDiv className="grid grid-cols-2">
//             <RenderAtom
//               item={item?.right?.total?.title}
//               renderType="title"
//               className={`text-end border-r border-white ml-1`}
//             />
//             <RenderAtom
//               item={item?.right?.total?.value}
//               renderType="title"
//               className={`text-end border-b border-white ml-1`}
//             />
//           </BlockDiv>
//         </BlockDiv>
//       </BlockDiv>
//     </BlockDiv>
//   );
// };
