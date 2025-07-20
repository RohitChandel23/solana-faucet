import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL,
    PublicKey,
    Transaction,
    SystemProgram
 } from "@solana/web3.js";

function SendToken() {
  const [sendAmount, setSendAmount] = useState("");
  const [address, setAddress] = useState("");

  const {publicKey, sendTransaction} = useWallet();
  const {connection} = useConnection();

  async function handleSendToken() {
    if (sendAmount && address) {
        const transaction = new Transaction();

        transaction.add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(address),
                lamports: sendAmount * LAMPORTS_PER_SOL
            })
        )

        await sendTransaction(transaction, connection);
        alert('successfully sent............')
    }
    else console.log('check intputs')
  }

  return (
    <div className="flex flex-col justify-between w-[200px] h-[150px] m-30">
      <input
        type="text"
        onChange={(e) => setSendAmount(e.target.value)}
        className="border p-2 rounded"
        placeholder="amount"
      />
      <input
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 rounded"
        placeholder="to"
      />
      <button
        onClick={handleSendToken}
        className="rounded bg-blue-700 p-2 border text-white"
      >
        Send Token
      </button>
    </div>
  );
}
export default SendToken;



