"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: EASE,
    },
  }),
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

/** Scroll-into-view reveal (fade + rise). */
export default function Reveal({
  children,
  className,
  delay = 0,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word rising text reveal. */
export function RevealText({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.04,
              ease: EASE,
            }}
            aria-hidden
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Line-mask headline reveal: each line rises out of a clipped box.
 * Pass an array of strings (one per visual line).
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  stagger = 0.09,
  once = true,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <span className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="split-line" aria-hidden>
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, delay: i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Clip-path wipe reveal — the block is uncovered left→right (or bottom→top)
 * as it enters. Good for cards, images, rules.
 */
export function ClipReveal({
  children,
  className,
  from = "left",
  delay = 0,
  duration = 0.9,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  from?: "left" | "bottom";
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  const hidden =
    from === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
  return (
    <motion.div
      data-anim
      className={className}
      style={{ WebkitClipPath: "inset(0 0% 0 0)" }}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll parallax on the Y axis. `speed` is the total px travel across the
 * element's scroll pass (positive = moves up as you scroll down). No-ops for
 * reduced-motion users.
 */
export function Parallax({
  children,
  className,
  speed = 80,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
