import { Box, Card, CardContent } from "@mui/material";
import Table, { Row } from "@/components/ui/Table";
import { ClickableKanji } from "./ClickableKanji";
import getLocalizedTranslations from "@/lib/utils/getLocalizedTranslations";
import extractKanjiFromWord from "@/lib/utils/extractKanjiFromWord";
import type { PropsWithLocalization } from "@/types/utils";
import type { $Word } from "@/types/models";

const WordCard = ({
  value,
  furiganaValue,
  kanjis,
  translations,
  locale,
}: PropsWithLocalization<$Word>) => {
  const localizedTranslations = getLocalizedTranslations(translations, locale);
  return (
    <Card
      sx={{
        textAlign: "center",
        width: "100%",
        maxWidth: "300px",
      }}
    >
      <CardContent>
        <Box
          component="div"
          fontSize="35pt"
          color="black"
          sx={{ cursor: "default", opacity: 0.75 }}
        >
          <ruby>
            <Box display="table" sx={{ wordBreak: "break-word" }}>
              {value.split("").map((char, idx) => {
                const kanji = extractKanjiFromWord(char, kanjis);
                return kanji ? (
                  <ClickableKanji key={idx} {...kanji} />
                ) : (
                  <span key={idx}>{char}</span>
                );
              })}
            </Box>
            <rp>(</rp>
            <Box component="rt" fontSize="15pt">
              {furiganaValue}
            </Box>
            <rp>)</rp>
          </ruby>
        </Box>
        {localizedTranslations && (
          <Table>
            <Row title="翻訳" data={localizedTranslations} />
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCard;
