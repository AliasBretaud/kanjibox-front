import { Grid } from "@mui/material";
import type { GridProps } from "@mui/material";

import type { $Kanji } from "@/types";

import KanjiCard from "./KanjiCard";
import { useLocale } from "next-intl";

const getGridProps = (nbElements: number): GridProps => {
  switch (nbElements) {
    case 1:
      return { xs: 12, md: 12, sm: 12 };
    case 2:
      return { xs: 12, md: 4, sm: 12 };
    case 3:
      return { xs: 12, md: 4, sm: 6 };
    default:
      return { xs: 12, md: 3, sm: 6 };
  }
};

const KanjiList = ({ data: kanjis = [] }: { data: $Kanji[] }) => {
  const gridProps = getGridProps(kanjis.length);
  const locale = useLocale();
  return (
    <Grid container justifyContent="center" spacing={4} flexGrow={1} p={4}>
      {kanjis.map((value, i) => (
        <Grid
          key={i}
          justifyContent="center"
          item
          display="flex"
          {...gridProps}
        >
          <KanjiCard locale={locale} {...value} />
        </Grid>
      ))}
    </Grid>
  );
};

export default KanjiList;
