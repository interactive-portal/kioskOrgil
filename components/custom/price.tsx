import RenderAtom from "@/components/common/Atom/RenderAtom";
// import { AtomIcon, AtomTag } from "@components/common/Atom";
import AtomIcon from "@/components/common/Atom/atomIcon";
import AtomTag from "@/components/common/Atom/atomTag";
import _, { orderBy } from "lodash";
import { useRouter } from "next/router";
import { FC } from "react";
import { jsonParse, numberWithCommas, renderPositionType } from "@/util/helper";

type PropsTypeItem = {
  data?: any;
};

const Price: FC<PropsTypeItem> = ({ data }) => {
  const group: any = _.orderBy(data, ["saleprice"], ["asc"]);
  const router = useRouter();

  console.log("dddddddd :>> ", group);

  const handleItemClick = (id: string) => {
    router.push(`/page/register/category=${id}`);
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
            className={`flex justify-center text-[36px] leading-[48px]  uppercase rounded-full bg-white/30 px-16 py-1 text-center`}
            onClick={() =>
              router.push({
                pathname: "/page/form",
                query: {
                  i: item.id,
                },
              })
            }
          >
            {item.durationtype} <br /> {numberWithCommas(item.saleprice)}₮
          </button>
        </div>
      ))}
    </div>
  );
};

export default Price;
