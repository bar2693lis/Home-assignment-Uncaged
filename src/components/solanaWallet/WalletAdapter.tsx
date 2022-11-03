import { Fragment, FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import { Box } from '@mui/material';
import { ConnectWallet } from './ConnectWallet';
import { UploadMetadata } from '../metadata/UploadMetadata';
import { MintNft } from '../nft/MintNft';

require('@solana/wallet-adapter-react-ui/styles.css');

export const getStepContent = (step: number) => {
  switch (step) {
    case 1: // Step 2
      return(
        <ConnectWallet />
      );
    case 2: // Step 3
      return(
        <Fragment>
          <UploadMetadata />
        </Fragment>
      );
    case 3: // Step 4
      return(
        <Box>
          <MintNft />
        </Box>
      );
    default:
      return "unknown step";
  }
};

export const WalletAdapter: FC<{ step: number }> = (props) => {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                      { getStepContent(props.step)}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
