import { getConfigData } from "./getConfigaration";
const config = getConfigData();
console.log("---config->", config);
// export const PolyscanscanBaseAPI = `https://api-testnet.polygonscan.com/api`;
// export const PolyscanscanAPIKEY = `G2FQ3WI7SWZDIEQE8CCCSZHJ1M97NXNYAE`;
export const WalletPrivateKey = config?.WalletPrivateKey;
export const Network = config?.network_name;
export const NetworkTest = config?.network_name;
export const InfuraProjectId = config?.InfuraProjectId;
export const InfuraNodeURL = config?.InfuraNodeURL;
export const PaymentURI = "https://nft-payment.herokuapp.com/payment";
export const openSeaURI = (address, tokenId) => {
  return `https://testnets.opensea.io/assets/${config?.network_name}/${address}/${tokenId}/?force_update=true`;
};
export const networkURL = () => {
  return config?.network_url;
};
export const getTransctionListAPI = (account) => {
  return `${config?.blockchain_base_api}?module=account&action=txlist&address=${account}&sort=desc&apikey=${config?.ChainExplorerAPIKEY}`;
};
