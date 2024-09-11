import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { toBoolean } from "@/util/helper";
import _ from "lodash";
import { useEffect } from "react";
import { useBoolean } from "react-use";

export default function WidgetFold({
  foldObject,
  onReadyDatasrcFold,
}: {
  foldObject: any;
  onReadyDatasrcFold: any;
}) {
  if (!foldObject) return null;

  // const cloudContext = useCloud();
  const [isFold, setIsFold] = useBoolean(toBoolean(foldObject?.isFold) || true);

  useEffect(() => {
    // console.log("Энд орсон уу?");
    // console.log("🚀 ~ isFold:", isFold);
    if (isFold) {
      onReadyDatasrcFold({
        isFold: true,
        truncateRow: foldObject?.truncateRow || 7,
      });
    } else {
      onReadyDatasrcFold({
        isFold: false,
      });
    }
  }, [isFold]);

  // foldObject гэдэг нь
  //   "fold": {
  //     {
  //       "truncateRow": "6",
  //       "fold": {
  //            "title": "Бүгдийг харах",
  //            "className": ""
  //       },
  //       "unFold": {
  //            "title": "Хумих",
  //            "className": ""
  //       }
  //  }
  // гэсэн зүйл байгаа

  // const globalThemeNemgoo = cloudContext?.masterPageNemgooConfig?.theme;

  return (
    <BlockDiv className="" divNumber="WidgetFold">
      {isFold ? (
        <RenderAtom
          item={{ value: foldObject?.fold?.title || "Бүгдийг харах" }}
          customClassName={`mt-4 block float-right text-{colorPrimary} cursor-pointer ${foldObject?.fold?.className}`}
          customStyle={foldObject?.fold?.style}
          onClick={() => setIsFold(false)}
        />
      ) : (
        <RenderAtom
          item={{ value: foldObject?.unFold?.title || "Хумих" }}
          customClassName={`mt-4 block float-right text-{colorPrimary} cursor-pointer ${foldObject?.unFold?.className}`}
          customStyle={foldObject?.unFold?.style}
          onClick={() => setIsFold(true)}
        />
      )}
    </BlockDiv>
  );
}
