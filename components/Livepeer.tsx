import { Player } from "@livepeer/react";
import Image from "next/image";
import * as React from "react";

const PosterImage = () => {
  return (
    <Image
      src="/images/jumanji-image.jpeg"
      layout="fill"
      objectFit="cover"
      priority
      alt="Jumanji"
    />
  );
};

// const playbackId =
//   "bafybeigtqixg4ywcem3p6sitz55wy6xvnr565s6kuwhznpwjices3mmxoe";

// @ts-ignore
export function Livepeer({ playbackId, ...rest }) {
  return (
    <Player
      title="Jumanji"
      playbackId="5ccfv4r7wqtv1svy"
      loop
      autoPlay
      showTitle={false}
      muted
      poster={<PosterImage />}
    />
  );
}
