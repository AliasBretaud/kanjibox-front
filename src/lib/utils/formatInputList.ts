export const formatInputList = (input: string) =>
  input
    ? input
        .split(";")
        .map((s) => {
          const tr = s.trim();
          return tr.charAt(0).toUpperCase() + tr.slice(1);
        })
        .filter((s) => s)
    : [];
