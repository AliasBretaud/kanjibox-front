"use client";

import { LoadingButton } from "@mui/lab";
import type { Button } from "@mui/material";
import type { ComponentProps, PropsWithChildren } from "react";
import { useState } from "react";

export const ActionButton = ({
  action,
  ...p
}: PropsWithChildren<
  Omit<ComponentProps<typeof Button>, "onClick" | "action"> & {
    action: () => Promise<void>;
  }
>) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    await action();
    setLoading(false);
  };
  return (
    <LoadingButton
      {...p}
      type="button"
      loading={loading}
      onClick={handleClick}
    />
  );
};
