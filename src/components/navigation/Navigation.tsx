import { Box, Stack, Toolbar } from "@mui/material";
import NavigationLink from "./NavigationLink";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import { Suspense } from "react";
import AuthButtons from "./AuthButtons";
import { getSession } from "@auth0/nextjs-auth0";
import ProfileMenu from "./ProfileMenu";
import { LoginButton } from "./LoginButton";
import { DrawerMenu } from "./DrawerMenu";

const LanguageSelectorLoader = () => (
  <Suspense>
    <LanguageSelector />
  </Suspense>
);

const ProtectedLinks = () => {
  const t = useTranslations("navigation");
  return (
    <Stack direction="row" gap={2}>
      <NavigationLink button href="/kanjis">
        {t("kanjis")}
      </NavigationLink>
      <NavigationLink button href="/words">
        {t("words")}
      </NavigationLink>
    </Stack>
  );
};

const MobileNavigation = async () => {
  const session = await getSession();
  const isAuth = !!session?.user;
  return (
    <Toolbar className="bg-blue-navy">
      <Stack
        sx={{ width: "100%" }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <DrawerMenu />
        <NavigationLink big className="font-kanji" href="/">
          Floの漢字箱
        </NavigationLink>
        {isAuth ? <ProfileMenu /> : <LoginButton />}
      </Stack>
    </Toolbar>
  );
};

const DesktopNavigation = async () => {
  const session = await getSession();
  const isAuth = !!session?.user;
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
          {isAuth && <ProtectedLinks />}
        </Stack>
        <Stack alignItems="center" direction="row" gap={2}>
          {!isAuth && <AuthButtons />}
          <LanguageSelectorLoader />
          {isAuth && <ProfileMenu />}
        </Stack>
      </Stack>
    </Toolbar>
  );
};

export default function Navigation() {
  return (
    <>
      <Box display={{ xs: "none", sm: "block" }}>
        <DesktopNavigation />
      </Box>
      <Box display={{ xs: "block", sm: "none" }}>
        <MobileNavigation />
      </Box>
    </>
  );
}
