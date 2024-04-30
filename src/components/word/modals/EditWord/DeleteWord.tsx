"use client";

import { useResponsive } from "@/hooks/useResponsive";
import type { ButtonProps } from "@mui/material";
import { Alert, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { useTranslations } from "next-intl";

type Props = { onDelete: () => void; isLoading: boolean };

const Button = ({
  onDelete,
  isLoading,
  fullWidth = false,
}: Props & Pick<ButtonProps, "fullWidth">) => {
  const t = useTranslations("modals.editWord");
  return (
    <LoadingButton
      loading={isLoading}
      variant="contained"
      color="error"
      size="small"
      onClick={onDelete}
      fullWidth={fullWidth}
    >
      {t("delete.button")}
    </LoadingButton>
  );
};

const DeleteWordMobile = (p: Props) => {
  const t = useTranslations("modals.editWord");
  return (
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
          <Typography>{t("delete.description")}</Typography>
        </Stack>
        <Button {...p} fullWidth />
      </Stack>
    </Alert>
  );
};

const DeleteWordDesktop = (p: Props) => {
  const t = useTranslations("modals.editWord");
  return (
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
        <Typography>{t("delete.description")}</Typography>
        <Button {...p} />
      </Stack>
    </Alert>
  );
};

export const DeleteWord = (p: Props) => {
  const { isMobile } = useResponsive();
  return isMobile ? <DeleteWordMobile {...p} /> : <DeleteWordDesktop {...p} />;
};
