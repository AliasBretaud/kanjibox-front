import { useCallback, useState } from "react";
import axios from "axios";
import Word from "../model/Word";
import isEmpty from "lodash.isempty";

function useAddWord() {
  const url: string = "http://localhost:8080/words";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callAPI = useCallback(
    (word: Word, onAdded: Function, onError?: Function) => {
      setIsLoading(true);
      axios
        .post(url, word)
        .then((res) => {
          if (!isEmpty(res.data)) {
            const wordAdded = res.data;
            onAdded(wordAdded);
          } else {
            onAdded(null);
          }
        })
        .catch((error) => {
          if (onError) onError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [url]
  );

  return { callAPI, isLoading };
}

export default useAddWord;
