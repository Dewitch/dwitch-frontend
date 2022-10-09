import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// // You'll want to replace this with a wallet from your application
// const wallet = Wallet.createRandom()
// // Create the client with your wallet. This will connect to the XMTP development network by default
// const xmtp = await Client.create(wallet)
// // Start a conversation with XMTP
// const conversation = await xmtp.conversations.newConversation(
//   '0x3F11b27F323b62B159D2642964fa27C46C841897'
// )
// // Load all messages in the conversation
// const messages = await conversation.messages()
// // Send a message
// await conversation.send('gm')
// // Listen for new messages in the conversation
// for await (const message of await conversation.streamMessages()) {
//   console.log(`[${message.senderAddress}]: ${message.content}`)
// }

const getXmtpClient = async (connectedAddress: string | any) => {
  // xmtp client setup
  const coinbaseUrl = "https://goerli.ethereum.coinbasecloud.net";
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner(connectedAddress);
  // Create client with signer
  return await Client.create(signer);
};

// retrieves all conversations in the last 24 hours
const getAllConversations = async (connectedAddress: string | any) => {
  const xmtp = await getXmtpClient(connectedAddress);

  for (const conversation of await xmtp.conversations.list()) {
    // All parameters are optional and can be omitted
    const opts = {
      // Only show messages from last 24 hours
      startTime: new Date(new Date().setDate(new Date().getDate() - 1)),
      endTime: new Date(),
    };
    const messagesInConversation = await conversation.messages(opts);
    console.log("messagesInConversation: ", messagesInConversation);
    return messagesInConversation;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { connectedAddress } = req?.query;
  const messages = await getAllConversations(connectedAddress);
  res.status(200).json({ messages });
}
