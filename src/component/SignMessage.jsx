// import { useState } from "react";
// import { ed25519 } from "@solana/web3.js";
// import { useWallet } from "@solana/wallet-adapter-react";
// import bs58 from "bs58";

// // wtd is bs58
// function sendMessage() {
//   const [msg, setMsg] = useState("");
//   const { publicKey, signMessage} = useWallet();

//   async function handleSendMessage(){
//     const encodedMessage = new TextEncoder().encode(msg);
//     //wtf is this above line, why need all these things

//     const signature = await signMessage(encodedMessage);

//     if(!ed25519.verify(signature, encodedMessage, publicKey.toBytes())){
//         alert("message signature invalid");
//         return;
//     }

//   }

//   return (
//     <div>
//       <input
//         type="text"
//         onChange={(e) => setMsg(e.target.value)}
//         placeholder="message"
//       />
//       <button onClick ={handleSendMessage}>Send Message</button>
//     </div>
//   );
// }
// export default sendMessage;



import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React from "react";

 function SignMessage() {
  const { publicKey, signMessage } = useWallet();

  const onClick = async () => {
    if (!publicKey) {
      alert("Wallet not connected!");
      return;
    }
    if (!signMessage) {
      alert("Wallet does not support message signing!");
      return;
    }

    const message = document.getElementById("message").value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      alert("Message signature invalid!");
      return;
    }
    alert(`Message signature: ${bs58.encode(signature)}`);
  };

  return (
    <div>
      <input id="message" type="text" placeholder="Message" />
      <button onClick={onClick}>Sign Message</button>
    </div>
  );
}
export default SignMessage;