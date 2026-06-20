"use client";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  separator?: React.ReactNode;
  className?: string;
};

/** Infinite horizontal marquee (CSS-driven, pauses on hover). */
export default function Marquee({
  items,
  reverse = false,
  separator,
  className,
}: MarqueeProps) {
  const sep = separator ?? (
    <span className="mx-6 inline-block h-3 w-3 rotate-45 bg-acid align-middle md:mx-10" />
  );
  const row = (
    <span className="inline-flex items-center">
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center">
          <span>{it}</span>
          {sep}
        </span>
      ))}
    </span>
  );

  return (
    <div className={`marquee overflow-hidden ${className ?? ""}`}>
      <div className={`marquee-track ${reverse ? "rev" : ""}`}>
        {row}
        {row}
      </div>
    </div>
  );
}
