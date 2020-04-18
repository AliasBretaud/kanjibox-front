import React, { useState, useEffect } from "react";
import Word from "../../model/Word";
import useGetData from "../../hooks/useGetData";
import WordDisplay from "./WordDisplay";
import ResponsesCheck from "./ResponsesCheck";
import QuizProgress from "./QuizProgress";
import ResponsesInput from "./ResponsesInput";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import isEmpty from "lodash.isempty";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#f8fbff",
      marginTop: "40px",
      borderRadius: "20px",
      fontFamily:
        "'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, 'メイリオ', Osaka, 'MS PGothic', arial, helvetica, sans-serif",
      padding: "40px 20px 20px",
    },
  })
);

function WordsQuiz() {
  const cleanError = {
    wordReading: {
      error: false,
      reading: "",
    },
    wordTranslaiton: {
      error: false,
      translation: "",
    },
  };

  const classes = useStyles();
  const wordsUrl: string = "http://localhost:8080/words";
  const [words] = useGetData<Word>(wordsUrl);
  const [correctCounter, setCorrectCounter] = useState(0);
  const [incorrectCounter, setIncorrectCounter] = useState(0);
  const [currentWord, setCurrentWord] = useState<Word>({
    value: "",
    furiganaValue: "",
    translation: "",
  });
  const [fieldsErrors, setFieldsError] = useState(cleanError);
  const [inputReading, setInputReading] = useState("");
  const [inputTranslation, setInputTranslation] = useState("");
  const [wordsOkList, setWordsOkList] = useState<Word[]>([]);
  const [wordsKoList, setWordsKoList] = useState<Word[]>([]);
  const [validate, setValidate] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(words)) {
      const word: Word = getRandomWord();
      setCurrentWord(word);
    }
    // eslint-disable-next-line
  }, [words]);

  const getRandomWord = (): Word => {
    const randIndex = Math.floor(Math.random() * words.length);
    return words[randIndex];
  };

  const responsesError = (err: any) => {
    setValidate(true);
    setFieldsError({
      ...fieldsErrors,
      ...err,
    });
    if (
      !wordsKoList.find((e) => {
        return e.id === currentWord.id;
      })
    ) {
      wordsKoList.push({ ...currentWord });
      setWordsKoList(wordsKoList);
      setIncorrectCounter(incorrectCounter + 1);
    }
  };

  const responsesSuccess = () => {
    setValidate(true);
    setCorrectCounter(correctCounter + 1);
    wordsOkList.push({ ...currentWord });
    setWordsOkList(wordsOkList);

    setTimeout(() => {
      nextWord(null);
    }, 1000);
  };

  const nextWord = (callback: Function | null) => {
    let found: boolean = false;

    while (!found) {
      const randWord: Word = getRandomWord();

      if (
        randWord.id !== currentWord.id &&
        !wordsOkList.find((w) => {
          return w.id === randWord.id;
        })
      ) {
        setCurrentWord(randWord);
        found = true;
      }
    }
    setValidate(false);
    setFieldsError(cleanError);
    if (callback != null) callback();
  };

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid
            item
            md={6}
            xs={12}
            style={{
              padding: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <WordDisplay word={currentWord} />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ResponsesInput
              fieldsErrors={fieldsErrors}
              onChange={(read: string, trans: string) => {
                setInputReading(read);
                setInputTranslation(trans);
              }}
              onSubmit={() => {
                if (validate) {
                  nextWord(null);
                } else {
                  setValidate(true);
                }
              }}
              word={currentWord}
            />
          </Grid>
        </Grid>

        <QuizProgress
          correct={correctCounter}
          incorrect={incorrectCounter}
          total={words.length}
        />

        <ResponsesCheck
          word={currentWord}
          inputReading={inputReading}
          inputTranslation={inputTranslation}
          onError={responsesError}
          onSuccess={responsesSuccess}
          onNextWord={nextWord}
          autoValid={validate}
        />
      </div>
    </Container>
  );
}

export default WordsQuiz;
