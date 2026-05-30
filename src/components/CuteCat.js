// Oreo — a dope brown cat in sleek shades and a gold chain. Face shown.
export default function CuteCat({ size = 46 }) {
  const ink = "#241409";
  const fur = "#6E4A30";
  const furDark = "#5A3B25";
  const furLight = "#82593B";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }} aria-hidden>
      {/* tail */}
      <path d="M67 75 C91 73 90 43 77 45 C85 49 83 66 64 66 Z" fill={furDark} />
      <circle cx="80" cy="45" r="4" fill="#EAD9C2" />
      {/* body + legs */}
      <ellipse cx="50" cy="81" rx="22" ry="15" fill={furDark} />
      <rect x="37" y="85" width="9" height="13" rx="4.5" fill={furDark} />
      <rect x="54" y="85" width="9" height="13" rx="4.5" fill={furDark} />
      {/* ears (right one notched) */}
      <path d="M22 35 L30 10 L48 33 Z" fill={fur} />
      <path d="M78 35 L72 22 L67 14 L62 21 L52 33 Z" fill={fur} />
      <path d="M29 31 L32 18 L41 31 Z" fill="#9A7152" />
      <path d="M70 31 L66 21 L59 30 Z" fill="#9A7152" />
      {/* head */}
      <rect x="18" y="26" width="64" height="50" rx="19" fill={fur} />
      <path d="M25 40 Q25 33 33 33 Q32 47 35 57 Q25 52 25 40 Z" fill={furLight} opacity="0.7" />

      {/* gold chain on the chest */}
      <g fill="#E8C24A" stroke="#A9821E" strokeWidth="0.6">
        <circle cx="34" cy="76" r="2.1" /><circle cx="40" cy="78.5" r="2.1" /><circle cx="46" cy="80" r="2.1" />
        <circle cx="52" cy="80" r="2.1" /><circle cx="58" cy="78.5" r="2.1" /><circle cx="64" cy="76" r="2.1" />
      </g>
      <path d="M49 82 l3 3 -3 3 -3 -3 Z" fill="#F2D45E" stroke="#A9821E" strokeWidth="0.6" />

      {/* sunglasses */}
      <path d="M25 50 L17 46" stroke="#0d0d0f" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M75 50 L83 46" stroke="#0d0d0f" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="24" y="46" width="22" height="14" rx="5" fill="#0d0d0f" />
      <rect x="54" y="46" width="22" height="14" rx="5" fill="#0d0d0f" />
      <rect x="45" y="50" width="10" height="3" rx="1.5" fill="#0d0d0f" />
      <rect x="26" y="48" width="18" height="4" rx="2" fill="#33333a" opacity="0.7" />
      <rect x="56" y="48" width="18" height="4" rx="2" fill="#33333a" opacity="0.7" />
      <path d="M29 58 L38 48" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
      <path d="M34 58 L38 53" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M59 58 L68 48" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
      <path d="M64 58 L68 53" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M27 58.5 L43 58.5" stroke="#6FC95A" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      <path d="M57 58.5 L73 58.5" stroke="#6FC95A" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />

      {/* nose + smirk */}
      <path d="M47 63 L53 63 L50 66 Z" fill="#3a2417" />
      <path d="M50 66 Q46 69 43 67" stroke={ink} strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M50 66 Q55 69 59 64" stroke={ink} strokeWidth="1.7" fill="none" strokeLinecap="round" />

      {/* whiskers */}
      <g stroke="#EFE6DA" strokeWidth="1" strokeLinecap="round" opacity="0.6">
        <path d="M22 62 L13 60" />
        <path d="M22 65 L14 66" />
        <path d="M78 62 L87 60" />
        <path d="M78 65 L86 66" />
      </g>
    </svg>
  );
}
