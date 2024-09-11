import { FC } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";

type PropsType = {
  item?: any;
  customClassName?: string;
  customStyle?: any;
};
export const SuccessNotice: FC<PropsType> = ({
  item,
  customClassName,
  customStyle,
}) => {
  return (
    <BlockDiv
      customClassName={`py-2 px-3 text-gray-700 bg-green-50 rounded-sm border-green-100 border flex flex-row items-center ${customClassName}`}
      customStyle={customStyle}
    >
      <i className="far fa-check mr-2 text-green-700"></i>
      Амжилттай
    </BlockDiv>
  );
};

export default SuccessNotice;
