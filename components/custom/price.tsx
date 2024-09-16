import _, { orderBy } from "lodash";
import { useRouter } from "next/router";
import { FC } from "react";
import { jsonParse, numberWithCommas, renderPositionType } from "@/util/helper";
import { usePathname, useSearchParams } from "next/navigation";

type PropsTypeItem = {
  data?: any;
};

const Price: FC<PropsTypeItem> = ({ data }) => {
  const group: any = _.orderBy(data, ["saleprice"], ["asc"]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const price = searchParams.get("price");

  // console.log("price :>> ", price);

  const handleItemClick = (item: any) => {
    localStorage?.setItem("price", JSON.stringify(item));
    router.push({
      pathname: "/page/form",
      query: {
        price: item.id,
      },
    });
  };

  const getGridClasses = (itemsCount: any) => {
    if (itemsCount > 3) {
      return "grid-cols-2";
    }
    return "grid-cols-3";
  };

  return (
    <div
      className={`grid justify-center gap-10 ${getGridClasses(group.length)}`}
    >
      {group.map((item: any, itemIndex: any) => (
        <div
          key={itemIndex}
          className={`flex justify-center hover:bg-opacity-70 `}
        >
          <button
            className={`flex justify-center text-[36px] leading-[48px]  uppercase rounded-full  px-16 py-1 text-center hover:bg-[#a68b5c] ${
              item?.id == price ? "bg-[#a68b5c]" : "bg-white/30"
            }`}
            onClick={() => handleItemClick(item)}
            // onClick={() =>
            //   router.push({
            //     pathname: pathname,
            //     query: {
            //       i: item.id,
            //     },
            //   })
            // }
          >
            {item.durationtype} <br /> {numberWithCommas(item.saleprice)}₮
          </button>
        </div>
      ))}
    </div>
  );
};

export default Price;
