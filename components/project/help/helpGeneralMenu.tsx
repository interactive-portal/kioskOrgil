import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import HelpMegaMenu from "./helpMegaMenu";

export default function HelpGeneralMenu() {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  return (
    <>
      <BlockDiv
        customClassName={`w-full h-full rounded-l-xl`}
        customStyle={{
          background: "#F5F5F5",
        }}
        divNumber="HelpGeneralMenuOuter"
      >
        <BlockDiv
          customClassName="flex flex-col py-2"
          divNumber="HelpGeneralMenuInner"
        >
          <BlockDiv
            customClassName="flex flex-row items-center gap-x-3  cursor-pointer"
            divNumber="HelpGeneralMenuTitle"
          >
            <HelpMegaMenu data={readyDatasrc} />
          </BlockDiv>
          <BlockDiv
            customClassName="flex justify-end w-full pr-6 "
            divNumber={"HelpGeneralMenuButton"}
          >
            <RenderAtom
              item={{
                value: "Бүгдийг харах",
                positionnemgoo: {
                  url: {
                    path: "/category",
                  },
                },
              }}
              renderType="text"
              customClassName="text-right text-base text-blue-300"
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </>
  );
}
