import React from "react";
import SingleKanjiDisplay from "./SingleKanjiDisplay";
import Grid, { GridProps } from "@material-ui/core/Grid";
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

const getGridProps = (nbElements: number): GridProps => {
  switch (nbElements) {
    case 1:
      return { xs: 12, md: 12, sm: 12 };
    case 2:
      return { xs: 12, md: 6, sm: 6 };
    case 3:
      return { xs: 12, md: 4, sm: 6 };
    default:
      return { xs: 12, md: 3, sm: 6 };
  }
};

function KanjisList({ kanjis }: { kanjis: Kanji[] }) {
  const classes = useStyles();

  const gridStyle: GridProps = getGridProps(kanjis.length);
  return (
    <div className={classes.japCharacters}>
      <Grid container spacing={8} className={classes.root}>
        {kanjis.map((value: Kanji, i: number) => (
          <Grid key={i} item {...gridStyle} className={classes.kanji}>
            <SingleKanjiDisplay kanji={value} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default KanjisList;
