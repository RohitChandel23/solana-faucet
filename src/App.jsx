import "./App.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

import RequestAirdrop from "./component/RequestAirdrop";
import SendToken from "./component/SendToken";
import SignMessage from "./component/SignMessage";

function App() {
  return (
    <>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <h1 className="text-3xl font-bold">Heldwflo world!</h1>
            <div className="flex justify-between">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <RequestAirdrop/>
            <SendToken/>
            <SignMessage/>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
