import { useRouter } from "next/router";
import useSWR from "swr";
import Cookies from "js-cookie";
import _ from "lodash";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import RegisterLayout from "../register/registerLayout";
import KioskLayout from "../kioskLayout";

const ItemDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const criteria = JSON.stringify({
    filterItemTypeId: [
      {
        operator: "=",
        operand: id,
      },
    ],
  });

  const { data, error, isValidating } = useSWR(
    id
      ? `/api/get-data?metaid=1722854127801134&criteria=${encodeURIComponent(
          criteria
        )}`
      : null
  );

  const isLoading = isValidating && !data && !error;
  const readyData = data ? data.result : [];

  Cookies.set("customer", JSON.stringify({ customerId: "1587024272980" }));

  const groupByData = _.chain(readyData)
    .groupBy("name")
    .map((items, name) => ({
      name,
      image: items[0]?.image,
      title: items[0]?.title,
      items,
    }))
    .value();
  console.log("first", readyData);

  const ddd = process.env.IMAGEROOTURL || "http://172.169.200.57:85/";
  const body = groupByData[0]?.image || "";
  const imgUrlReplaceData = body.replaceAll(
    "storage/uploads",
    `${ddd}storage/uploads`
  );

  const getGridClasses = (itemsCount: any) => {
    if (itemsCount > 3) {
      return "grid-cols-2";
    }
    return "grid-cols-3";
  };

  const getItemWidth = (itemsCount: any) => {
    return itemsCount > 3 ? "md:w-[400px]" : "md:w-[350px]";
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#000000a0] z-50">
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 50, color: "white" }} spin />
          }
        />
      </div>
    );
  }

  if (error) {
    return (
      <RegisterLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-[32px] text-red-500">Error loading data.</div>
        </div>
      </RegisterLayout>
    );
  }

  return (
    <RegisterLayout coverImagePath={ddd + body} title={groupByData[0]?.title}>
      <div className="md:mt-[20px] px-[100px]">
        {groupByData.map((group, index) => (
          <div
            className="flex flex-col gap-y-1 text-white uppercase md:mt-[80px] xs:mt-[30px] text-start"
            key={index}
          >
            <div className="md:text-[40px] xs:[30px] mb-6 text-white">
              {group.name}
            </div>
            <div
              className={`grid justify-center gap-10 ${getGridClasses(
                group.items.length
              )}`}
            >
              {group.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex justify-center hover:bg-opacity-70 ${getItemWidth(
                    group.items.length
                  )}`}
                >
                  <button
                    className={`flex justify-center text-[40px] leading-[42px]  uppercase rounded-full bg-white/30 px-10 py-4 text-center ${getItemWidth(
                      group.items.length
                    )}`}
                    onClick={() =>
                      router.push({
                        pathname: "/kiosk/form",
                        query: {
                          i: item.id,
                        },
                      })
                    }
                  >
                    {item.durationtype} <br /> {item.saleprice}₮
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RegisterLayout>
  );
};

export default ItemDetails;
