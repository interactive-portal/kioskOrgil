import { usePage } from "hooks/use-page";
import _ from "lodash";
import { useEffect } from "react";

export default function usePageRender({
  rawWidgetList,
}: {
  rawWidgetList: any;
}) {
  const pageContext = usePage();

  useEffect(() => {
    if (
      !_.isEmpty(rawWidgetList) &&
      !_.isEqual(rawWidgetList, pageContext.ddd)
    ) {
      pageContext.setDdd(rawWidgetList);
    }
  }, [rawWidgetList]);

  return null;
}
