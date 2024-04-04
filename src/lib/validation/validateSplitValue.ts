import isEmpty from "@/lib/utils/isEmpty";

export const validateSplitValue = (
  input: string,
  checkFcn: (s: string) => boolean,
) => input.split(";").every((k) => !isEmpty(k) && checkFcn(k));
