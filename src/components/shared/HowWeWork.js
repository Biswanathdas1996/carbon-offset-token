import * as React from "react";
import ImgGif from "../../assets/images/SHST-Offsetting.gif";
import OffsetImg from "../../assets/images/how_to_offset_carbon_emissions-f.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

export default function MultiActionAreaCard() {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} sm={12}>
          <Card style={{ padding: 20, borderRadius: 0 }}>
            <Typography
              component="h3"
              variant="h7"
              textAlign="left"
              color="text.primary"
              style={{ fontSize: 17, fontWeight: "bold" }}
            >
              How it work
            </Typography>
            <Typography
              component="h5"
              variant="h7"
              textAlign="left"
              color="text.primary"
              style={{ fontSize: 17, marginTop: 30 }}
            >
              he person uses a tool to calculate the emissions released on that
              flight and then buys a carbon credit from a broker to offset that
              amount of emissions. The broker subtracts its fee and uses the
              rest of the money to invest in an emissions project, such as a
              reforestation effort.
            </Typography>
          </Card>
          <img
            src={OffsetImg}
            alt="gg"
            height={320}
            width="100%"
            style={{ float: "right" }}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <img
            src={ImgGif}
            alt="gg"
            height={510}
            width={590}
            style={{ float: "left" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
