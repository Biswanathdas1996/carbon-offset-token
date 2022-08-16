import * as React from "react";
import ImgGif from "../../assets/images/co2.gif";
import OffsetImg from "../../assets/images/2MBH.gif";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

export default function MultiActionAreaCard() {
  return (
    <Box style={{ marginBottom: 50 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} sm={12}>
          <img
            src={ImgGif}
            alt="gg"
            height={510}
            width={590}
            style={{ float: "left" }}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Card style={{ padding: 20, borderRadius: 0 }}>
            <Typography
              component="h3"
              variant="h7"
              textAlign="left"
              color="text.primary"
              style={{ fontSize: 17, fontWeight: "bold" }}
            >
              Why we need to offset carbon
            </Typography>
            <Typography
              component="h5"
              variant="h7"
              textAlign="left"
              color="text.primary"
              style={{ fontSize: 17, marginTop: 30 }}
            >
              More generally, carbon offsetting is any reduction of greenhouse
              gas (GHG) emissions to make up for emissions that occur elsewhere.
              Carbon offset credits show that an organization or person has
              reduced its emissions. The term carbon offset is used to describe
              both the credit and the act of carbon offsetting.
            </Typography>
          </Card>
          <img
            src={OffsetImg}
            alt="gg"
            height={320}
            width="100%"
            style={{ float: "left" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
