import RenderAtom from "@/components/common/Atom/RenderAtom";
// import { AtomIcon, AtomTag } from "@components/common/Atom";
import AtomIcon from "@/components/common/Atom/atomIcon";
import AtomTag from "@/components/common/Atom/atomTag";
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
};

const TreeItem: FC<PropsTypeItem> = ({
  item,
  positionConfig,
  color,
  customClassName,
  selected,
  onClickItem,
  onArrowClickItem,
  itemIndex,
}) => {
  // console.log("item", item);
  let linkPath = jsonParse(positionConfig?.position1?.widgetnemgooReady);

  const withChildren = !_.isEmpty(item?.children);
  const router = useRouter();
  const handlerChangeEvent = (e: any, i: any) => {
    let linkPaths = item?.position1?.positionnemgoo.url;
    onArrowClickItem(item, itemIndex);
    const path = {
      pathname: linkPaths?.path,
      query: linkPaths?.query,
    };
    router.push({ ...path }, undefined, { shallow: true, scroll: false });
    // console.log("path :>> ", linkPath);
    // console.log("path :>> ", path);
    // console.log("s :>> ", i);
    // if (withChildren) {
    //   onArrowClickItem(item, itemIndex);
    // } else {
    //   // onClickItem(item);
    // }
  };

  return (
    <div
      className={`flex w-full justify-between text-gray-800 group  group-hover:text-[${color}] cursor-pointer items-center relative   px-3 leading-[16px]  ${customClassName}`}
      onClick={(e) => handlerChangeEvent(e, item)}
    >
      {item.icon && (
        <AtomIcon
          // item={item.icon}
          item={{ value: item?.icon || item?.profilephoto }}
          color="weekly"
          customClassName={` ml-1 fa-light w-6 group-hover:text-[${color}] ${
            selected ? `text-[${color}]` : "text-[#585858]"
          } `}
        />
      )}
      <div className={`w-full group-hover:text-[${color}]`}>
        <RenderAtom
          item={item?.position1}
          renderType="title"
          customClassName={` w-full justify-start p-0 font-normal group-hover:text-[${color}] ${
            item.icon && "pl-2"
          } ${selected ? `text-[${color}] ` : "text-gray-800"}`}
          customStyle={{ lineHeight: "17px" }}
        />
        {/* {item.name} */}
      </div>
      <AtomTag
        item={renderPositionType(item, "position4", positionConfig)}
        type="gray"
        position="inset-y-0 right-0"
        zeroShow={false}
      />
      {withChildren ? (
        <AtomIcon
          item={`far fa-chevron-${
            item.isOpen ? "down" : "right"
          } text-gray-700`}
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
            customClassName={`text-[12px] min-w-[20px] flex items-center justify-center rounded-[5px] p-1  relative  -right-3 ${
              selected ? `border-[${color}]` : "border-[#E1E1E1]"
            } hover:text-[${color}] border`}
            customStyle={{ color: selected ? color : "#E1E1E1" }}
          />
        ))
      )}
    </div>
  );
};

export default TreeItem;
