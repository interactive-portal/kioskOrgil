export default function IconCircle({
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
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
      >
        <circle
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="4"
          cx="50"
          cy="50"
          r="44"
          style={{ opacity: 0.5 }}
        />
        <circle
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="3"
          cx="8"
          cy="54"
          r="6"
          style={{ opacity: 1 }}
        >
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 48"
            to="360 50 52"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </>
  );
}
