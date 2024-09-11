export default function IconCircle({
  customStyle = "",
  customClassName = "",
  width = "100",
  height = "75",
  fillColor = "#d1d1d1",
  strokeColor = "#d1d1d1",
}: {
  customClassName?: string;
  customStyle?: any;
  width?: any;
  height?: any;
  fillColor?: string;
  strokeColor?: string;
}) {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
      >
        <path
          fill={fillColor}
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </>
  );
}
