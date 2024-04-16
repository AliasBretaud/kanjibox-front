import { Box } from "@mui/material";
import Table, { Row } from "@/components/ui/Table";
import { ClickableKanji } from "./ClickableKanji";
import { getLocalizedTranslations } from "@/lib/utils/getLocalizedTranslations";
import type { PropsWithLocalization } from "@/types/utils";
import type { $Word } from "@/types/models";
import type { PropsWithChildren } from "react";
import { Card } from "@/components/ui/Card";

const WordCharacters = ({ value, kanjis }: Pick<$Word, "value" | "kanjis">) =>
  value.split("").map((char, idx) => {
    const kanji = kanjis?.find((k) => k.value === char);
    return kanji ? (
      <ClickableKanji key={idx} {...kanji} />
    ) : (
      <span key={idx}>{char}</span>
    );
  });

const Ruby = ({ children, rt }: PropsWithChildren<{ rt: string }>) => (
  <ruby>
    {children}
    <Box component="rt" fontSize="15pt">
      {rt}
    </Box>
  </ruby>
);

const WordValueDetail = ({
  furiganaValue,
  ...p
}: Pick<$Word, "value" | "kanjis" | "furiganaValue">) => {
  const value = (
    <Box display="table" sx={{ wordBreak: "break-word" }}>
      <WordCharacters {...p} />
    </Box>
  );
  return (
    <Box
      component="div"
      fontSize="35pt"
      color="black"
      sx={{ cursor: "default", opacity: 0.75 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={92}
    >
      {furiganaValue ? <Ruby rt={furiganaValue}>{value}</Ruby> : value}
    </Box>
  );
};

const WordCard = ({
  translations,
  locale,
  ...p
}: PropsWithLocalization<$Word>) => {
  const localizedTranslations = getLocalizedTranslations(translations, locale);
  return (
    <Card>
      <WordValueDetail {...p} />
      {localizedTranslations && (
        <Table>
          <Row title="翻訳" data={localizedTranslations} />
        </Table>
      )}
    </Card>
  );
};

export default WordCard;
