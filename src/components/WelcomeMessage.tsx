import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heroContent: {
      padding: theme.spacing(3, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
  })
);

function WelcomeMessage() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          style={{ color: "white" }}
          gutterBottom
        >
          Boîte à Kanjis
        </Typography>
        <Typography
          variant="h5"
          align="center"
          style={{ color: "#bebebe" }}
          paragraph
        >
          Accueil de la Boîte à Kanjis, ci-dessous les kanjis récemment
          enregistrés. Pour consulter / éditer des kanjis ou des mots, cliquer
          sur les boutons ci-dessous.
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Link to={"/kanji-list"}>
                <Button variant="contained" color="primary">
                  Les kanjis (unitaires)
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/word-list"}>
                <Button variant="outlined" style={{ backgroundColor: "white" }}>
                  Les mots
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default WelcomeMessage;
