import React from "react";
import "./App.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomePage from "../pages/HomePage";
import KanjisPage from "../pages/KanjisPage";
import WordsPage from "../pages/WordsPage";
import QuizPage from "../pages/QuizPage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      margin: 0,
    },
    homeLink: {
      textDecoration: "none",
      color: "white",
      marginRight: theme.spacing(4),
      fontSize: "16pt",
      fontFamily:
        "'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, 'メイリオ', Osaka, 'MS PGothic', arial, helvetica, sans-serif",
    },
    navButton: {
      marginRight: theme.spacing(2),
      color: "white",
    },
    buttonLink: {
      textDecoration: "none",
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Link className={classes.homeLink} to={"/"}>
              Floの漢字箱
            </Link>
            <Link to={"/kanji-list"} className={classes.buttonLink}>
              <Button className={classes.navButton}>Kanjis</Button>
            </Link>
            <Link to={"/word-list"} className={classes.buttonLink}>
              <Button className={classes.navButton}>Mots</Button>
            </Link>
            <Link to={"/quiz"} className={classes.buttonLink}>
              <Button className={classes.navButton}>Quiz</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/kanji-list">
          <KanjisPage />
        </Route>
        <Route path="/word-list">
          <WordsPage />
        </Route>
        <Route path="/quiz">
          <QuizPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
