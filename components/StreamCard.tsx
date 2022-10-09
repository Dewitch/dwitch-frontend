import React from "react";
import Image from "next/image";
import Button from "@components/Button";

const StreamCard = () => {
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
      <p className="text-white">Streamer: John Doe</p>
      <p className="text-white">Title: Jumanji</p>
      <div className="flex justify-between justify-between">
        <Button
          label="Approve"
          onClick={() => console.log("approved!")}
          outline
          className="border-primary text-primary hover:bg-primary"
        />
        <Button
          label="Subscribe"
          onClick={() => console.log("subscribed!")}
          primary
          className="border-primary text-white hover:bg-primary"
        />
      </div>
    </>
  );
};

export default StreamCard;
