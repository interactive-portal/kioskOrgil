export default function IconTime({
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
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      enableBackground="new 0 0 100 100"
    >
      <circle
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="4"
        stroke-miterlimit="10"
        cx="50"
        cy="50"
        r="48"
        style={{ opacity: 0.5 }}
      />
      <line
        fill={fillColor}
        stroke-linecap="round"
        stroke={strokeColor}
        strokeWidth="4"
        stroke-miterlimit="10"
        x1="50"
        y1="50"
        x2="85"
        y2="50.5"
      >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </line>
      <line
        fill={fillColor}
        stroke-linecap="round"
        stroke={strokeColor}
        strokeWidth="4"
        stroke-miterlimit="10"
        x1="50"
        y1="50"
        x2="49.5"
        y2="74"
      >
        <animateTransform
          attributeName="transform"
          dur="15s"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  );
}
