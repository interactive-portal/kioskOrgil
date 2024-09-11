import { FC, useContext, useState } from "react";
import useSWR from "swr";
import _ from "lodash";
import router, { useRouter } from "next/router";
import { listToTree } from "@/util/helper";
import { useCloud } from "hooks/use-cloud";
import CustomMenu from "@/components/custom/menu/customMenu";

type PropsType = {
  options?: any;
};

const SideBar: FC<PropsType> = ({ options }) => {
  const [show, setShow] = useState(true);
  const cloudContext = useCloud();
  const metaNameV2 = cloudContext.hostObject.metaNameV2;

  let parentid = router.query.lparentid;

  const myCriteria = {
    lparentid: parentid || 166479296622331,
  };
  const criteria = JSON.stringify(myCriteria);

  const URL = process?.env?.URL;

  const { data: menuList } = useSWR(
    `/api/get-data?metaid=1663726686344310&criteria=${criteria}`
  );
  const readyDatasrc: any = _.values(menuList?.result) || [];
  const widgetnemgooReady: any = options;

  const [selectedId, setSelectedId] = useState<any>(router.query?.["filterid"]);

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

  return (
    <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 3xl:col-span-2  py-4 pl-4 pr-2 h-full singlesidebar">
      <h3 className="text-[20px] text-[#585858] font-medium"> Агуулга </h3>
      {/* <div className="w-full border bg-white border-gray-300 rounded-lg mb-4">
        <button
          type="button"
          className="flex justify-between text-gray-600 items-center pl-4 hover:text-gray-600 transition-colors duration-200 w-full py-1 cursor-pointer"
        >
          Хайх ...
          <svg
            width="30"
            height="30"
            fill="none"
            className="text-gray-700 group-hover:text-gray-500 transition-colors duration-200 pt-1 "
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div> */}
      <CustomMenu
        rawDatasrc={treeReadyDatasrc}
        color="#699BF7"
        customClassName="w-full"
        defaultSelectedId={selectedId}
        indent={0}
        subitem={false}
        // itemStyle={widgetnemgooReady?.itemStyle}
      />
    </div>
  );
};
export default SideBar;
