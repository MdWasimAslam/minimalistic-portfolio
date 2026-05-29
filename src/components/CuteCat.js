// A cute chibi black cat (Oreo) with big green eyes — modeled on the reference.
export default function CuteCat({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }} aria-hidden>
      {/* tail */}
      <path d="M67 74 C90 72 90 44 77 45 C85 49 83 65 64 65 Z" fill="#2B2B31" />
      <circle cx="80" cy="46" r="4.2" fill="#EFEFEF" />
      {/* body + legs */}
      <ellipse cx="50" cy="80" rx="22" ry="15" fill="#26262B" />
      <rect x="37" y="84" width="9" height="13" rx="4.5" fill="#26262B" />
      <rect x="54" y="84" width="9" height="13" rx="4.5" fill="#26262B" />
      {/* ears */}
      <path d="M23 35 L31 11 L47 33 Z" fill="#2B2B31" />
      <path d="M77 35 L69 11 L53 33 Z" fill="#2B2B31" />
      <path d="M30 31 L33 19 L41 31 Z" fill="#54545E" />
      <path d="M70 31 L67 19 L59 31 Z" fill="#54545E" />
      {/* head */}
      <rect x="19" y="27" width="62" height="49" rx="21" fill="#2B2B31" />
      <path d="M26 41 Q26 33 34 33 Q33 47 36 58 Q26 53 26 41 Z" fill="#39393F" opacity="0.7" />
      {/* blush */}
      <ellipse cx="29" cy="61" rx="5.5" ry="3" fill="#F08AA6" opacity="0.5" />
      <ellipse cx="71" cy="61" rx="5.5" ry="3" fill="#F08AA6" opacity="0.5" />
      {/* eyes (big + cute) */}
      <ellipse cx="38.5" cy="52" rx="9.4" ry="11.4" fill="#85C56B" />
      <ellipse cx="61.5" cy="52" rx="9.4" ry="11.4" fill="#85C56B" />
      <ellipse cx="38.5" cy="53" rx="3.2" ry="7.6" fill="#14140F" />
      <ellipse cx="61.5" cy="53" rx="3.2" ry="7.6" fill="#14140F" />
      <circle cx="35.6" cy="47" r="2.6" fill="#fff" />
      <circle cx="58.6" cy="47" r="2.6" fill="#fff" />
      <circle cx="41" cy="56" r="1.3" fill="#fff" opacity="0.8" />
      <circle cx="64" cy="56" r="1.3" fill="#fff" opacity="0.8" />
      {/* nose + mouth */}
      <path d="M47 63 L53 63 L50 66 Z" fill="#E8889E" />
      <path d="M50 66 Q46.5 70 43 67 M50 66 Q53.5 70 57 67" stroke="#14140F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
