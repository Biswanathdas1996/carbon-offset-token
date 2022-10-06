import { getConfigData } from "../getConfigaration";
export const getSymbol = () => {
  const config = getConfigData();
  return config?.currency_symbol;
};
