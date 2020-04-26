import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { green, red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import isEmpty from "lodash.isempty";
import Word from "../../model/Word";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

interface ResponsesCheckProps {
  word: Word;
  inputReading: string;
  inputTranslation: string;
  onSuccess: Function;
  onError: Function;
  onNextWord: Function;
  autoValid: boolean;
}

function ResponsesCheck({
  word,
  inputReading,
  inputTranslation,
  onSuccess,
  onError,
  onNextWord,
  autoValid,
}: ResponsesCheckProps) {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [checkButtonLabel, setCheckButtonLabel] = useState("Vérifier");
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonError]: error,
  });
  const timer = React.useRef<number>();

  useEffect(() => {
    reset();
  }, [word]);

  useEffect(() => {
    if (autoValid) {
      verify();
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoValid]);

  const reset = () => {
    setSuccess(false);
    setError(false);
    setCheckButtonLabel("Vérifier");
  };

  const handleButtonClick = () => {
    setSuccess(false);
    timer.current = window.setTimeout(() => {
      verify();
    }, 300);
  };

  const verify = () => {
    let errors = {};
    let fail = false;
    if (isEmpty(inputReading) || word.furiganaValue !== inputReading) {
      setError(true);
      fail = true;
      setCheckButtonLabel("Incorrect !");
      errors = {
        wordReading: {
          error: true,
          reading: word.furiganaValue,
        },
      };
    }

    if (
      isEmpty(inputTranslation) ||
      !word.translation.toUpperCase().includes(inputTranslation.toUpperCase())
    ) {
      setError(true);
      fail = true;
      setCheckButtonLabel("Incorrect !");
      errors = {
        ...errors,
        wordTranslaiton: {
          error: true,
          translation: word.translation,
        },
      };
    }

    if (!fail) {
      setCheckButtonLabel("Correct !");
      setSuccess(true);
      onSuccess();
    } else {
      onError(errors);
    }
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

  return (
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
                onClick={() => {
                  onNextWord(reset);
                }}
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
  );
}

export default ResponsesCheck;
