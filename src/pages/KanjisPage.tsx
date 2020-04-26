import React, { useState, useEffect } from "react";
import KanjiAddForm from "../components/kanji/KanjiAddForm";
import useGetData from "../hooks/useGetData";
import KanjiList from "../components/kanji/KanjisList";
import Kanji from "../model/Kanji";
import { properties } from "../properties";

function KanjisPage() {
  const kanjisUrl = `${properties.kanjiApi.url}/kanjis`;
  const [kanjis] = useGetData<Kanji>(kanjisUrl);

  const [value, setValue] = useState(kanjis);
  useEffect(() => {
    setValue(kanjis);
  }, [kanjis]);

  return (
    <div className="App">
      <div className="App-content">
        <KanjiAddForm
          onKanjiAdd={(kanjiAdded: Kanji) => {
            const update = [...kanjis];
            update.unshift(kanjiAdded);
            setValue(update);
          }}
        />
        <KanjiList kanjis={value} />
      </div>
    </div>
  );
}

export default KanjisPage;
