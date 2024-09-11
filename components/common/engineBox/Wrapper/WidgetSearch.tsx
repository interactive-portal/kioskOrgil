import _ from "lodash";
import { twMergeUtil } from "@/components/common/engineBox/util/atomHelper";
import { useCloud } from "hooks/use-cloud";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";

export default function WidgetSearch({
  searchObject,
  onReadyDatasrcSearch,
}: {
  searchObject: any;
  onReadyDatasrcSearch: any;
}) {
  const cloudContext = useCloud();

  if (_.isEmpty(searchObject)) return null;

  // searchObject гэдэг нь
  //   "search": {
  //     "input": {
  //         "className": ""
  //     },
  //     "placeholder": {
  //         "title": "Хайх"
  //         "className": ""
  //     },
  //     "icon": {
  //         "icon": "far fa-search",
  //         "className": ""
  //     }
  // },
  // гэсэн зүйл байгаа
  const globalThemeNemgoo = cloudContext?.masterPageNemgooConfig?.theme;

  const icon = searchObject?.icon;

  return (
    <BlockDiv className="relative" divNumber="WidgetSearchOuter">
      <input
        className={twMergeUtil(
          globalThemeNemgoo,
          "w-full h-7 rounded-lg border-slate-200 text-[13px] text-slate-500  placeholder:text-slate-300 placeholder:text-[12px] focus:ring-slate-300 focus:ring-1 focus:border-0 mb-4 relative",
          searchObject?.input?.className || "",
          searchObject?.placeholder?.className || ""
        )}
        style={searchObject?.input?.style || {}}
        type="search"
        placeholder={searchObject?.placeholder?.title || "Хайх"}
        onChange={(e) =>
          onReadyDatasrcSearch({
            pathName: searchObject?.pathName || "title",
            value: e.target.value,
          })
        }
      />
      <RenderAtom
        item={{ value: icon?.icon || "far fa-search" }}
        renderType="icon"
        customClassName="absolute inset-y-0 right-3 text-slate-400 cursor-pointer hover:brightness-90"
      />
    </BlockDiv>
  );
}
