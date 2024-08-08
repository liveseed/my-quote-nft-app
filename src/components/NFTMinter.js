// src/components/NFTMinter.js

import React, { useState } from 'react';
import Web3 from 'web3';

const NFTMinter = ({ quote, bgColor, font, effect, price, onMint }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const mintNFT = async () => {
    if (!quote) {
      alert('Generate a quote first!');
      return;
    }

    // Inicjalizacja Web3
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    // Konfiguracja smart contractu
    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Zamień na adres swojego smart contractu
    const contractABI = []; // ABI Twojego smart contractu

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      await contract.methods.mintNFT(quote, bgColor, font, effect, title, description)
        .send({ from: account, value: web3.utils.toWei(price.toString(), 'ether') }); // Added price to transaction
      alert('NFT minted successfully!');
      onMint({ title, quote, description, link: `https://nft.com/${title}` });
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="2"
        cols="30"
      />
      <button onClick={mintNFT}>Mint as NFT</button>
    </div>
  );
};

export default NFTMinter;
