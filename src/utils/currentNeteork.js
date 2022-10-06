import { getConfigData } from "../getConfigaration";
export const currentNeteork = () => {
  const config = getConfigData();
  return config?.blockchain;
};
