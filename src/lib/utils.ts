export const isEmpty = (str: string) =>
  str === undefined || str === null || str.trim().length === 0;

export const getFormDataField = <T>(formData: FormData, field: keyof T) =>
  formData.get(field as string) as string;
