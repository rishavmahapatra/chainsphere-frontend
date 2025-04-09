"use client"

import { React, useEffect, useState } from "react";
import axios from "axios";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem("token"); // Retrieve token from local storage

            try {
                const response = await axios.get("http://3.109.67.109:8001/api/v1/user/transactions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                setTransactions(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ backgroundColor: '#1E1E1E', color: '#FFFFFF', padding: '20px' }}>
            <h1 style={{ color: '#FFA500' }}>Your Transaction History</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {transactions.map(transaction => (
                    <li key={transaction.id} style={{ marginBottom: '15px', border: '1px solid #FFA500', padding: '10px', borderRadius: '5px' }}>
                        <p>Transaction Hash: <span style={{ color: '#FFA500' }}>{transaction.transactionHash}</span></p>
                        <p>Amount: <span style={{ color: '#FFA500' }}>${transaction.amount}</span></p>
                        <p>Price: <span style={{ color: '#FFA500' }}>{transaction.price}</span></p>
                        <p>Value: <span style={{ color: '#FFA500' }}>{transaction.value}</span></p>
                        <p>Status: <span style={{ color: '#FFA500' }}>{transaction.status}</span></p>
                        <p>Type: <span style={{ color: '#FFA500' }}>{transaction.type}</span></p>
                        <p>Created At: <span style={{ color: '#FFA500' }}>{new Date(transaction.createdAt).toLocaleString()}</span></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}