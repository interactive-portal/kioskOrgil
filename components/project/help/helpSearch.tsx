import { FC, useState, useContext, useEffect, useRef } from "react";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import fetchJson from "@/lib/fetchJson";
import { Empty } from "antd";
import useCallDataview from "@/middleware/dataHook/useCallDataview";
import { listToTree } from "@/util/helper";

type PropsType = {
  item?: any;
  settings?: any;
  color?: string;
  customClassName?: string;
  customStyle?: any;
  truncateRow?: number;
  indicatorid?: any;
};

const HelpSearch: FC<PropsType> = ({
  item,
  color = "citizen",
  customClassName = "",
  customStyle,
  settings,
  truncateRow = 0,
  indicatorid,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [listData, setListData] = useState<any>();
  const { callDataview } = useCallDataview();
  const router = useRouter();

  const getData = async () => {
    const result = await callDataview({
      metaid: "1681459432395324",
      criteria: {
        name: [
          {
            operator: "like",
            operand: `%${searchValue}%`,
          },
        ],
      },
      silent: true,
    });
    if (!_.isEmpty(result)) {
      setListData(result);
    }
  };

  useEffect(() => {
    getData();
  }, [searchValue]);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
    }
  };

  const convertHtmlToText = (HtmlString: string) => {
    return HtmlString.replace(
      /<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g,
      ""
    );
  };

  const Highlighted = (text: any, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }

    var regexs = /(<([^>]+)>)/gi;
    const result = text?.replace(regexs, "").replace(/&lt;.+?&gt;/g, "");
    const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, "gi");
    const parts = result?.split(regex);

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
  };

  const ref = useRef<HTMLDivElement | undefined>(null);
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, openList]);

  const readyData = _.groupBy(listData, "typename");

  const filterDataTransform = (data: any) => {
    return Object.keys(readyData).map((item: any, key: any) => {
      return { childItem: data[item], pathname: item };
    });
  };

  const groupedData = filterDataTransform(readyData);
  const [length, setLength] = useState(5);

  const resultList = groupedData?.map((item: any, index: number) => {
    return (
      <li
        key={item?.id || index}
        className=" mb-4 bg-white my-1 mx-4 z-20 cursor-pointer rounded w-11/12 "
      >
        <div className=" pt-4 line-clamp-5 overflow-hidden z-20">
          <p className="font-bold text-[#585858] text-[14px]">
            {item?.pathname}
          </p>
          <ul>
            {item?.childItem?.slice(0, length)?.map((obj: any, index: any) => {
              return (
                <li
                  key={item?.id || index}
                  className="font-medium text-[14px] py-[10px] hover:bg-gray-100 px-2 rounded-lg flex items-center"
                  onClick={() =>
                    router.push({
                      pathname: "/lessons/content",
                      query: {
                        filterid: obj?.id,
                        lparentid: obj?.parentid,
                      },
                    })
                  }
                >
                  <div
                    className={`bg-[${
                      obj?.iconcolor || "#46CABF"
                    } ] min-w-[38px] h-[38px] flex items-center justify-center rounded-[10px]`}
                    style={{
                      backgroundColor: `${obj?.iconcolor || "#46CABF"}`,
                    }}
                  >
                    <i className={`${obj?.icon} fa-xl text-white`}></i>
                  </div>
                  <div className="ml-[10px] flex flex-col justify-evenly">
                    {Highlighted(obj.name, searchValue)}
                    <p className="text-[12px] text-[#A0A0A0] font-normal">
                      {obj?.categoryname}
                    </p>
                  </div>
                </li>
              );
            })}
            {item?.childItem.length > 5 &&
              item?.childItem.length !== length && (
                <button
                  className="cursor-pointer text-[#699BF7]"
                  onClick={() => setLength(item?.childItem?.length)}
                >
                  Бусад {item?.childItem.length - 5} илэрцийг харах
                </button>
              )}
          </ul>

          {/* <p className="">{Highlighted(item.name, searchValue)}</p> */}
        </div>
      </li>
    );
  });

  const className = `${
    !customClassName.includes("text-") && "text-lg leading-6"
  } ${!customClassName.includes("font-") && "font-bold"} ${customClassName}`;
  const style = {
    ...customStyle,
  };

  return (
    <>
      <div className="w-3/5 " data-ref={ref}>
        <div className="flex items-center justify-center">
          <div className="relative w-full  bg-white  ">
            <div className="flex relative flex-col items-center justify-center bg-white  rounded-full z-30 bg-inherit">
              <div className=" z-10 rounded-[70px] flex items-center w-full bg-[#F3F4F6] px-2 ">
                <i className="fa-regular fa-magnifying-glass px-3 text-[#67748E] font-bold"></i>
                <input
                  className=" bg-[#F3F4F6] md:block rounded-[30px] focus-visible:outline-0  text-[#67748E] w-full  py-1.5 text-[16px] font-medium text-lg"
                  placeholder="Хайлт ..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onClick={(event) => {
                    setOpenList(true);
                  }}
                />
              </div>
            </div>
            {searchValue.length > 0 && openList && (
              <div
                ref={ref as any}
                id="search_list"
                // onMouseDown={(event) => {
                //   console.log(event);
                //   if (!event) {
                //     setOpenList(false);
                //   }
                // }}
                // onMouseLeave={() => setOpenList(false)}
                className="absolute -top-[25px] max-h-[500px] w-[106%] rounded-[10px] -left-[9px] right-0 bg-white mt-6 overflow-hidden z-20 scrollbar-thumb-gray-300 border scrollbar-track-gray-100 scrollbar-thin hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full shadow pt-[45px]"
              >
                <ul className="z-20 ">
                  {resultList?.length > 0 ? (
                    resultList
                  ) : (
                    <Empty description={"Хайлтын илэрц олдсонгүй"} />
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>
        {`
			.scrollbar-thin::-webkit-scrollbar {
				width: 6px;
				cursor: pointer;
			  }

			  .scrollbar-thin::-webkit-scrollbar-thumb {
				border-radius: 20px;
				cursor: pointer;
			  }

			  .scrollbar-thin::-webkit-scrollbar-track {
				border-radius: 20px;
			  }
			`}
      </style>
    </>
  );
};

export default HelpSearch;
