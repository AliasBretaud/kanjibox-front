import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import { Alert } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = { errors: Record<keyof KanjiFormType, string> };

const ValidationErrors = ({ errors }: Props) => {
  const t = useTranslations("modals.addKanji.validations");
  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {Object.values(errors).map((k) => (
        <div key={k}>{t(k)}</div>
      ))}
    </Alert>
  );
};

export default ValidationErrors;
