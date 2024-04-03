import { Grid } from "@mui/material";
import WordCard from "./WordCard";
import type { $Word } from "@/types";
import { useLocale } from "next-intl";

const WordList = ({ data: words = [] }: { data: $Word[] }) => {
  const locale = useLocale();
  return (
    <Grid
      container
      spacing={4}
      className="font-kanji"
      m={0}
      flexGrow={1}
      width="100%"
      pb={4}
    >
      {words.map((word, i) => (
        <Grid
          key={i}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          textAlign="center"
          display="flex"
          justifyContent="center"
        >
          <WordCard locale={locale} {...word} />
        </Grid>
      ))}
    </Grid>
  );
};

export default WordList;
