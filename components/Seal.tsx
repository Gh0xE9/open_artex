export function Seal({
  size = 96,
  roman,
  label,
}: {
  size?: number;
  roman?: string;
  label?: string;
}) {
  return (
    <svg
      className="seal-svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`ARTEX 二开认证${roman ? ` ${roman} 级 ${label ?? ""}` : ""}`}
    >
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="2"
        fill="none"
        stroke="#a5322a"
        strokeWidth="2.4"
      />
      <rect x="9.5" y="9.5" width="81" height="81" rx="1" fill="none" stroke="#a5322a" strokeWidth="0.8" />
      <g
        fill="#a5322a"
        fontFamily="-apple-system, 'Segoe UI', 'Microsoft YaHei', 'PingFang SC', sans-serif"
        fontSize="23"
        fontWeight="700"
        textAnchor="middle"
      >
        <text x="70" y="40">二</text>
        <text x="70" y="72">开</text>
        <text x="30" y="40">认</text>
        <text x="30" y="72">证</text>
      </g>
    </svg>
  );
}
