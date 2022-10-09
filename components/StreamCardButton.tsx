import {
  Framework,
  ConstantFlowAgreementV1,
} from "@superfluid-finance/sdk-core";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@components/Button";
import { BigNumber, ethers, providers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import streamController from "../context/abis/streamController.abi";

// TODO: kill default streadId
const StreamCardButton = ({ streamerAddress = "" }) => {
  // Talk to the host
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_STREAM_CONTROLLER_ADDR || "",
    contractInterface: streamController,
    functionName: "startWatchingStreamer",
    args: [streamerAddress],
    // enabled: false,
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSubscribe = async (e: any) => {
    e.preventDefault();

    // const calledTransaction = await sf.host.callAgreement(
    //   process.env.NEXT_PUBLIC_CFAV1,
    //   encodedCallData,
    //   "0x"
    // );
    // console.log("-=-=- calledTransaction");
    // console.log(calledTransaction);
    if (write) {
      write();
      console.log("approved!");
    }
  };

  console.log("-=-=- streamerAddress streamerAddressstreamerAddresswrite");
  console.log(streamerAddress);
  console.log("-=-=- streamerAddress streamerAddressstreamerAddresswrite");
  console.log(write);
  console.log("-=-=- data");
  console.log(data);

  return (
    <Button
      label="Subscribe"
      onClick={handleSubscribe}
      outline
      className="mr-3 flex-1 border-primary text-primary hover:bg-primary"
    />
  );
};

export default StreamCardButton;
