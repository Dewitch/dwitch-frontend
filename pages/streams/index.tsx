import Input from "@components/Input";
import Layout from "@components/Layout";
import Button from "@components/Button";
import React from "react";

const StreamDetail = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submitting form...");
  };

  return (
    <Layout>
      <h1 className="mb-6 text-center text-lg font-bold">Create Stream</h1>
      <form
        className="mx-auto w-80 rounded-md bg-slate-700 p-9 "
        onSubmit={handleSubmit}
      >
        <div className="my-6">
          <Input
            placeholder="Title"
            className="input w-full max-w-xs rounded-md bg-gray-800 text-white"
          />
        </div>
        <div className="my-6">
          <Input
            placeholder="Price"
            className="input w-full max-w-xs rounded-md bg-gray-800 text-white"
          />
        </div>
        <Button label="Create Stream" primary className="w-full" />
      </form>
    </Layout>
  );
};

export default StreamDetail;
