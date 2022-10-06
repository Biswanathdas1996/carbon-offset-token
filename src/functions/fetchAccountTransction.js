import {
  getContractAddress,
  getcurrentNetworkId,
} from "../CONTRACT-ABI/connect";

import { getConfigData } from "../getConfigaration";
const config = getConfigData();
export async function frtchAccounttransction() {
  const networkIddarta = await getcurrentNetworkId();
  const cureentAccress = getContractAddress(networkIddarta);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    `${config?.blockchain_base_api}?module=account&action=tokennfttx&contractaddress=${cureentAccress}&page=1&offset=10000&sort=asc&apikey=${config?.ChainExplorerAPIKEY}`,
    requestOptions
  );
}
