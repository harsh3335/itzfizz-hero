// Top-view sports car (inline SVG, faces right).
// To use your own image instead: put car.png in /public and swap this for
// <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/car.png`} className="w-44 md:w-80" alt="" />
export default function Car() {
  return (
    <svg viewBox="0 0 300 120" fill="none" className="relative w-44 md:w-80" aria-hidden="true">
      <ellipse cx="150" cy="106" rx="125" ry="8" fill="#000" opacity=".5" />
      {[[52, 6], [52, 98], [204, 6], [204, 98]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="38" height="16" rx="6" fill="#111" />
      ))}
      <path d="M14 60c0-22 18-38 52-42l70-8c28-2 56 2 80 10 38 6 70 20 70 40s-32 34-70 40c-24 8-52 12-80 10l-70-8c-34-4-52-20-52-42Z" fill="#ff6a00" />
      <path d="M40 60c0-14 10-24 30-28M40 60c0 14 10 24 30 28" stroke="#ffffff40" strokeWidth="2" />
      <path d="M120 24c24-4 52-4 74 2 10 14 10 54 0 68-22 6-50 6-74 2-14-14-14-58 0-72Z" fill="#14141c" />
      <path d="M132 32c18-2 38-2 52 2 6 10 6 44 0 54-14 4-34 4-52 2-8-12-8-46 0-58Z" fill="#2b3b55" opacity=".7" />
      <path d="M214 30l60 10M214 90l60-10" stroke="#00000033" strokeWidth="3" />
      <rect x="278" y="34" width="14" height="10" rx="4" fill="#fff6c8" />
      <rect x="278" y="76" width="14" height="10" rx="4" fill="#fff6c8" />
      <rect x="8" y="38" width="8" height="12" rx="3" fill="#ff2a2a" />
      <rect x="8" y="70" width="8" height="12" rx="3" fill="#ff2a2a" />
    </svg>
  );
}
