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

const EndStreamButton = () => {
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_STREAM_CONTROLLER_ADDR || "",
    contractInterface: streamControllerAbi,
    functionName: "endStream",
    args: [],
    // enabled: false,
    onSuccess(data: any) {
      console.log("Success", data);
    },
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleEndStreamClick = (e: any) => {
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

  return (
    <Button
      label="End Stream"
      primary
      className="w-full"
      onClick={handleEndStreamClick}
    />
  );
};

export default EndStreamButton;
