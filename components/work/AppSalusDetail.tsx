"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { accentHex } from "@/lib/content";
import DevDetailShell from "./dev/DevDetailShell";
import { CardGrid, DevSection, FlowRow, PhoneFrame } from "./dev/ui";
import { appExtras, appFeatures, appFlow, appRoles } from "./dev/data";
import { useT } from "./salus/ui";

const color = accentHex.magenta;
const img = (name: string) => `/dev/app-salus/${name}.webp`;

export default function AppSalusDetail() {
  const { locale, tr } = useT();
  const it = locale === "it";
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <DevDetailShell slug="app-salus" badge="06" title={<>App<br />Salus</>} visual={<HeroPhones />}>
      {/* L'APP DALL'INTERNO: un telefono fisso che cambia schermata mentre si legge */}
      <section className="border-t border-line px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <FeatureWalk num={num()} />
        </div>
      </section>

      {/* RUOLI */}
      <DevSection
        id="ruoli"
        n={num()}
        color={color}
        soft
        label={{ it: "I ruoli", en: "The roles" }}
        title={{ it: "Quattro modi di usarla", en: "Four ways to use it" }}
        intro={{
          it: "Ogni ruolo ha le sue viste e i suoi permessi: un paziente vede solo i propri dati, gli altri ruoli vedono quello che il paziente ha autorizzato.",
          en: "Each role has its own views and permissions: a patient sees only their own data, the other roles see what the patient has authorised.",
        }}
      >
        <CardGrid items={appRoles} color={color} />
      </DevSection>

      {/* ARCHITETTURA, con la schermata del dispositivo */}
      <DevSection
        id="architettura"
        n={num()}
        color={color}
        label={{ it: "L'architettura", en: "The architecture" }}
        title={{ it: "Serverless, dall'app al box", en: "Serverless, from app to box" }}
        intro={{
          it: "L'app non ha un server da mantenere. Firebase gestisce accesso, dati e notifiche, le Cloud Functions tengono le chiavi dei servizi esterni, e il box parla con lo stesso cloud.",
          en: "The app has no server to maintain. Firebase handles sign-in, data and notifications, Cloud Functions hold the keys to external services, and the box talks to the same cloud.",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
          <div>
            <FlowRow nodes={appFlow} color={color} />
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-fg/80">
              {it
                ? "Quando una pillola viene prelevata, il box invia un evento a una Cloud Function che aggiorna il database. L'app lo mostra come nella schermata a fianco: dose assunta, scomparto, peso. La logica dei promemoria è anche sul dispositivo, così gli allarmi suonano pure senza rete."
                : "When a pill is taken, the box sends an event to a Cloud Function that updates the database. The app shows it as in the screen beside: dose taken, compartment, weight. The reminder logic also lives on the device, so alarms still ring without a network."}
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {appExtras.map((e) => (
                <div key={e.title.it} className="rounded-2xl border border-line bg-bg-soft p-5">
                  <div className="font-display text-xl uppercase tracking-tight" style={{ color }}>
                    {tr(e.title)}
                  </div>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{tr(e.body)}</p>
                </div>
              ))}
            </div>
          </div>
          <PhoneFrame
            src={img("09-dispositivo")}
            alt={it ? "Schermata del dispositivo con gli eventi del box" : "Device screen with the box events"}
            w={640}
            h={1388}
            className="mx-auto w-52 lg:w-full"
          />
        </div>
      </DevSection>
    </DevDetailShell>
  );
}

/* ----------------------------- hero ----------------------------- */

function HeroPhones() {
  const { locale } = useT();
  const it = locale === "it";
  return (
    <div className="relative mx-auto flex h-[340px] max-w-md items-center justify-center sm:h-[440px] lg:h-[560px]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-4/5 -translate-y-1/2"
        style={{ background: `radial-gradient(closest-side, ${color}38, transparent)` }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -9 }}
        animate={{ opacity: 1, y: 0, rotate: -9 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[2%] top-[14%] w-[34%] shadow-2xl"
      >
        <PhoneFrame src={img("01-splash")} alt={it ? "Schermata di avvio" : "Launch screen"} w={640} h={1388} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 8 }}
        animate={{ opacity: 1, y: 0, rotate: 8 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[2%] top-[18%] w-[34%] shadow-2xl"
      >
        <PhoneFrame src={img("08-assistente-ai")} alt={it ? "Assistente AI" : "AI assistant"} w={640} h={1424} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[40%] shadow-2xl"
      >
        <PhoneFrame
          src={img("03-dashboard")}
          alt={it ? "Dashboard con le prossime dosi" : "Dashboard with the next doses"}
          w={640}
          h={1421}
        />
      </motion.div>
    </div>
  );
}

/* ------------------- telefono fisso + funzioni che scorrono ------------------- */

function FeatureWalk({ num }: { num: string }) {
  return (
    <>
      <div className="md:hidden">
        <FeatureSwipe num={num} />
      </div>
      <div className="hidden md:block">
        <FeatureScroll num={num} />
      </div>
    </>
  );
}

/**
 * Mobile: la sezione si ancora allo schermo e lo scroll verticale normale muove le spiegazioni
 * in orizzontale. Il telefono, sopra, cambia schermata insieme al testo.
 */
function FeatureSwipe({ num }: { num: string }) {
  const { tr } = useT();
  const N = appFeatures.length;
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  // posizione "a gradini": il testo si ferma su ogni voce e scorre solo nel tratto tra una e l'altra
  const stepped = (v: number) => {
    const x = Math.max(0, Math.min(1, v)) * (N - 1);
    const k = Math.min(Math.floor(x), N - 2);
    const f = x - k;
    const t = Math.max(0, Math.min(1, (f - 0.3) / 0.4));
    const eased = t * t * (3 - 2 * t);
    return k + eased;
  };
  const x = useTransform(scrollYProgress, (v) => `${-stepped(v) * 100}%`);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.round(stepped(v));
    setActive((prev) => (prev === i ? prev : i));
  });

  return (
    <div>
      <Intro num={num} />

      {/* altezza = uno schermo + il tratto di scroll che serve a scorrere tutte le voci */}
      <div ref={track} className="mt-10" style={{ height: `${100 + (N - 1) * 55}svh` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center gap-6 pb-6 pt-20">
          <div className="relative w-[170px] shrink-0">
            <div aria-hidden className="absolute -inset-10" style={{ background: `radial-gradient(closest-side, ${color}30, transparent)` }} />
            <div className="relative aspect-[640/1424]">
              {appFeatures.map((f, i) => (
                <div
                  key={f.shot}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: i === active ? 1 : 0 }}
                  aria-hidden={i !== active}
                >
                  <PhoneFrame src={img(f.shot)} alt={tr(f.title)} w={640} h={1424} className="h-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <motion.div className="flex" style={{ x }}>
              {appFeatures.map((f, i) => (
                <article key={f.shot} className="w-full shrink-0 px-1">
                  <div className="border-l-2 pl-4" style={{ borderColor: color }}>
                    <div className="font-mono text-xs" style={{ color }}>
                      {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                    </div>
                    <h3 className="mt-2 font-display text-3xl uppercase leading-none tracking-tight">{tr(f.title)}</h3>
                    <p className="mt-3 font-sans text-base leading-relaxed text-fg/85">{tr(f.body)}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center gap-1.5" aria-hidden>
            {appFeatures.map((f, i) => (
              <span
                key={f.shot}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: i === active ? 22 : 8, background: i === active ? color : "var(--line)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Desktop: telefono fisso a sinistra, spiegazioni che scorrono a destra. */
function FeatureScroll({ num }: { num: string }) {
  const { tr } = useT();
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-5">
        <div className="sticky top-24">
          <div className="relative mx-auto w-[260px] lg:w-[300px]">
            <div aria-hidden className="absolute -inset-16" style={{ background: `radial-gradient(closest-side, ${color}28, transparent)` }} />
            <div className="relative aspect-[640/1424]">
              {appFeatures.map((f, i) => (
                <div
                  key={f.shot}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: i === active ? 1 : 0 }}
                  aria-hidden={i !== active}
                >
                  <PhoneFrame src={img(f.shot)} alt={tr(f.title)} w={640} h={1424} className="h-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2" aria-hidden>
            {appFeatures.map((f, i) => (
              <span
                key={f.shot}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: i === active ? 28 : 8, background: i === active ? color : "var(--line)" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-7">
        <Intro num={num} />
        <div className="mt-16 flex flex-col">
          {appFeatures.map((f, i) => (
            <motion.article
              key={f.shot}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              className="flex min-h-[62vh] flex-col justify-center"
            >
              <div
                data-active={i === active}
                className="border-l-2 pl-5 opacity-35 transition-opacity duration-500 data-[active=true]:opacity-100"
                style={{ borderColor: color }}
              >
                <div className="font-mono text-xs" style={{ color }}>
                  {String(i + 1).padStart(2, "0")} / {String(appFeatures.length).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-display text-5xl uppercase leading-none tracking-tight">{tr(f.title)}</h3>
                <p className="mt-4 max-w-xl font-sans text-lg leading-relaxed text-fg/85">{tr(f.body)}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Intro({ num }: { num: string }) {
  const { locale } = useT();
  const it = locale === "it";
  return (
    <>
      <div className="flex items-center gap-3">
        <span
          className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
          style={{ background: color }}
        >
          {num}
        </span>
        <span className="section-label">{it ? "L'app dall'interno" : "The app from the inside"}</span>
      </div>
      <h2 className="mt-5 max-w-3xl font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-6xl">
        {it ? "Una schermata alla volta" : "One screen at a time"}
      </h2>
      <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-fg/80">
        {it
          ? "Sono schermate vere della versione di dicembre 2025. A ognuna corrisponde una funzione."
          : "These are real screens from the December 2025 version. Each one matches a feature."}
      </p>
    </>
  );
}
