import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    japCharacters: {
      fontFamily:
        "'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, 'メイリオ', Osaka, 'MS PGothic', arial, helvetica, sans-serif",
    },
  })
);

function SearchBar() {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <div className="header_search">
          <div className="search_inner">
            <form
              id="head_form"
              className="search_form"
              name="head_form"
              acceptCharset="utf-8"
              onSubmit={(evt) => {
                evt.preventDefault();
                console.log("Bla");
              }}
            >
              <input
                type="text"
                id="head_value"
                name="value"
                placeholder="キーワードを入力"
                className={`input_search ${classes.japCharacters}`}
                value={search}
                onChange={(evt) => setSearch(evt.target.value)}
              />
              <Button id="head_submit" className="search_btn">
                {" "}
              </Button>
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
