import React from "react";
import { Stack } from "@mui/material";
import Table, { Row } from "@/components/ui/Table";
import { ClickableKanji } from "./ClickableKanji";
import { getLocalizedTranslations } from "@/lib/utils/getLocalizedTranslations";
import { Furi, Pair, Text, Wrapper, useFuriPairs } from "react-furi";
import { Card } from "@/components/ui/Card";
import type { PropsWithLocalization } from "@/types/utils";
import type { $Word } from "@/types/models";

type RubyProps = Pick<$Word, "kanjis" | "furiganaValue" | "value">;

const WordCharacters = ({ value, kanjis }: Pick<$Word, "value" | "kanjis">) =>
  value.split("").map((char, idx) => {
    const kanji = kanjis?.find((k) => k.value === char);
    return kanji ? (
      <ClickableKanji key={idx} {...kanji} />
    ) : (
      <span key={idx}>{char}</span>
    );
  });

const Ruby = ({ furiganaValue, value, kanjis }: RubyProps) => (
  <Pair style={{ fontSize: "inherit", gap: 10 }} className="font-kanji">
    {furiganaValue && <Furi style={{ fontSize: "15pt" }}>{furiganaValue}</Furi>}
    <Text>
      <WordCharacters value={value} kanjis={kanjis} />
    </Text>
  </Pair>
);

const WordValueDetail = ({
  furiganaValue,
  ...p
}: Pick<$Word, "value" | "kanjis" | "furiganaValue">) => {
  const pairs: Array<[string, string]> = useFuriPairs(p.value, furiganaValue);
  const noFurigana = pairs.map(([furigana]) => furigana).every((v) => !v);
  return (
    <Wrapper
      style={{
        fontSize: "35pt",
        color: "black",
        cursor: "default",
        opacity: 0.75,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 83,
        alignContent: "center",
      }}
    >
      {noFurigana ? (
        <Ruby furiganaValue={furiganaValue} {...p} />
      ) : (
        pairs
          .filter(([, text]) => !!text)
          .map(([furiText, text], index) => (
            <Ruby
              key={text + index}
              furiganaValue={furiText}
              value={text}
              kanjis={p.kanjis}
            />
          ))
      )}
    </Wrapper>
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
      <Stack spacing={2} alignSelf="stretch">
        <WordValueDetail {...p} />
        {localizedTranslations && (
          <Table>
            <Row title="翻訳" data={localizedTranslations} />
          </Table>
        )}
      </Stack>
    </Card>
  );
};

export default WordCard;
