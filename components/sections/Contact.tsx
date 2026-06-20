"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { contact } from "@/lib/content";
import Marquee from "@/components/ui/Marquee";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative border-t border-line pt-24 md:pt-36">
      <div className="border-y border-line py-4">
        <Marquee
          className="font-display text-4xl uppercase tracking-tight text-acid glow-acid md:text-7xl"
          items={[t.contact.title, t.contact.title, t.contact.title]}
          separator={
            <span className="mx-8 inline-block h-4 w-4 rotate-45 bg-magenta align-middle md:mx-12" />
          }
        />
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="section-label mb-6">{t.contact.label}</p>
            <p className="max-w-xl font-sans text-xl leading-relaxed text-fg/80 md:text-2xl">
              {t.contact.lead}
            </p>

            <motion.a
              href={`mailto:${contact.email}`}
              data-cursor
              className="group mt-10 inline-block font-display text-[8vw] uppercase leading-none tracking-tight text-fg transition-colors hover:text-acid md:text-[5vw]"
              whileHover={{ x: 8 }}
            >
              <span className="hover-line break-all">{contact.email}</span>
            </motion.a>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton
                as="a"
                href={`mailto:${contact.email}`}
                ariaLabel={t.contact.cta}
                className="inline-flex items-center gap-2 rounded-full bg-acid px-7 py-3 font-mono text-sm uppercase tracking-[0.1em] text-black transition-transform"
              >
                {t.contact.cta} →
              </MagneticButton>

              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-fg"
              >
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3 md:items-end">
            <span className="section-label mb-2">{t.contact.elsewhere}</span>
            {contact.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 font-display text-2xl uppercase tracking-tight text-fg/80 transition-colors hover:text-acid md:text-3xl"
              >
                <span className="hover-line">{s.label}</span>
                <span className="font-mono text-xs normal-case tracking-normal text-muted">
                  {s.handle}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
