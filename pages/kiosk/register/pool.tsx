import useSWR from "swr";
import { useRouter } from "next/router";
import _ from "lodash";
import Cookies from "js-cookie";
import RegisterLayout from "./registerLayout";

const Pool = () => {
  const router = useRouter();

  const criteria = JSON.stringify({
    classificationname: [
      {
        operator: "=",
        operand: router.query.n,
      },
    ],
  });

  let { data, error, mutate } = useSWR(`
  /api/get-data?metaid=1722854127801134&criteria=${criteria}
  `);

  const readyData = data ? data?.result : [];

  Cookies.set("customer", { customerId: "1587024272980" });

  const groupByData = _.chain(readyData)
    .groupBy("classificationname")
    .map((value, key, wrapped) => {
      return { [key]: value };
    })
    .value();

  return (
    <RegisterLayout coverImagePath="/images/pool.png" title={router.query?.n}>
      <div className="mt-[20px]">
        {groupByData?.map((obj: any, ind: number) => {
          const rowData = _.values(obj)?.[0];
          return (
            <div
              className="flex flex-col gap-y-1 text-white uppercase mt-[30px] text-start  "
              key={ind}
            >
              <div className="text-[40px]">{_.keys(obj)?.[0]}</div>
              <div className="flex items-center gap-x-4 ">
                {rowData?.map((rowItem: any, rowInd: number) => {
                  console.log(rowItem);
                  return (
                    <button
                      className=" text-[40px] w-[300px] h-[120px] rounded-[87px] bg-white/30 px-14 text-center  "
                      key={rowInd}
                      onClick={() =>
                        router.push({
                          pathname: "/kiosk/form",
                          query: {
                            i: rowItem?.id,
                          },
                        })
                      }
                    >
                      {rowItem?.monthname} <br /> {rowItem?.saleprice}
                      {/* {rowItem?.monthname} <br /> {rowItem?.saleprice} */}
                      {/* <span>{rowItem?.monthname}</span>
                      <span>{rowItem?.saleprice}</span> */}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </RegisterLayout>
  );
};

export default Pool;
