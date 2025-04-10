"use client"
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { userAuth } from "@/Use_Context/authContext";

function Navbar() {
  const {authUser,userDetails} = userAuth();
  const user  = JSON.parse(userDetails)

  console.log("the auth use is her e",user.firstName)

  return (
    <div>
      <nav className="flex justify-between relative z-50">
        <div className="left flex justify-start p-2 items-center w-full">
          <img src="/images/logo.svg" alt="logo" className="w-12 p-2" />
          <span>Chainsphere</span>
        </div>
        <div className="right p-4 flex gap-5">
         {!authUser ?
         <>
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
         </>
          :
          <>
          <h2 className="username ">
            {user?.firstName}
          </h2>
          </>}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
