import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@components/Button";
import { BigNumber } from "ethers";

// TODO: kill default streadId
const StreamCard = ({
  streamId = 1,
  streamerName = "",
  streamName = "",
  streamPrice = "",
  socialTokenAddress = "",
}) => {
  console.log("_+_+_+_+_ streamPrice");
  console.log(streamPrice);
  return (
    <>
      <div>
        <Image
          width={300}
          height={200}
          src="/images/jumanji-image.jpeg"
          alt="Jumanji"
          className="opacity-100 duration-300"
        />
      </div>
      <div className="mt-3 mb-6">
        <p className="font-semibold text-white">Streamer: {streamerName}</p>
        <p className="font-semibold text-white">
          Price:{" "}
          {!!streamPrice &&
            BigNumber.from(streamPrice)
              .div(BigNumber.from("1000000000000000000"))
              .toString()}{" "}
          fUSDC / second
        </p>
      </div>
      <div className="flex justify-between">
        <Button
          label="Approve"
          onClick={() => console.log("approved!")}
          outline
          className="mr-3 flex-1 border-primary text-primary hover:bg-primary"
        />
        {/* <Button
          label="Subscribe"
          onClick={() => console.log("subscribed!")}
          primary
          className="flex-1 border-primary text-white hover:bg-primary"
        /> */}
        <Link href={`/streams/${streamId}`}>
          <a className="btn btn-primary flex-1 border-primary text-white hover:bg-primary">
            Subscribe
          </a>
        </Link>
      </div>
    </>
  );
};

export default StreamCard;
