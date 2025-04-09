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
import axios from "axios";

export default function BuyCSP() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [contract1, setContract1] = useState(null);
  const [message, setMessage] = useState("");
  const [bnbPrice, setBnbPrice] = useState("0");
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [estimatedCSP, setEstimatedCSP] = useState(0.00); // Default value
  const [amount, setAmount] = useState(0.0); // New state for amount input
  const [cspPrice, setCspPrice] = useState(0.0);
  const token = localStorage.getItem("token"); // Retrieve token from local storage
  console.log("Retrieved token from local storage:", token); // Log the retrieved token

  useEffect(() => {
    async function initialize() {
      const res = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd")
      setBnbPrice(res.data.binancecoin.usd);
      if (!window.ethereum) return alert("Please install MetaMask");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(ICO_CONTRACT_ADDRESS, abi, signer);
      console.log("trying to fecth tokenPrice")
      try {
        const price = await contract.tokenPrice();
        const formattedPrice = ethers.formatUnits(price, 18); // Convert from wei to token price
        setCspPrice(formattedPrice); // Set the formatted price
        console.log("The price is fetched for the token from sc: ", formattedPrice);
      }
      catch (err) {
        console.log("Error while fetching tokenPrice:", err);
      }

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

  useEffect(() => {
    console.log("bnbPrice", bnbPrice);
    console.log("tokenPrice from smart contract: ",
    )
  }, [bnbPrice, cspPrice]);

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

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    calculateEstimatedCSP(amount, event.target.value); // Recalculate when currency changes
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(Number(value)); // Convert to number before setting
    calculateEstimatedCSP(value, selectedCurrency); // Recalculate estimated CSP based on amount
  };

  const calculateEstimatedCSP = (amount, currency) => {
    if (currency === "USDT") {
      setEstimatedCSP((amount / cspPrice).toFixed(4)); // Calculate for USDT
    } else {
      setEstimatedCSP((bnbPrice / cspPrice) * amount); // Calculate for BNB
    }
  };

  const addTransactionToDB = async (hash, currency, amount, totalValue, price) => {
    const value = totalValue.toString();// Calculate value
    const status = "completed";
    const type = "buy";
    const transactionData = {
      transactionHash: hash.toString(),
      amount: amount.toString() + " " + currency,
      price: price.toString() + " " + currency,
      value: value,
      status: status,
      type: type,
    };
    try {
      console.log("here is the transactionData being added to db:", transactionData)
      await axios.post("http://3.109.67.109:8001/api/v1/user/transaction", transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Transaction added to DB:", transactionData);
    } catch (error) {
      console.error("Error adding transaction to DB:", error.response ? error.response.data : error.message);
    }
  }
  async function BuyToken(i, amount) {
    console.log("type of amount is :", typeof (amount));
    console.log("type of bnbPrice is :", typeof (bnbPrice));

    try {
      if (i === 0) {
        try {

          const bnb = ((1 / bnbPrice) * cspPrice).toFixed(8);
          console.log("testt bnb price being sent is :  ", bnb);
          const amountInWei = ethers.parseUnits(amount.toString(), 18); // Convert amount to Wei
          const bnbInWei = ethers.parseUnits(bnb.toString(), 18);
          console.log("testt bnb price being sent is :  ", bnb);
          const tx = await contract.buyToken(0, bnbInWei, { value: amountInWei });  // Pass amountInWei as msg.value
          await tx.wait();
          alert("BNB payment successful, Token transaction successful!");
          console.log(tx);
          console.log("here is the hash:", tx.hash)
          const bnb1 = ((1 / bnbPrice) * cspPrice).toFixed(8)
          try {
            await addTransactionToDB(tx.hash, "BNB", amount, estimatedCSP, bnb1)
          }
          catch (err) {
            console.log("error while adding to db : ".err);
          }
        } catch (err) {
          console.log("BNB failed due to: ", err);
        }
      } else {

        try {

          const amountInWei = ethers.parseUnits(amount.toString(), 18);
          const usdtContract = await contract1.approve(ICO_CONTRACT_ADDRESS, amountInWei);
          await usdtContract.wait();
          console.log(usdtContract);

          console.log("how much usdt : ", amount);
          const tx = await contract.buyToken(amountInWei, 0); // Pass the USDT amount
          await tx.wait();
          alert("Token transaction successful");
          console.log(tx);
          console.log("Here is the hash", tx.hash);
          try {
            await addTransactionToDB(tx.hash, "USDT", amount, estimatedCSP, cspPrice)
          }
          catch (err) {
            console.log("error while adding to db : ".err);
          }
        }
        catch (err) {
          console.log("error in usdt", err)
        }

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
          <Button onClick={connectWallet}>
            Connect Wallet
          </Button>
          {currentAccount && <p>Connected account: {currentAccount}</p>}
        </div>

        {/* Dynamic Text Display */}
        <div className="mt-4 text-lg">
          {selectedCurrency === "USDT"
            ? `1 CSP = ${cspPrice}`
            : `1 CSP = ${((1 / bnbPrice) * 0.05).toFixed(8)} BNB`}
        </div>

        <div className="flex flex-row items-center justify-between mt-4">
          <div className="flex flex-col mr-2">
            <Label htmlFor="currency">Currency</Label>
            <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange} className="border rounded p-2">
              <option value="USDT">USDT</option>
              <option value="BNB">BNB</option>
            </select>
          </div>

          <div className="flex flex-col mx-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange} // Update amount on change
            />
          </div>

          <div className="flex flex-col ml-2">
            <Label htmlFor="estimatedCSP">Est CSP Tokens</Label>
            <Input id="estimatedCSP" type="text" value={`${estimatedCSP}`} readOnly />
          </div>
        </div>

        {/* Centered Buy CSP Button */}
        <div className="flex justify-center mt-4">
          <Button onClick={() => BuyToken(selectedCurrency === "USDT" ? 1 : 0, amount)}>
            Buy CSP
          </Button>
        </div>

        {/* Disclaimer Text below the button */}
        {selectedCurrency === "BNB" && (
          <p className="mt-2 text-sm text-gray-500 text-center">
            **The BNB price is volatile, the live price will be considered.**
          </p>
        )}
      </div>
    </LayoutWrapper>
  );
}