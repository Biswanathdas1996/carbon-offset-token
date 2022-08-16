import React, { useEffect, useState } from "react";
import { TabPanel } from "@mui/lab";
import { _account } from "../../CONTRACT-ABI/connect";
import Certificate from "./Certificate";

const Bid = ({ tokenId, attributes }) => {
  const [account, setAccount] = useState([]);

  useEffect(() => {
    fetchNftInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNftInfo() {
    try {
      const getprivetContent = await _account();
      setAccount(getprivetContent);
    } catch {}
  }

  return (
    <TabPanel
      value="3"
      sx={{
        backgroundColor: "#F0F6FF",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Certificate
        account={account}
        tokenId={tokenId}
        attributes={attributes}
      />
    </TabPanel>
  );
};

export default Bid;
