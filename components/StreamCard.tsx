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

import cfav1Abi from "../context/abis/cfav1.abi";
import superHostAbi from "../context/abis/superHost.abi";

import StreamCardButton from "./StreamCardButton";

// TODO: kill default streadId
const StreamCard = ({
  streamId = 1,
  streamerAddress = "",
  streamerName = "",
  streamName = "",
  streamPrice = "",
  socialTokenAddress = "",
}) => {
  // const config = {
  //   hostAddress: "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9",
  //   cfaV1Address: "0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8",
  //   idaV1Address: "0xfDdcdac21D64B639546f3Ce2868C7EF06036990c",
  // };

  const [sf, setSf] = useState<any>(null);

  // const cfaV1 = new ConstantFlowAgreementV1({ config });
  // const provider = new providers.Web3Provider(window as any);

  const testSF = async () => {
    const provider = new providers.Web3Provider((window as any).ethereum);

    const tempSf = await Framework.create({
      chainId: 5,
      provider,
    });
    setSf(tempSf);

    console.log("@@@ @@@ @@@@ @@@ @@@ @@@ @@@ @@@ @@@ provider");
    console.log(provider);
    console.log("@@@ @@@ @@@@ @@@ @@@ @@@ @@@ @@@ @@@ tempSf");
    console.log(tempSf);
  };

  useEffect(() => {
    testSF();
  }, []);

  console.log("-=-=- process.env.NEXT_PUBLIC_CFAV1");
  console.log(process.env.NEXT_PUBLIC_CFAV1);

  console.log("-=-=- process.env.NEXT_PUBLIC_FUSDCX");
  console.log(process.env.NEXT_PUBLIC_FUSDCX);
  console.log("-=-=- process.env.NEXT_PUBLIC_SUBSCRIPTION_HANDLER_ADDR");
  console.log(process.env.NEXT_PUBLIC_SUBSCRIPTION_HANDLER_ADDR);
  // const { config } = usePrepareContractWrite({
  //   addressOrName: process.env.NEXT_PUBLIC_CFAV1 || "",
  //   contractInterface: cfav1Abi,
  //   functionName: "authorizeFlowOperatorWithFullControl",
  //   args: [
  //     process.env.NEXT_PUBLIC_FUSDCX,
  //     process.env.NEXT_PUBLIC_SUBSCRIPTION_HANDLER_ADDR,
  //     "0x",
  //   ],
  //   // enabled: false,
  //   onSuccess(data) {
  //     console.log("Success", data);
  //   },
  // });
  // const { data, write } = useContractWrite(config);

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  let iface = new ethers.utils.Interface(cfav1Abi);
  const encodedCallData = iface.encodeFunctionData(
    "authorizeFlowOperatorWithFullControl",
    [
      process.env.NEXT_PUBLIC_FUSDCX,
      process.env.NEXT_PUBLIC_SUBSCRIPTION_HANDLER_ADDR,
      "0x",
    ]
  );

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

  const handleApprove = async (e: any) => {
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

  console.log("-=-=- write");
  console.log(write);
  console.log("-=-=- data");
  console.log(data);

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
      <div className="mt-3 mb-6">
        <p className="font-semibold text-white">Streamer: {streamerName}</p>
        <p className="font-semibold text-white">
          Price:{" "}
          {!!streamPrice &&
            BigNumber.from(streamPrice)
              .div(BigNumber.from("1000000000000000000"))
              .toString()}{" "}
          fUSDC / second
        </p>
      </div>
      <div className="flex justify-between">
        <Button
          label="Approve"
          onClick={handleApprove}
          outline
          className="mr-3 flex-1 border-primary text-primary hover:bg-primary"
        />
        {/* <Button
          label="Subscribe"
          onClick={() => console.log("subscribed!")}
          primary
          className="flex-1 border-primary text-white hover:bg-primary"
        /> */}
        <StreamCardButton streamerAddress={streamerAddress} />
      </div>
    </>
  );
};

export default StreamCard;
