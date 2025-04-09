'use client';
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../config/config"
const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [isBuyCSPDisabled, setIsBuyCSPDisabled] = useState(false);

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoic2FteWFrbGFoaXJlMTMwNkBnbWFpbC5jb20iLCJpYXQiOjE3NDQxOTE0MzMsImV4cCI6MTc0NDQ1MDYzM30.67DuWuYSiighyhF7TS1ErJou43xJSfUg-I0ig0-ftF4
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                console.log('Connected account:', accounts[0]);

                // New API call to add the connected wallet address with Bearer token
                const token = localStorage.getItem("token"); // Retrieve token from local storage
                console.log("Token before API call:", token); // Log the token
                if (!token) {
                    console.error('No token found. Please log in.');
                    alert('Authentication required. Please log in.');
                    return; // Exit if no token is found
                }

                const walletAddress = String(accounts[0]);
                console.log("Wallet address being sent:", walletAddress); // Log the wallet address

                const res = await axios.post(`${BASE_URL}/user/add-address`, {
                    address: walletAddress
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log("Wallet address result from database:", res);
                setIsBuyCSPDisabled(false)

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    const { data } = error.response;
                    if (data.message === "Invalid wallet address") {
                        alert(data.message); // Alert the user with the error message
                        setIsBuyCSPDisabled(true)
                    } else if (data.message === "wallet address already added") {
                        // Do nothing
                    } else {
                        console.error('Unexpected error message:', data.message);
                    }
                } else {
                    console.error('Error connecting to MetaMask:', error);
                }
            }
        } else {
            alert('Please install MetaMask!');
        }
    };
    const disconnectWallet = () => {
        setAccount(null);
        setIsBuyCSPDisabled(false);
        console.log('Disconnected wallet');
    };

    return (
        <WalletContext.Provider value={{ account, connectWallet, disconnectWallet, isBuyCSPDisabled }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);