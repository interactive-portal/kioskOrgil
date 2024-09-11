/* ------------------------------------------------------ */
/*                    PREPAREHOSTOBJECT                   */
/* ------------------------------------------------------ */
export const prepareHostObject = async (hostname, pathname) => {
  let hostObject;

  console.log("\n\n---------------------- \n");
  console.log("hostname: ", hostname);
  console.log("pathname: ", pathname);

  switch (process.env.NODE_ENV) {
    case "development":
      console.log("Хөгжүүлэлтийн орчинд ажиллаж байна");
      hostObject = prepareDomainDevelopmentHost(hostname, pathname);
      // hostObject = prepareProductionHost(hostname, pathname);
      break;
    case "production":
      console.log("Production орчинд ажиллаж байна");
      hostObject = prepareDomainProductionHost(hostname, pathname);
      break;
    default:
      break;
  }

  /* ------------------------------------------------------ */
  /*                      SPECIAL CASES                     */
  /* ------------------------------------------------------ */
  //correct and convert domains

  //! Энийг түр авлаа.
  // if (hostObject.domain.rootDomain === "skyresorteshop")
  //   hostObject.domain.rootDomain = "skyresort";
  // if (
  //   hostObject.domain.rootDomain === undefined ||
  //   hostObject.domain.rootDomain === ""
  // ) {
  //   hostObject.domain.rootDomain = "club";
  // }

  /* ------------------------------------------------------ */
  /*              COZY SUPPLIERS SPECIAL CASES              */
  /* ------------------------------------------------------ */
  if (
    hostObject?.pageDomain == "cozy" &&
    hostObject?.pageSlug == "suppliers/proliance"
  ) {
    hostObject.domain.rootDomain = "proliance";
    hostObject.slug = "home";
    hostObject.domainType = "local";
  }

  return hostObject;
};

/* ------------------------------------------------------ */
/*                       PRODUCTION                       */
/* ------------------------------------------------------ */
export const prepareDomainProductionHost = (hostname, pathname) => {
  console.log(
    "🚀 ~ prepareDomainProductionHost ~ hostname, pathname",
    hostname,
    pathname
  );
  //# prepare domain
  //['www', 'vercel', 'com'] гэх мэтээр салгана.
  let tempHost = hostname.split(".").filter((el) => el);

  let subDomain = tempHost.shift();
  let rootDomain = tempHost.shift();
  let tld = tempHost.shift();

  if (subDomain === "localhost:3000") {
    subDomain = "www";
    rootDomain = "localhost";
    tld = "mn";
  }

  //# prepare slug
  //['news', 'detail', 'common'] гэх мэтээр салгана.
  let tempPath = pathname.split("/").filter((el) => el);
  // үлдсэн үгсийг /-ээр холбож залгана.
  let tempSlug = tempPath.join("/");
  if (tempSlug === "") tempSlug = "home";
  let domainType = "default";
  let metaName = "DEV";

  let hostObject = {
    domain: { subDomain: "", rootDomain: "", tld: "" },
    slug: "",
    domainType,
    metaName,
  };

  //check subhost
  //Энэ цаашдаа хэрэгтэй эсэхийг мэдэхгүй юм.
  const subList = ["interactive", "veritech", "cozy"];
  if (
    subList.includes(rootDomain) &&
    subDomain !== "www" &&
    subDomain !== "clouduat"
  ) {
    domainType = "sub";
  }

  //check localhost
  // const localList01 = ["vercel", "localhost"];
  // if (localList01.includes(rootDomain)) {
  //   domainType = "local";
  // }

  const localList02 = [
    {
      rootDomain: "vercel",
      domainType: "local",
      metaName: "PROD",
    },
    {
      rootDomain: "localhost",
      domainType: "local",
      metaName: "DEV",
    },
    {
      subDomain: "customer",
      rootDomain: "veritech",
      domainType: "local",
      metaName: "PROD",
    },
    {
      subDomain: "page",
      rootDomain: "veritech",
      domainType: "local",
      metaName: "DEV",
    },
    {
      subDomain: "clouduat",
      rootDomain: "veritech",
      domainType: "local",
      metaName: "UAT",
    },
    {
      subDomain: "club",
      rootDomain: "cozy",
      domainType: "local",
      metaName: "PROD",
    },
    {
      subDomain: "developer",
      rootDomain: "interactive",
      domainType: "sub",
      metaName: "PROD",
    },
  ];

  console.log("DDD 01", subDomain, rootDomain, tempSlug);

  //зөвхөн rootDomain → local
  localList02.find((item) => {
    if (item?.rootDomain === rootDomain) {
      domainType = item.domainType;
      metaName = item.metaName;
    }
  });

  console.log("DDD 02", subDomain, rootDomain, tempSlug);

  //rootDomain && subDomain → sub
  localList02.find((item) => {
    if (item?.subDomain === subDomain && item?.rootDomain === rootDomain) {
      domainType = item.domainType;
      metaName = item.metaName;
    }
  });

  console.log(
    "DDD 03",
    subDomain,
    rootDomain,
    tld,
    tempSlug,
    domainType,
    metaName
  );

  //cozy-оос Proliance компанийн тусдаа вэб дуудах үед
  //www.cozy.mn/pagename/proliance
  //localhost:3000/cozy/pagename/proliance
  // if ()
  // console.log("domainType domainType", tempSlug);

  switch (domainType) {
    case "default":
      // cozy/product
      //буюу rootDomain-аар эхэлсэн байвал
      // product болгох ёстой.
      const mustRemove = `${rootDomain}/`;
      if (tempSlug.startsWith(mustRemove)) {
        tempSlug = tempSlug.slice(mustRemove.length);
      }
      hostObject = {
        domain: { subDomain: subDomain, rootDomain: rootDomain, tld: tld },
        slug: tempSlug,
        domainType,
        metaName,
      };
      break;
    case "local":
      hostObject = prepareDomainDevelopmentHost(
        `${subDomain}.${rootDomain}.${tld}`,
        pathname,
        metaName
      );
      break;
    case "sub":
      const subThemeSlug = tempSlug.replace(subDomain + "/", "");
      hostObject = {
        domain: { subDomain: "www", rootDomain: subDomain, tld: tld },
        slug: subThemeSlug,
        domainType,
        metaName,
      };
      break;
    default:
      break;
  }

  return hostObject;
};

/* ------------------------------------------------------ */
/*                       DEVELOPMENT                      */
/* ------------------------------------------------------ */
export const prepareDomainDevelopmentHost = (
  hostname,
  pathname,
  metaName = "DEV"
) => {
  //# prepare domain
  //['news', 'detail', 'common'] гэх мэтээр салгана.
  let tempPath = pathname.split("/").filter((el) => el);
  //Эхний элементийг салгаж domain-д өгнө.
  const tempDomain = tempPath.shift();

  //# prepare slug
  //үлдсэн үгсийг /-ээр холбож залгана.
  let tempSlug = tempPath.join("/");
  if (tempSlug === "") tempSlug = "home";

  return {
    domain: { subDomain: "www", rootDomain: tempDomain, tld: "mn" },
    slug: tempSlug,
    domainType: "local",
    metaName: metaName,
  };
};
