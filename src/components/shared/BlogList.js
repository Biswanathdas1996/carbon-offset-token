import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import Blog1 from "../../assets/images/rrrrrr.gif";
import Blog2 from "../../assets/images/Metaverse image.jpg";
import Blog3 from "../../assets/images/sssss.gif";
import Blog4 from "../../assets/images/co2.gif";
import openingFront from "../../assets/images/opening-front-page.jpg";
import Earth from "../../assets/images/The_Blue_Marble_(remastered).jpg";
import ClimetBomb from "../../assets/images/Climate_Change_1679584173402_1679584185272_1679584185272.png";
import { Title } from "@material-ui/icons";

export default function RecipeReviewCard() {
  const cardUI = (title, date, text, img, height = "350", link) => {
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {/* {user} */}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={date}
        />
        <CardMedia
          component="img"
          height={height || "350"}
          image={img}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <a href={link} target="_blank" rel="noreferrer">
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </a>
        </CardActions>
      </Card>
    );
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Typography
            component="h3"
            variant="h7"
            textAlign="left"
            color="text.primary"
            style={{ fontSize: 17, fontWeight: "bold" }}
          >
            BLOGS AND POSTS
          </Typography>
        </Grid>

        <Grid item xs={8}>
          {cardUI(
            `UN climate report stresses urgency to act to secure a livable future`,
            `April 15, 2023`,
            `There are multiple, feasible and effective options to reduce greenhouse gas emissions and adapt to human-caused climate change, and they are available now, said scientists in the latest report released by the Intergovernmental Panel on Climate Change (IPCC) on 20 March.`,
            Blog3,
            "350",
            `https://www.ipcc.ch/report/ar6/syr/`
          )}
        </Grid>
        <Grid item xs={4}>
          {cardUI(
            `Only one Mother Earth`,
            `April 22, 2023`,
            `On International Mother Earth Day, the UN Chief urged people everywhere “to raise your voices and demand leaders make peace with nature.`,
            Earth,
            "350",
            `https://www.un.org/en/observances/earth-day`
          )}
        </Grid>
        <Grid item xs={4}>
          {cardUI(
            `How to defuse the climate time-bomb?`,
            `March 31, 2023`,
            `There are multiple, feasible and effective options to reduce greenhouse gas emissions and adapt to human-caused climate change, and they are available now, said scientists in the latest Intergovernmental Panel on Climate Change (IPCC) report.`,
            ClimetBomb,
            "350",
            `https://www.youtube.com/watch?v=ZtlE4kgmb4k`
          )}
        </Grid>
        <Grid item xs={8}>
          {cardUI(
            `See what climate action looks like`,
            `April 15, 2023`,
            `Take a look at #MyClimateAction – a photo and video contest conducted by the Agora mobile app, in support of the UN’s ActNow campaign. Be inspired by people taking action and championing solutions to drive change.Are you committed to climate action? Join the ActNow campaign to take steps towards transitioning to a low-carbon world and speak up and demand action from governments and businesses.`,
            openingFront,
            "350",
            `https://www.ipcc.ch/report/ar6/syr/`
          )}
        </Grid>
      </Grid>
    </>
  );
}
