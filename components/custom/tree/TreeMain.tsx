import { FC, useEffect, useState, useContext } from "react";
import TreeItem from "./TreeItem";
import { renderPositionType, prepareIsOpen } from "util/helper";
import _ from "lodash";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

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
};

const TreeMain: FC<PropsType> = ({
  color,
  rawDatasrc,
  customClassName,
  customStyle,
  defaultSelectedId,
  indent,
  itemStyle,
  onClickItem = () => null,
}) => {
  const { widgetnemgooReady, positionConfig } =
    useContext(WidgetWrapperContext);

  // console.log(defaultSelectedId, "asdasdasd");
  if (_.isEmpty(rawDatasrc)) return null;

  const [selectedId, setSelectedId] = useState<any>(defaultSelectedId);
  const [readyDatasrc, setDatasrc] = useState<any>(
    prepareIsOpen(rawDatasrc, selectedId, positionConfig)[0] || []
  );

  const toggleIsOpen = (item: any, itemIndex: number) => {
    setSelectedId(item?.id);
    const tempArray = [...readyDatasrc];
    tempArray[itemIndex] = {
      ...item,
      isOpen: !item?.isOpen,
    };
    setDatasrc([...tempArray]);

    return null;
  };
  // console.log("selceted", selectedId);
  useEffect(() => {
    setDatasrc(
      prepareIsOpen(readyDatasrc, selectedId, positionConfig)[0] || []
    );
  }, [selectedId]);

  return (
    <ul className={`${customClassName} `} style={{ ...customStyle }}>
      {readyDatasrc.map((item: any, index: number) => {
        const selected =
          selectedId === renderPositionType(item, "position0", positionConfig);
        if (selectedId === item?.id) {
          if (item.children) {
            item.isOpen = !item?.isOpen;
          }
        }
        return (
          <li
            key={item?.id || index}
            className={`relative ${
              item.icon || item?.profilephoto ? "  " : ``
            } `}
            // onClick={() => toggleIsOpen(item, index)}
          >
            {/* {item.icon && (
              // <img
              // 	src={`https://dev.veritech.mn/${item.icon}`}
              // 	alt="icon"
              // 	width="16"
              // 	height="14"
              // 	className="absolute left-0 top-2 z-10"
              // />
              <AtomIcon
                // item={item.icon}
                item={"fa-regular fa-briefcase"}
                color="weekly"
                customClassName="absolute left-0"
              />
            )} */}

            <TreeItem
              key={item?.id || index}
              item={item}
              positionConfig={positionConfig}
              color={color}
              customClassName={`text-[16px] hover:bg-gray-100  ${itemStyle} ${
                selected ? "text-[#699BF7]" : `text-citizen-blue`
              }`}
              selected={selected}
              itemIndex={index}
              // onClickItem={(e: any) => {
              //   onClickItem(e);
              // }}
              onArrowClickItem={(item: any, itemIndex: number) => {
                toggleIsOpen(item, itemIndex);
              }}
            />
            {!_.isEmpty(item?.children) && item?.isOpen && (
              <div className="submenu ml-6">
                <TreeMain
                  // config={config}
                  color={color}
                  rawDatasrc={item?.children}
                  widgetnemgooReady={widgetnemgooReady}
                  customClassName={`ml-${indent}`}
                  defaultSelectedId={selectedId}
                  indent={indent}
                  onClickItem={onClickItem}
                  itemStyle={itemStyle}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TreeMain;
