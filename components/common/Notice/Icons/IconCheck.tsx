export default function IconCheck({
  width = "100",
  height = "75",
  fillColor = "none",
  strokeColor = "#d1d1d1",
}: {
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
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle cx="26" cy="26" r="25" fill={fillColor} />
        <path fill={fillColor} d="M14.1 27.2l7.1 7.2 16.7-16.8">
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
