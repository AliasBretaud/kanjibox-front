import React from "react";
import SingleKanjiDisplay from "./SingleKanjiDisplay";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Kanji from "../../model/Kanji";

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
    kanji: {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
    },
  })
);

function KanjisList({ kanjis }: { kanjis: Kanji[] }) {
  const classes = useStyles();

  return (
    <div className={classes.japCharacters}>
      <Grid container spacing={8} className={classes.root}>
        {kanjis.map((value: Kanji, i: number) => (
          <Grid key={i} item xs={12} md={3} sm={6} className={classes.kanji}>
            <SingleKanjiDisplay kanji={value} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default KanjisList;
