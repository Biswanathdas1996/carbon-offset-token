/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { _fetch, _account } from "../../CONTRACT-ABI/connect";
// import { buyNft, displayRazorpay } from "../../functions/buyNft";
// import TransctionModal from "./TransctionModal";
// import MarkAsFevourite from "./MarkAsFevourite";
import { getIcon } from "../../utils/currencyIcon";
import { getSymbol } from "../../utils/currencySymbol";
// import { convertWeiToToken } from "../../utils/convertPrice";
import { buyNft, displayRazorpay } from "../../functions/buyNft";
import {
  badgeUI,
  userAllowedActions,
  assetHavingImage,
} from "../../utils/tokenListingState";
import { isAdmin } from "../../utils/isAdmin";
// import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from "../shared/Loader";
import CardMedia from "@mui/material/CardMedia";

export default function NFTCard({
  tokenId,
  reload = () => null,
  isUserProfilePage = false,
}) {
  const [start, setStart] = useState(false);
  const [price, setPrice] = useState(null);
  const [response, setResponse] = useState(null);
  const [owner, setOwner] = useState(null);
  const [account, setAccount] = useState(null);

  const [listingState, setListingState] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isDoingPayment, setIsDoingPayment] = useState(false);
  let history = useNavigate();

  useEffect(() => {
    fetchNftInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNftInfo() {
    setLoading(true);
    const getOwner = await _fetch("ownerOf", tokenId);
    setOwner(getOwner);
    const getTokenListingState = await _fetch("getTokenListingState", tokenId);
    setListingState(getTokenListingState?.tokenState);
    const price = await _fetch("getNftPrice", tokenId);
    setPrice(price);
    const account = await _account();
    setAccount(account);
    setLoading(false);
  }

  console.log("==listingState===>", listingState);
  const onClickOnPlot = (e) => {
    if (userAllowedActions.includes(listingState) || isAdmin(account)) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      history(`/details/${tokenId}`);
      return;
    }
  };

  return (
    <>
      {!loading ? (
        <Card
          sx={{
            height: "100%",
            padding: 0.5,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            border: "0.01px solid rgba(0, 0, 0, 0.09)",
          }}
          onClick={(e) => onClickOnPlot(e)}
        >
          <img src={badgeUI(listingState)} alt="NFT img" height="130" />

          <CardContent>
            <Typography
              style={{ fontSize: 13, cursor: "pointer", marginTop: 5 }}
              variant="body2"
              item
              fontWeight="600"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "11rem",
              }}
            >
              {listingState === "1" ? "Offset" : "Offseted"} 1T Co2
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <b style={{ fontSize: 11 }}>
                <span className="text-secondary" style={{ color: "grey" }}>
                  Price:{" "}
                </span>
                <strong style={{ fontSize: 12, fontWeight: "bold" }}>
                  {price / 1000000000000000000} {getSymbol()}
                </strong>
              </b>
            </div>
          </CardContent>
          <Button
            variant={listingState === "1" ? "contained" : "outlined"}
            size="small"
            sx={{
              marginX: "15px",
              marginBottom: "15px",
            }}
            // onClick={() => buynow(`NFT #${tokenId}`)}
            style={{
              border: "2px solid #1976d2",
              fontSize: 10,
              fontWeight: "bold",
              padding: 6,
            }}
          >
            {listingState === "1" ? "Buy Now" : "View"}
          </Button>
        </Card>
      ) : (
        // </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Loader count="1" xs={12} sm={12} md={12} />
        </Grid>
      )}
    </>
  );
}
