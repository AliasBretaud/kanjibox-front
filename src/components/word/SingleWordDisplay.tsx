import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Word from "../../model/Word";
import Kanji from "../../model/Kanji";
import isEmpty from "lodash.isempty";
import Dialog from "@material-ui/core/Dialog";
import SingleKanjiDisplay from "../kanji/SingleKanjiDisplay";
import { isKanji } from "wanakana";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      textAlign: "center",
      color: theme.palette.text.secondary,
      width: "100%",
      maxWidth: "300px",
    },
    japCharacters: {
      fontFamily:
        "'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, 'メイリオ', Osaka, 'MS PGothic', arial, helvetica, sans-serif",
    },
    wordDisplay: {
      fontSize: "35pt",
      color: "black",
      opacity: "0.75",
      cursor: "default",
    },
    furigana: {
      fontSize: "15pt",
    },
    wordValue: {
      "&:hover, &:focus": {
        color: "blue",
        cursor: "pointer",
      },
    },
    kanjiDisplay: {
      wordBreak: "break-word",
    },
  })
);

function SingleWordDisplay({ word }: { word: Word }) {
  const classes = useStyles();

  const [kanjiDetails, setKanjisDetails] = useState<Kanji>({
    kunYomi: [],
    onYomi: [],
    value: "",
    translations: [],
  });
  const [openModalKanjiDetails, setOpenModalKanjiDetails] = useState<boolean>(
    false
  );

  const displayKanjiDetails = (value: String) => {
    const obj: any = word.kanjis?.find((kan) => kan.value === value);
    if (!isEmpty(obj)) {
      setKanjisDetails(obj);
      setOpenModalKanjiDetails(true);
    }
  };

  const displayRow = (title: string, value: string) => {
    return (
      <tr>
        <th rowSpan={1}>{title}</th>
        <td>
          <span>{value}</span>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <div className={`${classes.wordDisplay} ${classes.japCharacters}`}>
            <ruby>
              <div className={classes.kanjiDisplay}>
                {word.value.split("").map((char, idx) => {
                  if (isKanji(char)) {
                    return (
                      <span
                        key={idx}
                        className={classes.wordValue}
                        onClick={() => {
                          displayKanjiDetails(char);
                        }}
                      >
                        {char}
                      </span>
                    );
                  } else {
                    return <span key={idx}>{char}</span>;
                  }
                })}
              </div>
              <rp>(</rp>
              <rt className={classes.furigana}>{word.furiganaValue}</rt>
              <rp>)</rp>
            </ruby>
          </div>

          <table className={`kanjirighttb ${classes.japCharacters}`}>
            <tbody>{displayRow("翻訳", word.translation)}</tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog
        onClose={() => {
          setOpenModalKanjiDetails(false);
        }}
        aria-labelledby="simple-dialog-title"
        open={openModalKanjiDetails}
      >
        <SingleKanjiDisplay
          kanji={kanjiDetails}
          onClick={() => {
            setOpenModalKanjiDetails(false);
          }}
        />
      </Dialog>
    </>
  );
}

export default SingleWordDisplay;
