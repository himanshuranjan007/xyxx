// src/components/showBalance.jsx
import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

export const ShowSolBalance = () => {
  const [balance, setBalance] = useState(null);
  const connection = new Connection('https://api.devnet.solana.com'); // Use Solana devnet

  const publicKey = 'publicKey'; // Replace with the actual public key

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const key = new PublicKey(publicKey);
        const balance = await connection.getBalance(key);
        setBalance(balance / 1e9); // Convert from lamports to SOL
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [publicKey]);

  return (
    <div>
      <h3>SOL Balance:</h3>
      {balance !== null ? <p>{balance} SOL</p> : <p>Loading...</p>}
    </div>
  );
};