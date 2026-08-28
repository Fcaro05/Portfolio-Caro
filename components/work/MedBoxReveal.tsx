"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const MedBoxCanvas = dynamic(() => import("@/components/three/MedBoxCanvas"), {
  ssr: false,
});

const EXPLODE_END = 0.5;
const FOCUS_RAMP_END = 0.55;

type LStr = { it: string; en: string };

const FOCUS_CARDS: { key: LStr; title: LStr; desc: LStr; specs: [LStr, LStr][] }[] = [
  {
    key: { it: "/ 01 · Componente in focus", en: "/ 01 · Component in focus" },
    title: { it: "Coperchi di plastica", en: "Plastic covers" },
    desc: {
      it: "Coperchi trasparenti sigillano gli scomparti: il paziente vede sempre il contenuto e l'igiene resta garantita.",
      en: "Transparent covers seal each compartment: the patient always sees the contents, and hygiene stays guaranteed.",
    },
    specs: [
      [{ it: "Materiale", en: "Material" }, { it: "Plastica rigida", en: "Rigid plastic" }],
      [{ it: "Numero", en: "Count" }, { it: "Configurabile", en: "Configurable" }],
      [{ it: "Trasparenza", en: "Transparency" }, { it: "Totale", en: "Full" }],
      [{ it: "Apertura", en: "Opening" }, { it: "Manuale", en: "Manual" }],
    ],
  },
  {
    key: { it: "/ 02 · Componente in focus", en: "/ 02 · Component in focus" },
    title: { it: "Griglia di copertura", en: "Cover grid" },
    desc: {
      it: "Il pannello superiore ospita i coperchi e mantiene l'allineamento degli slot: dà rigidità all'intero device.",
      en: "The top panel houses the covers and keeps the slots aligned — it gives the whole device its structural rigidity.",
    },
    specs: [
      [{ it: "Funzione", en: "Function" }, { it: "Strutturale", en: "Structural" }],
      [{ it: "Allineamento", en: "Alignment" }, { it: "Configurabile", en: "Configurable" }],
      [{ it: "Materiale", en: "Material" }, { it: "ABS / PC", en: "ABS / PC" }],
      [{ it: "Finitura", en: "Finish" }, { it: "Opaca", en: "Matte" }],
    ],
  },
  {
    key: { it: "/ 03 · Componente in focus", en: "/ 03 · Component in focus" },
    title: { it: "Display IPS touch", en: "IPS touch display" },
    desc: {
      it: "Schermo touch HD che mostra orario, prossima dose e stato del device. Interazione diretta per conferme e impostazioni.",
      en: "HD touch screen showing the time, next dose and device status — direct interaction for confirmations and settings.",
    },
    specs: [
      [{ it: "Tecnologia", en: "Technology" }, { it: "IPS touch", en: "IPS touch" }],
      [{ it: "Risoluzione", en: "Resolution" }, { it: "HD", en: "HD" }],
      [{ it: "Interazione", en: "Interaction" }, { it: "Touch capacitivo", en: "Capacitive touch" }],
      [{ it: "Visibilità", en: "Visibility" }, { it: "Alta luminosità", en: "High brightness" }],
    ],
  },
  {
    key: { it: "/ 04 · Componente in focus", en: "/ 04 · Component in focus" },
    title: { it: "Shell esterna", en: "Outer shell" },
    desc: {
      it: "Il corpo principale del dispositivo: una scocca rigida che racchiude elettronica e sensori in un volume compatto.",
      en: "The device's main body: a rigid shell enclosing electronics and sensors in a compact footprint.",
    },
    specs: [
      [{ it: "Materiale", en: "Material" }, { it: "ABS rinforzato", en: "Reinforced ABS" }],
      [{ it: "Finitura", en: "Finish" }, { it: "Soft-touch", en: "Soft-touch" }],
      [{ it: "Forma", en: "Shape" }, { it: "Ergonomica", en: "Ergonomic" }],
      [{ it: "Logo", en: "Logo" }, { it: "Inciso", en: "Engraved" }],
    ],
  },
  {
    key: { it: "/ 05 · Componente in focus", en: "/ 05 · Component in focus" },
    title: { it: "Slot con sensoristica", en: "Sensorized slots" },
    desc: {
      it: "Scomparti indipendenti configurabili per numero, ciascuno dotato di sensoristica dedicata per il rilevamento del prelievo.",
      en: "Independent compartments, configurable in number, each with dedicated sensors that detect the pickup event.",
    },
    specs: [
      [{ it: "Numero", en: "Count" }, { it: "Configurabile", en: "Configurable" }],
      [{ it: "Sensoristica", en: "Sensors" }, { it: "Integrata", en: "Integrated" }],
      [{ it: "Rilevazione", en: "Detection" }, { it: "Per evento", en: "Per event" }],
      [{ it: "Indipendenza", en: "Independence" }, { it: "Per scomparto", en: "Per compartment" }],
    ],
  },
  {
    key: { it: "/ 06 · Componente in focus", en: "/ 06 · Component in focus" },
    title: { it: "PCB concept-to-scale", en: "Concept-to-scale PCB" },
    desc: {
      it: "Scheda madre custom ottimizzata su componenti standard: SoC ESP32 dual core, firmware C/C++ su FreeRTOS.",
      en: "Custom motherboard built on standard parts: dual-core ESP32 SoC, C/C++ firmware on FreeRTOS.",
    },
    specs: [
      [{ it: "Approccio", en: "Approach" }, { it: "Custom", en: "Custom" }],
      [{ it: "SoC", en: "SoC" }, { it: "ESP32 dual core", en: "Dual-core ESP32" }],
      [{ it: "Firmware", en: "Firmware" }, { it: "C/C++ · FreeRTOS", en: "C/C++ · FreeRTOS" }],
      [{ it: "BOM", en: "BOM" }, { it: "Contenuta", en: "Lean" }],
    ],
  },
  {
    key: { it: "/ 07 · Componente in focus", en: "/ 07 · Component in focus" },
    title: { it: "Base & alimentazione", en: "Base & power" },
    desc: {
      it: "Pannello inferiore che gestisce l'alimentazione a corrente. Il device è progettato per uso stazionario, connesso alla rete elettrica.",
      en: "The bottom panel handles mains power. The device is designed for stationary use, wired to the electrical grid.",
    },
    specs: [
      [{ it: "Alimentazione", en: "Power" }, { it: "Rete elettrica", en: "Mains" }],
      [{ it: "Connessione", en: "Connection" }, { it: "Cavo", en: "Cable" }],
      [{ it: "Uso", en: "Use" }, { it: "Stazionario", en: "Stationary" }],
      [{ it: "Funzione", en: "Function" }, { it: "Alloggiamento", en: "Housing" }],
    ],
  },
];

function activeFocusIndex(raw: number): number {
  if (raw < EXPLODE_END) return -1;
  const focusSpan = 1 - FOCUS_RAMP_END;
  const focusFrac = Math.max(0, Math.min(1, (raw - FOCUS_RAMP_END) / focusSpan));
  const floatIdx = focusFrac * FOCUS_CARDS.length;
  const i = Math.min(FOCUS_CARDS.length - 1, Math.floor(floatIdx));
  const sub = floatIdx - i;
  const j = Math.min(FOCUS_CARDS.length - 1, i + 1);
  if (sub < 0.7) return i;
  const t = (sub - 0.7) / 0.3;
  const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  return eased < 0.5 ? i : j;
}

export default function MedBoxReveal({ color }: { color: string }) {
  const { locale } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(true);
  const [focusIdx, setFocusIdx] = useState(-1);

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
  const labelOpacity = useTransform(scrollYProgress, [0, 0.03, 0.48, 0.5], [1, 0, 0, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = activeFocusIndex(v);
    setFocusIdx((prev) => (prev === idx ? prev : idx));
  });

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

  const card = focusIdx >= 0 ? FOCUS_CARDS[focusIdx] : null;

  return (
    <section ref={trackRef} className="relative border-b border-line bg-bg" style={{ height: "600vh" }}>
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
          <motion.span style={{ opacity: hintOpacity }} className="section-label">
            {locale === "it" ? "Scrolla per esplodere" : "Scroll to explode"}
          </motion.span>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-4 bottom-4 md:inset-x-auto md:right-10 md:top-1/2 md:bottom-auto md:w-[380px] md:-translate-y-1/2">
          <AnimatedCard show={!!card}>
            {card && (
              <>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.1em]" style={{ color }}>
                  {card.key[locale]}
                </div>
                <h3 className="mt-3 font-display text-2xl uppercase leading-none tracking-tight md:text-3xl">
                  {card.title[locale]}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted md:text-base">
                  {card.desc[locale]}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-4">
                  {card.specs.map(([label, value], i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted">
                        {label[locale]}
                      </span>
                      <span className="font-sans text-sm font-semibold">{value[locale]}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}

function AnimatedCard({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-2xl border border-line bg-bg/95 p-6 shadow-xl backdrop-blur-sm md:p-8"
    >
      {children}
    </motion.div>
  );
}
