"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

export default function Nav() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { id: "#work", label: t.nav.work },
    { id: "#about", label: t.nav.about },
    { id: "#capabilities", label: t.nav.capabilities },
    { id: "#contact", label: t.nav.contact },
  ];

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToTarget(id), open ? 350 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-colors duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/70 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
          {/* Wordmark */}
          <button
            onClick={() => scrollToTarget(0)}
            className="group flex items-center gap-2"
            aria-label="Francesco Caro — home"
          >
            <span className="font-display text-2xl leading-none tracking-tight md:text-3xl">
              FC
            </span>
            <span className="hidden h-2 w-2 rounded-full bg-acid md:block" />
          </button>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="hover-line font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right: language + availability + burger */}
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1.5 md:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                {t.nav.available}
              </span>
            </div>

            <LangToggle locale={locale} setLocale={setLocale} />

            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
            >
              <span
                className={`h-[2px] w-6 bg-fg transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-fg transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-fg transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[110] flex flex-col justify-center bg-bg px-6 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => go(l.id)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.07 }}
                  className="text-left font-display text-6xl uppercase leading-[0.95] text-fg"
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <div className="mt-12 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {t.nav.available}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LangToggle({
  locale,
  setLocale,
}: {
  locale: "it" | "en";
  setLocale: (l: "it" | "en") => void;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-line p-0.5 font-mono text-[0.7rem] uppercase">
      {(["it", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            locale === l ? "bg-acid text-black" : "text-muted hover:text-fg"
          }`}
          aria-pressed={locale === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
