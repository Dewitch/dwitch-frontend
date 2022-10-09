import {
  Framework,
  ConstantFlowAgreementV1,
} from "@superfluid-finance/sdk-core";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@components/Button";
import { BigNumber, ethers, providers } from "ethers";
import idx from "idx";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";

import cfav1Abi from "../../context/abis/cfav1.abi";
import superHostAbi from "../../context/abis/superHost.abi";
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

// TODO: kill default streadId
const StreamerApproveButton = ({}) => {
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

  console.log("<><><><><><>><><><><> socialTokenAddress");
  console.log(socialTokenAddress);

  let iface = new ethers.utils.Interface(cfav1Abi);
  const encodedCallData = socialTokenAddress
    ? iface.encodeFunctionData("authorizeFlowOperatorWithFullControl", [
        socialTokenAddress,
        process.env.NEXT_PUBLIC_SUBSCRIPTION_HANDLER_ADDR,
        "0x",
      ])
    : "";
  // Talk to the host
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CFA_HOST || "",
    contractInterface: superHostAbi,
    functionName: "callAgreement",
    args: [process.env.NEXT_PUBLIC_CFAV1, encodedCallData, "0x"],
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

  console.log(write);

  if (socialTokenAddress) {
    return (
      <Button
        primary
        label="Approve Social Token"
        onClick={handleSubscribe}
        className="mr-3 flex-1 border-primary text-white hover:bg-primary"
      />
    );
  }

  return null;
};

export default StreamerApproveButton;
