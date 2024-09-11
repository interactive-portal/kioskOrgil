import { FC } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";

type PropsType = {
  customClassName?: string;
  customStyle?: any;
};
export const ErrorNotice: FC<PropsType> = ({
  customClassName,
  customStyle,
}) => {
  return (
    <BlockDiv
      customClassName={`py-2 px-3 text-gray-700 bg-red-50 rounded-sm border-red-100 border flex flex-row items-center ${customClassName}`}
      customStyle={customStyle}
    >
      <i className="far fa-xmark mr-2 text-red-700"></i>
      Алдаа!
    </BlockDiv>
  );
};

export default ErrorNotice;
