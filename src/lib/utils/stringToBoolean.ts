export const stringToBoolean = (input: string | undefined) =>
  input?.toLocaleLowerCase() === "true";
