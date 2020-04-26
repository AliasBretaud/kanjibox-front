import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { toKana } from "wanakana";
import Word from "../../model/Word";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    responses: {
      padding: "10px 30px 30px 30px",
      border: "3px solid rgba(69, 71, 74, 0.5)",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
    },
    helperText: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  })
);

function ResponsesInput({
  fieldsErrors,
  onChange,
  onSubmit,
  word,
}: {
  fieldsErrors: any;
  onChange: Function;
  onSubmit: Function;
  word: Word;
}) {
  const classes = useStyles();
  const [inputReading, setInputReading] = useState("");
  const [inputTranslation, setInputTranslation] = useState("");
  const readingInputRef = useRef<HTMLDivElement>(null);

  const resetFields = () => {
    setInputReading("");
    setInputTranslation("");
  };

  useEffect(() => {
    resetFields();
    if (readingInputRef != null && readingInputRef.current != null) {
      readingInputRef.current.focus();
    }
  }, [word]);

  const convertAndSetReading = (value: string) => {
    const convert: string = !(value.endsWith("n") || value.endsWith("ny"))
      ? toKana(value).trim()
      : value.trim();

    setInputReading(
      convert.endsWith("nn")
        ? toKana(convert.substr(0, convert.length - 1))
        : convert
    );
  };

  const keyPressed = (ev: any) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      onChange(inputReading, inputTranslation);
      onSubmit(inputReading, inputTranslation);
    }
  };

  return (
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
                onChange(inputReading, inputTranslation);
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
                onChange(inputReading, inputTranslation);
              }}
              onKeyDown={keyPressed}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ResponsesInput;
