import React from "react";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import _ from "lodash";
import { useRouter } from "next/router";

const RiverClubV1WorkoutsMenu = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];
  return (
    <BlockDiv className="bg-black w-full flex items-center justify-center py-[20px]">
      <BlockDiv className="flex w-full mx-[123px]">
        {_.map(data, (item: any, index: number) => {
          return (
            <RenderAtom
              item={item?.title}
              renderType="button"
              className={`${item?.className} font-normal text-xl w-max text-white px-[25px]`}
            />
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1WorkoutsMenu;
