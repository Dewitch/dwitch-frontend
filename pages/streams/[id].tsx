import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Input from "@components/Input";
import Layout from "@components/Layout";
import Button from "@components/Button";
import { Client } from "@xmtp/xmtp-js";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import useConversation from "@hooks/useConversation";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

const StreamDetail = () => {
  const { address: connectedAddress } = useAccount();
  const [typedMessage, setTypedMessage] = useState<string>("");

  const { conversation, loading, messages, error, sendMessage } =
    useConversation(connectedAddress);

  //   const handleSubmit = (e: any) => {
  //     e.preventDefault();
  //     setTypedMessage("");
  //     console.log("submitting form...");
  //   };

  const handleChange = (e: any) => {
    const mess = e.target.value;
    setTypedMessage(mess);
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    // Send message
    console.log("sending message...");
    await sendMessage(typedMessage);
    setTypedMessage("");
  };

  console.log(typedMessage);
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

  //   console.log("conversations...: ", conversations);

  return (
    <Layout>
      <div className=" text-center">
        <h1 className="mb-6 text-center text-lg font-bold">Stream Detail</h1>
        <Image
          width={600}
          height={400}
          src="/images/jumanji-image.jpeg"
          alt="Jumanji"
          className="opacity-100 duration-300"
        />

        <div className="mx-auto w-auto rounded-md bg-slate-700 p-9 md:w-[600px]">
          <h3 className="mb-6 text-center text-lg font-bold">Live Chat</h3>

          <div>
            <Input
              placeholder={typedMessage}
              onChange={handleChange}
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
