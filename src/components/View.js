import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./View.css";

import { inject, observer } from "mobx-react";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: "Bold",
  },
  pos: {
    marginBottom: 12,
  },
  img: {
    maxWidth: 460,
  },
  steamLink: {
    maxWidth: 200,
  },
});

const View = observer(({ Store }) => {
  const classes = useStyles();
  const goToSteamUrl = (e, steamUrl) => {
    window.open(steamUrl, "_blank");
  };

  const renderGames = Store.resultList.map((g, i) => (
    <Grid key={i} item xs={12}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item>
              {g.steamUrl ? (
                <LazyLoadImage
                  id="game-image"
                  className={classes.img}
                  alt="complex"
                  src={g.image}
                />
              ) : (
                <LazyLoadImage
                  id="game-image"
                  className={classes.img}
                  alt="complex"
                  src="https://steamuserimages-a.akamaihd.net/ugc/942844113153764888/C7383772E06C8BA8060F7940B5C36E83714445E9/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
                />
              )}
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    className={classes.gameTitle}
                    color="textSecondary"
                    gutterBottom
                  >
                    {g.title}
                  </Typography>
                  {!g.show && (
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Fully Optimized:{" "}
                      {g.isFullyOptimized ? <b>Yes</b> : <b>No</b>}
                      <br />
                      Highlights Supported:{" "}
                      {g.isHighlightsSupported ? <b>Yes</b> : <b>No</b>}
                      <br />
                      Publisher: <b>{g.publisher}</b>
                      <br />
                      Genre(s): <b>{g.genres.join(", ")}</b>
                    </Typography>
                  )}
                  {g.steamUrl && (
                    <LazyLoadImage
                      style={{ cursor: "pointer" }}
                      onClick={(e) => goToSteamUrl(e, g.steamUrl)}
                      className={classes.steamLink}
                      alt="complex"
                      src="https://images.squarespace-cdn.com/content/v1/5b45fae8b98a78d9d80b9c5c/1531959264455-E7B8MJ3VMPX0593VGCZG/ke17ZwdGBToddI8pDm48kN8apspGukzgos6frmxv8N4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcn1JAjKfvrLftyUdzBH7TuC6435FrIls799f53l0WBScgvW54fKSkWPxA0JJ5qDp9/button-steam-available-fixed-2.png?format=1500w"
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  ));

  return (
    <Container>
      <Grid container spacing={2}>
        {renderGames}
      </Grid>
    </Container>
  );
});

export default inject((stores) => ({
  Store: stores.Store,
}))(View);
