import { Conversation, Message, Stream } from "@xmtp/xmtp-js";
import { useCallback, useContext, useEffect, useState } from "react";
import { XmtpContext } from "@context/xmtp";

type OnMessageCallback = () => void;

const useConversation = (
  peerAddress: string | undefined,
  onMessageCallback?: OnMessageCallback
) => {
  const { client, getMessages, dispatchMessages } = useContext(XmtpContext);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [stream, setStream] = useState<Promise<Stream<Message>>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getConvo = async () => {
      if (!client) {
        return;
      }
      try {
        setConversation(
          await client.conversations.newConversation(peerAddress)
        );
      } catch (e) {
        console.error(e);
        setError(e as Error);
      }
    };
    getConvo();
  }, [client, peerAddress]);

  useEffect(() => {
    const closeStream = async () => {
      if (!stream) return;
      (await stream).return();
    };
    closeStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerAddress]);

  useEffect(() => {
    const listMessages = async () => {
      if (!conversation) return;
      console.log(
        "Listing messages for peer address",
        conversation.peerAddress
      );
      setLoading(true);
      // @ts-ignore
      const msgs = await conversation.messages({ pageSize: 100 });
      if (dispatchMessages) {
        dispatchMessages({
          peerAddress: conversation.peerAddress,
          messages: msgs,
        });
      }

      if (onMessageCallback) {
        console.log("callback called 1");

        onMessageCallback();
      }
      setLoading(false);
    };
    listMessages();
  }, [conversation, dispatchMessages, onMessageCallback, setLoading]);

  useEffect(() => {
    const streamMessages = async () => {
      if (!conversation) return;
      const stream = conversation.streamMessages();
      setStream(stream);
      for await (const msg of await stream) {
        if (dispatchMessages) {
          dispatchMessages({
            peerAddress: conversation.peerAddress,
            messages: [msg],
          });
        }

        if (onMessageCallback) {
          console.log("callback called 2");

          onMessageCallback();
        }
      }
    };
    streamMessages();
  }, [conversation, peerAddress, dispatchMessages, onMessageCallback]);

  const handleSend = useCallback(
    async (message: string) => {
      if (!conversation) return;
      await conversation.send(message);
    },
    [conversation]
  );

  return {
    conversation,
    loading,
    messages: getMessages(peerAddress),
    error,
    sendMessage: handleSend,
  };
};

export default useConversation;
