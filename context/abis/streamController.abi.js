const streamControllerAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_streamTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_superTokenFactoryAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "streamerSocialTokenAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "streamerNameHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "streamerName",
        type: "string",
      },
    ],
    name: "RegisteredStreamer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "watcherAddress",
        type: "address",
      },
    ],
    name: "StartedWatchingStream",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "watcherAddress",
        type: "address",
      },
    ],
    name: "StoppedWatchingStream",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "numberOfWatchers",
        type: "uint256",
      },
    ],
    name: "StreamEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "numberOfStreams",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "int96",
        name: "perSecondStreamRate",
        type: "int96",
      },
    ],
    name: "StreamStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldStreamToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newStreamToken",
        type: "address",
      },
    ],
    name: "UpdatedStreamToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldSubscriptionHandler",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newSubscriptionHandler",
        type: "address",
      },
    ],
    name: "UpdatedSubscriptionHandler",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldSuperTokenFactory",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newSuperTokenFactory",
        type: "address",
      },
    ],
    name: "UpdatedSuperTokenFactory",
    type: "event",
  },
  {
    inputs: [],
    name: "endStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyActiveStream",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyActiveStreamName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyActiveStreamRate",
    outputs: [
      {
        internalType: "int96",
        name: "",
        type: "int96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyActiveStreamWatchers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyWatchers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "getStreamerIsActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "getStreamerIsStreaming",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "getStreamerName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "getStreamerNumberOfStreams",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "getStreamerSocialToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "getWatcherStreamId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "getWatcherStreamName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "val",
        type: "bool",
      },
    ],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "streamerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "socialTokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "socialTokenSymbol",
        type: "string",
      },
    ],
    name: "registerAsStreamer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "streamName",
        type: "string",
      },
      {
        internalType: "string",
        name: "streamId",
        type: "string",
      },
      {
        internalType: "int96",
        name: "perSecondStreamRate",
        type: "int96",
      },
    ],
    name: "startStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "startWatchingStreamer",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "streamerAddress",
        type: "address",
      },
    ],
    name: "stopWatchingStreamer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "streamToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "streamers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionHandler",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "superTokenFactory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newStreamTokenAddress",
        type: "address",
      },
    ],
    name: "updateStreamToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newSubscriptionHandlerAddress",
        type: "address",
      },
    ],
    name: "updateSubscriptionHandler",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newSuperTokenFactory",
        type: "address",
      },
    ],
    name: "updateSuperTokenFactory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default streamControllerAbi;
