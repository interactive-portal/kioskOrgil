export default function IconDotsFade({
  width = "100",
  height = "75",
  fillColor = "#d1d1d1",
  strokeColor = "none",
}: {
  width?: any;
  height?: any;
  fillColor?: string;
  strokeColor?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
    >
      <circle fill={fillColor} stroke={strokeColor} cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle fill={fillColor} stroke={strokeColor} cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle fill={fillColor} stroke={strokeColor} cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  );
}
