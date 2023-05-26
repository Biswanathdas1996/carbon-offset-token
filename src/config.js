import { getConfigData } from "./getConfigaration";
const config = getConfigData();
console.log("---config->", config);
export const WalletPrivateKey =
  "82e4fb5555837b975e4402a02c2fbe230ae7d4d61574ee00ed2b1ff79be84195";
export const Network = "sepolia";
export const NetworkTest = "sepolia";
export const InfuraProjectId = "24022fda545f41beb59334bdbaf3ef32";
export const InfuraNodeURL = `https://sepolia.infura.io/v3/24022fda545f41beb59334bdbaf3ef32`;
export const network_id = "11155111";
export const PaymentURI = "https://payment-gateway1.azurewebsites.net/payment";
export const openSeaURI = (address, tokenId) => {
  return `https://testnets.opensea.io/assets/${Network}/${address}/${tokenId}/?force_update=true`;
};
export const networkURL = () => {
  return InfuraNodeURL;
};
export const getTransctionListAPI = (account) => {
  return `${config?.blockchain_base_api}?module=account&action=txlist&address=${account}&sort=desc&apikey=${config?.ChainExplorerAPIKEY}`;
};
