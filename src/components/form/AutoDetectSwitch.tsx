"use client";

import type { SwitchProps } from "@mui/material";
import { FormControlLabel, Switch } from "@mui/material";

type Props = Pick<SwitchProps, "checked" | "onChange"> & { label: string };

const AutoDetectSwitch = ({ checked, label, onChange }: Props) => (
  <FormControlLabel
    control={<Switch checked={checked} onChange={onChange} />}
    label={label}
    name="autoDetect"
  />
);

export default AutoDetectSwitch;
