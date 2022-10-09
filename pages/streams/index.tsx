import Input from "@components/Input";
import Layout from "@components/Layout";
import Button from "@components/Button";
import React, { useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import streamControllerAbi from "../../context/abis/streamController.abi";
import { gql, useQuery } from "@apollo/client";
import idx from "idx";
import EndStreamButton from "./EndStreamButton";

const GET_STREAM_DATA = gql`
  query {
    streams(first: 100, where: { isActive: true }) {
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

const CreateStream = () => {
  const {
    loading: isLoadingStreamData,
    // error: errorStreamData,
    data: streamData,
  } = useQuery(GET_STREAM_DATA);

  const streamListing = idx(streamData, (_) => _.streams) || [];

  const streamerAddressMapping: any = {};
  streamListing.forEach((currentStream: any) => {
    streamerAddressMapping[currentStream.streamerAddress.toLowerCase()] =
      currentStream;
  });
  console.log("--- streamListing");
  console.log(streamListing);
  console.log("--- streamerAddressMapping");
  console.log(streamerAddressMapping);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submitting form...");
  };

  const [streamName, setStreamName] = useState("");
  const [streamId, setStreamId] = useState("");
  const [perSecondStreamRate, setPerSecondStreamRate] = useState("");

  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_STREAM_CONTROLLER_ADDR || "",
    contractInterface: streamControllerAbi,
    functionName: "startStream",
    args: [streamName, streamId, perSecondStreamRate],
    // enabled: false,
    onSuccess(data: any) {
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

  const currentAddress = useAccount().address || "";
  const isStreaming =
    idx(
      streamerAddressMapping,
      (_: any) => _[currentAddress.toLowerCase()].isActive
    ) || false;

  return (
    <Layout>
      <div className="text-center">
        <h1 className="mb-6 text-center text-lg font-bold">
          {isStreaming ? "End" : "Create"} Stream
        </h1>

        {isStreaming ? (
          <div className="mx-auto w-80 rounded-md bg-slate-700 p-9 ">
            <EndStreamButton />
          </div>
        ) : (
          <div className="mx-auto w-80 rounded-md bg-slate-700 p-9 ">
            <div className="my-6">
              <Input
                placeholder="Title"
                value={streamName}
                onChange={handleTextChange(setStreamName)}
                className={
                  isLoading
                    ? "input w-full max-w-xs rounded-md bg-gray-400 text-white"
                    : "input w-full max-w-xs rounded-md bg-gray-800 text-white"
                }
              />
            </div>
            <div className="my-6">
              <Input
                placeholder="Price"
                value={perSecondStreamRate}
                onChange={handleTextChange(setPerSecondStreamRate)}
                className={
                  isLoading
                    ? "input w-full max-w-xs rounded-md bg-gray-400 text-white"
                    : "input w-full max-w-xs rounded-md bg-gray-800 text-white"
                }
              />
            </div>
            {isLoading && <div className="my-6">Loading...</div>}
            <Button
              label="Create Stream"
              primary
              className="w-full"
              onClick={handleRegisterClick}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreateStream;
