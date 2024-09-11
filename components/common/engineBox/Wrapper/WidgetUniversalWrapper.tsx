import _ from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { createContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import toBoolean from "@/lib/booleanFunction";
import { useCloud } from "hooks/use-cloud";
import { usePage } from "hooks/use-page";
import { useUpdateEffect } from "react-use";
import { positionToPath, renderPositionType } from "@/util/helper";
import { preparePositionAllArray } from "@/util/widgetHelper";
import WidgetBlocker from "./WidgetBlocker";
import WidgetFold from "./WidgetFold";
import useWidgetHookForm from "@/middleware/dataHook/useWidgetHookForm";
import Skeleton from "@/components/common/Skeleton/Skeleton";

type PropsContextType = {
  config?: any;
  readyDatasrc?: any;
  nemgooDatasrc?: any;
  headerData?: any;
  isDataLoading?: boolean;
  customerReady?: any;
  customerReady2?: any;
  customerReadyFull?: any;
  themeConfigs?: any;
  paging?: any;
  aggregatecolumns?: string;
  defaultValue?: any;
  defaultReady?: any;
  dataMutate?: any;
  onReadyDatasrcSearch?: any;
  widgetnemgooReady?: any;
  setVirtualWidgetnemgooReady?: any;
  positionConfig?: any;
  metaConfig?: any;
  gridJsonConfig?: any;
  pathConfig?: any;
  renderPositionType?: any;
  Title?: any;
  isWorking?: boolean;
  setIsWorking?: any;
  hookForm?: any;
  infinite?: any;
};

const WidgetWrapperContext = createContext<PropsContextType>({});

export const WidgetUniversalWrapper = ({
  config,
  datasrc,
  headerData = {},
  widgetnemgooReady = {},
  themeConfigs = {},
  setVirtualWidgetnemgooReady,
  dataMutate,
  paging,
  aggregatecolumns,
  infinite,
  children,
}: {
  config?: any;
  datasrc?: Array<any>;
  headerData?: Object | null;
  widgetnemgooReady?: any;
  themeConfigs?: any;
  setVirtualWidgetnemgooReady?: any;
  dataMutate?: any;
  fillItem?: any;
  paging?: any;
  aggregatecolumns?: string;
  infinite?: any;
  children?: any;
}) => {
  // const cloudContext = useCloudEngine();
  const cloudContext = useCloud();
  const router = useRouter();
  const { data: session, status }: any = useSession();

  /* ------------------------------------------------------ */
  /*                  CUSTOMER БЭЛДЭХ ХЭСЭГ                 */
  /* ------------------------------------------------------ */

  const customerReady = cloudContext?.customerReady; //яваандаа хэрэггүй болно.
  const customerReady2 = cloudContext?.customerReady2;
  const customerReadyFull = cloudContext?.customerReadyFull;

  const positionConfig = positionToPath(config.bpsectiondtl);
  const metaConfig = config?.metaConfig || {};
  const { gridJsonConfig, pathConfig } = metaConfig;

  const [isWorking, setIsWorking] = useState(false); //button байлаа гэхэд дарахаар ажиллаж буй төлөвт орох
  const [isDataLoading, setIsDataLoading] = useState(true); //Data авчирч буйг мэдээлэх

  // if (!_.isEmpty(widgetnemgooReady?.empty)) {
  //   console.log("🚀 ~ isDataLoading:", {
  //     isDataLoading,
  //     sss: widgetnemgooReady?.empty,
  //     datasrc,
  //   });
  // }

  /* ------------------------------------------------------ */
  /*              PREPARE WIDGET DATA POSITION              */
  /* ------------------------------------------------------ */
  /* ------------ also filernemgoo, valuenemgoo ----------- */

  useEffect(() => {
    if (datasrc) {
      setIsDataLoading(false);
    }
  }, [datasrc]);

  const readyDatasrcTemp = useMemo(() => {
    const myDataList = preparePositionAllArray(datasrc, positionConfig); //position-уудыг тавьж өгөх
    return _.orderBy(myDataList, (item) => parseInt(item.ordernumber)); //ordernumber талбараар эрэмбэлэх
  }, [datasrc]);

  //! Хумих дээр асуудал үүсээд байсан тул comment болгов.
  useUpdateEffect(() => {
    if (!_.isEqual(readyDatasrc, readyDatasrcTemp)) {
      setReadyDatasrc(readyDatasrcTemp || []);
    }
  }, [readyDatasrcTemp]);

  //Prepare ReadyDatasrc
  const [readyDatasrc, setReadyDatasrc]: any = useState(readyDatasrcTemp || []);

  //Make Filter, Search

  /* ------------------------------------------------------ */
  /*                         GLOBAL                         */
  /* ------------------------------------------------------ */

  const nemgooDatasrc = preparePositionAllArray(
    widgetnemgooReady?.data,
    positionConfig
  );

  /* ------------------------------------------------------ */
  // const defaultValue = prepareDefaults(widgetnemgooReady, router);
  // const defaultReady = prepareDefaultReady(widgetnemgooReady, router);

  /* ------------------------------------------------------ */
  /*               HOOKFORM БОЛОВСРУУЛАХ ХЭСЭГ              */
  /* ------------------------------------------------------ */

  const { hookForm } = useWidgetHookForm(widgetnemgooReady?.hookForm);

  /* ------------------------------------------------------ */
  /*                   WIDGET ДУУДАХ ХЭСЭГ                  */
  /* ------------------------------------------------------ */

  const domain = process.env.NEXT_PUBLIC_DOMAIN_NAME;

  const RenderComponent: any = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `@/components/${config.componentpath.toLowerCase()}/${
              config.widgetcode
            }`
          ),
        {
          ssr: false,
          // suspense: true,
          loading: () => (
            <div className="w-full">
              {/* <Skeleton type="card" /> */}
              {domain !== "river" && <Skeleton type="modern" />}
              {/* <div className="w-full h-[80px] ">
                <div className=" rounded bg-blue-400 text-[#f3f4f6]">
                  {config.componentpath}
                  <br />
                  {config.widgetcode}
                  <br />
                </div>
              </div> */}
            </div>
          ),
        }
      ),
    // [config, datasrc, widgetnemgooReady, dataMutate, paging, aggregatecolumns]
    // [datasrc]
    []
  );

  // const RenderComponent = dynamic(
  //   () =>
  //     import(
  //       `@/components/${config.componentpath.toLowerCase()}/${
  //         config.widgetcode
  //       }`
  //     ),
  //   {
  //     loading: () => (
  //       <>
  //         <Skeleton type="loading" />
  //       </>
  //     ),
  //   }
  // );

  return (
    <WidgetWrapperContext.Provider
      value={{
        config,
        readyDatasrc,
        headerData,
        nemgooDatasrc,
        isDataLoading,
        customerReady,
        customerReady2,
        customerReadyFull,
        themeConfigs,
        paging,
        aggregatecolumns,
        // defaultValue,
        // defaultReady,
        dataMutate,
        widgetnemgooReady,
        setVirtualWidgetnemgooReady,
        positionConfig,
        metaConfig,
        gridJsonConfig,
        pathConfig,
        renderPositionType,
        isWorking,
        setIsWorking,
        hookForm,
        infinite,
      }}
    >
      {/* <WidgetBlocker
        widgetnemgooReady={widgetnemgooReady}
        gridJsonConfig={gridJsonConfig}
        // onReadyDatasrcSearch={}
        readyDatasrc={readyDatasrc}
        headerData={headerData}
        nemgooDatasrc={nemgooDatasrc}
        isDataLoading={isDataLoading}
      > */}
      {children}
      <RenderComponent />
      {/* <Skeleton type="modern" /> */}
      {/* </WidgetBlocker> */}
    </WidgetWrapperContext.Provider>
  );
};

export default WidgetWrapperContext;
