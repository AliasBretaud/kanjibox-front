"use client";

import { Typography } from "@mui/material";

import Table, { Row } from "@/components/ui/Table";
import { getLocalizedTranslations } from "@/lib/utils/getLocalizedTranslations";
import type { PropsWithLocalization } from "@/types/utils";
import type { $Kanji } from "@/types/models";
import { Card } from "@/components/ui/Card";
import useModal from "@/hooks/useModal";
import type { MKanji } from "@/types/modals";

const KanjiCard = ({ locale, ...kanji }: PropsWithLocalization<$Kanji>) => {
  const { kunYomi, onYomi, translations, value } = kanji;
  const localizedTranslations = getLocalizedTranslations(translations, locale);
  const { openModal } = useModal();
  return (
    <Card onEdit={() => openModal<MKanji>("edit-kanji", { kanji })}>
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
