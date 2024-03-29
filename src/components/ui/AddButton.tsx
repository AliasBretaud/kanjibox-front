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
    sx={{
      my: "50px",
      borderRadius: "9999px",
      width: "100%",
      maxWidth: "300px",
      minHeight: "50px",
      fontSize: "15px",
    }}
  >
    {children}
  </Button>
);

export default AddButton;
