import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import phantomLogo from "../../../assets/images/wallets/phantom.svg";

const WalletConnectButton = ({ onSuccess }) => {
  const { connection } = useConnection();
  const { select, publicKey, connecting } = useWallet();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info?.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [publicKey, connection, setBalance]);

  const handleWalletSelect = async (walletName) => {
    if (walletName) {
      try {
        select(walletName);
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
  };

  useEffect(() => {
    if (publicKey) {
      onSuccess?.(publicKey);
    }
  }, [onSuccess, publicKey]);

  return !publicKey ? (
    <button
      onClick={() => handleWalletSelect("Phantom")}
      type="button"
      className={`btn-login rounded-[50px] mb-6 text-xl text-white font-bold flex justify-center bg-purple items-center transition-all hover:opacity-80 ${
        connecting ? "active" : ""
      }`}
    >
      {connecting ? (
        <div className="signup btn-loader" />
      ) : (
        <div className="flex">
          <img
            className="mr-2 w-[24px] h-[24px]"
            src={phantomLogo}
            alt="phantom logo"
          />
          <span>Connect Wallet</span>
        </div>
      )}
    </button>
  ) : null;
};

export default WalletConnectButton;
