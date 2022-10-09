import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@components/Button";

// TODO: kill default streadId
const StreamCard = ({ streamId = 1 }) => {
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
        <p className="font-semibold text-white">Streamer: John Doe</p>
        <p className="font-semibold text-white">Title: Jumanji</p>
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
