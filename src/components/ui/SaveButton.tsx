"use client";

import { LoadingButton } from "@mui/lab";
import type { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

export const SaveButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();
  return (
    <LoadingButton type="submit" color="primary" loading={pending}>
      <span>{children}</span>
    </LoadingButton>
  );
};
