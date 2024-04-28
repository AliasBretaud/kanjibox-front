"use client";

import { ThemeProvider } from "@emotion/react";
import { Paper, Stack, Typography, createTheme, styled } from "@mui/material";
import type { ReactNode } from "react";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  justifyContent: "center",
  color: theme.palette.text.secondary,
  borderRadius: 12,
}));

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: ReactNode;
}) => {
  const theme = createTheme({ palette: { mode: "dark" } });
  return (
    <ThemeProvider theme={theme}>
      <Item elevation={8} sx={{ padding: 4, mx: 2 }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle1" textAlign="center">
            {description}
          </Typography>
        </Stack>
      </Item>
    </ThemeProvider>
  );
};

export default EmptyState;
