import React, { useState, useEffect } from "react";
import KanjiAddForm from "../components/kanji/KanjiAddForm";
import useGetData from "../hooks/useGetData";
import KanjiList from "../components/kanji/KanjisList";
import Kanji from "../model/Kanji";
import { properties } from "../properties";
import Page from "../utils/page";
import Pagination from "@material-ui/lab/Pagination";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingTop: "40px",
  },
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));

function KanjisPage() {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const kanjisUrl = `${properties.kanjiApi.url}/kanjis?size=5&page=${pageNumber}`;

  const [kanjis] = useGetData<Page<Kanji>>(kanjisUrl, new Page<Kanji>({}));
  const [kanjisList, setKanjisList] = useState(kanjis.content);
  useEffect(() => {
    setKanjisList(kanjis.content);
  }, [kanjis]);

  const handlePageChange = (event: any, value: number) => {
    setPageNumber(value - 1);
  };

  return (
    <div className="App">
      <div className="App-content">
        <div className={classes.pagination}>
          <Pagination
            classes={{ ul: classes.ul }}
            count={(kanjis.totalPages || 0) - 1}
            color="primary"
            onChange={handlePageChange}
          />
        </div>
        <KanjiAddForm
          onKanjiAdd={(kanjiAdded: Kanji) => {
            const update = [...kanjis.content];
            update.unshift(kanjiAdded);
            setKanjisList(update);
          }}
        />
        <KanjiList kanjis={kanjisList} />
      </div>
    </div>
  );
}

export default KanjisPage;
