import { useContext, useState } from "react";
import { Tabs } from "antd";
import Horizantal from "./horizantal";
import _ from "lodash";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { motion } from "framer-motion";

const ErpCard = () => {
  const { widgetnemgooReady, readyDatasrc } = useContext(WidgetWrapperContext);
  const { cardType, viewList } = widgetnemgooReady?.options;

  const cardContent = (item: any, index: number) => {
    switch (cardType) {
      case "horizantal":
        return <Horizantal item={item} index={index} />;
    }
  };

  return (
    <div className="pl-5 pr-10">
      <div className="w-full flex justify-between items-center py-[10px]">
        <RenderAtom
          item={{ value: readyDatasrc[0]?.parentname || "Бүгд" }}
          renderType="title"
          customClassName={"text-[#585858] font-medium text-[20px]"}
        />
        {/* <Tabs
          className="z-10"
          defaultActiveKey="1"
          items={[
            {
              label: `Онцлох`,
              key: "1",
            },
            {
              label: `Эрэлттэй`,
              key: "2",
            },
            {
              label: `Шинээр нэмэгдсэн`,
              key: "3",
            },
          ]}
        /> */}
      </div>
      <motion.div
        className={`grid 2xl:grid-cols-6 xl:grid-cols-5  lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-4 pt-2 pb-10`}
      >
        {readyDatasrc?.map((item: any, index: number) => {
          return cardContent(item, index);
        })}
      </motion.div>
      <style>
        {`
			.ant-tabs-top > .ant-tabs-nav::before {
				border-bottom:none;
			}
      .ant-tabs-top > .ant-tabs-nav {
        margin:0;
      }
      .ant-tabs-tab {
        padding:6px 0;
      }
		`}
      </style>
    </div>
  );
};

export default ErpCard;
