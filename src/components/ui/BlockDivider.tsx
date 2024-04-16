import { Box, Divider, Grid } from "@mui/material";

export const BlockDivider = () => (
  <Grid item sx={{ display: { xs: "block", sm: "none" } }} xs={12}>
    <Box paddingX={3}>
      <Divider />
    </Box>
  </Grid>
);
