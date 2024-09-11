import RenderAtom from "@/components/common/Atom/RenderAtom";
import AtomIcon from "@/components/common/Atom/atomIcon";
import AtomTag from "@/components/common/Atom/atomTag";
import { Tooltip } from "antd";
import _ from "lodash";
import { useRouter } from "next/router";
import { FC } from "react";
import { jsonParse, renderPositionType } from "util/helper";

type PropsTypeItem = {
  item: any;
  positionConfig: any;
  color?: string;
  customClassName?: string;
  selected: boolean;
  onClickItem?: any;
  onArrowClickItem?: any;
  itemIndex: number;
  setSelectedid?: any;
  subMenuItem?: any;
};

const CustomThreeItem: FC<PropsTypeItem> = ({
  item,
  positionConfig,
  color,
  customClassName,
  selected,
  onClickItem,
  onArrowClickItem,
  itemIndex,
  setSelectedid,
  subMenuItem,
}) => {
  // console.log("item", item);
  let linkPath = jsonParse(positionConfig?.position1?.widgetnemgooReady);

  const withChildren = !_.isEmpty(item?.children);
  const router = useRouter();
  const handlerChangeEvent = (e: any, i: any) => {
    setSelectedid(i?.id);
    let linkPaths = item?.position1?.positionnemgoo.url;
    let parentid = router.query.lparentid;

    const path = {
      pathname: "/lessons/content",
      query: {
        filterid: i.id,
        lparentid: parentid,
      },
    };
    router.push({ ...path }, undefined, { shallow: false, scroll: false });
    const parent = {
      name: i?.name,
      id: i.id,
      parentid: i?.parentid,
    };
    const itemParent =
      (localStorage.getItem("item") &&
        JSON.parse(localStorage.getItem("item") || "")) ||
      {};

    if (parentid == i?.parentid) {
      localStorage.setItem("parent", JSON.stringify(parent));
      localStorage.removeItem("item");
      localStorage.removeItem("item1");
    } else {
      if (itemParent) {
        localStorage.setItem("item1", JSON.stringify(parent));
      } else {
        localStorage.setItem("item", JSON.stringify(parent));
        localStorage.removeItem("item1");
      }
    }
  };

  return (
    <div
      className={`flex w-full justify-between text-gray-800  leading-none cursor-pointer items-center relative hover:text-blue-400 ddd ${
        item?.ismain == 0 ? "hidden" : ""
      } ${customClassName}`}
    >
      {subMenuItem ? "" : ""}
      {item.icon && (
        <AtomIcon
          // item={item.icon}
          item={` ${item?.icon}` || item?.profilephoto}
          color="weekly"
          customClassName={`absolute ml-1 fa-light left-0 hover:text-[#699BF7] ${
            selected ? `text-[#699BF7]` : "text-[#585858]"
          } `}
        />
      )}
      <div
        className={`text-[16px] leading-[18px] line-clamp-1 ${
          selected ? "text-[#699BF7]" : "text-[#585858]"
        } hover:text-[#699BF7] w-full`}
        // onClick={() => onArrowClickItem(item, itemIndex)}
        onClick={(e) => handlerChangeEvent(e, item)}
      >
        {/* <RenderAtom
          item={item?.position1}
          renderType="title"
          customClassName={`text-sm w-full justify-start p-0 font-normal hover:text-[${color}] ${
            item.icon && "pl-3"
          } ${selected ? `text-[${color}] font-semibold` : "text-gray-800"}`}
        /> */}
        <Tooltip title={item?.name}> {item.name}</Tooltip>
      </div>
      <AtomTag
        item={renderPositionType(item, "position4", positionConfig)}
        type="gray"
        position="inset-y-0 right-0"
        zeroShow={false}
      />
      {withChildren ? (
        <AtomIcon
          item={{
            value: `far  fa-chevron-${
              item.isOpen ? "down" : "right"
            } text-gray-700 relative z-50  w-10 text-right fa-xs w-10 h-6  py-4 px-1'} `,
          }}
          color="weekly"
          onClick={() => {
            onArrowClickItem(item, itemIndex);
          }}
        />
      ) : (
        item?.taskcount ||
        (item?.cnt && (
          <RenderAtom
            item={{ value: item?.taskcount || item?.cnt }}
            renderType="text"
            customClassName={`text-[12px] rounded-[5px] p-1 ${
              selected ? `border-[${color}]` : "border-[#E1E1E1]"
            } hover:text-[${color}] border`}
            customStyle={{ color: selected ? color : "#E1E1E1" }}
          />
        ))
      )}
    </div>
  );
};

export default CustomThreeItem;
