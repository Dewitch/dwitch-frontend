import "../styles/globals.css";
import { AppProps } from "next/app";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Theme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
  [alchemyProvider({ apiKey: alchemyKey }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Dwitch",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const livePeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_KEY }),
});

const livepeerTheme: ThemeConfig = {
  colors: {
    accent: "rgb(0, 145, 255)",
    containerBorderColor: "rgba(0, 145, 255, 0.9)",
  },
  fonts: {
    display: "Inter",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
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
          <LivepeerConfig client={livePeerClient} theme={livepeerTheme}>
            <Component {...pageProps} />
          </LivepeerConfig>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
