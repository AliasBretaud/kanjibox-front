export const getFormDataField = <T>(formData: FormData, field: keyof T) =>
  formData.get(field as string) as string;

export default getFormDataField;
