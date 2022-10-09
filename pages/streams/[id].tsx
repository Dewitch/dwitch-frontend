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
      <h1 className="mb-6 text-center text-lg font-bold">Stream Detail</h1>
    </Layout>
  );
};

export default StreamDetail;
