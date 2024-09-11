import _ from "lodash";
import { twMerge } from "tailwind-merge";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function WidgetTitle({
  customClassName,
  customStyle,
  titleObject = {},
  gridJsonConfig = {},
  customDivNumber = "Widget",
}: {
  customClassName?: string;
  customStyle?: any;
  titleObject?: any;
  gridJsonConfig?: any;
  AllaroundTitle?: any;
  customDivNumber?: string;
}) {
  if (_.isEmpty(titleObject)) return null;

  //Дан объект эсэх?
  if (_.isPlainObject(titleObject)) {
    return (
      <TitleObject
        titleObject={titleObject}
        gridJsonConfig={gridJsonConfig}
        customClassName={customClassName}
        customStyle={customStyle}
        customDivNumber={customDivNumber}
      />
    );
  }

  //Array бүхий олон Title эсэх?
  if (_.isArray(titleObject)) {
    return (
      <>
        {titleObject.map((item: any, index: number) => {
          return (
            <TitleObject
              key={index}
              titleObject={item}
              gridJsonConfig={gridJsonConfig}
              customClassName={customClassName}
              customStyle={customStyle}
              customDivNumber={customDivNumber}
            />
          );
        })}
      </>
    );
  }

  return <></>;
}

/* ------------------------------------------------------ */
/*                       TITLEOBJECT                      */
/* ------------------------------------------------------ */
const TitleObject = ({
  titleObject,
  gridJsonConfig,
  customClassName,
  customStyle,
  customDivNumber,
}: {
  titleObject?: any;
  customClassName?: string;
  customStyle?: any;
  gridJsonConfig?: any;
  customDivNumber?: string;
}) => {
  //Энэ дээр 1 гэж бичсэн нь буруу болжээ. 1 гэсэн үгтэй Title ирдэг юм байна.
  // const title = titleObject.title === "1" ? metaConfig.name : titleObject.title;
  const title = titleObject?.title || "";

  const atomClassName = twMerge(
    gridJsonConfig?.title?.className || "",
    // AllaroundTitle?.className || "",
    customClassName || "",
    titleObject?.className || ""
  );

  const atomStyle = {
    ...customStyle,
    ...gridJsonConfig?.title?.style,
    // ...AllaroundTitle?.style,
    ...titleObject?.style,
  };

  return (
    <>
      <RenderAtom
        item={{ value: title }}
        renderType="title"
        customClassName={atomClassName}
        customStyle={atomStyle}
        customDivNumber={customDivNumber}
      />
    </>
  );
};
