import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import isEmpty from "lodash.isempty";
import Kanji from "../../model/Kanji";
import useAddKanji from "../../hooks/useAddKanji";
import { toHiragana, toKatakana } from "wanakana";

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
  })
);

function KanjiAddForm({ onKanjiAdd }: { onKanjiAdd: Function }) {
  const classes = useStyles();
  const [kanjiValue, setKanjiValue] = useState<string>("");
  const [kanjiKunYomi, setKanjiKunYomi] = useState<string>("");
  const [kanjiOnYomi, setKanjiOnYomi] = useState<string>("");
  const [kanjiTranslations, setKanjiTranslations] = useState<string>("");
  const [autoDetectReadings, setAutoDetectReadings] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const addKanjiApiCall = useAddKanji(autoDetectReadings);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setKanjiValue("");
    setKanjiKunYomi("");
    setKanjiOnYomi("");
    setKanjiTranslations("");
    setAutoDetectReadings(false);
    setOpenModal(false);
  };

  const saveEnabled = () => {
    return (
      (autoDetectReadings === false &&
        !isEmpty(kanjiValue) &&
        !(
          isEmpty(kanjiKunYomi) ||
          isEmpty(kanjiOnYomi) ||
          isEmpty(kanjiTranslations)
        )) ||
      (autoDetectReadings === true && !isEmpty(kanjiValue))
    );
  };

  const addKanji = () => {
    const onYomi: string[] = autoDetectReadings ? [] : kanjiOnYomi.split(";");
    const kunYomi: string[] = autoDetectReadings ? [] : kanjiKunYomi.split(";");
    const translations: string[] = autoDetectReadings
      ? []
      : kanjiTranslations.split(";");

    const kanji: Kanji = new Kanji({
      value: kanjiValue,
      onYomi: onYomi,
      kunYomi: kunYomi,
      translations: translations,
    });

    addKanjiApiCall(kanji, (kanjiAdded: Kanji) => {
      handleClose();
      onKanjiAdd(kanjiAdded);
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
        Ajouter un Kanji
      </Button>

      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Ajouter Kanji</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour ajouter un kanji, veuillez renseigner sa valeur. Vous pouvez,
            si vous le souhaitez, laisser l'appli se charger de la détection des
            différentes lectures et traductions (en anglais).
          </DialogContentText>
          <form noValidate autoComplete="off">
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  id="kanjiValue"
                  label="Valeur du Kanji"
                  fullWidth
                  type="text"
                  value={kanjiValue}
                  onChange={(evt) => {
                    setKanjiValue(evt.target.value);
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoDetectReadings}
                      onChange={(event) => {
                        setAutoDetectReadings(event.target.checked);
                      }}
                      name="autoDetectReadings"
                    />
                  }
                  label="Détection automatique des lectures/traductions"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-multiline-flexible-1"
                  label="On Yomi"
                  multiline
                  maxRows={4}
                  value={kanjiOnYomi}
                  onChange={(evt) => {
                    setKanjiOnYomi(toKatakana(evt.target.value));
                  }}
                  helperText="Séparer par des ';'"
                  disabled={autoDetectReadings}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-multiline-flexible-2"
                  label="Kun Yomi"
                  multiline
                  maxRows={4}
                  value={kanjiKunYomi}
                  onChange={(evt) => {
                    setKanjiKunYomi(toHiragana(evt.target.value));
                  }}
                  helperText="Séparer par des ';'"
                  disabled={autoDetectReadings}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="translation"
                  label="Traductions"
                  fullWidth
                  type="text"
                  value={kanjiTranslations}
                  onChange={(evt) => {
                    setKanjiTranslations(evt.target.value);
                  }}
                  helperText="Séparer par des ';'"
                  disabled={autoDetectReadings}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={addKanji} color="primary" disabled={!saveEnabled()}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default KanjiAddForm;
