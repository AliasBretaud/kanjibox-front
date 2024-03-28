import { Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

const WelcomeMessage = () => (
  <Container maxWidth="sm" className="pt-6">
    <Typography
      component="h1"
      variant="h2"
      align="center"
      style={{ color: "white" }}
      gutterBottom
    >
      Boîte à Kanjis
    </Typography>
    <Typography
      variant="h5"
      align="center"
      style={{ color: "#bebebe" }}
      paragraph
    >
      Accueil de la Boîte à Kanjis, ci-dessous les kanjis récemment enregistrés.
      Pour consulter / éditer des kanjis ou des mots, cliquer sur les boutons
      ci-dessous.
    </Typography>
    <Grid container spacing={2} justifyContent="center" className="mt-8">
      <Grid item>
        <Link href="/kanjis">
          <Button variant="contained" color="primary">
            Les kanjis (unitaires)
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link href="/words">
          <Button variant="outlined" className="!bg-white !text-black">
            Les mots
          </Button>
        </Link>
      </Grid>
    </Grid>
  </Container>
);

export default WelcomeMessage;
