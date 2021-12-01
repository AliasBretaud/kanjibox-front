import React from "react";
import KanjiList from "../components/kanji/KanjisList";
import WelcomeMessage from "../components/WelcomeMessage";
import SearchBar from "../components/SearchBar";
import useGetData from "../hooks/useGetData";
import Kanji from "../model/Kanji";
import { properties } from "../properties";
import Page from "../utils/page";

function HomePage() {
  const RECENTS_KANJIS_LIMIT: number = 12;
  const kanjisUrl = `${properties.kanjiApi.url}/kanjis?size=${RECENTS_KANJIS_LIMIT}`;
  const [kanjis] = useGetData<Page<Kanji>>(kanjisUrl, new Page<Kanji>({}));

  return (
    <div className="App">
      <SearchBar />
      <div className="App-content">
        <WelcomeMessage />
        <KanjiList kanjis={kanjis.content} />
      </div>
    </div>
  );
}

export default HomePage;
