"use client";

import { useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { Showreel, showreelDefaultProps } from "@/remotion/Showreel";
import { REEL, reelDuration } from "@/remotion/theme";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Loaded client-side only (see ShowreelPlayer). Renders the Remotion
 * composition live via @remotion/player — no MP4 needed. `npm run reel`
 * opens the same composition in Remotion Studio to render a real file.
 */
export default function ShowreelInner() {
  const ref = useRef<PlayerRef>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <Player
      ref={ref}
      component={Showreel}
      inputProps={showreelDefaultProps}
      durationInFrames={reelDuration}
      compositionWidth={REEL.width}
      compositionHeight={REEL.height}
      fps={REEL.fps}
      loop
      autoPlay={!reduced}
      controls={reduced}
      clickToPlay={reduced}
      doubleClickToFullscreen
      acknowledgeRemotionLicense
      style={{ width: "100%", height: "100%" }}
    />
  );
}
