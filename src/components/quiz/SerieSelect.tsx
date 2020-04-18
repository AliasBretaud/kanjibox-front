import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 80,
    },
    serieContainer: {
      display: "flex",
      flexDirection: "row",
      paddingBottom: "20px",
    },
  })
);

function SerieSelect({
  values,
  label,
  onChange,
}: {
  values: number[];
  label: string;
  onChange: Function;
}) {
  const classes = useStyles();

  return (
    <div className={classes.serieContainer}>
      <FormControl className={classes.formControl}>
        <InputLabel id="simple-select-label">{label}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          defaultValue={values[0]}
          onChange={(evt) => {
            onChange(evt.target.value);
          }}
        >
          {values.map((value, idx) => {
            return (
              <MenuItem key={idx} value={value}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default SerieSelect;
