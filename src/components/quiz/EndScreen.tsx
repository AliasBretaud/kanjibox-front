import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { QuizResults } from "./WordsQuizModule";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    end: {
      color: "black",
    },
    endWord: {
      fontSize: "72px",
    },
    retryBtn: {
      padding: "40px",
    },
  })
);

function EndScreen({
  onRetry,
  results,
}: {
  onRetry: Function;
  results: QuizResults;
}) {
  const classes = useStyles();

  return (
    <div className={classes.end}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <p className={classes.endWord}>終了！</p>
        </Grid>
        <Grid item xs={12}>
          Mauvaises réponses :{" "}
          <span style={{ color: "red" }}>{results.nbFail}</span>
        </Grid>
        <Grid item xs={12}>
          Bonnes Réponses :{" "}
          <span style={{ color: "green" }}>{results.nbOk}</span>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.retryBtn}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onRetry();
              }}
            >
              Recommencer
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default EndScreen;
