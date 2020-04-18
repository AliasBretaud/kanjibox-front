import React from "react";
import Word from "../../model/Word";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wordContainer: {
      fontSize: "60pt",
      color: "black",
      padding: "20px",
      border: "3px solid rgba(69, 71, 74, 0.5)",
      borderRadius: "20px",
      margin: 0,
      display: "flex",
      alignItems: "center",
      width: "100%",
      maxWidth: "410px",
      justifyContent: "center",
    },
  })
);

function WordDisplay({ word }: { word: Word }) {
  const classes = useStyles();

  return (
    <div className={classes.wordContainer}>
      <span>{word.value}</span>
    </div>
  );
}

export default WordDisplay;
