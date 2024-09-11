import { prepareQueryString } from "@/util/widgetHelper";
import { useCloud } from "hooks/use-cloud";
import _ from "lodash";
import useSWRInfinite from "swr/infinite";
import * as prepareSWR from "@/util/prepareSWR";
import usePrepareStandard from "./usePrepareStandard";

// Fetcher function to fetch data for a specific page
const fetcher = async (url: any) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function useWidgetDataSWRInfinite({
  metadataid,
  metadatacode,
  virtualWidgetnemgooReady,
}: {
  metadataid?: string;
  metadatacode?: string;
  virtualWidgetnemgooReady?: any;
}) {
  const cloudContext = useCloud();
  const { standard } = usePrepareStandard();
  const metaNameV2 = cloudContext.hostObject.metaNameV2;
  const criteriaNemgoo = virtualWidgetnemgooReady?.criteria;

  /* ------------------------------------------------------ */
  /*                      EXTERNAL API                      */
  /* ------------------------------------------------------ */

  // WidgetNoMeta руу орж байгаа тул тэнд ажиллана.
  //! Яваандаа WidgetNoMeta-ийг устгаж, энд шингээнэ.

  /* ------------------------------------------------------ */
  /*                  PREPARE PARAMETERS V2                 */
  /* ------------------------------------------------------ */
  const myParametersV2 = prepareSWR.prepareParametersV2(
    virtualWidgetnemgooReady?.parameters
  );

  /* ----------------- prepare Parameters ----------------- */
  const myCriteria = prepareSWR.prepareCriteriaWidget(
    criteriaNemgoo,
    metadataid
  );
  const myPagingInfinite = prepareSWR.preparePagingInfinite(criteriaNemgoo);

  /* ------------------------------------------------------ */
  /*                        CALL API                        */
  /* ------------------------------------------------------ */

  // useSWRInfinite-ийн цаанаас ирсэн функц
  const getKey = (pageIndex: any, previousPageData: any) => {
    // console.log("🚀 ~ getKey ~ pageIndex:", pageIndex);
    // console.log("🚀 ~ getKey ~ previousPageData:", previousPageData);
    const mine = _.values(
      _.omit(previousPageData?.result, ["aggregatecolumns", "paging"])
    );
    // console.log("🚀 ~ getKey ~ mined:", mine);
    if (previousPageData && _.isEmpty(mine)) return null;

    // const myPaging = JSON.stringify({
    //   offset: String(Number(pageIndex) + 1),
    //   pageSize: myPageSize,
    //   sortColumnNames: {
    //     id: {
    //       sortType: "desc",
    //     },
    //   },
    // });
    const customProps = virtualWidgetnemgooReady?.apiConfig || {};

    //гол нь эндээс offset-ийг удирдах ёстой. Тэгэхээр paging-ийг энд дахин зохион байгуулна. offset-ийг зөвхөн өөрчлөх ажээ.
    const myParams = {
      metaid: metadataid,
      metacode: metadatacode,
      paging:
        // JSON.stringify(myParametersV2?.paging) ||
        JSON.stringify({
          ...myParametersV2?.paging,
          offset: String(Number(pageIndex) + 1),
        }) ||
        JSON.stringify({
          ...myPagingInfinite,
          offset: String(Number(pageIndex) + 1),
        }),
      // paging: myPaging,
      criteria: JSON.stringify(myParametersV2?.criteria) || myCriteria,
      moreRequest: undefined,
      standard: JSON.stringify(standard),
      customProps: JSON.stringify(customProps),
      metaNameV2: metaNameV2,
    };

    console.log("🚀 ~ getKey ~ myParams:", myParams);

    return `${process.env.URL}/api/get-data?${prepareQueryString(myParams)}`;
  };

  const { data, error, mutate, size, setSize }: any = useSWRInfinite(
    getKey,
    fetcher
  );

  // console.log("🚀 ~ datas:", { data, size, setSize });

  /* ------------------------------------------------------ */
  /*                      PREPARE DATA                      */
  /* ------------------------------------------------------ */

  const paging = data?.[0]?.result?.paging || {};
  const aggregatecolumns = data?.[0]?.result?.aggregatecolumns || "";

  const dataReady = _.flatten(
    _.map(data, (item: any) => {
      return _.values(_.omit(item?.result, ["aggregatecolumns", "paging"]));
    })
  );

  /* ----------------------- return ----------------------- */
  return [
    dataReady,
    error,
    mutate,
    paging,
    aggregatecolumns,
    { size, setSize },
  ];
}
