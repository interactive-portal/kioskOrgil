import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReactNode, useContext, useMemo } from "react";
import { useToggle } from "react-use";

import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";

// import useResponsiveBreakpoint from "@customhook/useResponsiveBreakpoint";
import { useCloud } from "@/hooks/use-cloud";
import _ from "lodash";
import useResponsiveBreakpoint from "@/hooks/custom/useResponsiveBreakpoint";
import {
  getColorTailwind,
  toBoolean,
} from "@/components/common/engineBox/util/atomHelper";
import RenderAtomPosition from "@/components/common/Atom/RenderAtomPosition";
import AtomLink from "@/components/common/Atom/atomLink";
import AtomLabel from "@/components/common/Atom/atomLabel";
import AtomSpin from "@/components/common/Atom/atomSpin";
import AtomTooltip from "@/components/common/Atom/atomTooltip";

export default function RenderAtom({
  item,
  defaultAtom,
  renderType = "text",
  customClassName = "",
  className: className2 = "",
  customStyle = {},
  style: style2 = {},
  outsideClassName = "",
  customProps,
  isAtomWorking = false,
  isPageLoadingShow = false,
  onClick,
  onMouseEnter,
  customDivNumber = undefined,
  divNamePrefix = "",
  url = {},
  label = {},
  tooltip = {},
  form = {},
  hideInMobile = false,
  hideInDesktop = false,
  clipboard,
  debug = false,
  children,
  ...props
}: {
  item?: string | object;
  defaultAtom?: string;
  renderType?:
    | "title"
    | "text"
    | "image"
    | "img"
    | "button"
    | "currency"
    | "tag"
    | "icon"
    | "number"
    | "input"
    | "inputnumber"
    | "inputimage"
    | "inputimagelist"
    | "inputButtonent"
    | "inputmask"
    | "inputsegment"
    | "inputbutton"
    | "inputswitch"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "dropdown"
    | "editor"
    | "editor2"
    | "imagemagnify"
    | "avatar"
    | "line"
    | "forminput"
    | "forminputerror"
    | "search"
    | "htmltext"
    | "date"
    | "clob"
    | "video";
  customClassName?: any;
  className?: any;
  style?: React.CSSProperties;
  customStyle?: Object;
  outsideClassName?: string;
  customProps?: any;
  isAtomWorking?: boolean;
  isPageLoadingShow?: boolean;
  onClick?: any;
  onMouseEnter?: any;
  customDivNumber?: string;
  divNamePrefix?: string;
  url?: any;
  label?: {
    title?: string;
    outerClassName?: string;
    outerStyle?: Object;
    className?: string;
    style?: Object;
  };
  tooltip?: any;
  form?: any;
  hideInMobile?: boolean;
  hideInDesktop?: boolean;
  clipboard?: { copy?: boolean; paste?: boolean };
  debug?: boolean;
  loading?: boolean;
  props?: any;
  children?: any;
}) {
  // const [refreshCounter, setRefreshCounter] = useState(0);
  // useEffect(() => {
  //   setRefreshCounter((prev) => prev + 1);
  // }, []);

  // const { widgetnemgooReady, isDataLoading } = useWidgetEngine();
  // const cloudContext = useCloudEngine();
  const { widgetnemgooReady, isDataLoading } = useContext(WidgetWrapperContext);
  const cloudContext = useCloud();

  const router = useRouter();
  const [pageLoading, setPageLoading] = useToggle(false);
  const { isMobile, isDesktop } = useResponsiveBreakpoint();

  const theme = cloudContext?.masterPageNemgooConfig?.theme;

  //showposition=1 гэсэн механизмыг хэрэгжүүлэхийн тулд эхлүүлэв.
  // const showPositionUrl = toBoolean(router?.query?.showposition || "0");
  const showPosition = toBoolean(
    widgetnemgooReady?.debug?.show?.showPosition ||
      router?.query?.showposition ||
      false
  );
  //showsample=1 гэсэн механизмыг хэрэгжүүлэхийн тулд эхлүүлэв.
  const showSample = toBoolean(
    widgetnemgooReady?.debug?.show?.showSample ||
      router?.query?.showsample ||
      false
  );

  //main хэсэг эхэлж байна.
  const positionnemgoo: any = _.get(item, "positionnemgoo", {});

  const atom = positionnemgoo?.atom || {
    type: renderType || defaultAtom || "text",
  };
  const value =
    atom?.value ||
    _.get(item, "value", !_.isObject(item) && _.isString(item) ? item : "");

  if (debug) {
    console.log("RenderAtom value", {
      value,
    });
  }

  const className = atom?.classname || _.get(item, "classname", "");
  const style = atom?.style ? atom?.style : _.get(item, "style");
  const atomClassName = `${customClassName || className2 || ""} ${
    atom?.className || ""
  }`;
  const atomStyle = { ...customStyle, ...style2, ...style, ...atom?.style };

  const atomCustomProps = {
    color: getColorTailwind(theme?.color),
    colorSecond: getColorTailwind(theme?.colorSecond),
    theme: theme,
    ...customProps,
  };

  const atomProps = {
    ...atomCustomProps,
    item: {
      ...(item as any),
      value: value,
      className: className,
      style: style,
    },
    customClassName: atomClassName,
    customStyle: atomStyle,
    isWorking: isAtomWorking,
    onClick: onClick,
    showSample: showSample,
    customDivNumber: customDivNumber,
    divNamePrefix: divNamePrefix,
    ...(atom?.props || {}),
  };

  const atomList: any = {
    title: "atomTitle",
    text: "atomText",
    image: "atomImage",
    htmltext: "atomHtmlText",
    button: "atomButton",
    video: "atomVideo",
    icon: "atomIcon",
  };

  const RenderComponent = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `@/components/common/Atom/${atomList?.[atom?.type || "text"]}`
          ).catch((err) => {
            return () => <>{children}</>;
          }),
        {
          ssr: false,
          // loading: () => <></>,
          // loading: () => (
          //   <>
          //     <div className="w-full animate-pulse">
          //       <div className="h-2 rounded bg-[#fbfbfc] text-[#f3f4f6]">
          //         Atom ачааааааалж байна
          //       </div>
          //     </div>
          //   </>
          // ),
        }
      ),
    []
  );

  //showposition=1 байвал position байрлал харуулаад дуусгана.
  if (showPosition)
    return (
      <RenderAtomPosition
        item={{ value: _.get(item, "rawConfig?.positionname") }}
        customClassName={atomClassName}
      />
    );

  if (hideInMobile && isMobile) return null;
  if (hideInDesktop && isDesktop) return null;

  const RenderComponentWithFallback = (
    atomProps: any,
    children: React.ReactNode
  ) => {
    try {
      return <RenderComponent {...atomProps}>{children}</RenderComponent>;
    } catch (error) {
      console.error("Error rendering component:", error);
      return null; // Render nothing or some fallback UI
    }
  };

  // console.log("positionnemgoo :>> ", positionnemgoo);
  return (
    // <>renderAtom nemeh</>
    <>
      {/* <>{atom?.type}</> */}
      <AtomLabel label={positionnemgoo?.label || label}>
        <AtomSpin
          spinning={isAtomWorking || pageLoading}
          delay={0}
          tip=""
          indicator="default"
        >
          <AtomLink
            url={positionnemgoo?.url || url}
            color={atomProps?.color}
            isPageLoadingShow={isPageLoadingShow}
            setPageLoading={setPageLoading}
          >
            <AtomTooltip item={positionnemgoo?.tooltip || tooltip}>
              {RenderComponentWithFallback(atomProps, children)}
            </AtomTooltip>
          </AtomLink>
        </AtomSpin>
      </AtomLabel>
    </>

    // <AtomLabelV2 label={positionnemgoo?.label || label}>
    //   <AtomSpinV2
    //     spinning={isAtomWorking || pageLoading}
    //     delay={0}
    //     tip=""
    //     indicator="default"
    //   >
    //     <AtomLinkV2
    //       url={positionnemgoo?.url || url}
    //       color={atomProps.color}
    //       isPageLoadingShow={isPageLoadingShow}
    //       setPageLoading={setPageLoading}
    //     >
    //       <AtomTooltipV2 item={positionnemgoo?.tooltip || tooltip}>
    //         <AtomFormV2 form={form}>
    //           {isDataLoading ? (
    //             <AtomLoadingV2 {...atomProps} />
    //           ) : (
    //             RenderComponentWithFallback(atomProps, children)
    //           )}
    //         </AtomFormV2>
    //         <AtomClipboardV2 clipboard={clipboard} value={value} />
    //       </AtomTooltipV2>
    //     </AtomLinkV2>
    //   </AtomSpinV2>
    // </AtomLabelV2>
  );
}
