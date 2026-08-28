import React from "react";
import { Composition } from "remotion";
import { Showreel, showreelDefaultProps } from "./Showreel";
import { REEL, reelDuration } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Showreel"
      component={Showreel}
      durationInFrames={reelDuration}
      fps={REEL.fps}
      width={REEL.width}
      height={REEL.height}
      defaultProps={showreelDefaultProps}
    />
  );
};
