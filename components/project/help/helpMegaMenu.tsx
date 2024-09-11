import { FC, useContext, useState, useEffect } from "react";
import { listToTree } from "util/helper";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import HelpMegaMenuPopover from "./helpMegaMenuPopover";

type PropsType = {
  config?: any;
  color?: any;
  data?: any;
};

const HelpMegaMenu: FC<PropsType> = ({ config, color, data }) => {
  const { readyDatasrc, themeConfigs } = useContext(WidgetWrapperContext);
  const [active, setActive] = useState<any>();

  const [menu, setMenu] = useState<any>([]);

  useEffect(() => {
    if (menu.length > 0) return;
    setMenu(data);
  }, [data]);

  const [show, setShow] = useState<any>();

  const tree = listToTree(menu, "parentId");
  // console.log("treeHelp", tree);
  // console.log("data", data);
  // console.log("menu", menu);

  return (
    <div
      className=" flex flex-col w-full h-full "
      onMouseLeave={() => {
        setActive(null);
        setShow(null);
      }}
    >
      <div className="">
        <div className="flex px-4 mb-2">
          <RenderAtom
            item={{ value: "far fa-bars" }}
            renderType="icon"
            customClassName=""
          />
          <RenderAtom
            item={{ value: "Ангилал" }}
            renderType="title"
            customClassName="font-bold ml-2"
          />
        </div>
        {tree.slice(0, 6).map((item: any, index: number) => {
          return (
            <div
              key={item?.id || index}
              className={`flex flex-row overflow-hidden py-2  items-center px-4 cursor-pointer rounded-l-xl  ${
                active === index && "text-blue-300 bg-white"
              }`}
              onMouseEnter={() => {
                setActive(index);
                setShow(index);
              }}
            >
              <div className="flex flex-row items-center relative w-full gap-x-2">
                <RenderAtom
                  item={item?.position49 || { value: item?.icon }}
                  renderType="icon"
                  customClassName="w-4"
                />
                <RenderAtom
                  item={item?.position1 || { value: item?.name }}
                  renderType="text"
                  customClassName={`font-normal text-base text-[#585858] line-clamp-2 ${
                    active == index && "text-blue-300"
                  }  `}
                />
              </div>
              {show == index && (
                <SubPopover data={item?.children} setShow={null} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SubPopover = ({ data = [], setShow }: any) => {
  const router = useRouter();

  return (
    <>
      <div
        className="transform translate-x-0 scroll shadow-lg transition duration-700 absolute top-0 min-h-[400px] max-h-auto h-[400px] left-full bg-white z-30 overflow-y-auto"
        style={{ width: "1100px" }}
      >
        {isEmpty(data) && <EmptyStore />}
        {data && (
          <div className="p-4" style={{ columnCount: 3 }}>
            {data?.map((item: any, index: number) => {
              return (
                <div
                  key={item?.id || index}
                  className="cursor-pointer p-1 text-[#585858] w-full"
                >
                  <span
                    className="font-semibold py-4 hover:text-blue-300 text-black w-full"
                    // onClick={() =>
                    //   router.push({
                    //     pathname: `/${router.query?.detect[0]}/category`,
                    //     query: {
                    //       fparentid: item?.id,
                    //     },
                    //   })
                    // }
                  >
                    {item.itemname || item?.name}
                  </span>
                  {item?.children.map((item: any, index: number) => {
                    return (
                      <HelpMegaMenuPopover
                        index={index}
                        data={item}
                        key={item?.id || index}
                        showType={false}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

const EmptyStore = () => {
  return (
    <div className="flex items-center justify-center w-full h-[80%]">
      <div className="flex flex-col items-center justify-center px-10 py-7 border rounded-lg border-dashed border-gray-300">
        <div className="mb-2">
          <i className="far fa-person-dolly-empty text-2xl text-gray-500" />
        </div>
        <div className="text-gray-700">Хоосон байна</div>
      </div>
      <style>
        {`
          .scroll::-webkit-scrollbar {
            width:5px;
            background:white;
          }
          .scroll::-webkit-scrollbar-thumb {
            background:#E0E0E0;
            border-radius:10px;
          }
        `}
      </style>
      ;
    </div>
  );
};

export default HelpMegaMenu;
