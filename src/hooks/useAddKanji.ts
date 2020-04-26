import { useCallback } from "react";
import axios from "axios";
import Kanji from "../model/Kanji";
import isEmpty from "lodash.isempty";
import { properties } from "../properties";

function useAddKanji(autoDetectReadings: boolean) {
  const url: string = `${properties.kanjiApi.url}/kanjis?autoDetectReadings=${autoDetectReadings}`;

  const callAPI = useCallback(
    (kanji: Kanji, onAdded: Function, onError?: Function) => {
      axios
        .post(url, kanji)
        .then((res) => {
          if (!isEmpty(res.data)) {
            const kanjiAdded = res.data;
            onAdded(kanjiAdded);
          } else {
            onAdded(null);
          }
        })
        .catch((error) => {
          if (onError) onError(error);
        });
    },
    [url]
  );

  return callAPI;
}

export default useAddKanji;
