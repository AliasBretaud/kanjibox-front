import { useTranslations } from "next-intl";
import type { ButtonProps, LinkProps } from "@mui/material";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

const LinkButton = ({
  children,
  href,
  ...buttonProps
}: PropsWithChildren<Pick<LinkProps, "href"> & ButtonProps>) => (
  <Box>
    <Link href={href} width={{ xs: "100%", sm: "auto" }}>
      <Button {...buttonProps} sx={{ width: "inherit" }}>
        {children}
      </Button>
    </Link>
  </Box>
);

const Buttons = () => {
  const t = useTranslations("welcome.unAuth");
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent="center"
      alignItems="stretch"
      sx={{ width: "100%" }}
    >
      <LinkButton href="/api/auth/login" variant="contained" color="primary">
        {t("cta.login")}
      </LinkButton>
      <LinkButton
        href="/api/auth/signup"
        variant="outlined"
        className="!bg-white !text-black"
      >
        {t("cta.signup")}
      </LinkButton>
    </Stack>
  );
};

const UnAuthLayout = () => {
  const t = useTranslations("welcome.unAuth");
  return (
    <Container>
      <Stack alignItems="center" useFlexGap spacing={2} pt={{ xs: 6, md: 9 }}>
        <Stack spacing={2} useFlexGap sx={{ width: { sm: "100%", md: "80%" } }}>
          <Typography variant="h2" align="center" color="white">
            {t("header")}
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            color="#bebebe"
            sx={{
              alignSelf: "center",
              width: { sm: "100%", md: "80%" },
            }}
          >
            {t("description")}
          </Typography>
        </Stack>
        <Stack
          spacing={2}
          useFlexGap
          sx={{ width: "100%" }}
          alignItems="center"
        >
          <Typography variant="h6" color="#bebebe" align="center">
            {t("login")}
          </Typography>
          <Buttons />
        </Stack>
      </Stack>
    </Container>
  );
};

export default UnAuthLayout;
