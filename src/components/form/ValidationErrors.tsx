"use client";

import type { Error } from "@/lib/validation/validateSchema";
import { Alert } from "@mui/material";
import { useTranslations } from "next-intl";

type Props<F> = { errors: Record<keyof F, Error>; tKey: string };

export default function ValidationErrors<F>({ errors, tKey }: Props<F>) {
  const t = useTranslations(tKey);
  return (
    <Alert severity="error" sx={{ mt: 2 }} data-testid="error-messages">
      {Object.values<Error>(errors)
        .filter((e) => !!e?.message)
        .map((e, i) => (
          <div key={i}>{t(e?.message)}</div>
        ))}
    </Alert>
  );
}
