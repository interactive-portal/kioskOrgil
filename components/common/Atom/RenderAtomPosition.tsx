import { twMerge } from "tailwind-merge";

export default function RenderAtomPosition({
  item,
  customClassName = "",
  customStyle,
}: {
  item?: any;
  customClassName?: string;
  customStyle?: any;
}) {
  return (
    <span
      className={twMerge(
        "border border-dashed border-gray-300 p-1 m-1",
        customClassName
      )}
      style={customStyle}
    >
      {item?.value || "no-position!"}
    </span>
  );
}
