import React from "react";
import Image from "next/image";
import Input from "@components/Input";
import Layout from "@components/Layout";
import Button from "@components/Button";

const StreamDetail = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submitting form...");
  };

  return (
    <Layout>
      <div className=" text-center">
        <h1 className="mb-6 text-center text-lg font-bold">Stream Detail</h1>
        <Image
          width={600}
          height={400}
          src="/images/jumanji-image.jpeg"
          alt="Jumanji"
          className="opacity-100 duration-300"
        />

        <div className="mx-auto w-auto rounded-md bg-slate-700 p-9 md:w-[600px]">
          <h3 className="mb-6 text-center text-lg font-bold">Live Chat</h3>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
