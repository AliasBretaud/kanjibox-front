"use client";

import { Alert } from "@mui/material";
import { useTranslations } from "next-intl";

type Props<F> = { errors: Record<keyof F, string>; tKey: string };

export default function ValidationErrors<F>({ errors, tKey }: Props<F>) {
  const t = useTranslations(tKey);
  return (
    <Alert severity="error" sx={{ mt: 2 }} data-testid="error-messages">
      {Object.values(errors)
        .filter((e) => e)
        .map((k, i) => (
          <div key={i}>{t(k)}</div>
        ))}
    </Alert>
  );
}
