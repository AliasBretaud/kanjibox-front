import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const LoginButton = () => {
  const t = useTranslations("navigation");
  return (
    <Link href="/api/auth/login" prefetch={false}>
      <Button variant="outlined" sx={{ color: "white" }}>
        {t("buttons.login")}
      </Button>
    </Link>
  );
};
