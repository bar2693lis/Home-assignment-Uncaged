export const getArweaveTransactionUrl = (arweaveApiConfig: any, id: string) => {
  const url = arweaveApiConfig.protocol + '://' + arweaveApiConfig.host + '/' + id;
  return url;
};
