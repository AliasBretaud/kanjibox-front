import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Kanji from "../../model/Kanji";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minWidth: "fit-content",
      width: "100%",
    },
    japCharacters: {
      fontFamily:
        "'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, 'メイリオ', Osaka, 'MS PGothic', arial, helvetica, sans-serif",
    },
    kanjiDisplay: {
      fontSize: "80pt",
      color: "black",
      opacity: "0.75",
      cursor: "default",
    },
  })
);

interface KanjiDisplayProps {
  kanji: Kanji;
  onClick?: Function;
}

function SingleKanjiDisplay({ kanji, onClick }: KanjiDisplayProps) {
  const classes = useStyles();

  const displayRow = (title: string, values: string[]) => {
    return (
      <>
        <tr>
          <th rowSpan={values.length > 0 ? values.length : 1}>{title}</th>
          <td>
            <span>{values[0]}</span>
          </td>
        </tr>
        {values.map((value, index) => {
          if (index > 0) {
            return (
              <tr key={index}>
                <td>
                  <span>{value}</span>
                </td>
              </tr>
            );
          }
          return null;
        })}
      </>
    );
  };

  return (
    <Paper
      className={classes.paper}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <Typography
        className={`${classes.kanjiDisplay} ${classes.japCharacters}`}
      >
        {kanji.value}
      </Typography>

      <table className={`kanjirighttb ${classes.japCharacters}`}>
        <tbody>
          {displayRow("音読み", kanji.onYomi)}
          {displayRow("訓読み", kanji.kunYomi)}
          {displayRow("意味", kanji.translations)}
        </tbody>
      </table>
    </Paper>
  );
}

export default SingleKanjiDisplay;
