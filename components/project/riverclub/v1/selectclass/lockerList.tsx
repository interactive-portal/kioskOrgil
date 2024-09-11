import _ from "lodash";
import useSWR from "swr";
import { FC, useEffect } from "react";
import Cookies from "js-cookie";
import fetchJson from "@/util/helper";

type PropsType = {
  selected?: any;
  setSelected?: any;
  gender?: any;
};

const LockerList: FC<PropsType> = ({ selected, setSelected, gender }) => {
  const criteria = JSON.stringify({
    lockerType: [
      {
        operator: "like",
        operand: `%${gender}%`,
      },
    ],
  });
  let {
    data: list,
    error,
    mutate,
  } = useSWR(`
/api/get-data?metaid=1712127875302801&criteria=${criteria}
`);

  if (_.isEmpty(list?.result)) {
    return;
  }

  function divideArray(arr: any) {
    const midIndex = Math.floor(arr.length / 2);
    const firstHalf = arr.slice(0, midIndex);
    const secondHalf = arr.slice(midIndex);
    return [firstHalf, secondHalf];
  }

  const orderList = _.orderBy(list?.result, ["lockernumber"], ["asc"]);
  const [firstHalf, secondHalf] = divideArray(
    _.filter(orderList, {
      id: null,
    })
  );

  console.log(selected);
  return (
    <div className="flex flex-col gap-y-10 items-center max-w-full gap-x-2 ">
      <div className="flex items-center max-w-full gap-x-4 overflow-x-scroll scroll pb-2">
        {firstHalf?.map((item: any, ind: number) => {
          if (item?.id == null) {
            return (
              <div
                className={`p-4 font-bold text-[28px] border border-[#BBD540] rounded-[11px] cursor-pointer

			  `}
                style={
                  selected == item
                    ? {
                        background:
                          item?.isgx == 0
                            ? "linear-gradient(180deg, #AE4A00 25.42%, #DB00FF 116.62%)"
                            : "linear-gradient(180deg, #ADFF00 0%, #0CB1AB 100%)",
                        WebkitTextFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                      }
                    : {}
                }
                key={ind}
                onClick={() => {
                  if (selected == item) {
                    setSelected(null);
                  } else {
                    setSelected(item);
                  }
                }}
              >
                {item?.lockernumber}
              </div>
            );
          }
        })}
      </div>
      <div className="flex items-center max-w-full gap-x-4 overflow-x-scroll scroll pb-2">
        {secondHalf?.map((item: any, ind: number) => {
          if (item?.id == null) {
            return (
              <div
                className={`p-4 font-bold text-[28px] border border-[#BBD540] rounded-[11px] cursor-pointer

			  `}
                style={
                  selected == item
                    ? {
                        background:
                          item?.isgx == 0
                            ? "linear-gradient(180deg, #AE4A00 25.42%, #DB00FF 116.62%)"
                            : "linear-gradient(180deg, #ADFF00 0%, #0CB1AB 100%)",
                        WebkitTextFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                      }
                    : {}
                }
                key={ind}
                onClick={() => {
                  if (selected == item) {
                    setSelected(null);
                  } else {
                    setSelected(item);
                  }
                }}
              >
                {item?.lockernumber}
              </div>
            );
          }
        })}
      </div>

      <style>
        {`
			.scroll::-webkit-scrollbar {
				width:2px;
				background:transparent;
				height:5px;
				padding:10px 10px;
			  }
			  .scroll::-webkit-scrollbar-thumb {
				background:#E0E0E0;
				border-radius:10px;
				padding:10px 0px;
			  }
        .scroll::-webkit-scrollbar-track {
          background:#E0E0E080;
          border-radius:10px;
          padding:10px 0px;
          }
		`}
      </style>
    </div>
  );
};

export default LockerList;
