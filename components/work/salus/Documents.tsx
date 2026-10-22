"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { docs, type DocId } from "./data";
import { SectionHead, useT } from "./ui";

const pageSrc = (folder: string, i: number) => `${folder}/p-${String(i + 1).padStart(2, "0")}.webp`;

export default function Documents({ color }: { color: string }) {
  const { locale, tr } = useT();
  const [docId, setDocId] = useState<DocId>("pvlm-deck");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  const doc = docs.find((d) => d.id === docId)!;
  const last = doc.pages - 1;

  const go = useCallback(
    (delta: number) => setPage((p) => Math.min(last, Math.max(0, p + delta))),
    [last],
  );

  // altre sezioni possono aprire un documento
  useEffect(() => {
    const on = (e: Event) => {
      setDocId((e as CustomEvent<DocId>).detail);
      setPage(0);
    };
    window.addEventListener("salus:doc", on);
    return () => window.removeEventListener("salus:doc", on);
  }, []);

  // precarica la pagina successiva
  useEffect(() => {
    if (page < last) {
      const img = new Image();
      img.src = pageSrc(doc.folder, page + 1);
    }
  }, [doc.folder, page, last]);

  // lightbox: tastiera + blocco dello scroll
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [open, go]);

  const portrait = doc.ratio === "portrait";
  const alt = `${tr(doc.title)} — ${locale === "it" ? "pagina" : "page"} ${page + 1}`;

  return (
    <section className="border-t border-line bg-bg-soft px-5 py-16 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          id="documenti"
          n="06"
          color={color}
          label={{ it: "I documenti", en: "The documents" }}
          title={{ it: "Si può leggere tutto", en: "Everything can be read" }}
          intro={{
            it: "La presentazione del prodotto e il documento economico del Med Box, pagina per pagina. Entrambi si scaricano in PDF.",
            en: "The product presentation and the Med Box economic document, page by page. Both can be downloaded as PDF.",
          }}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* SELECTOR */}
          <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
            {docs.map((d) => {
              const active = d.id === docId;
              return (
                <div
                  key={d.id}
                  className="rounded-2xl border p-5 transition-colors"
                  style={{ borderColor: active ? color : "var(--line)" }}
                >
                  <button
                    type="button"
                    data-cursor
                    onClick={() => {
                      setDocId(d.id);
                      setPage(0);
                    }}
                    aria-pressed={active}
                    className="block w-full text-left"
                  >
                    <span
                      className="font-mono text-[0.65rem] uppercase tracking-[0.16em]"
                      style={{ color: active ? color : "var(--muted)" }}
                    >
                      {tr(d.kind)} · {d.pages} {locale === "it" ? "pagine" : "pages"}
                    </span>
                    <span className="mt-2 block font-display text-2xl uppercase leading-[0.95] tracking-tight">
                      {tr(d.title)}
                    </span>
                    <span className="mt-2 block font-sans text-sm leading-snug text-muted">{tr(d.note)}</span>
                  </button>
                  <a
                    href={d.pdf}
                    download
                    data-cursor
                    className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] hover:underline"
                    style={{ color }}
                  >
                    {locale === "it" ? "Scarica il PDF" : "Download PDF"} · {d.size} ↓
                  </a>
                </div>
              );
            })}
            <p className="px-1 font-sans text-xs leading-relaxed text-muted">
              {tr({
                it: "Il documento economico è un piano: le cifre sono stime di progetto. La presentazione usa un ambiente demo con dati dimostrativi.",
                en: "The economic document is a plan: figures are project estimates. The presentation uses a demo environment with demonstration data.",
              })}
            </p>
          </div>

          {/* VIEWER */}
          <div className="min-w-0 lg:col-span-8">
            <div className="rounded-3xl border border-line bg-bg p-3 md:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {page + 1} / {doc.pages}
                </span>
                <div className="flex items-center gap-2">
                  <NavBtn label={locale === "it" ? "Pagina precedente" : "Previous page"} disabled={page === 0} onClick={() => go(-1)}>
                    ←
                  </NavBtn>
                  <NavBtn label={locale === "it" ? "Pagina successiva" : "Next page"} disabled={page === last} onClick={() => go(1)}>
                    →
                  </NavBtn>
                  <NavBtn label={locale === "it" ? "Schermo intero" : "Full screen"} onClick={() => setOpen(true)}>
                    ⤢
                  </NavBtn>
                </div>
              </div>

              <button
                type="button"
                data-cursor
                onClick={() => setOpen(true)}
                aria-label={locale === "it" ? "Apri a schermo intero" : "Open full screen"}
                className="mx-auto block overflow-hidden rounded-xl border border-line bg-white"
                style={{ maxWidth: portrait ? 560 : "100%" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={doc.id + page}
                  src={pageSrc(doc.folder, page)}
                  alt={alt}
                  width={portrait ? 1000 : 1280}
                  height={portrait ? 1415 : 720}
                  className="h-auto w-full"
                />
              </button>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-2" data-lenis-prevent>
                {Array.from({ length: doc.pages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    data-cursor
                    onClick={() => setPage(i)}
                    aria-label={`${locale === "it" ? "Vai a pagina" : "Go to page"} ${i + 1}`}
                    aria-current={i === page}
                    className="shrink-0 overflow-hidden rounded-md border-2 bg-white transition-opacity"
                    style={{
                      borderColor: i === page ? color : "transparent",
                      opacity: i === page ? 1 : 0.55,
                      width: portrait ? 56 : 96,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pageSrc(doc.folder, i)}
                      alt=""
                      loading="lazy"
                      width={portrait ? 1000 : 1280}
                      height={portrait ? 1415 : 720}
                      className="h-auto w-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={tr(doc.title)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[150] flex flex-col bg-black/92 p-3 backdrop-blur-sm md:p-6"
            onClick={() => setOpen(false)}
          >
            <div className="flex items-center justify-between gap-3 pb-3" onClick={(e) => e.stopPropagation()}>
              <span className="min-w-0 truncate font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {tr(doc.title)} · {page + 1} / {doc.pages}
              </span>
              <div className="flex shrink-0 items-center gap-2">
                <NavBtn label={locale === "it" ? "Pagina precedente" : "Previous page"} disabled={page === 0} onClick={() => go(-1)}>
                  ←
                </NavBtn>
                <NavBtn label={locale === "it" ? "Pagina successiva" : "Next page"} disabled={page === last} onClick={() => go(1)}>
                  →
                </NavBtn>
                <NavBtn label={locale === "it" ? "Chiudi" : "Close"} onClick={() => setOpen(false)}>
                  ✕
                </NavBtn>
              </div>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pageSrc(doc.folder, page)}
                alt={alt}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full rounded-lg bg-white object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function NavBtn({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      data-cursor
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-base text-fg transition-colors hover:border-fg/50 disabled:opacity-30"
    >
      {children}
    </button>
  );
}
