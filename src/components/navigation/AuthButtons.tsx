import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LoginButton } from "./LoginButton";

const AuthButtons = () => {
  const t = useTranslations("navigation");
  return (
    <Stack direction="row" spacing={1}>
      <LoginButton />
      <Link href="/api/auth/signup" prefetch={false}>
        <Button variant="outlined" sx={{ color: "white" }}>
          {t("buttons.signup")}
        </Button>
      </Link>
    </Stack>
  );
};

export default AuthButtons;
