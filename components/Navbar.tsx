import React from "react";
import Input from "components/Input";
import Button from "@components/Button";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-around py-9">
      <div className="">
        <Link href="/">
          <a className="shadow-md-secondary mb-6 text-center text-5xl font-bold text-primary drop-shadow-[3px_3px_3px_#dc2626]">
            DWITCH&nbsp;.
          </a>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="mx-6">
          <Link href="/">
            <a className="text-md mb-6 text-center font-bold text-white hover:text-primary">
              Home
            </a>
          </Link>
        </div>
        <div className="mx-6">
          <Link href="/streamer">
            <a className="text-md mb-6 text-center font-bold text-white hover:text-primary">
              Streamer Toolbox
            </a>
          </Link>
        </div>
        <div>
          <Link href="/streams">
            <a className="text-md mb-6 text-center font-bold text-white hover:text-primary">
              Stream Manager
            </a>
          </Link>
        </div>
      </div>
      <div>
        <Input
          placeholder="Search"
          className="input w-full max-w-xs rounded-md bg-gray-800 text-white"
        />
      </div>
      {/* <Button
        label="Connect Wallet"
        primary
        onClick={() => alert("clicked!")}
      /> */}
      <ConnectButton />
    </nav>
  );
};

export default Navbar;
