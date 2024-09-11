import { FC } from "react";
import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";

type PropsType = {
  item?: any;
  customClassName?: string;
  customStyle?: any;
};
export const InfoNotice: FC<PropsType> = ({
  item,
  customClassName,
  customStyle,
}) => {
  return (
    <BlockDiv
      customClassName={`py-2 px-3 text-gray-700 bg-blue-50 rounded-sm border-blue-100 border flex flex-row items-center ${customClassName}`}
      customStyle={customStyle}
    >
      <i className="far fa-info mr-7 ml-3 text-blue-700"></i>

      <BlockDiv customClassName="flex flex-col gap-y-2">
        <RenderAtom
          item={{ value: item?.title?.title }}
          renderType="text"
          customClassName={`block w-full ${item?.title?.className}`}
          customStyle={item?.title?.style}
        />

        <RenderAtom
          item={{ value: item?.description?.title }}
          renderType="text"
          customClassName={`block w-full ${item?.description?.className}`}
          customStyle={item?.description?.style}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

export default InfoNotice;
