import { useRouter } from "next/router";
import Layout from "../kioskLayout";
import useSWR from "swr";
import Cookies from "js-cookie";
import _ from "lodash";
import Title from "@/components/common/Title";

const Register = () => {
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
  /api/get-data?metaid=1722848580347088&criteria=${criteria}
  `);

  const readyData = data ? data?.result : [];
  const groupByData = _.chain(readyData)
    .groupBy("classificationname")
    .map((items, key) => ({
      classificationname: key,
      items: items.map(({ itemtypename, id }) => ({ itemtypename, id })),
    }))
    .value();

  const handleItemClick = (item: any) => {
    localStorage?.setItem("product", JSON.stringify(item));
    router.push(`/page/register/category=${item?.id}`);
  };

  return (
    <Layout>
      <div className=" flex flex-col gap-y-10 ">
        <Title title="БҮРТГЭЛ"></Title>
        {groupByData.map((group) => (
          <div
            key={group.classificationname}
            className="w-4/5 mx-auto flex flex-col gap-6 text-center  px-4"
          >
            {group.items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="rounded-full text-[64px] xs:text-[30px] py-5 xs:px-6 cursor-pointer obtn"
              >
                {item.itemtypename}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Register;
