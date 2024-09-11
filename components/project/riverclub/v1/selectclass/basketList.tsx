import _ from "lodash";
import { useEffect, useState, FC } from "react";
import useSWR from "swr";

type PropsType = {
  setProduct?: any;
  obj?: any;
};

const BasketList: FC<PropsType> = ({ setProduct, obj }) => {
  const [count, setCount] = useState(1);

  function displayInThousands(number: any) {
    // Divide the number by 1000 and format it with commas
    if (number % 1000) {
      return number + "₮";
    }

    return (
      (number / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 }) +
      ".0K"
    );
  }
  return (
    <div className="w-full bg-white rounded-[11px]">
      <img src="/images/alchuur.png" className="w-full" />
      <div className="bg-[#BAD405] text-black p-4 rounded-[11px]">
        <p className="uppercase text-[26px]">{obj?.itemname}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1 text-[26px]">
            <p
              className="font-bold cursor-pointer"
              onClick={() => {
                if (count > 1) setCount(count - 1), setProduct(count - 1);
              }}
            >
              -
            </p>
            <p>{count}</p>
            <p
              className="font-bold cursor-pointer"
              onClick={() => {
                setCount(count + 1), setProduct(count + 1);
              }}
            >
              +
            </p>
          </div>
          <p className="text-[40px]">
            ₮{displayInThousands(Number(obj?.saleprice) * count)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasketList;
