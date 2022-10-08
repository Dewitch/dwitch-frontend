import React from "react";
import Input from "components/Input";
import Button from "@components/Button";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-around py-9">
      <div className=" ">
        <Link href="/">
          <a className="mb-6 text-center text-5xl font-bold text-primary">
            DWITCH&nbsp;.
          </a>
        </Link>
      </div>
      <div>
        <Input
          placeholder="Search"
          className="input input-bordered w-full max-w-xs rounded-md bg-gray-800 text-white"
        />
      </div>
      <Button
        label="Connect Wallet"
        primary
        onClick={() => alert("clicked!")}
      />
    </nav>
  );
};

export default Navbar;
