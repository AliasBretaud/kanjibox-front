"use client";

import type { SwitchProps } from "@mui/material";
import { FormControlLabel, Switch } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = Pick<SwitchProps, "checked" | "onChange">;

const AutoDetectReadingsSwitch = ({ checked, onChange }: Props) => {
  const t = useTranslations("modals.addKanji");
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={onChange} />}
      label={t("autoDetectReadings")}
      name="autoDetectReadings"
    />
  );
};

export default AutoDetectReadingsSwitch;
