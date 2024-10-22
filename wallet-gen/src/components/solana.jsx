// src/components/solana.jsx
import React, { useEffect, useState } from 'react';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import * as bs58 from 'bs58';

export const SolanaWallet = ({ mnemonic }) => {
  const [publicKey, setPublicKey] = useState(null);

  useEffect(() => {
    const generateWallet = async () => {
      try {
        const seed = await bip39.mnemonicToSeed(mnemonic); // Convert mnemonic to seed
        const keypair = Keypair.fromSeed(seed.slice(0, 32)); // Generate keypair
        setPublicKey(keypair.publicKey.toBase58()); // Set the public key
      } catch (error) {
        console.error("Error generating wallet:", error);
      }
    };

    generateWallet();
  }, [mnemonic]);

  return (
    <div>
      {publicKey ? (
        <p>Public Key: {publicKey}</p>
      ) : (
        <p>Loading Wallet...</p>
      )}
    </div>
  );
};