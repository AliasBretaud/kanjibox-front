import { Typography } from "@mui/material";

import Table, { Row } from "@/components/ui/Table";
import { getLocalizedTranslations } from "@/lib/utils/getLocalizedTranslations";
import type { PropsWithLocalization } from "@/types/utils";
import type { $Kanji } from "@/types/models";
import { Card } from "@/components/ui/Card";

const KanjiCard = ({
  kunYomi,
  onYomi,
  translations,
  value,
  locale,
}: PropsWithLocalization<$Kanji>) => {
  const localizedTranslations = getLocalizedTranslations(translations, locale);
  return (
    <Card>
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
    </Card>
  );
};

export default KanjiCard;
