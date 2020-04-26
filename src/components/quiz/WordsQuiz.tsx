import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import WordsQuizModule, { QuizResults } from "./WordsQuizModule";
import EndScreen from "./EndScreen";
import Fade from "./Fade";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#f8fbff",
      margin: "40px 0 40px 0",
      borderRadius: "20px",
      fontFamily:
        "'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, 'メイリオ', Osaka, 'MS PGothic', arial, helvetica, sans-serif",
      padding: "0 20px 20px",
    },
  })
);

function WordsQuiz() {
  const classes = useStyles();
  const [end, setEnd] = useState<boolean>(false);
  const [displayRetry, setDisplayRetry] = useState<boolean>(false);
  const interval: number = 500;
  const [results, setResults] = useState<QuizResults>({
    nbFail: 0,
    nbOk: 0,
  });

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <Fade show={!end} timeout={interval}>
          <div>
            <WordsQuizModule
              isPlay={!end}
              onEnd={(res: QuizResults) => {
                setResults(res);
                setEnd(true);
                setTimeout(() => {
                  setDisplayRetry(true);
                }, interval);
              }}
            />
          </div>
        </Fade>
        <Fade show={end && displayRetry} timeout={interval + 200}>
          <div>
            <EndScreen
              results={results}
              onRetry={() => {
                setEnd(false);
              }}
            />
          </div>
        </Fade>
      </div>
    </Container>
  );
}

export default WordsQuiz;
