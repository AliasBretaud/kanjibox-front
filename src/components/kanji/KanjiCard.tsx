import { Paper, Typography } from "@mui/material";

import type { $Kanji, PropsWithLocalization } from "@/types";
import Table, { Row } from "@/components/ui/Table";
import getLocalizedTranslations from "@/lib/utils/getLocalizedTranslations";

const KanjiCard = ({
  kunYomi,
  onYomi,
  translations,
  value,
  locale,
}: PropsWithLocalization<$Kanji>) => {
  const localizedTranslations = getLocalizedTranslations(translations, locale);
  return (
    <Paper sx={{ p: 2 }} className="w-full max-w-md flex flex-col items-center">
      <Typography
        className="font-kanji"
        sx={{ opacity: 0.75, color: "black", fontSize: 80 }}
      >
        {value}
      </Typography>
      <Table>
        <Row title="音読み" data={onYomi} />
        <Row title="訓読み" data={kunYomi} />
        {localizedTranslations && (
          <Row title="意味" data={localizedTranslations} />
        )}
      </Table>
    </Paper>
  );
};

export default KanjiCard;
