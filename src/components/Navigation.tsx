import { Stack, Toolbar } from "@mui/material";
import NavigationLink from "./NavigationLink";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";

const Navigation = () => {
  const t = useTranslations("navigation");
  return (
    <Toolbar className="bg-blue-navy">
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        flex={1}
      >
        <Stack alignItems="center" direction="row" gap={4}>
          <NavigationLink big className="font-kanji" href="/">
            Floの漢字箱
          </NavigationLink>
          <Stack direction="row" gap={2}>
            <NavigationLink button href="/kanjis">
              {t("kanjis")}
            </NavigationLink>
            <NavigationLink button href="/words">
              {t("words")}
            </NavigationLink>
            {/*
            <NavigationLink button href="/quiz">
              Quiz
            </NavigationLink>
          */}
          </Stack>
        </Stack>
        <LanguageSelector />
      </Stack>
    </Toolbar>
  );
};

export default Navigation;
