import isEmpty from "./isEmpty";

export default function capitalize(str: string) {
  if (isEmpty(str)) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
