import BlockDiv from "@/components/common/Block/BlockDiv";

export default function Loading1({
  fillColor = "transparent",
  strokeColor = "#d1d1d1",
  customClassName = "",
  className = "",
  customStyle,
}: {
  fillColor?: string;
  strokeColor?: string;
  customClassName?: string;
  className?: string;
  customStyle?: any;
}) {
  return (
    <>
      <BlockDiv
        className={`w-full h-full border-t-4 border-[${strokeColor}] bg-[${fillColor}] border-solid rounded-full animate-spin ${customClassName} ${className}`}
        style={customStyle}
      />
    </>
  );
}
