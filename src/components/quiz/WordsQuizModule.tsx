import React, { useState, useEffect } from "react";
import Word from "../../model/Word";
import useGetData from "../../hooks/useGetData";
import WordDisplay from "./WordDisplay";
import ResponsesCheck from "./ResponsesCheck";
import QuizProgress from "./QuizProgress";
import ResponsesInput from "./ResponsesInput";
import Grid from "@material-ui/core/Grid";
import isEmpty from "lodash.isempty";
import SerieSelect from "./SerieSelect";
import { properties } from "../../properties";

export interface QuizResults {
  nbOk: number;
  nbFail: number;
}

function WordsQuizModule({
  isPlay,
  onEnd,
}: {
  isPlay: boolean;
  onEnd: Function;
}) {
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

  const series = [1, 10, 20, 30, 50];
  const [serie, setSerie] = useState<number>(series[0]);
  const wordsUrl: string = `${properties.kanjiApi.url}/words?limit=${serie}`;
  const [wordsData] = useGetData<Word[]>(wordsUrl, []);
  const [words, setWords] = useState<Word[]>([]);
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
  const wordsOkList: Word[] = [];
  const wordsKoList: Word[] = [];
  const [validate, setValidate] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(wordsData)) {
      setWords(wordsData);
      const word: Word = getRandomWord(wordsData);
      setCurrentWord(word);
      setValidate(false);
      setCorrectCounter(0);
      setIncorrectCounter(0);
      setFieldsError(cleanError);
      setInputReading("");
      setInputTranslation("");
    }
    // eslint-disable-next-line
  }, [wordsData, isPlay]);

  const changeSerie = (serie: number) => {
    setSerie(serie);
  };

  const getRandomWord = (wordsList: Word[]): Word => {
    const randIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[randIndex];
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
      setIncorrectCounter(incorrectCounter + 1);
    }
  };

  const responsesSuccess = () => {
    setValidate(true);
    setCorrectCounter(correctCounter + 1);
    wordsOkList.push({ ...currentWord });

    setTimeout(() => {
      if (wordsOkList.length === words.length) {
        const results: QuizResults = {
          nbOk: wordsOkList.length,
          nbFail: wordsKoList.length,
        };
        onEnd(results);
      } else {
        nextWord();
      }
    }, 1000);
  };

  const nextWord = () => {
    let found: boolean = false;

    while (!found) {
      const randWord: Word = getRandomWord(words);

      if (wordsOkList.length === words.length - 1) {
        setCurrentWord(randWord);
        found = true;
      } else if (
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
  };

  return (
    <>
      <SerieSelect label={"Série"} values={series} onChange={changeSerie} />

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
                nextWord();
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
    </>
  );
}

export default WordsQuizModule;
