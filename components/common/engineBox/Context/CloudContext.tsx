import _ from "lodash";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  preparePaging,
  prepareQuery,
  prepareSorting,
  prepareViewtype,
} from "@/components/common/engineBox/util/urlHelper";

type PropsContextType = {
  cloudURL?: any;
  updateListOption?: any;
  buildURL?: any;
  clearQuery?: any;
  buildCloudURL?: any;
  thisPageConfig?: any;
  setThisPageConfig?: any;
  masterPageNemgooConfig?: any;
  setMasterPageNemgooConfig?: any;
  hostObject?: any;
  setHostObject?: any;
  pageMetaData?: any;
  setPageMetaData?: any;
  customerReady?: any;
  customerReady2?: any;
  customerReadyFull?: any;
};

const CloudContext = createContext<PropsContextType>({});

export const CloudStore = ({ children }: { children?: any }) => {
  const [hostObject, setHostObject] = useState({});
  const router = useRouter();
  const { data: session, status }: any = useSession();

  const menu = router.pathname.split("/")[1]; //"news"

  const initialCloudURL = {
    asPath: router.asPath, //Browser дээр байгаа URL-ийг түүхийгээр авах
    asPathDomain: router, //Browser дээр байгаа URL-ийг түүхийгээр авах
    breadcrumb: router.pathname.split("/"), //0: "" 1: "news", 3: "detail"
    menu: menu,
    urlIdValue: router.asPath.split("/")[2] || "", //detailid баахан тоо
    pathname: router.pathname, //"/news/[id]"
    menuType: "list",
    query: { ...prepareQuery(router.query) }, //Бүх шүүлтүүрүүд байна
    listOption: {
      paging: preparePaging(router.query),
      sorting: prepareSorting(router.query),
      viewtype: prepareViewtype(router.query),
      total: "0",
      listShortConfig: {},
    },
  };

  const [cloudURL, setCloudURL] = useState(initialCloudURL);
  // console.log("🚀 ~ CloudStore ~ cloudURL:", cloudURL)

  useEffect(() => {
    setCloudURL(initialCloudURL);
  }, [router.query]);

  //page-ийн өөрийнх нь ерөнхий тохиргоо. Жишээ нь departmentId явж буй.
  const [thisPageConfig, setThisPageConfig] = useState({});
  // console.log("🚀 ~ killer - thisPageConfig:", thisPageConfig);
  // энд departmentid Орж ирсэн байгаа. Тэрийг useDataview Дотор criteria дотор тавьж өгнө.

  //Мастер пэйжийн Нэмгоо
  const [masterPageNemgooConfig, setMasterPageNemgooConfig] = useState({
    theme: {
      color: "#d1d1d1",
    },
    bodyDefault: {
      className: "bg-white min-h-screen min-w-screen font-roboto",
      style: {},
    },
    sectionDefault: {
      className:
        "w-full h-full bg-white p-4 shadow-sm overflow-hidden rounded-lg",
      style: {},
    },
  });
  // console.log("cloudContext ~ masterPageNemgooConfig", masterPageNemgooConfig);

  const buildURL = (
    addNewQuery: any,
    removeQueryKey: any = undefined,
    options: any = {},
    clearOtherQuery: boolean = false
  ) => {
    //mglfirm солигдсон бол mglmark-ийг цэвэрлэх хэрэгтэй.
    let oldQuery = router.query || {};
    delete oldQuery[removeQueryKey];
    //Бүх Query-г цэвэрлэнэ.
    if (clearOtherQuery) oldQuery = {};

    //newQuery нь хоосон value-тай ирэх үе байна. Энэ үед түүнийг бас устгана.
    let newQuery: any = {};
    Object.entries(addNewQuery).map(([key, value]) => {
      if (!_.isEmpty(value)) {
        newQuery[key] = value;
      } else {
        delete oldQuery[key];
      }
    });

    router.query = {
      ...oldQuery,
      ...newQuery,
    };

    router.push(router, undefined, { shallow: true, scroll: true, ...options });
  };

  const updateListOption = (listShortConfig: any, total: any) => {
    setCloudURL({
      ...cloudURL,
      listOption: {
        ...cloudURL.listOption,
        paging: preparePaging(router.query, listShortConfig),
        sorting: prepareSorting(router.query, listShortConfig),
        viewtype: prepareViewtype(router.query, listShortConfig),
        total: total,
        listShortConfig: listShortConfig,
      },
    });
  };

  const buildCloudURL = (item: any, link: any, isWhole = false) => {
    console.log("sssdddditem", item, link, isWhole);
    let key = "";
    if (isWhole) {
      key = link?.label;
    } else {
      // metaid[484848][itemcategoryid]=151515151515 гэсэн Query зам үүсэх ёстой.
      key = `metaid[${link?.metaid}][${link?.label}]`;
    }
    buildURL(
      {
        [key]: item?.[link?.path],
      }, // Нэмэгдэж буй гол query
      undefined,
      {}, //shallow гэх мэт нэмэлт options,
      false //clear URL other query
    );
  };

  /* ------------------------------------------------------ */
  /*                        CUSTOMER                        */
  /* ------------------------------------------------------ */
  const customerReady2 = session?.readyProfile?.userMetaverse || {
    guest: true,
    name: "Мото Зочин",
    created_date: "2023-09-18 14:17:13",
    email: "guest@moto.mn",
    first_name: "Мото",
    gender: "",
    gender_desc: "",
    id: "1695019838427092",
    is_approved: "1",
    last_name: "Зочин",
    mainimage:
      "https://res.cloudinary.com/dzih5nqhg/image/upload/v1694146773/moto_mn/Customer/helmet_03_onop0z.png",
    modified_date: "",
    title: "Мото Зочин",
  };

  const customerReadyFull = session?.readyProfile;

  //яваандаа хэрэггүй болно.
  const customerReady = session?.readyProfile?.profileLastReady || {
    guest: true,
    name: "Зочин",
    image:
      "https://res.cloudinary.com/dzih5nqhg/image/upload/v1694146773/moto_mn/Customer/helmet_03_onop0z.png",
  };

  /* ------------------------------------------------------ */
  /*                      PAGEMETADATA                      */
  /* ------------------------------------------------------ */
  const [pageMetaData, setPageMetaData] = useState({});

  return (
    <CloudContext.Provider
      value={{
        cloudURL,
        updateListOption,
        buildURL,
        buildCloudURL,
        thisPageConfig,
        setThisPageConfig,
        masterPageNemgooConfig,
        setMasterPageNemgooConfig,
        hostObject,
        setHostObject,
        pageMetaData,
        setPageMetaData,
        customerReady,
        customerReady2,
        customerReadyFull,
      }}
    >
      {children}
    </CloudContext.Provider>
  );
};

export default CloudContext;
