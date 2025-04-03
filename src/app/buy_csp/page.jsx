"use client";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "@/contract/ico.json";
import {ICO_CONTRACT_ADDRESS} from "@/.env/config.js";

export default function BuyCSP() {
  const [currentAccount, setCurrentAccount] = useState(null);
   const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  useEffect(() => {
    async function initialize() {
      if (!window.ethereum) return alert("Please install MetaMask");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(ICO_CONTRACT_ADDRESS, abi, signer);
      setSigner(signer);
      setContract(contract);
      console.log("Contract initialized", contract);
      console.log("Signer", signer);
    }
    initialize();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);

      localStorage.setItem("currentAccount", accounts[0]);
      console.log(localStorage.getItem("currentAccount"));
    } catch (err) {
      console.error(err.message);
      alert("Please install a crypto wallet like MetaMask");
    }
  };

  return (
    <div>
      <div className="buy-csp-container flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Buy CSP</h1>
        <p>Connect your wallet to buy CSP tokens.</p>
        <Button onClick={connectWallet} className="bg-blue-500 text-white">
          Connect Wallet
        </Button>
        {currentAccount && <p>Connected account: {currentAccount}</p>}
      </div>
    </div>
  );
}
