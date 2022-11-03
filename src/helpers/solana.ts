import { Cluster } from '../providers/SolanaCluster';

export const getSolanaTransactionUrl = (connection: any, id: string) => {
  const explorerBaseUrl = 'https://explorer.solana.com/address/';

  switch(connection.rpcEndpoint) {
    case Cluster.devnet: {
      const url = explorerBaseUrl + id + '?cluster=devnet';
      return url;
    }
    case Cluster.testnet: {
      const url = explorerBaseUrl + id + '?cluster=testnet';
      return url;
    }
    case Cluster.mainnet: {
      const url = explorerBaseUrl + id;
      return url
    }
  }
};
