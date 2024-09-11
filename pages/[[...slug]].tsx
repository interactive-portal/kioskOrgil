import Error from "next/error";
import _ from "lodash";

import { preparePageObject } from "@/util/prepareDetect";
import RenderBody from "@/middleware/components/renderBody";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSession } from "next-auth/react";

export default function Page(props: any) {
  const { mergedPageNemgoo } = props;
  return (
    <div className={`min-h-[450px]`}>
      <RenderBody {...props} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const pathname = _.join(context?.params.slug, "/");

  const locale = context?.locale || "mn";

  const config = {
    i18n: {
      defaultLocale: locale,
      locales: ["mn", "en"],
      ns: ["translate", "common"],
      defaultNS: "translate",
    },
  };

  if (pathname.startsWith("_next/")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const hostObjectV2 = {
    domainType: process.env.HOSTOBJECTV2_DOMAINTYPE || "DEFAULT",
    metaNameV2: process.env.HOSTOBJECTV2_METANAMEV2 || "DEV",
    pageDomain: process.env.DOMAIN_NAME, //эхний үгийг авна.
    pageSlug: pathname || "home", //дараагийн үгүүдийг /-ээр нийлүүлнэ. тэгээд -neo гэснээс хойшхийг устгана.
  };

  const pageObject: any = await preparePageObject(hostObjectV2);

  // console.log("object :>> ", pageObject);

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      hostObject: hostObjectV2,
      ...(await serverSideTranslations(
        locale,
        ["translate", "common"],
        config
      )),
      ...pageObject,
      notFound: pageObject?.notFound || "false",
    }, // will be passed to the page component as props
  };
}
