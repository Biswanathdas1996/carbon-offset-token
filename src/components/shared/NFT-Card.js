/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { _fetch, _account } from "../../CONTRACT-ABI/connect";
// import { buyNft, displayRazorpay } from "../../functions/buyNft";
// import TransctionModal from "./TransctionModal";
// import MarkAsFevourite from "./MarkAsFevourite";
// import { getIcon } from "../../utils/currencyIcon";
// import { getSymbol } from "../../utils/currencySymbol";
// import { convertWeiToToken } from "../../utils/convertPrice";
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
  const [response, setResponse] = useState(null);
  const [owner, setOwner] = useState(null);
  const [account, setAccount] = useState(null);

  const [listingState, setListingState] = useState(null);

  const [loading, setLoading] = useState(false);

  let history = useNavigate();

  useEffect(() => {
    fetchNftInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNftInfo() {
    // setLoading(true);
    const getOwner = await _fetch("ownerOf", tokenId);
    setOwner(getOwner);
    const getTokenListingState = await _fetch("getTokenListingState", tokenId);
    setListingState(getTokenListingState?.tokenState);
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
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          style={{
            border: "none",
            boxShadow: "none",
            cursor: "pointer",
            padding: 1,
            margin: 1,
            overflow: "hidden",
            height: 48,
          }}
        >
          <Card
            sx={{
              // width: 50,
              // display: "flex",
              flexDirection: "column",
              backgroundColor: badgeUI(listingState),

              borderRadius: 0,
              boxShadow: "none",
            }}
            style={
              !userAllowedActions.includes(listingState) &&
              !isAdmin(account) &&
              listingState !== "4"
                ? { border: `0.01px solid ${badgeUI(listingState)}` }
                : { border: "0.01px solid rgba(0, 0, 0, 0.25)" }
            }
            onClick={(e) => onClickOnPlot(e)}
          >
            {assetHavingImage.includes(listingState) ? (
              <CardMedia
                component="img"
                height="48"
                image={badgeUI(listingState)}
                alt="green iguana"
                style={{
                  borderRadius: "0px",
                  overflow: "hidden",
                }}
              />
            ) : (
              <CardContent style={{ paddingBottom: 0, border: "none" }}>
                <Typography
                  style={{ fontSize: 10, cursor: "pointer" }}
                  variant="body2"
                  paragraph
                  item
                  fontWeight="500"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "11rem",
                  }}
                >
                  {userAllowedActions.includes(listingState) ? (
                    `${tokenId}`
                  ) : (
                    <p style={{ margin: 14.5 }}></p>
                  )}
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      ) : (
        <Grid item xs={12} sm={6} md={2.4}>
          <Loader count="1" xs={12} sm={12} md={12} />
        </Grid>
      )}
    </>
  );
}
