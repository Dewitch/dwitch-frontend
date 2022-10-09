import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Input from "@components/Input";
import Layout from "@components/Layout";
import Button from "@components/Button";
import { Client } from "@xmtp/xmtp-js";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import useConversation from "@hooks/useConversation";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { Player, useCreateStream, useStream } from "@livepeer/react";
import { Livepeer } from "@components/Livepeer";

const StreamDetail = () => {
  const { address: connectedAddress } = useAccount();
  const [streamName, setStreamName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  //   Simulating xmtp interaction due to technical issue during dev
  const messagesState: string[] = [];

  const {
    mutate: createStream,
    data: createdStream,
    status: createStatus,
  } = useCreateStream();

  const { data: stream, status: streamStatus } = useStream({
    streamId: createdStream?.id,
    refetchInterval: (stream) => (!stream?.isActive ? 5000 : false),
  });

  const isLoading = useMemo(
    () => createStatus === "loading" || streamStatus === "loading",
    [createStatus, streamStatus]
  );

  const { conversation, loading, messages, error, sendMessage } =
    useConversation(connectedAddress);

  //   const handleSubmit = (e: any) => {
  //     e.preventDefault();
  //     setStreamName("");
  //     console.log("submitting form...");
  //   };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    // Send message
    console.log("sending message...");
    messagesState.push(message);
    await sendMessage(message);
    setMessage("");
  };

  console.log(message);
  //   const getXmtpClient = async () => {
  //     // xmtp client setup
  //     const coinbaseUrl = "https://goerli.ethereum.coinbasecloud.net";
  //     const provider = new ethers.providers.JsonRpcProvider(coinbaseUrl);
  //     const signer = provider.getSigner(connectedAddress);
  //     // Create client with signer
  //     return await Client.create(signer);
  //   };

  //   const fetchLatestConverations = useCallback(async () => {
  //     // fetch real-time conversations
  //     const response = await fetch(
  //       `/api/xmtp/get-stream?connectedAddress=${connectedAddress}`
  //     );
  //     const data = await response.json();
  //     console.log("data: ", data);
  //     setConversations(conversations);
  //   }, [connectedAddress, conversations]);

  // useEffect(() => {
  //   fetchLatestConverations();
  // }, [connectedAddress, fetchLatestConverations]);
  useEffect(() => {
    console.log("messages: ", messages);
    console.log("conversation: ", conversation);
  }, [conversation, messages]);

  return (
    <Layout>
      <div className=" text-center">
        <h1 className="mb-6 text-center text-lg font-bold">Stream Detail</h1>

        <Livepeer playbackId={stream?.playbackId} />

        <div className="mx-auto w-auto rounded-md bg-slate-700 p-9 md:w-[600px]">
          <h3 className="mb-6 text-center text-lg font-bold">Live Chat</h3>

          <div>
            <Input
              placeholder="Send Message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="input w-full max-w-xs rounded-md bg-gray-800 text-white"
            />
            <Button label="Send" onClick={handleSendMessage} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
