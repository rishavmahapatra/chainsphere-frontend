import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function Navbar() {
  return (
    <div>
      <nav className="flex justify-between relative z-50">
        <div className="left flex justify-start p-2 items-center w-full">
          <img src="/images/logo.svg" alt="logo" className="w-12 p-2" />
          <span>Chainsphere</span>
        </div>
        <div className="right p-4 flex gap-5">
          <Link className="cursor-pointer" href="/login">
            <Button className="z-50 cursor-pointer text-black hover:bg-gray-200">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className=" text-black hover:bg-gray-200">
              Register
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
