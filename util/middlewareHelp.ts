import detectPathList from "@/config/detectPathList.json";

// Main cases

// localhost:3000/cozy                      → LOCAL | cozy, home
// localhost:3000/widget/about              → LOCAL | widget, about

// page.veritech.mn/cozy                    → LOCAL | cozy, home
// page.veritech.mn/widget/about            → LOCAL | widget, about

// clouduat.veritech.mn/cozy                → LOCAL | cozy, home
// clouduat.veritech.mn/widget/about        → LOCAL | widget, about

// www.cozy.mn                              → DEFAULT | cozy, home
// www.moto.mn/about                        → DEFAULT | moto, about

// community.veritech.mn                    → SUB | community, home
// developer.veritech.mn/about              → SUB | developer, about

export const prepareHostObjectMiddleware = async ({
  hostname = "",
  pathname,
}: {
  hostname: string;
  pathname: string;
}) => {
  const defaultPageDomain =
    process.env.HOSTOBJECTV2_DEFAULT_PAGEDOMAIN || "help";

  // console.log("---------------------- \n");
  // console.log("01 prepareHostObjectV2 hostname: ", hostname);
  // console.log("01 prepareHostObjectV2 pathname: ", pathname);
  // console.log("\n---------------------- \n");

  if (pathname === "") pathname = "home";

  const hostObjectConfig: any = detectPathList.find(
    (item: any) => item?.hostname == hostname
  );

  const rawDomain = [hostname, pathname].filter((item) => item).join("/"); //хооронд /-ээр залгана. Хоосон байвал / нэмэхгүй.
  const domainType = process.env.HOSTOBJECTV2_DOMAINTYPE || "DEFAULT";
  const metaNameV2 = process.env.HOSTOBJECTV2_METANAMEV2 || "PROD";
  const renderStatic = hostObjectConfig?.renderStatic;

  const pageDomain =
    domainType === "DEFAULT"
      ? hostname.split(".")?.[1] || defaultPageDomain //http://www.cozy.mn гэж байвал cozy-ийг авна.
      : domainType === "SUB"
      ? hostname.split(".").shift()
      : pathname.split("/").shift() || defaultPageDomain; //http://page.veritech.mnc/widget/about гэж байвал widget-ийг авна.

  const pageSlug =
    domainType === "DEFAULT"
      ? pathname
      : domainType === "SUB"
      ? pathname
      : pathname.split("/")?.splice(1).join("/") || "home"; //http://page.veritech.mnc/widget/about/detail гэж байвал about/detail-ийг авна.

  const hostObjectMiddleware = {
    rawDomain,
    domainType,
    metaNameV2,
    pageDomain,
    pageSlug,
    renderStatic,
    toDetectPath: [pageSlug].join("/"),
  };

  return hostObjectMiddleware;
};
