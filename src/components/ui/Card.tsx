"use client";

import { Box, IconButton, Paper } from "@mui/material";
import { type PropsWithChildren, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export const Card = ({
  children,
  onEdit,
}: PropsWithChildren<{ onEdit?: () => void }>) => {
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover((prev) => !prev);
  return (
    <Paper
      sx={{ p: 2 }}
      className="w-full max-w-md flex flex-col items-center relative"
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <Box sx={{ position: "absolute", right: 3, top: 3, zIndex: 2 }}>
        {onEdit && hover && (
          <IconButton
            color="default"
            aria-label="edit"
            size="small"
            onClick={onEdit}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>
      {children}
    </Paper>
  );
};
