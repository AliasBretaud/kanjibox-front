import type { Breakpoint } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

export const useResponsive = (breakpoint?: Breakpoint) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint || "sm"));

  return { isMobile };
};
