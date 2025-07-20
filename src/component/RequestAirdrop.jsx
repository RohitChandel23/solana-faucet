import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

function RequestAirdrop() {
  const [solAmount, setSolAmount] = useState(0);
  const [userBalance, setUserBalance] = useState();
  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (!wallet.publicKey) return;
    getBalance();
  });

  async function getBalance() {
    try {
      const balance = await connection.getBalance(wallet.publicKey);
      setUserBalance(balance / LAMPORTS_PER_SOL);
    } catch (e) {
      alert("something went wrong");
    }
  }

  async function requestAirdrop() {
    try {
      await connection.requestAirdrop(
        wallet.publicKey,
        solAmount * LAMPORTS_PER_SOL
      );
      //to & ammount
      getBalance();
      alert(`Received  ${solAmount} sol`);
    } catch (err) {
      if (!wallet.publicKey) {
        alert("connect your waller");
      } else if (solAmount <= 0)
        alert("amount should be greater than equal to 0");
      else alert(err);
    }
  }

  return (
    <div>
      <p>{userBalance}</p>
      <label>enter wallet address</label>
      <input
        type="text"
        onChange={(e) => setSolAmount(e.target.value)}
        className="border rounded"
      />
      <button
        onClick={requestAirdrop}
        className="bg-green-700 p-2 m-2 text-white border rounded "
      >
        Request Airdrop
      </button>
    </div>
  );
}
export default RequestAirdrop;
