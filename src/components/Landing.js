'use client';
import React from "react";
import Demodata from "./Demodata";
import Demodata1 from "./Demodata1";
import Demodata2 from "./Demodata2";
import PresaleCard from "./PresaleCard";
import Usecases from "./Usecases";
import Tokenomics from "./Tokenomics";
function Landing() {
  return (
    <div section="landing">
      <div
        section="sec-1"
        className="home-container h-screen max-w-6xl mx-auto flex items-center justify-center gap-5"
      >
        <div className="left-content p-5 m-5 ">
          <h1 className="text-[55px] font-medium leading-tight">
            The AI Revolution
            <br /> Starts Here
          </h1>
          <p className="text-[20px] mr-20 text-gray-400 my-5 ">
            The world is on the brink of an artificial intelligence revolution,
            and Chainsphere is at the forefront. Our vision is to create a
            decentralized, AI-powered ecosystem that transforms industries,
            enhances efficiency, and drives automation across multiple sectors.
          </p>
          <p className="text-[20px] text-gray-400 my-5">
            But before we build the future, we&apos;re inviting early believers
            to be part of our journey. Chainsphere is currently in its Initial
            Coin Offering (ICO) phase, allowing investors and visionaries like
            you to get in at the ground level.
          </p>
         
        </div>
        <div className="right-content mx-auto">
          {/* <img
            src="/images/logo.svg"
            className="object-contain size-[800px]" // Adjusting with Tailwind classes
            alt="landing"
          /> */}
        </div>
      </div>
      <div section="sec-2 " className="h-[50vh]">
        <h2 className="text-[50px] font-medium mx-auto text-center leading-tight">
          Why Invest in Chainsphere?
        </h2>
        <div section="sec-2" className="relative max-w-6xl mx-auto ">
        <img src="/images/line.svg" className="m-16 px-16 w-full mx-auto" alt="line" />
        <div className="absolute text-center top-16  left-5 w-40">Early Access to the Future
          <p className="pt-3 text-gray-400 text-sm">
          Be among the first to invest in an AI ecosystem that will redefine industries. 
          </p>
        </div>
        <div className="absolute text-center top-16  left-[330px] w-40">Real-World Utility
          <p className="pt-7 text-gray-400 text-sm">
          Our AI solutions will integrate into healthcare, finance, logistics, and more. 
          </p>
        </div>
        <div className="absolute text-center top-16  left-[660px] w-40">Decentralized & Secure
          <p className="pt-3 text-gray-400 text-sm">
           Powered by blockchain, ensuring transparency and security in all transactions. 
          </p>
        </div>
        <div className="absolute text-center top-16  left-[980px] w-40"> Token Utility & Rewards
          <p className="pt-3 text-gray-400 text-sm">
           Our native token ($CSP) will be at the heart of AI-driven transactions and reward mechanisms.
          </p>
        </div>
       </div>
      </div>
      <PresaleCard />
      <Usecases />
      <Demodata />
      <Demodata1 />
      <Demodata2 />
      <Tokenomics />
    </div>
  );
}

export default Landing;
