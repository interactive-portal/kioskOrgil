export default function IconDotsJump({
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
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 15 ; 0 -15; 0 15"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle fill={fillColor} stroke={strokeColor} cx="30" cy="50" r="6">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 10 ; 0 -10; 0 10"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle fill={fillColor} stroke={strokeColor} cx="54" cy="50" r="6">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 5 ; 0 -5; 0 5"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  );
}
