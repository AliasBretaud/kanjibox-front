"use client";

import { LoadingButton } from "@mui/lab";
import type { Button } from "@mui/material";
import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  children,
  ...p
}: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();
  return (
    <LoadingButton {...p} type="submit" loading={pending}>
      <span>{children}</span>
    </LoadingButton>
  );
};
