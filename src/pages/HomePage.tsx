import React from "react";
import KanjiList from "../components/kanji/KanjisList";
import WelcomeMessage from "../components/WelcomeMessage";
import SearchBar from "../components/SearchBar";
import useGetData from "../hooks/useGetData";
import Kanji from "../model/Kanji";

function HomePage() {
  const kanjisUrl = "http://localhost:8080/kanjis/recents";
  const [kanjis] = useGetData<Kanji>(kanjisUrl);

  return (
    <div className="App">
      <SearchBar />
      <div className="App-content">
        <WelcomeMessage />
        <KanjiList kanjis={kanjis} />
      </div>
    </div>
  );
}

export default HomePage;
