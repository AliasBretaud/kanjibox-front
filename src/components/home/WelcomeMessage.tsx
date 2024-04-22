import { Link } from "@/navigation";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const WelcomeMessage = () => {
  const t = useTranslations("welcome");
  return (
    <Container maxWidth="sm" className="pt-6">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        style={{ color: "white" }}
        gutterBottom
      >
        {t("header")}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        style={{ color: "#bebebe" }}
        paragraph
      >
        {t("description")}
      </Typography>
      <Grid container spacing={2} justifyContent="center" className="mt-8">
        <Grid item>
          <div>
            <Link href="/kanjis">
              <Button variant="contained" color="primary">
                {t("cta.kanjis")}
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid item>
          <div>
            <Link href="/words">
              <Button variant="outlined" className="!bg-white !text-black">
                {t("cta.words")}
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WelcomeMessage;
