import { Paper } from "@mui/material";
import type { PropsWithChildren } from "react";

export const Card = ({ children }: PropsWithChildren) => (
  <Paper sx={{ p: 2 }} className="w-full max-w-md flex flex-col items-center">
    {children}
  </Paper>
);
