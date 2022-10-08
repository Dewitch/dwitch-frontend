import React, { ReactNode } from "react";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";

import Navbar from "@components/Navbar";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Default title" }: LayoutProps) => (
  <div className="flex h-screen flex-col bg-gradient-to-b from-gray-900 to-slate-800">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NextNProgress
      height={2}
      color="#e11d48"
      options={{ showSpinner: false }}
    />
    <Navbar />
    <main className="font-satoshi bg-gradientbg min-h-screen bg-cover bg-repeat-y text-white">
      {children}
    </main>
  </div>
);

export default Layout;
