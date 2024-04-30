"use client";

import { LoadingButton } from "@mui/lab";
import type { Button } from "@mui/material";
import type { ComponentProps, PropsWithChildren } from "react";
import { useTransition } from "react";

export const ActionButton = ({
  action,
  ...p
}: PropsWithChildren<
  Omit<ComponentProps<typeof Button>, "onClick" | "action"> & {
    action: () => Promise<void>;
  }
>) => {
  const [isPending, startTransition] = useTransition();
  const handleClick = () =>
    startTransition(async () => {
      await action();
    });
  return (
    <LoadingButton
      {...p}
      type="button"
      loading={isPending}
      onClick={handleClick}
    />
  );
};
