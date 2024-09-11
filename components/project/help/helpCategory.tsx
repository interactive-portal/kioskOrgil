import { listToTree } from "@/util/helper";
import { useContext } from "react";
import { useRouter } from "next/router";
import { Tabs, TabsProps } from "antd";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { motion } from "framer-motion";

const helpCategory = () => {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const { backgroundImage } = widgetnemgooReady;
  const readyData = listToTree(readyDatasrc, "parentid");
  const router = useRouter();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Онцлох`,
    },
    {
      key: "2",
      label: `Эрэлттэй`,
    },
    {
      key: "3",
      label: `Шинээр нэмэгдсэн`,
    },
  ];
  return (
    <motion.div className="max-w-lpcontainer mx-auto">
      <Tabs
        defaultActiveKey="1"
        items={items}
        className="border-none xs:px-4"
      />
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 xs:px-4 md:px-1">
        {readyData?.slice(0, 4)?.map((obj: any, index: number) => {
          return (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={index}
              className="col-span-1 w-auto h-[305px] rounded-lg p-5 cursor-pointer"
              style={{
                backgroundImage: `url(${backgroundImage[index]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPositionX: "center",
              }}
              onClick={() =>
                router.push({
                  pathname: "/category",
                  query: {
                    fparentid: obj?.id,
                  },
                })
              }
            >
              <p className="text-[22px] font-medium text-[#585858]">
                {obj?.name}
              </p>
              <p className="text-[18px] text-[#67748E]">{obj?.cnt} мэдлэг</p>
            </motion.div>
          );
        })}
      </div>
      <div
        className="w-full flex items-center justify-center mt-[26px] cursor-pointer"
        onClick={() =>
          router.push({
            pathname: "/allcategory",
          })
        }
      >
        <button className="bg-[#699BF7] text-white flex items-center cursor-pointer rounded-[30px] font-medium px-[20px] py-[15px]">
          Бүгдийг харах
          <i className="fa-light fa-arrow-right ml-3"></i>
        </button>
      </div>
      <style>
        {`
          .ant-tabs-nav {
            border-bottom:none;
          }
          `}
      </style>
    </motion.div>
  );
};

export default helpCategory;
