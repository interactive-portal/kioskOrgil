import RenderAtom from "./RenderAtom";

export default function RenderAtomList({
  atomList = [],
}: {
  atomList?: Array<any>;
}) {
  return (
    <>
      {atomList.map((item: any, index: number) => {
        return (
          <RenderAtom
            key={item?.id || index}
            item={item?.item}
            renderType={
              item?.renderType || item?.type || item?.render || item?.atom
            }
            customClassName={
              item?.customClassName || item?.className || item?.class
            }
            {...item?.customProps}
            form={item?.form}
            url={item?.url}
            tooltip={item?.tooltip}
          />
        );
      })}
    </>
  );
}
