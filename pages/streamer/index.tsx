import Input from "@components/Input";
import Layout from "@components/Layout";
import Button from "@components/Button";
import React, { useState } from "react";

const ManageStreamer = () => {
  const [nameField, setNameField] = useState("");
  const [socialTokenNameField, setSocialTokenNameField] = useState("");
  const [socialTokenSymbolField, setSocialTokenSymbolField] = useState("");

  const handleRegisterClick = (e: any) => {
    e.preventDefault();
    console.log("submitting form...");

    console.log("-=-=- nameField");
    console.log(nameField);

    console.log("-=-=- socialTokenNameField");
    console.log(socialTokenNameField);

    console.log("-=-=- socialTokenSymbolField");
    console.log(socialTokenSymbolField);
  };

  const handleTextChange = (textUpdater: any) => (e: any) =>
    textUpdater(e.target.value);

  return (
    <Layout>
      <h1 className="mb-6 text-center text-lg font-bold">
        Register as a Streamer
      </h1>
      <div className="mx-auto w-80 rounded-md bg-slate-700 p-9 ">
        <div className="my-6">
          <Input
            placeholder="Your Name"
            value={nameField}
            onChange={handleTextChange(setNameField)}
            className="input w-full max-w-xs rounded-md bg-gray-800 text-white"
          />
        </div>
        <div className="my-6">
          <Input
            placeholder="Social Token Name"
            value={socialTokenNameField}
            onChange={handleTextChange(setSocialTokenNameField)}
            className="input w-full max-w-xs rounded-md bg-gray-800 text-white"
          />
        </div>
        <div className="my-6">
          <Input
            placeholder="Social Token Symbol"
            value={socialTokenSymbolField}
            onChange={handleTextChange(setSocialTokenSymbolField)}
            className="input w-full max-w-xs rounded-md bg-gray-800 text-white"
          />
        </div>
        <Button
          label="Register"
          primary
          className="w-full"
          onClick={handleRegisterClick}
        />
      </div>
    </Layout>
  );
};

export default ManageStreamer;
