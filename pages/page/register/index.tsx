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
    // router.push(`/page/register/category=${item?.id}`);

    router.push({
      pathname: "/page/register/category=" + item?.id,
      query: {
        // category: item?.id,
        crm: router.query.crm,
        contractid: router.query.contractid,
      }, // Pass user data as query parameter
    });
  };

  return (
    <Layout>
      <div className=" flex flex-col gap-y-10 ">
        <Title title="БҮРТГЭЛ"></Title>
        {/* {readyData.map((group) => ( */}
        <div className=" mx-auto flex flex-col gap-6 text-center px-4">
          {readyData?.map((item: any) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="rounded-full text-[64px] xs:text-[30px] py-5 xs:px-6 cursor-pointer obtn px-6"
            >
              {item?.itemtypename || item?.name}
            </div>
          ))}
        </div>
        {/* ))} */}
      </div>
    </Layout>
  );
};

export default Register;
