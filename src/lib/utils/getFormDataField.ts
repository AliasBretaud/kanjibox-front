export const getFormDataField = <T = string>(
  formData: FormData,
  field: keyof T,
) => formData.get(field as string) as string;
