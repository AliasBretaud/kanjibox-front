export const getFormDataFieldList = <T = string>(
  formData: FormData,
  field: keyof T,
) =>
  formData
    .getAll(field as string)
    .map(String)
    .filter((s) => s);
