import React from "react";
import SingleWordDisplay from "./SingleWordDisplay";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Word from "../../model/Word";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      margin: 0,
    },
    japCharacters: {
      fontFamily:
        "'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, 'メイリオ', Osaka, 'MS PGothic', arial, helvetica, sans-serif",
    },
    word: {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
    },
  })
);

function WordsList({ words }: { words: Word[] }) {
  const classes = useStyles();

  return (
    <div className={classes.japCharacters}>
      <Grid container spacing={4} className={classes.root}>
        {words.map((value: Word, i: number) => (
          <Grid key={i} item xs={12} md={3} sm={6} className={classes.word}>
            <SingleWordDisplay word={value} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default WordsList;
