export default function IconWave({
  width = "100",
  height = "75",
  fillColor = "#d1d1d1",
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
      enableBackground="new 0 0 0 0"
    >
      <rect x="20" y="50" width="4" height="10" fill={fillColor}>
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="30" y="50" width="4" height="10" fill={fillColor}>
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="40" y="50" width="4" height="10" fill={fillColor}>
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
