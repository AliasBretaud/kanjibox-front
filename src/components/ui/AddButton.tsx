"use client";

import { Button } from "@mui/material";
import type { PropsWithChildren } from "react";

const AddButton = ({
  children,
  onClick,
}: PropsWithChildren<{ onClick: () => void }>) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    fullWidth
    sx={{
      my: 6,
      borderRadius: "9999px",
      maxWidth: 300,
      minHeight: 50,
      fontSize: 15,
    }}
  >
    {children}
  </Button>
);

export default AddButton;
