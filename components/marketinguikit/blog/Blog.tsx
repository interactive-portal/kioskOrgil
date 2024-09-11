import { Rate } from "antd";
import _ from "lodash";
import { useContext, useState } from "react";
import { groupEnd } from "console";
import { TabsProps, Tabs } from "antd";
import { useRouter } from "next/router";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function Blog() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const { settings } = widgetnemgooReady || "";
  const [filterItem, setFilterItem]: any = useState();
  const [active, setActive] = useState(0);
  const router = useRouter();
  let newArr = _.map(readyDatasrc, (o) => _.pick(o, ["filtertype"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "filtertype")));

  const clickAllEvent = () => {
    setActive(100);
    setFilterItem("");
  };

  let dataSrc: any = readyDatasrc;
  const selectdata = _.filter(readyDatasrc, {
    filtertype: filterItem,
  });

  if (filterItem) {
    dataSrc = selectdata;
  }

  const [number, setNumber] = useState<any>(2);
  const onFilterEvent = (e: any, item: any) => {
    e.preventDefault();
    setFilterItem(item);
  };

  //filterType байхгүй үед харуулах Tab
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
    <div>
      <div className=" w-full">
        <BlockDiv customClassName="w-full pb-6 lg:px-2" divNumber="divFilter">
          <BlockDiv customClassName="w-full " divNumber="divSetctionTitle">
            <RenderAtom
              item={{ value: settings?.sectionTitle }}
              renderType="title"
              customClassName=" text-[#585858] xs:ml-4 lg:ml-0"
              customStyle={{ lineHeight: "40px" }}
              customProps={{
                truncateRow: 3,
              }}
            />
          </BlockDiv>
          <BlockDiv
            customClassName="flex item-center "
            divNumber="divSetctionFilter"
          >
            <ul className="hidden md:flex gap-6 items-center w-max text-[#67748E]">
              {grouped.length >= 0 ? (
                <Tabs
                  defaultActiveKey="1"
                  items={items}
                  className="border-none "
                />
              ) : (
                grouped.map((item: any, index: any) => {
                  return (
                    <li
                      key={index}
                      className={`list-item cursor-pointer hover:border-b-2 hover:border-blue-400   text-[16px] py-2 border-b-2 ${
                        active === index
                          ? "border-blue-400 text-blue-400"
                          : "hover:text-blue-400 border-gray-100"
                      }`}
                      onClick={(e: any) => {
                        onFilterEvent(e, item);
                      }}
                    >
                      <span onClick={() => setActive(index)}>
                        {item === "undefined" ? "" : item}
                      </span>
                    </li>
                  );
                })
              )}
            </ul>
          </BlockDiv>
        </BlockDiv>
        {/* {settings?.controlTypeList && (
          <div className="flex justify-end w-full gap-4 py-2">
            {controlViewTypeList.map((item, index) => {
              return (
                <>
                  <span
                    className={`fas fa-${item?.icon}  cursor-pointer  ${
                      number === index ? "text-[#3C3C3C]" : "text-gray-400"
                    }`}
                    onClick={() => {
                      setNumber(index);
                    }}
                  ></span>
                </>
              );
            })}
          </div>
        )} */}
        {/* <div className="my-2">
          <RenderAtom
            item={{ value: "Санхүүгийн удирдлага" }}
            renderType="text"
            customClassName={"pl-5 my-2 text-[20px] leading-[24px]"}
          />
        </div> */}

        <div
          className={`${
            settings?.gridTitle ? "mx-5" : "max-w-lpcontainer"
          } mx-auto min-h-fit`}
        >
          {settings?.gridTitle && (
            <p className="text-[20px] font-medium my-5 text-[#585858]">
              {dataSrc[0]?.parentname}
            </p>
          )}
          <BlockDiv
            customClassName="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 xs:px-4 md:px-1"
            divNumber="DivGrid"
          >
            {dataSrc
              .slice(0, settings?.displayView)
              .map((item: any, index: any) => {
                // console.log(item?.position2);
                return (
                  <div
                    className={` transition-all animate-fade-in-up bg-gray-100`}
                    key={item?.id || index}
                  >
                    <div className=" bg-cover rounded-lg relative">
                      {item?.typeid == "16626898597719" && (
                        <div
                          className="absolute left-[36%] top-[30%] w-[83px] h-[83px] rounded-full bg-white/40 flex items-center justify-center
                              cursor-pointer z-10
                              "
                          onClick={() =>
                            router.push({
                              pathname: "/video/detail",
                              query: {
                                filterid: item?.id,
                              },
                            })
                          }
                        >
                          <i className="fa-duotone fa-play fa-2xl text-white"></i>
                        </div>
                      )}

                      <RenderAtom
                        item={
                          (item?.position2?.value !== "" &&
                            item?.position2) || {
                            value: settings?.defaultImage,
                          }
                        }
                        renderType="image"
                        customClassName="rounded-t-lg min-h-[185px] h-[185px] brightness-90"
                      ></RenderAtom>

                      {item?.position30 && (
                        <RenderAtom
                          item={item?.position30}
                          renderType="text"
                          customClassName={
                            "absolute text-black top-6 right-0 bg-white px-4 py-1 font-semibold text-[#585858]"
                          }
                          customStyle={{
                            borderRadius: "20px 0px 0px 20px",
                          }}
                        />
                      )}
                    </div>
                    <BlockDiv
                      customClassName="pb-2 px-4 pt-5 border-b-lg border-gray-300 rounded-b-lg max-h-auto"
                      divNumber={"BlogCardContainerDiv"}
                      customStyle={{
                        minHeight: "125px",
                      }}
                    >
                      <RenderAtom
                        item={
                          item?.position40 || { value: "Ангилал оруулна уу" }
                        }
                        renderType="text"
                        customClassName="text-sm "
                        customStyle={{ color: "#A0A0A0 " }}
                        customProps={{
                          truncateRow: 3,
                        }}
                        customDivNumber={"BlogTitle"}
                      />

                      <span className="py-2">
                        <Rate
                          allowHalf
                          value={Number(item?.stars || 4)}
                          disabled
                          className="text-sm m2-4"
                          style={{ color: "#FFBB00" }}
                        />
                        <span className="text-[#A0A0A0] pl-2 xl:text-[12px] lg:text-[10px]">
                          ({item?.stars || 5})
                        </span>
                      </span>
                      <span className="text-[#A0A0A0] ml-4 text-[12px]">
                        <i className="fa-light fa-eye text-[12px] mr-1"></i>
                        {item?.seencnt}
                      </span>
                      <RenderAtom
                        item={item?.position1 || { value: "гарчиг оруулах" }}
                        renderType="text"
                        customClassName="text-[#585858] font-bold text-[16px] hover:text-blue-400 my-1 flex h-[30px] items-center"
                        customStyle={{ lineHeight: "20px" }}
                        customProps={{
                          truncateRow: 2,
                        }}
                      />
                    </BlockDiv>
                  </div>
                );
              })}
          </BlockDiv>
        </div>
        <div
          className="w-full flex items-center justify-center mt-[26px] cursor-pointer"
          onClick={() =>
            router.push({
              pathname: "/video/detail",
            })
          }
        >
          <button className="bg-[#699BF7] text-white font-medium flex items-center cursor-pointer rounded-[30px] px-[20px] py-[15px]">
            Бүгдийг харах
            <i className="fa-light fa-arrow-right ml-3"></i>
          </button>
        </div>
      </div>
      <style>
        {`
			.ant-rate-star{
				margin-right:0px !important
			}
      .ant-rate {
        font-size:16px;
      }
		`}
      </style>
    </div>
  );
}
const controlViewTypeList = [
  {
    icon: "fas fa-list",
    tooltip: {
      text: "Жагсаалт хэлбэрээр харах",
    },
  },
  {
    icon: "fas fa-grid-2",
    tooltip: {
      text: "Зураг хэлбэрээр харах",
    },
  },
  {
    icon: "fas fa-grid",
    tooltip: {
      text: "Карт хэлбэрээр харах",
    },
  },
];
