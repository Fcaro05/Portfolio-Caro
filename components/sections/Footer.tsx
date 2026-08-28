"use client";

import { useI18n } from "@/lib/i18n";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg pt-16">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-8 border-b border-line pb-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <p className="font-sans text-lg text-fg/80">{t.footer.built}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-muted">
              {t.footer.tech}
            </p>
          </div>

          <button
            onClick={() => scrollToTarget(0)}
            className="group inline-flex items-center gap-3 self-start rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:bg-fg hover:text-black md:self-auto"
          >
            {t.footer.top}
            <span className="transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-4 py-8 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted md:flex-row md:items-center md:justify-between">
          <span>
            © {year} Francesco Caro — {t.footer.rights}
          </span>
          <span>Milano · IT</span>
          <span>Made with Next.js · R3F · GSAP</span>
        </div>
      </div>

      {/* Giant outline wordmark */}
      <div className="select-none px-2 pb-4">
        <h2 className="text-stroke text-center font-display text-[19vw] leading-[0.78] tracking-tight opacity-70">
          FRANCESCO CARO
        </h2>
      </div>
    </footer>
  );
}
