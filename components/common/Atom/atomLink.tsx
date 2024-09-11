import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import _ from "lodash";
import {
  toBoolean,
  twMergeUtil,
} from "@/components/common/engineBox/util/atomHelper";
import prepareUrlInternal from "@/components/common/engineBox/util/urlHelper";
import { useCloud } from "hooks/use-cloud";

export default function AtomLinkV2({
  item = "",
  url = {},
  color = "cozy",
  theme,
  customClassName = "",
  customStyle = {},
  isPageLoadingShow = false,
  setPageLoading = () => {},
  children,
}: {
  item?: any;
  url?: any;
  color?: string;
  theme?: any;
  customClassName?: string;
  customStyle?: any;
  isPageLoadingShow?: boolean;
  setPageLoading?: any;
  children: any;
}) {
  const router = useRouter();
  // const cloudContext = useCloudEngine();
  const cloudContext = useCloud();
  const keepQuery = toBoolean(url?.keepQuery || false);

  if (_.isEmpty(url)) return children;

  if (!_.isEmpty(url?.baseUrl)) {
    return (
      <a
        href={url.baseUrl}
        target="_blank"
        className={twMergeUtil(
          theme,
          `text-pink-500 hover:text-${color} ${customClassName}`
        )}
      >
        {children}
      </a>
    );
  }

  //үсрэх href объектоо бэлдэж байна.shallow="true"
  //nemgoo-оос path ирвэл түүнийг тавина.
  //path асуудалтай байвал query-г тавина.
  const urlObject = prepareUrlInternal(
    router,
    url,
    cloudContext.hostObject,
    keepQuery
  );

  const onClick = (e: any) => {
    if (isPageLoadingShow) {
      setPageLoading(true);
    }
  };

  // console.log("link:", urlObject);

  return (
    <Link
      href={urlObject}
      {...url?.props}
      as={urlObject}
      className={twMerge(
        `hover:text-${color}`,
        customClassName || "",
        url?.className || ""
      )}
      style={{ ...customStyle, ...url?.style }}
      // onClick={(e: any) => onClick(e)}
    >
      {children}
    </Link>
  );
}
