import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

import { getConfigData } from "../getConfigaration";
const config = getConfigData();

const client = new Web3Storage({
  token: config?.Web3Storage,
});

export const uploadFileToIpfs = async (file) => {
  const fileName = file[0].name;
  const results = await client.put(file, {});

  return {
    path: results,
    name: fileName,
    link: `https://${results}.ipfs.dweb.link/${fileName}`,
  };
};

export const createAnduploadFileToIpfs = async (metaData) => {
  const blob = new Blob([JSON.stringify(metaData)], {
    type: "application/json",
  });

  const files = [
    new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], "ipfs.json"),
  ];

  const resultsSaveMetaData = await client.put(files, {});

  return {
    path: resultsSaveMetaData,
    link: `https://${resultsSaveMetaData}.ipfs.dweb.link/ipfs.json`,
  };
};

export const getIpfsUrI = (fingerprint) => {
  return `https://ipfs.infura.io/ipfs/${fingerprint}`;
};
