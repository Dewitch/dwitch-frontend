import Input from "@components/Input";
import Layout from "@components/Layout";
import Button from "@components/Button";
import idx from "idx";
import React, { useState } from "react";

import streamControllerAbi from "../../context/abis/streamController.abi";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import StreamerApproveButton from "./StreamerApproveButton";

import { gql, useQuery } from "@apollo/client";

const GET_STREAM_DATA = gql`
  query {
    streams(first: 100) {
      id
      isActive
      streamerAddress
      flowRateCost
    }
    streamers(first: 100) {
      streamerAddress
      socialTokenAddress
      streamerName
    }
  }
`;
const ManageStreamer = () => {
  const {
    loading: isLoadingStreamData,
    // error: errorStreamData,
    data: streamData,
  } = useQuery(GET_STREAM_DATA);

  const streamersListing = idx(streamData, (_) => _.streamers) || [];

  const streamerAddressMapping: any = {};

  console.log("<><><><><><>><><><><> isLoadingStreamData");
  console.log(isLoadingStreamData);
  console.log("<><><><><><>><><><><> streamData");
  console.log(streamData);

  console.log("<><><><><><>><><><><> streamerAddressMapping");
  console.log(streamerAddressMapping);
  streamersListing.forEach((currentStreamer: any) => {
    streamerAddressMapping[currentStreamer.streamerAddress.toLowerCase()] =
      currentStreamer;
  });

  const currentAddress = useAccount().address || "";
  const socialTokenAddress =
    idx(
      streamerAddressMapping,
      (_: any) => _[currentAddress.toLowerCase()].socialTokenAddress
    ) || "";

  const [nameField, setNameField] = useState("");
  const [socialTokenNameField, setSocialTokenNameField] = useState("");
  const [socialTokenSymbolField, setSocialTokenSymbolField] = useState("");
  const [transactionData, setTransactionData] = useState(null);

  console.log("-=-=- transactionData");
  console.log(transactionData);

  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_STREAM_CONTROLLER_ADDR || "",
    contractInterface: streamControllerAbi,
    functionName: "registerAsStreamer",
    args: [nameField, socialTokenNameField, socialTokenSymbolField],
    // enabled: false,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleRegisterClick = (e: any) => {
    e.preventDefault();
    console.log("submitting form...");

    console.log("-=-=- nameField");
    console.log(nameField);

    console.log("-=-=- socialTokenNameField");
    console.log(socialTokenNameField);

    console.log("-=-=- socialTokenSymbolField");
    console.log(socialTokenSymbolField);
    console.log("-=-=- write");
    console.log(write);
    console.log("-=-=- data");
    console.log(data);

    if (write) {
      write();
    }
  };

  const handleTextChange = (textUpdater: any) => (e: any) =>
    textUpdater(e.target.value);

  return (
    <Layout>
      <h1 className="mb-6 text-center text-lg font-bold">
        {socialTokenAddress
          ? "Aprove your social token"
          : "Register as a Streamer"}
      </h1>

      {socialTokenAddress ? (
        <div className="mx-auto w-80 rounded-md bg-slate-700 p-9 ">
          <StreamerApproveButton />
        </div>
      ) : (
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
      )}
    </Layout>
  );
};

export default ManageStreamer;
