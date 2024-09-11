import _ from "lodash";
import { useContext, useRef, useState, useEffect } from "react";
import parseHtml from "html-react-parser";
import { decode } from "html-entities";
import { useRouter } from "next/router";
import { Dropdown } from "antd";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { listToTree } from "@/util/helper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

function Faq1() {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [openValue, setOpenValue] = useState(true);
  const [state, setState] = useState(false);
  const modal = document.getElementById("searchValue");
  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // if (ref.current && !ref.current.contains<>(event.target)) {
      setOpenValue(false);
      // }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, openValue]);

  const { filterName } = widgetnemgooReady?.settings || "";
  // console.log("Faq1 selectdata", groupByData);
  const groupByData = _.chain(readyDatasrc)
    .groupBy(filterName || "categoryname")
    .map((value, key, wrapped) => {
      return { name: key, children: value, icon: value[0]?.icon };
    })
    .value();
  const groupByData1 = listToTree(readyDatasrc, {
    parentKey: filterName || "categoryname",
  });

  const Highlighted = (text: any, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }

    var regexs = /(<([^>]+)>)/gi;
    const result = text?.replace(regexs, "").replace(/&lt;.+?&gt;/g, "");
    const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, "gi");
    const parts = result?.split(regex);
    if (parts.length !== 1) {
      return (
        <span>
          {parts
            ?.filter((part: any) => part)
            ?.map((part: any, i: number) =>
              regex.test(part) ? (
                <mark className="bg-yellow-400" key={i}>
                  {part}
                </mark>
              ) : (
                <span className="" key={i}>
                  {part}
                </span>
              )
            )}
        </span>
      );
    } else {
      return;
    }
  };
  const filterValue = readyDatasrc?.map((item: any, index: number) => {
    if (Highlighted(item.name, searchValue)) {
      return (
        <li
          key={item?.id || index}
          className=" mb-4 bg-gray-100 my-1 mx-4 cursor-pointer rounded hover:bg-gray-200 w-11/12 "
          onClick={() =>
            router.push({
              pathname: "/faq",
              query: {
                item: item?.id,
                parentid: item?.parentid,
              },
            })
          }
        >
          <div className="px-4 py-2 line-clamp-5 overflow-hidden mb-4">
            <p className="font-semibold">
              {Highlighted(item.name, searchValue)}
            </p>
          </div>
        </li>
      );
    }
  });

  // console.log(groupByData);
  // const mainData = _.values(groupByData);

  const readyData = filterName ? groupByData1 : groupByData;

  return (
    <>
      <BlockDiv
        customClassName="w-full pb-6 lg:px-2 bg-gray-100 "
        divNumber="divWrapper"
      >
        <BlockDiv
          customClassName="max-w-lpcontainer mx-auto"
          divNumber="divContainer"
        >
          <BlockDiv
            customClassName="lg:py-20 lg:px-0 md:px-8 xs:py-0"
            divNumber="divArticle"
          >
            <BlockDiv
              customClassName="px-4 xl:px-0 lg:pb-10 xs:pb-1"
              divNumber="divSetcionTitle"
            >
              {/* <AtomSearch item={groupByData[0]?.rows} /> */}
              <div className="flex flex-col lg:flex-row flex-wrap">
                <div className="mt-4 lg:mt-0 lg:w-3/5">
                  <div className="">
                    <p
                      className="text-3xl ml-2 lg:ml-0 lg:text-4xl font-bold text-gray-900 tracking-normal lg:w-11/12 xs:ml-0 my-1 h-auto"
                      style={{
                        color: "#585858",
                      }}
                    >
                      Түгээмэл асуултууд
                    </p>
                    {/* <RenderAtom
                      item={{ value: "Түгээмэл асуултууд" }}
                      defaultAtom="title"
                      customClassName="  text-3xl ml-2 lg:ml-0 lg:text-4xl font-bold text-gray-900 tracking-normal lg:w-11/12 xs:ml-0 my-1 h-auto"
                      customStyle={{ lineHeight: "40px", color: "#585858" }}
                      customProps={{
                        truncateRow: 3,
                      }}
                    /> */}
                  </div>
                </div>
                <div className="lg:w-2/5 flex mt-10 lg:ml-0 lg:mt-0 lg:justify-end xs:w-full xs:mx-0 xs:justify-start xs:mt-2">
                  <div className="pt-2 relative  text-gray-600 w-[405px]">
                    <svg
                      className=" h-4 w-4 fill-current absolute top-5 left-4 text-[#A0A0A0]"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 56.966 56.966"
                      width="512px"
                      height="512px"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                    <input
                      className="focus:ring-0 focus:ring-offset-0 border-[] w-full border-none text-[#A0A0A0] focus:ring-gray-400 bg-white h-10 px-5 pl-12 rounded-lg focus:outline-none text-[16px] "
                      style={{
                        color: "#A0A0A0",
                      }}
                      value={searchValue}
                      type="search"
                      name="search"
                      placeholder="Түгээмэл асуулт хайх..."
                      onChange={(event) => setSearchValue(event.target.value)}
                      onClick={() => setOpenValue(true)}
                    />
                    <button
                      type="submit"
                      className="focus:ring-2 focus:ring-offset-2 text-gray-600 focus:text-indigo-700 focus:rounded-full  focus:bg-gray-100 focus:ring-indigo-700 bg-white focus:outline-none absolute right-0 top-0 mt-5 mr-4"
                    ></button>
                    {searchValue && openValue && (
                      <div
                        data-ref={ref}
                        className="absolute top-0 max-h-[500px] w-[100%] rounded-[10px] left-0 right-0 -z-10 bg-white mt-6 overflow-hidden -thumb-gray-300 border scrollbar-track-gray-100 scrollbar-thin hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full shadow pt-[45px] px-3"
                        id="searchValue"
                      >
                        <ul>{filterValue}</ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </BlockDiv>

            <BlockDiv customClassName="px-6 xl:px-0" divNumber="divFaqContent">
              <BlockDiv
                className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 xs:px-2 md:px-1"
                divNumber="divFaqGrid"
              >
                {readyData?.map((item: any, index: any) => {
                  return (
                    <div role="cell" className="bg-gray-100" key={index}>
                      <div className="bg-white p-5 rounded-md relative h-full w-full">
                        <span className="bg-gray-200 p-2 mb-5 rounded-full w-10 h-10 flex items-start justify-center">
                          <i
                            className={` fa ${item.icon}
                          ${
                            index == 0
                              ? "text-[#5044e4]"
                              : index == 1
                              ? "text-[#05966b]"
                              : index == 2
                              ? "text-[#de2675]"
                              : index == 3
                              ? "text-[#d77506]"
                              : index == 4
                              ? "text-[#d22623]"
                              : "text-[#5044e4]"
                          }
                          `}
                          >
                            {" "}
                          </i>
                          {/* <img
														className="bg-gray-200 p-2 mb-5 rounded-full"
														src="https://i.ibb.co/27R6nk5/home-1.png"
														alt="home-1"
													/> */}
                        </span>

                        <RenderAtom
                          item={{ value: item.name }}
                          defaultAtom="text"
                          customClassName="pb-4 text-2xl font-semibold "
                          // customStyle={{ color: "#009BDE " }}
                          customProps={{
                            truncateRow: 3,
                          }}
                        />
                        <div className="my-4">
                          {item?.children
                            .slice(0, 5)
                            .map((rowItem: any, index: any) => {
                              return (
                                <FaqItem
                                  rowItem={rowItem}
                                  key={index}
                                  index={index}
                                  filterName={filterName}
                                />
                              );
                            })}
                        </div>
                        {filterName && item?.children.length >= 5 && (
                          <button
                            className="text-[#4736de] cursor-pointer font-semibold flex items-center"
                            onClick={() =>
                              router.push(
                                {
                                  pathname: "/faq",
                                  query: {
                                    parentid: item?.id,
                                    item: item?.children[0]?.id,
                                  },
                                },
                                undefined,
                                { shallow: false }
                              )
                            }
                          >
                            Цааш үзэх
                            <i className="fa-regular fa-arrow-right-long text-[#4736de] ml-2"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </BlockDiv>
            </BlockDiv>
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </>
  );
}

export default Faq1;

const FaqItem = ({ rowItem, index, filterName }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="flex pb-2 dark:border-gray-700 items-baseline cursor-pointer w-full space-x-3 hover::text-gray-300"
        key={index}
      >
        {open ? (
          <i
            className="fa-solid fa-chevron-down fa-xs"
            onClick={() => setOpen(!open)}
          ></i>
        ) : (
          <i
            className="fa-solid fa-chevron-right fa-xs"
            onClick={() => setOpen(!open)}
          ></i>
        )}
        {/* <h4 className="text-md mb-0 text-gray-900 dark:text-gray-100 hover:text-gray-400">
																		{rowItem.name}
																	</h4> */}
        <RenderAtom
          item={
            rowItem?.position1 || {
              value: rowItem?.name,
            }
          }
          defaultAtom="text"
          customClassName="text-md mb-0 text-gray-900 hover:text-gray-400 font-medium"
          // customStyle={{ color: "#009BDE " }}
          customProps={{
            truncateRow: 3,
          }}
        />
      </div>

      {filterName && open && (
        <div className="relative left-5 opacity-80 animate-fade-in-down py-2 pb-4 pr-7 pl-1 text-justify">
          {parseHtml(decode(rowItem?.description))}
        </div>
      )}
    </>
  );
};
