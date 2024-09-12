import { useRouter } from "next/router";
import fetchJson from "@/lib/fetchJson";
import _ from "lodash";
import { numberWithCommas } from "@/util/helper";
import Price from "@/components/custom/price";
import RegisterLayout from "@/components/orgil/registerLayout";

const Page = (props: any) => {
  const router = useRouter();
  const data = props?.dataSrc || [];

  const groupByData = _.chain(data)
    .groupBy("name")
    .map((items, name) => ({
      name,
      image: items[0]?.image,
      title: items[0]?.title,
      items,
    }))
    .value();

  const getGridClasses = (itemsCount: any) => {
    if (itemsCount > 3) {
      return "grid-cols-2";
    }
    return "grid-cols-3";
  };

  return (
    <>
      <RegisterLayout dataSrc={groupByData[0]}>
        {groupByData.map((group, index) => (
          <div
            className="flex flex-col  text-white uppercase py-2 text-start"
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
              <Price data={group.items} />
            </div>
          </div>
        ))}
      </RegisterLayout>
    </>
  );
};

export default Page;

export async function getServerSideProps(context: any) {
  const pathname = _.split(context?.query.slug, "category=");
  const URL = process.env.url;
  const criteria = JSON.stringify({
    filterItemTypeId: [
      {
        operator: "=",
        operand: pathname[1] || "17128275426163",
      },
    ],
  });

  const { result } = await fetchJson(
    URL + `/api/get-data?metaid=1722854127801134&criteria=${criteria}`
  );

  context.res.setHeader(
    "Cache-Control",
    " public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      dataSrc: result,
    },
  };
}
