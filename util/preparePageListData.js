import { getDataView, getLayout } from "@/service/serverFunctions";
// import * as Constants from "@constants/metaConstants";
import _ from "lodash";
import { jsonParse } from "@/util/helper";
// import logger from "@/util/logglyUtilServerBunyan";

/* ------------------- prepareWithBody ------------------ */
//*jagaa
//layout Data Prepare functions

const prepareWithBody = async (thisPageConfig) => {
  const thisPageNemgoo = jsonParse(thisPageConfig["layoutnemgoo"]);
  const thisPageLayout = thisPageNemgoo?.layout;

  // Мастер хуудас буюу Parent байгаа эсэх
  if (_.isEmpty(thisPageConfig?.layouthdr))
    return [thisPageConfig, thisPageLayout];

  const masterPageConfig = thisPageConfig?.layouthdr || {};
  // console.log("🚀 ~ prepareWithBody ~ masterPageConfig", masterPageConfig);
  // logger.info({
  //   title: "prepareWithBody masterPage",
  //   masterPageConfig,
  //   sss: Math.floor(Math.random() * 90000) + 10000,
  // });

  const masterPageNemgoo = jsonParse(masterPageConfig.layoutnemgoo);
  const masterPageLayout = masterPageNemgoo?.layout;

  findBodyAndUpdate(masterPageLayout, "body", thisPageLayout);

  // var bodySection = _.find(masterPageLayout, { sectionCode: "body" });
  // console.log("bodySection :>> ", masterPageLayout);

  return [
    {
      ...masterPageConfig,
      readyPageNemgoo: masterPageNemgoo,
      thisPageConfig: {
        ...thisPageConfig,
        readyHostname: jsonParse(thisPageConfig.hostname),
      },
    },
    masterPageLayout,
  ];
};

/* ------------------ findBodyAndUpdate ----------------- */
const findBodyAndUpdate = (object = [], findObject, thisLayout) => {
  let myObject;

  for (let item of object) {
    // let ddd = _.find(item, findObject);
    let ddd = item.sectionCode === findObject ? item : undefined;
    if (ddd) {
      myObject = ddd;
      item.children = [...thisLayout];
      break;
    }
    if (item.children)
      ddd = findBodyAndUpdate(item.children, findObject, thisLayout);
    if (ddd) {
      myObject = ddd;
      // item.children = [{ title: "hahahaha" }];
      break;
    }
  }

  return myObject;
};

/* ----------------- prepareSectionList ----------------- */
const prepareSectionList = async (mergedLayoutConfig, hostObject) => {
  const sectionList =
    _.values(mergedLayoutConfig?.meta_bp_layout_section) || [];

  let readySectionList = [];
  for (let item of sectionList) {
    if (item.metatypeid === "200101010000011" && item.islayout === "1") {
      console.log("ЭНИЙГ ХАРААЧ", item.widgetcode);

      const layoutConfig = await callServerProcessV2({
        command: "eShoplayoutHdr_004_cozy",
        parameter: {
          filtermetadataid: item.metadataid,
        },
        metaNameV2: hostObject.metaNameV2,
      });

      const deepLayoutConfig =
        (await prepareSectionList(layoutConfig, hostObject)) || {};
      readySectionList.push({
        ...item,
        children: { ...deepLayoutConfig },
        thisislayout: true,
      });
    } else {
      readySectionList.push({ ...item, thisislayout: false });
    }
  }

  const readyLayoutConfig = {
    ...mergedLayoutConfig,
    meta_bp_layout_section: readySectionList,
    thisislayout: true,
  };

  return readyLayoutConfig;
};

/* ---------------- preparePositionNemgoo --------------- */
const preparePositionNemgoo = (bpsectiondtl) => {
  let array_bpsectiondtl = _.values(bpsectiondtl);
  array_bpsectiondtl.map((item, index) => {
    array_bpsectiondtl[index].positionnemgooReady = jsonParse(item.otherattr);
  });

  return array_bpsectiondtl;
};

/* ----------------- prepareReactConfigToWidgetNemgooReady ----------------- */
const prepareReactConfigToWidgetNemgooReady = (listConfig) => {
  const debug = {
    console: {
      config: listConfig.rdebugconfig,
      data: listConfig.rdebugdata,
      nemgoo: listConfig.rdebugnemgoo,
      ...listConfig?.debug?.console,
    },
    show: {
      showPosition: listConfig.rdebugshowposition,
      showSample: listConfig.rdebugshowsample,
      ...listConfig?.debug?.show,
    },
  };

  return {
    ...listConfig.widgetnemgooReady,
    debug: debug,
    isDefaultTheme: listConfig.risdefaulttheme,
    loadIconType: listConfig.risloadicon,
    isShow: listConfig.risshow,
  };
};

/* ----------------- prepareThemeConfig ----------------- */
const prepareThemeConfig = () => {
  return {};
};

/* ------------------------------------------------------ */
/*                  PREPAREPAGELISTDATAV2                 */
/* ------------------------------------------------------ */
export default async function preparePageListData({ pageid, hostObject }) {
  //ERP-аас тухайн Page Layout-ийн бүх тохиргоо ирнэ. Том JSON байгаа.

  // console.log("layoutHdr_004_cozy", hostObject, "pageid", pageid);

  const thisPageConfig = (
    await getLayout("layoutHdr_004_cozy", {
      filtermetadataid: pageid || "",
      filterdomain: hostObject?.pageDomain,
      filterslug: hostObject?.pageSlug,
    })
  ).result;

  // console.log("151 ~ thisPageConfig", thisPageConfig);

  //body Master пэйж байвал түүнтэй нэгтгэж нэг том Page Layout гаргаж авна.
  const [mergedPageConfig, mergedPageNemgoo = []] = await prepareWithBody(
    thisPageConfig
  );

  //Цаашид React даяар ашиглах боломжтой бэлэн Page Layout-ийн том JSON гаргаж авна.
  const readyMergedLayoutConfig = await prepareSectionList(
    mergedPageConfig,
    hostObject
  );

  //Нэг Widget буюу адилхан байвал дахин нэмэх хэрэггүй.
  let meta_bp_layout_section = [
    ...readyMergedLayoutConfig.meta_bp_layout_section,
  ];
  const eded = _.values(thisPageConfig.meta_bp_layout_section);
  if (readyMergedLayoutConfig.meta_bp_layout_section[0]?.id !== eded[0]?.id) {
    meta_bp_layout_section = [...meta_bp_layout_section, ...eded];
  }

  //бүх widget-ийн nemgoog- jsonParse хийж авъя.
  //бас бүх positionNemgoo буюу bpsectiondtl-ийг jsonParse хийж авъя.
  meta_bp_layout_section.map((item, index) => {
    const listConfig = meta_bp_layout_section[index];

    //widgetnemgooReady бэлтгэх
    meta_bp_layout_section[index].widgetnemgooReady =
      jsonParse(item?.widgetnemgoo) || {};

    //reactConfig to widgetNemgooReady
    meta_bp_layout_section[index].widgetnemgooReady =
      prepareReactConfigToWidgetNemgooReady(listConfig);

    //rawPositionList бэлтгэх
    meta_bp_layout_section[index].rawPositionList = preparePositionNemgoo(
      meta_bp_layout_section[index].bpsectiondtl
    );
  });

  //Тоогий themeConfig prepare
  const themeConfig = prepareThemeConfig();

  //Page даяар ажиллах General Nemgoo-г Master Пэйжийн layoutNemgoo-оос олж авах ёстой.
  const readyMergedLayoutNemgoo = {
    ...jsonParse(readyMergedLayoutConfig.layoutnemgoo),
    themeConfig: themeConfig,
  };
  const masterPageNemgooConfig = readyMergedLayoutNemgoo?.config || {};

  let readyMergedPageConfig = {
    ...readyMergedLayoutConfig,
    readyPagenemgoo: jsonParse(readyMergedLayoutConfig?.layoutnemgoo),
  };

  // Зарим хэрэггүй зүйлсийг устгая.
  readyMergedPageConfig = _.omit(readyMergedPageConfig, [
    "layoutnemgoo",
    "otherattr",
    "layouthdr", //master page - parent page
    "meta_bp_layout_param", //master page - parent page
    "thisPageConfig.otherattr",
    "thisPageConfig.layouthdr",
    "thisPageConfig.layoutnemgoo",
    "thisPageConfig.meta_bp_layout_section",
    "thisPageConfig.meta_bp_layout_section_size",
    "thisPageConfig.meta_bp_layout_param",
    "thisPageConfig.meta_bp_layout_param_size",
  ]);

  let pageObject = {
    mergedPageNemgoo,
    readyMergedPageConfig,
    meta_bp_layout_section,
    masterPageNemgooConfig,
    notFound: mergedPageNemgoo != "" ? false : true,
  };

  return pageObject;
}
