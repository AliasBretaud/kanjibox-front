import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import isEmpty from "lodash.isempty";
import Word from "../../model/Word";
import useAddWord from "../../hooks/useAddWord";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toKana } from "wanakana";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addContainer: {
      paddingTop: "50px",
      paddingBottom: "50px",
      width: "100%",
    },
    addButton: {
      borderRadius: "9999px",
      width: "100%",
      maxWidth: "300px",
      minHeight: "50px",
      fontSize: "15px",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

function WordAddForm({ onWordAdd }: { onWordAdd: Function }) {
  const classes = useStyles();
  const [wordValue, setWordValue] = useState<string>("");
  const [wordFuriganaValue, setWordFuriganaValue] = useState<string>("");
  const [wordTranslation, setWordTranslation] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { callAPI, isLoading } = useAddWord();

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const convertAndSetFurigana = (value: string) => {
    setWordFuriganaValue(
      !(value.endsWith("n") || value.endsWith("ny"))
        ? toKana(value).trim()
        : value.trim()
    );
  };

  const handleClose = () => {
    setWordValue("");
    setWordFuriganaValue("");
    setWordTranslation("");
    setOpenModal(false);
  };

  const saveEnabled = () => {
    return (
      !isEmpty(wordValue) &&
      !isEmpty(wordFuriganaValue) &&
      !isEmpty(wordTranslation)
    );
  };

  const addWord = () => {
    const word: Word = new Word({
      value: wordValue,
      translation: wordTranslation,
      furiganaValue: wordFuriganaValue,
    });

    handleClose();
    callAPI(word, (wordAdded: Word) => {
      onWordAdd(wordAdded);
    });
  };

  return (
    <div className={classes.addContainer}>
      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
        onClick={handleClickOpen}
      >
        Ajouter un mot
      </Button>

      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Ajouter un mot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour ajouter un mot, veuillez renseigner sa valeur, sa transcription
            furigana et sa traduction.
          </DialogContentText>
          <form noValidate autoComplete="off">
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  id="wordValue"
                  label="Valeur du mot"
                  fullWidth
                  type="text"
                  value={wordValue}
                  onChange={(evt) => {
                    setWordValue(evt.target.value);
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="wordFuriganaValue"
                  label="Transcription furigana"
                  fullWidth
                  type="text"
                  value={wordFuriganaValue}
                  onChange={(evt) => {
                    convertAndSetFurigana(evt.target.value);
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="wordTranslation"
                  label="Traduction"
                  fullWidth
                  type="text"
                  value={wordTranslation}
                  onChange={(evt) => {
                    setWordTranslation(evt.target.value);
                  }}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={addWord} color="primary" disabled={!saveEnabled()}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default WordAddForm;
