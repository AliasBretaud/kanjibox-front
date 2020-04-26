import React, { useState, useEffect } from "react";
import WordAddForm from "../components/word/WordAddForm";
import useGetData from "../hooks/useGetData";
import Word from "../model/Word";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import WordsList from "../components/word/WordsList";
import { properties } from "../properties";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function WordsPage() {
  const wordsUrl: string = `${properties.kanjiApi.url}/words`;
  const [words] = useGetData<Word>(wordsUrl);
  const [toastOpen, setToastOpen] = useState(false);

  const [value, setValue] = useState(words);
  useEffect(() => {
    setValue(words);
  }, [words]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

  return (
    <div className="App">
      <div className="App-content">
        <Snackbar
          open={toastOpen}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Mot enregistré avec succès !
          </Alert>
        </Snackbar>
        <WordAddForm
          onWordAdd={(wordAdded: Word) => {
            const update = [...value];
            update.unshift(wordAdded);
            setValue(update);
            setToastOpen(true);
          }}
        />
        <WordsList words={value} />
      </div>
    </div>
  );
}

export default WordsPage;
