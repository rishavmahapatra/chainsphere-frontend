"use client";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "@/contract/ico.json";
import abi1 from "@/contract/usdt.json";
import { ICO_CONTRACT_ADDRESS } from "../../env/config";
import { USDT_CONTRACT_ADDRESS } from "../../env/config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LayoutWrapper from '@/components/LayoutWrapper';

export default function BuyCSP() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [contract1, setContract1] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function initialize() {
      if (!window.ethereum) return alert("Please install MetaMask");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(ICO_CONTRACT_ADDRESS, abi, signer);
      const contract1 = new ethers.Contract(USDT_CONTRACT_ADDRESS, abi1, signer);
      setContract1(contract1);
      console.log(`contract ----->`, contract)
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


  async function BuyToken(i, amount) {
    try {
      if (i === 0) {
        const tx = await contract.buyToken(0, { value: amount });
        await tx.wait();
        alert("BNB payment successful, Token transaction successful!");
        console.log(tx);
      }
      else {
        const usdtContract = await contract1.approve(ICO_CONTRACT_ADDRESS, amount);
        await usdtContract.wait();
        console.log(usdtContract);
        const tx = await contract.buyToken(amount)
        await tx.wait();
        alert("Token transaction successful");
        console.log(tx);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Token transaction unsuccessful");
    }
  }

  return (
    <LayoutWrapper>
      <div>
        <div className="buy-csp-container flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Buy CSP</h1>
          <p>Connect your wallet to buy CSP tokens.</p>
          <Button onClick={connectWallet} >
            Connect Wallet
          </Button>
          {currentAccount && <p>Connected account: {currentAccount}</p>}
        </div>
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" placeholder="Enter amount" />
        <Button onClick={() => BuyToken(1, 200)}>
          Buy CSP
        </Button>
      </div>
    </LayoutWrapper>
  );
}