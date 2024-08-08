import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Button } from '@mui/material';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42] // Add the chain IDs you want to support
});

const WalletConnect = () => {
  const { activate, account, deactivate } = useWeb3React();

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.error(ex);
    }
  };

  const disconnectWallet = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <div>
      {account ? (
        <div>
          <span>Connected: {account}</span>
          <Button variant="contained" color="secondary" onClick={disconnectWallet}>
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
