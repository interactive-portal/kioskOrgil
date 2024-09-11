import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import TreeMain from "@/components/custom/tree/TreeMain";
// import { AtomSearch } from "@components/common/Atom";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { listToTree, prepareIsOpen } from "util/helper";

export default function TreeMenu() {
  const {
    config,
    readyDatasrc,
    widgetnemgooReady,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    themeConfigs,
    pathConfig,
  } = useContext(WidgetWrapperContext);
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<any>(
    router.query?.[widgetnemgooReady?.listconfig?.fieldid || "item"]
  );

  const [responseMenuOpen, setResponsiveMenuOpen] = useState<boolean>(false);

  const treeReadyDatasrc: any = listToTree(readyDatasrc, {
    idKey: "id",
    parentKey: "parentid",
    childrenKey: "children",
  });
  if (readyDatasrc.length !== 0) {
    if (selectedId == undefined) {
      if (treeReadyDatasrc.length === 0) {
        setSelectedId(
          readyDatasrc[0]?.id ||
            readyDatasrc[0]?.[widgetnemgooReady?.listconfig?.fieldid || "item"]
        );
      } else {
        setSelectedId(
          treeReadyDatasrc[0]?.id ||
            treeReadyDatasrc[0]?.[
              widgetnemgooReady?.listconfig?.fieldid || "item"
            ]
        );
      }
    }
  }

  useEffect(() => {
    setSelectedId(
      router.query?.[widgetnemgooReady?.listconfig?.fieldid || "item"]
    );
  }, [router]);

  // console.log("selectedId", selectedId);

  return (
    <>
      <BlockDiv
        customClassName={`left-0 top-1/4 z-30 fixed lg:hidden xs:block px-2 py-1 rounded-r-lg bg-white duration-200 translate-x-0 font-medium shadow-xl
        ${responseMenuOpen && "translate-x-[230px]"}
        `}
        onClick={() => setResponsiveMenuOpen(!responseMenuOpen)}
      >
        <p>{responseMenuOpen ? "<" : ">"}</p>
      </BlockDiv>
      <div
        className={`${
          responseMenuOpen &&
          "fixed top-0 bottom-0 w-full left-0 bg-black/70 z-20"
        }`}
        onClick={() => setResponsiveMenuOpen(!responseMenuOpen)}
      ></div>
      <BlockDiv
        customClassName={`p-0 rounded-[10px] px-2 py-2 w-full lg:-translate-x-0 xs:-translate-x-full duration-200  lg:block xs:hidden ${
          responseMenuOpen &&
          " xs:block xs:-translate-x-0 bg-white fixed top-[90px] rounded-none left-0 bottom-0 w-[230px] z-40"
        }`}
        divNumber="TreeMenuDiv"
      >
        <div className="h-full ">
          <RenderAtom
            item={{ value: widgetnemgooReady?.title?.title }}
            renderType="title"
            customClassName={"text-[#585858] font-medium py-3 px-4"}
            customStyle={{
              fontSize: "20px",
            }}
          />
          <span className="">{/* <AtomSearch item={readyDatasrc} /> */}</span>

          <div className="overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full">
            <div className="w-full ">
              <TreeMain
                rawDatasrc={
                  treeReadyDatasrc.length > 0 ? treeReadyDatasrc : readyDatasrc
                }
                color="#699BF7"
                customClassName="w-full"
                defaultSelectedId={selectedId}
                indent={5}
                itemStyle={widgetnemgooReady?.itemStyle}
              />
            </div>
          </div>
        </div>
      </BlockDiv>
    </>
  );
}

// "className": "h-auto col-span-12 md:min-w-[380px] md:max-w-[420px]",
// "style":{
//     "minWidth":"380px"
//   },
