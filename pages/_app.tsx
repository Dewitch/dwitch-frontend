import "../styles/globals.css";
import { AppProps } from "next/app";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Theme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiConfig } from "wagmi";
import ethers from "ethers";

// import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
// import { publicProvider } from "wagmi/providers/public";

// const { chains, provider } = configureChains(
//   [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
//   // [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
//   [
//     jsonRpcProvider({
//       rpc: (chain) => ({

//         // http: `https://${chain.id}.example.com`,
//         http: `https://goerli.ethereum.coinbasecloud.net`,
//       }),
//     }),
//   ]
// );

function MyApp({ Component, pageProps }: AppProps) {
  const chains = [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.goerli,
  ];

  // Import environment variables
  const baseUrl = process.env.NODE_ENDPOINT || "";
  const username = process.env.NODE_USERNAME || "";
  const password = process.env.NODE_PASSWORD || "";
  console.log("ethers");
  console.log(ethers);

  // Create node provider using project credentials
  const provider = new ethers.providers.JsonRpcProvider({
    url: baseUrl,
    user: username,
    password: password,
  });

  const { connectors } = getDefaultWallets({
    appName: "Dwitch",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: "#e11d48",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
        chains={chains}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
