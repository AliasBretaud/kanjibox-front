import React, { useState, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import { green, red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CloseIcon from "@material-ui/icons/Close";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import useGetData from "../hooks/useGetData";
import Word from "../model/Word";
import iEmpty from "lodash.isempty";
import { toKana } from "wanakana";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#f8fbff",
      marginTop: "40px",
      borderRadius: "20px",
      fontFamily:
        "'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, 'メイリオ', Osaka, 'MS PGothic', arial, helvetica, sans-serif",
      padding: "40px 20px",
    },
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
    responses: {
      padding: "10px 30px 30px 30px",
      border: "3px solid rgba(69, 71, 74, 0.5)",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
    },
    results: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    wrapper: { margin: theme.spacing(1), position: "relative" },
    buttonsBox: {
      display: "flex",
      justifyContent: "center",
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[500],
      },
      cursor: "default",
    },
    buttonError: {
      backgroundColor: red[500],
      "&:hover": {
        backgroundColor: red[500],
      },
      cursor: "default",
    },
    counters: {
      margin: "40px 25px 25px 0",
      fontSize: "13px",
      fontStyle: "italic",
      color: "black",
    },
    helperText: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  })
);

function QuizPage() {
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [checkButtonLabel, setCheckButtonLabel] = useState("Vérifier");
  const [fieldsErrors, setFieldsError] = useState(cleanError);
  const timer = React.useRef<number>();
  const wordsUrl: string = "http://localhost:8080/words";
  const [words] = useGetData<Word>(wordsUrl);
  const [correctCounter, setCorrectCounter] = useState(0);
  const [incorrectCounter, setIncorrectCounter] = useState(0);
  const [remainCounter, setRemainCounter] = useState(words.length);
  const [currentWord, setCurrentWord] = useState<Word>({
    value: "",
    furiganaValue: "",
    translation: "",
  });
  const [inputReading, setInputReading] = useState("");
  const [inputTranslation, setInputTranslation] = useState("");
  const [progress, setProgress] = useState(0);
  const [wordsOkList, setWordsOkList] = useState<Word[]>([]);
  const [wordsKoList, setWordsKoList] = useState<Word[]>([]);
  const readingInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!iEmpty(words)) {
      const word: Word = getRandomWord();
      setCurrentWord(word);
      setRemainCounter(words.length);
    }
    // eslint-disable-next-line
  }, [words]);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonError]: error,
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const convertAndSetReading = (value: string) => {
    setInputReading(
      !(value.endsWith("n") || value.endsWith("ny"))
        ? toKana(value).trim()
        : value.trim()
    );
  };

  const handleButtonClick = () => {
    setSuccess(false);
    timer.current = window.setTimeout(() => {
      verify();
    }, 300);
  };

  const displayButtonIcon = () => {
    if (success) {
      return <CheckIcon />;
    } else if (error) {
      return <CloseIcon />;
    } else {
      return <PlayArrowIcon />;
    }
  };

  const getRandomWord = (): Word => {
    const randIndex = Math.floor(Math.random() * words.length);
    return words[randIndex];
  };

  const nextWord = () => {
    setInputReading("");
    setInputTranslation("");
    setFieldsError(cleanError);
    setError(false);
    setSuccess(false);
    setCheckButtonLabel("Vérifier");

    if (readingInputRef != null && readingInputRef.current != null) {
      readingInputRef.current.focus();
    }

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
  };

  const verify = () => {
    let correct: boolean = true;

    if (inputReading === "" || currentWord.furiganaValue !== inputReading) {
      correct = false;
      setFieldsError({
        ...fieldsErrors,
        wordReading: {
          error: true,
          reading: currentWord.furiganaValue,
        },
      });
    }

    if (
      inputTranslation === "" ||
      !currentWord.translation
        .toUpperCase()
        .includes(inputTranslation.toUpperCase())
    ) {
      correct = false;
      setFieldsError({
        ...fieldsErrors,
        wordTranslaiton: {
          error: true,
          translation: currentWord.translation,
        },
      });
    }

    if (correct) {
      setCheckButtonLabel("Correct !");
      setSuccess(true);
      setCorrectCounter(correctCounter + 1);
      setProgress(((correctCounter + 1) / words.length) * 100);
      wordsOkList.push({ ...currentWord });
      setWordsOkList(wordsOkList);
      setRemainCounter(remainCounter - 1);

      setTimeout(() => {
        nextWord();
      }, 1000);
    } else {
      setError(true);
      setCheckButtonLabel("Incorrect !");
      if (
        !wordsKoList.find((e) => {
          return e.id === currentWord.id;
        })
      ) {
        wordsKoList.push({ ...currentWord });
        setWordsKoList(wordsKoList);
        setIncorrectCounter(incorrectCounter + 1);
      }
    }
  };

  const keyPressed = (ev: any) => {
    if (ev.key === "Enter") {
      ev.preventDefault();

      if (!error && !success) {
        verify();
      } else {
        nextWord();
      }
    }
  };

  return (
    <div className="App">
      <div className="App-content">
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
                <div className={classes.wordContainer}>
                  <span>{currentWord.value}</span>
                </div>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className={classes.responses}>
                  <form noValidate autoComplete="off">
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          autoFocus
                          id="wordValue"
                          label="Lecture"
                          fullWidth
                          type="text"
                          error={fieldsErrors.wordReading.error}
                          helperText={fieldsErrors.wordReading.reading}
                          FormHelperTextProps={{
                            classes: { root: classes.helperText },
                          }}
                          value={inputReading}
                          onChange={(evt) => {
                            convertAndSetReading(evt.target.value);
                          }}
                          onKeyDown={keyPressed}
                          inputRef={readingInputRef}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="wordFuriganaValue"
                          label="Traduction"
                          fullWidth
                          type="text"
                          error={fieldsErrors.wordTranslaiton.error}
                          helperText={fieldsErrors.wordTranslaiton.translation}
                          FormHelperTextProps={{
                            classes: { root: classes.helperText },
                          }}
                          value={inputTranslation}
                          onChange={(evt) => {
                            setInputTranslation(evt.target.value);
                          }}
                          onKeyDown={keyPressed}
                        />
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <div className={classes.counters}>
                  <Grid container spacing={6}>
                    <Grid item xs>
                      <span style={{ color: "red" }}>
                        Incorrects : {incorrectCounter}
                      </span>
                    </Grid>
                    <Grid item xs>
                      <span style={{ color: "green" }}>
                        Corrects : {correctCounter}
                      </span>
                    </Grid>
                    <Grid item xs>
                      <span>Restants : {remainCounter}</span>
                    </Grid>
                  </Grid>

                  <LinearProgress variant="determinate" value={progress} />
                </div>
              </Grid>
            </Grid>

            <Grid container alignItems="center">
              <Grid item xs={12}>
                <div className={classes.buttonsBox}>
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={buttonClassname}
                      onClick={handleButtonClick}
                    >
                      {checkButtonLabel}
                    </Button>
                  </div>
                  {(error || success) && (
                    <div className={classes.wrapper}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={nextWord}
                      >
                        Mot suivant
                      </Button>
                    </div>
                  )}
                </div>
              </Grid>
              <Fade in={error || success}>
                <Grid item xs={12}>
                  <div className={classes.results}>
                    <div className={classes.wrapper}>
                      <Fab
                        aria-label="save"
                        color="primary"
                        className={buttonClassname}
                        onClick={handleButtonClick}
                      >
                        {displayButtonIcon()}
                      </Fab>
                    </div>
                  </div>
                </Grid>
              </Fade>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default QuizPage;
