import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    counters: {
      margin: "40px 25px 25px 0",
      fontSize: "13px",
      fontStyle: "italic",
      color: "black",
    },
  })
);

interface ProgressProps {
  correct: number;
  incorrect: number;
  total: number;
}

function QuizProgress({ correct, incorrect, total }: ProgressProps) {
  const classes = useStyles();

  const [progress, setProgress] = useState<number>(0);
  const [remain, setRemain] = useState<number>(total);

  const computeProgress = () => {
    setProgress((correct / total) * 100);
    setRemain(total - correct);
  };

  useEffect(() => {
    computeProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correct, total]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.counters}>
          <Grid container spacing={6}>
            <Grid item xs>
              <span style={{ color: "red" }}>Incorrects : {incorrect}</span>
            </Grid>
            <Grid item xs>
              <span style={{ color: "green" }}>Corrects : {correct}</span>
            </Grid>
            <Grid item xs>
              <span>Restants : {remain}</span>
            </Grid>
          </Grid>

          <LinearProgress variant="determinate" value={progress} />
        </div>
      </Grid>
    </Grid>
  );
}

export default QuizProgress;
