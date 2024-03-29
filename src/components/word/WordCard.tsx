import type { $Kanji, $Word } from "@/types";
import { Box, Card, CardContent } from "@mui/material";
import Table, { Row } from "@/components/ui/Table";
import { isKanji } from "wanakana";
import { ClickableKanji } from "./ClickableKanji";

const getKanji = (char: string, wordKanjis?: $Kanji[]) =>
  isKanji(char) && wordKanjis?.length
    ? wordKanjis.find((k) => k.value === char)
    : null;

const WordCard = (word: $Word) => (
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
            {word.value.split("").map((char, idx) => {
              const kanji = getKanji(char, word.kanjis);
              return kanji ? (
                <ClickableKanji key={idx} {...kanji} />
              ) : (
                <span key={idx}>{char}</span>
              );
            })}
          </Box>
          <rp>(</rp>
          <Box component="rt" fontSize="15pt">
            {word.furiganaValue}
          </Box>
          <rp>)</rp>
        </ruby>
      </Box>
      <Table>
        <Row title="翻訳" data={word.translations.en} />
      </Table>
    </CardContent>
  </Card>
);

export default WordCard;
