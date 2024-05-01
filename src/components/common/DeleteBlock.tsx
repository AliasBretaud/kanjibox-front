"use client";

import { useResponsive } from "@/hooks/useResponsive";
import type { ButtonProps } from "@mui/material";
import { Alert, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

type Props = {
  onDelete: () => void;
  isLoading: boolean;
  buttonText: string;
  description: string;
};

const Button = ({
  onDelete,
  isLoading,
  fullWidth = false,
  buttonText,
}: Omit<Props, "description"> & Pick<ButtonProps, "fullWidth">) => (
  <LoadingButton
    loading={isLoading}
    variant="contained"
    color="error"
    size="small"
    onClick={onDelete}
    fullWidth={fullWidth}
  >
    {buttonText}
  </LoadingButton>
);

const DeleteBlockMobile = ({ description, ...p }: Props) => (
  <Alert
    icon={false}
    severity="error"
    sx={{
      "& .MuiAlert-message": { width: "100%" },
    }}
  >
    <Stack
      direction="column"
      alignItems="center"
      useFlexGap
      spacing={2}
      alignSelf="stretch"
      px={3}
    >
      <Stack direction="row" alignItems="center" useFlexGap spacing={2}>
        <DeleteIcon />
        <Typography>{description}</Typography>
      </Stack>
      <Button {...p} fullWidth />
    </Stack>
  </Alert>
);

const DeleteBlockDesktop = ({ description, ...p }: Props) => (
  <Alert
    severity="error"
    iconMapping={{
      error: <DeleteIcon fontSize="small" />,
    }}
    sx={{
      alignItems: "center",
      "& .MuiAlert-message": {
        width: "100%",
      },
    }}
  >
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      useFlexGap
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Typography>{description}</Typography>
      <Button {...p} />
    </Stack>
  </Alert>
);

export const DeleteBlock = (p: Props) => {
  const { isMobile } = useResponsive();
  return isMobile ? (
    <DeleteBlockMobile {...p} />
  ) : (
    <DeleteBlockDesktop {...p} />
  );
};
