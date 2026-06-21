"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MotionLink = motion.create(Link);

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div" | "link";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

/** Element that gently follows the cursor while hovered. */
export default function MagneticButton({
  children,
  className,
  strength = 0.4,
  as = "button",
  href,
  onClick,
  target,
  rel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  // Polymorphic; typed loosely to allow href/target across element types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag: any =
    as === "link"
      ? MotionLink
      : as === "a"
        ? motion.a
        : as === "div"
          ? motion.div
          : motion.button;

  return (
    <MotionTag
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
      data-cursor
    >
      {children}
    </MotionTag>
  );
}
