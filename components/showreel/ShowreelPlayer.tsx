"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ShowreelInner = dynamic(() => import("./ShowreelInner"), {
  ssr: false,
  loading: () => <Poster loading />,
});

function Poster({ loading = false }: { loading?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg">
      <span className="font-display text-5xl uppercase tracking-tight text-acid glow-acid md:text-7xl">
        Showreel
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        {loading ? "Loading…" : "Francesco Caro — 2021 / 2026"}
      </span>
    </div>
  );
}

/**
 * Mounts the Remotion Player once it scrolls near the viewport, so the player
 * runtime stays out of the critical path. Falls back to a first-interaction
 * trigger and a lazy timeout in case IntersectionObserver never fires.
 */
export default function ShowreelPlayer() {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let done = false;
    const arm = () => {
      if (done) return;
      done = true;
      setNear(true);
      cleanup();
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) arm();
            },
            { rootMargin: "500px" }
          )
        : null;
    io?.observe(el);

    const onInteract = () => arm();
    window.addEventListener("scroll", onInteract, { passive: true });
    window.addEventListener("pointermove", onInteract, { passive: true });
    const t = window.setTimeout(arm, 4000);

    function cleanup() {
      io?.disconnect();
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("pointermove", onInteract);
      window.clearTimeout(t);
    }
    return cleanup;
  }, []);

  return (
    <div ref={box} className="absolute inset-0">
      {near ? <ShowreelInner /> : <Poster />}
    </div>
  );
}
