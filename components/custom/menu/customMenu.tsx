import { FC, useEffect, useState, useContext } from "react";
// import TreeItem from "./TreeItem";
// import { renderPositionType, prepareIsOpen } from "@/util/helper";
import _ from "lodash";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import CustomThreeItem from "./customThreeItem";
import SubMenu from "antd/es/menu/SubMenu";

type PropsType = {
  rawDatasrc?: any;
  widgetnemgooReady?: any;
  color?: string;
  customClassName?: string;
  customStyle?: any;
  defaultSelectedId?: any;
  indent?: number;
  onClickItem?: any;
  itemStyle?: any;
  subitem?: boolean;
  item?: any;
};

const CustomMenu: FC<PropsType> = ({
  color,
  rawDatasrc,
  customClassName,
  customStyle,
  defaultSelectedId,
  indent,
  itemStyle,
  subitem,
  item,
  onClickItem = () => null,
}) => {
  const {
    config,
    widgetnemgooReady,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
  } = useContext(WidgetWrapperContext);

  if (_.isEmpty(rawDatasrc)) return <span>no data</span>;

  // console.log(defaultSelectedId, "asdasdasd");
  const [selectedId, setSelectedId] = useState<any>(defaultSelectedId);

  function prepareIsOpen(
    readyDatasrc: any,
    selectedId: any,
    selectedIsOpen = false
  ) {
    let newDatasrc = [...readyDatasrc];
    let found = false;
    readyDatasrc.map((item: any, index: number) => {
      const selected = Number(selectedId) === item?.id;
      if (selected) {
        newDatasrc[index].isOpen = selectedIsOpen; //selected node нь default-оор онгойх эсэх
        found = true;
      } else {
        newDatasrc[index].isOpen = false;
      }

      if (item?.children) {
        let sss = prepareIsOpen(item?.children, selectedId, selectedIsOpen);
        if (sss[1]) {
          newDatasrc[index].isOpen = true;
          found = true;
        }
      }
    });

    return [newDatasrc, found];
  }
  const [readyDatasrc, setDatasrc] = useState<any>(
    prepareIsOpen(rawDatasrc, selectedId, true)[0] || []
  );

  const toggleIsOpen = (item: any, itemIndex: number) => {
    // setSelectedId(item?.id);
    const tempArray = [...readyDatasrc];
    tempArray[itemIndex] = {
      ...item,
      isOpen: !item?.isOpen,
    };
    setDatasrc([...tempArray]);

    const parent = {
      name: item?.name,
      id: item.id,
    };

    // localStorage?.setItem("parent", JSON.stringify(parent));

    return null;
  };

  // useEffect(() => {
  //   setDatasrc(prepareIsOpen(rawDatasrc, selectedId)[0] || []);
  // }, [selectedId]);

  return (
    <ul
      className={`${customClassName} vmenu`}
      style={{ ...customStyle }}
      data-attr="CustomMenu"
    >
      {readyDatasrc.map((item: any, index: number) => {
        return (
          <li
            key={item?.id || index}
            className={`relative font-normal text-lg itemmenu-${index} ${
              item.icon || item?.profilephoto ? " pl-0 " : `pr-0`
            } `}
          >
            <CustomThreeItem
              key={item?.id || index}
              item={item}
              positionConfig={positionConfig}
              color={color}
              customClassName={` hover:bg-gray-100 py-1 pr-2 ${itemStyle} ${
                Number(selectedId) == item?.id
                  ? "text-[#699BF7]"
                  : `text-citizen-blue`
              }`}
              selected={selectedId == item?.id}
              itemIndex={index}
              setSelectedid={setSelectedId}
              // onClickItem={(e: any) => {
              //   onClickItem(e);
              // }}
              onArrowClickItem={(item: any, itemIndex: number) => {
                toggleIsOpen(item, itemIndex);
              }}
              subMenuItem={subitem}
            />
            {!_.isEmpty(item?.children) && item?.isOpen && (
              <div className="submenu relative ">
                <CustomMenu
                  // config={config}
                  color={color}
                  rawDatasrc={item?.children}
                  widgetnemgooReady={widgetnemgooReady}
                  customClassName={`ml-${indent} `}
                  defaultSelectedId={selectedId}
                  indent={indent}
                  onClickItem={onClickItem}
                  itemStyle={itemStyle}
                  subitem={true}
                  item={item}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CustomMenu;
