import BlockDiv from "@/components/common/Block/BlockDiv";

export default function Loading1({
  percent,
  fillColor = "transparent",
  strokeColor = "#d1d1d1",
  customClassName = "",
  className = "",
  customStyle,
}: {
  percent?: string | number;
  fillColor?: string;
  strokeColor?: string;
  customClassName?: string;
  className?: string;
  customStyle?: any;
}) {
  return (
    <>
      <div className="mt-2 w-full bg-gray-200 h-4 rounded-full">
        <div
          className="h-full bg-slate-500 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </>
  );
}
