import { Link } from "@/navigation";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const WelcomeMessage = () => {
  const t = useTranslations("welcome.auth");
  return (
    <Container maxWidth="sm" className="pt-6">
      <Typography variant="h2" align="center" color="white" gutterBottom>
        {t("header")}
      </Typography>
      <Typography variant="h5" align="center" color="#bebebe">
        {t("description")}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        className="mt-8"
      >
        <div>
          <Link href="/kanjis">
            <Button variant="contained" color="primary">
              {t("cta.kanjis")}
            </Button>
          </Link>
        </div>
        <div>
          <Link href="/words">
            <Button variant="outlined" className="!bg-white !text-black">
              {t("cta.words")}
            </Button>
          </Link>
        </div>
      </Stack>
    </Container>
  );
};

export default WelcomeMessage;
