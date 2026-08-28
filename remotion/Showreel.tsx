import React from "react";
import {
  AbsoluteFill,
  Series,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadSpace } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import {
  COLORS,
  REEL,
  REEL_PROJECTS,
  accentHex,
  type ReelProject,
} from "./theme";

const anton = loadAnton("normal", {
  weights: ["400"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});
const space = loadSpace("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});
const mono = loadMono("normal", {
  weights: ["400"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

const DISPLAY = anton.fontFamily;
const SANS = space.fontFamily;
const MONO = mono.fontFamily;

export type ShowreelProps = {
  projects: ReelProject[];
  name: string;
  email: string;
};

export const showreelDefaultProps: ShowreelProps = {
  projects: REEL_PROJECTS,
  name: "Francesco Caro",
  email: "fcaro.personale@gmail.com",
};

/* ------------------------------------------------------------------ */

const Backdrop: React.FC<{ accent: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const drift = interpolate(frame, [0, 300], [0, 1], {
    extrapolateRight: "extend",
  });
  const bx = Math.sin(drift * Math.PI * 2) * 12;
  const by = Math.cos(drift * Math.PI * 1.3) * 10;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 60% at ${
            28 + bx
          }% ${30 + by}%, ${accent}22, transparent 60%), radial-gradient(50% 50% at ${
            78 - bx
          }% ${70 - by}%, ${COLORS.violet}18, transparent 62%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)`,
          backgroundSize: `${width / 16}px ${width / 16}px`,
          maskImage:
            "radial-gradient(circle at 50% 50%, black, transparent 78%)",
          opacity: 0.5,
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 ${height / 3}px ${height / 6}px ${COLORS.bg}`,
        }}
      />
    </AbsoluteFill>
  );
};

const Hud: React.FC<{ label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = Math.round((frame / durationInFrames) * 100);
  return (
    <AbsoluteFill
      style={{
        padding: 54,
        fontFamily: MONO,
        color: COLORS.muted,
        fontSize: 22,
        letterSpacing: 4,
        textTransform: "uppercase",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Francesco Caro — Showreel</span>
        <span>{String(pct).padStart(3, "0")}%</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{label}</span>
        <span>Milano · IT</span>
      </div>
    </AbsoluteFill>
  );
};

const KineticWord: React.FC<{
  text: string;
  delay?: number;
  color?: string;
  size: number;
  stroke?: string;
}> = ({ text, delay = 0, color = COLORS.fg, size, stroke }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", overflow: "hidden", paddingBottom: "0.1em" }}>
      {[...text].map((ch, i) => {
        const s = spring({
          frame: frame - delay - i * 2,
          fps,
          config: { damping: 200, mass: 0.7 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontFamily: DISPLAY,
              fontSize: size,
              lineHeight: 0.9,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: stroke ? "transparent" : color,
              WebkitTextStroke: stroke ? `2px ${stroke}` : undefined,
              translate: `0 ${interpolate(s, [0, 1], [size, 0])}px`,
              opacity: s,
              whiteSpace: "pre",
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */

const Intro: React.FC<{ name: string }> = ({ name }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const [first, ...rest] = name.split(" ");
  const last = rest.join(" ");
  const out = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [0, -90],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const outO = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const barW = interpolate(frame, [8, 30], [0, 100], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <Backdrop accent={COLORS.acid} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 130px",
          translate: `0 ${out}px`,
          opacity: outO,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            color: COLORS.acid,
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            marginBottom: 34,
            opacity: interpolate(frame, [0, 12], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Developer · Marketer · Builder
        </div>
        <KineticWord text={first} size={210} delay={4} />
        <KineticWord text={last} size={210} delay={10} stroke={COLORS.acid} />
        <div
          style={{
            marginTop: 44,
            height: 6,
            width: `${barW}%`,
            maxWidth: 620,
            backgroundColor: COLORS.acid,
          }}
        />
        <div
          style={{
            fontFamily: MONO,
            color: COLORS.muted,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginTop: 26,
            opacity: interpolate(frame, [22, 38], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Selected Work — 2021 / 2026
        </div>
      </AbsoluteFill>
      <Hud label="Intro" />
    </AbsoluteFill>
  );
};

const ProjectScene: React.FC<{ project: ReelProject; n: number; of: number }> = ({
  project,
  n,
  of,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const accent = accentHex[project.accent];

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const exit = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const slide = interpolate(enter, [0, 1], [70, 0]) - exit * 80;
  const numX = interpolate(frame, [0, durationInFrames], [8, -14]);
  const barW = interpolate(frame, [6, 26], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <Backdrop accent={accent} />

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingRight: 60,
        }}
      >
        <span
          style={{
            fontFamily: DISPLAY,
            fontSize: 940,
            lineHeight: 0.7,
            color: "transparent",
            WebkitTextStroke: `2px ${accent}44`,
            translate: `${numX}% 12%`,
            opacity: 1 - exit,
          }}
        >
          {project.index}
        </span>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: "0 130px",
          translate: `0 ${slide}px`,
          opacity: 1 - exit,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            color: accent,
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            marginBottom: 26,
          }}
        >
          {String(n).padStart(2, "0")} / {String(of).padStart(2, "0")} —{" "}
          {project.kind}
        </div>

        <KineticWord text={project.name} size={132} delay={2} />

        <div
          style={{
            marginTop: 30,
            height: 6,
            width: `${barW}%`,
            maxWidth: 520,
            backgroundColor: accent,
          }}
        />

        <div
          style={{
            fontFamily: SANS,
            color: COLORS.fg,
            fontSize: 30,
            marginTop: 26,
            opacity: interpolate(frame, [16, 30], [0, 0.75], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {project.role}
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 34 }}>
          {project.tags.map((tag, i) => {
            const ts = spring({
              frame: frame - 20 - i * 4,
              fps,
              config: { damping: 200 },
            });
            return (
              <span
                key={tag}
                style={{
                  fontFamily: MONO,
                  fontSize: 20,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: COLORS.fg,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 999,
                  padding: "10px 20px",
                  opacity: ts,
                  translate: `0 ${interpolate(ts, [0, 1], [16, 0])}px`,
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>

      <Hud label={`Work / ${project.name}`} />
    </AbsoluteFill>
  );
};

const Outro: React.FC<{ email: string }> = ({ email }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const glow = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      <Backdrop accent={COLORS.acid} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          translate: `0 ${interpolate(enter, [0, 1], [50, 0])}px`,
          opacity: enter,
        }}
      >
        <KineticWord text="Let's build" size={150} delay={2} />
        <KineticWord
          text="something"
          size={150}
          delay={8}
          stroke={COLORS.acid}
        />
        <div
          style={{
            fontFamily: MONO,
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: COLORS.acid,
            marginTop: 40,
            textShadow: `0 0 ${24 * glow}px ${COLORS.acid}aa`,
          }}
        >
          {email}
        </div>
      </AbsoluteFill>
      <Hud label="Contact" />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */

export const Showreel: React.FC<ShowreelProps> = ({
  projects,
  name,
  email,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Series>
        <Series.Sequence durationInFrames={REEL.intro}>
          <Intro name={name} />
        </Series.Sequence>
        {projects.map((p, i) => (
          <Series.Sequence key={p.index} durationInFrames={REEL.perProject}>
            <ProjectScene project={p} n={i + 1} of={projects.length} />
          </Series.Sequence>
        ))}
        <Series.Sequence durationInFrames={REEL.outro}>
          <Outro email={email} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
