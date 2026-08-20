"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const MedBoxCanvas = dynamic(() => import("@/components/three/MedBoxCanvas"), {
  ssr: false,
});

export default function MedBoxReveal({ color }: { color: string }) {
  const { locale } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.02,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const labelOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [1, 0, 0, 1]);

  if (reduced) {
    return (
      <section className="relative border-b border-line bg-bg px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/models/smart-med-box.webp"
            alt="Salus AI Smart Med Box"
            className="w-full rounded-2xl border border-line"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={trackRef}
      aria-hidden={false}
      className="relative border-b border-line bg-bg"
      style={{ height: "230vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-20" aria-hidden />
        <MedBoxCanvas progress={scrollYProgress} active={active} />

        <motion.div
          style={{ opacity: labelOpacity }}
          className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-10"
        >
          <span className="section-label" style={{ color }}>
            [ 01 ] Smart Med Box
          </span>
          <span className="section-label">
            {locale === "it" ? "Scrolla per esplodere" : "Scroll to explode"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
