import { useContext } from "react";
// import { motion } from "framer-motion";
import { useCloud } from "@/hooks/use-cloud";
import { useMemo } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import useResponsiveBreakpoint from "@/hooks/custom/useResponsiveBreakpoint";
import {
  toBoolean,
  twMergeUtil,
} from "@/components/common/engineBox/util/atomHelper";

export default function BlockDiv({
  divNumber,
  customClassName,
  className,
  customStyle,
  style,
  type = "div",
  onClick,
  onMouseEnter,
  onMouseLeave,
  divNamePrefix = "",
  ObjectLight,
  children,
  // initial,
  // animate,
  // variants,
  // transition,
  tooltip = {},
  id,
  ref,
  url = {},
  hideInMobile = false,
  hideInDesktop = false,
  customProps = {},
}: {
  type?:
    | "div"
    | "span"
    | "i"
    | "p"
    | "label"
    | "code"
    | "nav"
    | "ul"
    | "main"
    | "section";
  divNumber?: string;
  customClassName?: string;
  className?: string;
  customStyle?: any;
  style?: any;
  onClick?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
  divNamePrefix?: string;
  ObjectLight?: "";
  children?: any;
  // initial?: any;
  // animate?: any;
  // variants?: any;
  // transition?: any;
  tooltip?: any;
  id?: string;
  ref?: any;
  url?: any;
  hideInMobile?: boolean;
  hideInDesktop?: boolean;
  customProps?: any;
}) {
  // const { widgetnemgooReady } = useWidgetEngine();
  // const cloudContext = useCloudEngine();
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);
  const cloudContext = useCloud();
  const { isMobile, isDesktop } = useResponsiveBreakpoint();

  const myDivNumber = `${divNamePrefix}${divNumber}`;

  //global
  const isDefaultTheme: boolean =
    toBoolean(widgetnemgooReady?.isDefaultTheme) || false;
  const globalThemeNemgoo = cloudContext?.masterPageNemgooConfig?.theme;
  const globalDesignNemgoo =
    cloudContext?.masterPageNemgooConfig?.design?.[myDivNumber];
  const widgetDesignNemgoo = widgetnemgooReady?.design?.[myDivNumber];

  const blockProps = {
    id: id,
    ref: ref,
    ["div-name"]: myDivNumber,
    className: twMergeUtil(
      globalThemeNemgoo, //солих утгууд
      customClassName || className || "",
      myDivNumber === "divouterblock"
        ? isDefaultTheme
          ? globalDesignNemgoo?.className
          : ""
        : globalDesignNemgoo?.className,
      //! defaultAttribute?.className,
      widgetDesignNemgoo?.className ||
        widgetnemgooReady?.[myDivNumber]?.className ||
        ""
    ),
    style: {
      ...customStyle,
      ...style,
      ...(myDivNumber === "divouterblock"
        ? isDefaultTheme
          ? globalDesignNemgoo?.style
          : {}
        : globalDesignNemgoo?.style),

      //! ...defaultAttribute?.style,
      ...(widgetDesignNemgoo?.style || widgetnemgooReady?.[myDivNumber]?.style),
    },
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    // initial: {
    //   initial,
    //   ...widgetnemgooReady?.design?.[myDivNumber]?.motion?.initial,
    // },
    // animate: {
    //   animate,
    //   ...widgetnemgooReady?.design?.[myDivNumber]?.motion?.animate,
    // },
    // variants: {
    //   variants,
    //   ...widgetnemgooReady?.design?.[myDivNumber]?.motion?.variants,
    // },
    // transition: {
    //   transition,
    //   ...widgetnemgooReady?.design?.[myDivNumber]?.motion?.transition,
    // },
    ...customProps,
  };

  if (hideInMobile && isMobile) return null;
  if (hideInDesktop && isDesktop) return null;

  switch (type) {
    case "div":
      return <div {...blockProps}>{children}</div>;
    case "span":
      return <span {...blockProps}>{children}</span>;
    case "i":
      return <i {...blockProps}>{children}</i>;
    case "p":
      return <p {...blockProps}>{children}</p>;
    case "label":
      return <label {...blockProps}>{children}</label>;
    case "code":
      return <code {...blockProps}>{children}</code>;
    case "nav":
      return <nav {...blockProps}>{children}</nav>;
    case "ul":
      return <ul {...blockProps}>{children}</ul>;
    case "main":
      return <main {...blockProps}>{children}</main>;
    case "section":
      return <section {...blockProps}>{children}</section>;
    default:
      return <div {...blockProps}>{children}</div>;
  }

  const MyComponent = () =>
    useMemo(() => {
      switch (type) {
        case "div":
          return <div {...blockProps}>{children}</div>;
        case "span":
          return <span {...blockProps}>{children}</span>;
        case "i":
          return <i {...blockProps}>{children}</i>;
        case "p":
          return <p {...blockProps}>{children}</p>;
        case "label":
          return <label {...blockProps}>{children}</label>;
        case "code":
          return <code {...blockProps}>{children}</code>;
        case "nav":
          return <nav {...blockProps}>{children}</nav>;
        case "ul":
          return <ul {...blockProps}>{children}</ul>;
        case "main":
          return <main {...blockProps}>{children}</main>;
        default:
          return <div {...blockProps}>{children}</div>;
      }
    }, []);

  return (
    // <AtomLinkV2
    //   url={url}
    //   // isPageLoadingShow={isPageLoadingShow}
    //   // setPageLoading={setPageLoading}
    // >
    //   <AtomTooltipV2 item={tooltip}>
    <MyComponent />
    //   </AtomTooltipV2>
    // </AtomLinkV2>
  );
}
