// A registered-cattle-brand style seal: double ring, curved lettering, WR monogram
// with a longhorn bar. Renders crisp at any size; inherits currentColor.
export function Emblem({ size = 44, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      role="img"
      aria-label="WagyuRanch seal"
      fill="none"
    >
      <defs>
        <path id="wr-top" d="M 15,50 A 35,35 0 0 1 85,50" />
        <path id="wr-bot" d="M 84,50 A 34,34 0 0 1 16,50" />
      </defs>
      <circle cx="50" cy="50" r="47.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="43" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <text
        fill="currentColor"
        style={{ fontFamily: "var(--sans)", fontSize: "8.4px", fontWeight: 700, letterSpacing: "2.4px" }}
      >
        <textPath href="#wr-top" startOffset="50%" textAnchor="middle">
          WAGYU RANCH
        </textPath>
      </text>
      <text
        fill="currentColor"
        style={{ fontFamily: "var(--sans)", fontSize: "6.2px", fontWeight: 600, letterSpacing: "3px" }}
      >
        <textPath href="#wr-bot" startOffset="50%" textAnchor="middle">
          ELITE WAGYU SEEDSTOCK
        </textPath>
      </text>
      {/* separator stars */}
      <g fill="currentColor">
        <circle cx="15.5" cy="50" r="1.1" />
        <circle cx="84.5" cy="50" r="1.1" />
      </g>
      {/* WR brand-iron monogram with longhorn bar */}
      <g stroke="currentColor" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round">
        {/* horn bar */}
        <path d="M 30,38 Q 50,31 70,38" strokeWidth="2.2" />
        {/* W */}
        <path d="M 33,44 L 37,62 L 43,50 L 49,62 L 53,44" />
        {/* R */}
        <path d="M 58,62 L 58,45 L 64,45 Q 69,45 69,50 Q 69,54.5 64,54.5 L 58.5,54.5 L 69,62" />
      </g>
    </svg>
  );
}
