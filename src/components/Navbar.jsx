"use client"
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { userAuth } from "@/Use_Context/authContext";

function Navbar() {
  const {authUser,userDetails} = userAuth();

  let user = {};
  if(authUser && userDetails){
     user  = JSON.parse(userDetails);
  }

  return (
    <div>
      <nav className="flex justify-between relative z-50">
        <div className="left flex justify-start p-2 items-center w-full">
          <img src="/images/logo.svg" alt="logo" className="w-12 p-2" />
          <span>Chainsphere</span>
        </div>
        <div className="right p-4 flex sm:gap-5">
         {!authUser ?
         <>
          <Link className="cursor-pointer" href="/login">
            <Button className="z-50 cursor-pointer text-black hover:bg-gray-200">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className=" text-black hover:bg-gray-200 sm:block hidden">
              Register
            </Button>
          </Link>
         </>
          :
          <>
         <div className="wrapper flex gap-3 justify-center items-center">
         <h2 className="username ">
            {user?.firstName}
          </h2>
          <Link className="cursor-pointer mx-2" href="/login">
            <Button onClick={()=>{localStorage.removeItem("token");
}} className="z-50 cursor-pointer text-black hover:bg-gray-200">
              Logout
            </Button>
          </Link>
         </div>
          </>}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
