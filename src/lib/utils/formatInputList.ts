export const formatInputList = (input: string) =>
  input?.length
    ? input
        .split(";")
        .map((s) => {
          const tr = s.trim();
          return tr.charAt(0).toUpperCase() + tr.slice(1);
        })
        .filter((s) => s)
    : [];
