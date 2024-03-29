import { Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

const borderClass = "border border-solid border-neutral-300";

const Cell = ({ children }: PropsWithChildren) => {
  const color = blue[700];
  return (
    <td className={clsx("py-[5px] px-2", borderClass)}>
      <Typography color={color}>{children}</Typography>
    </td>
  );
};

export const Row = ({ data, title }: { data?: string[]; title: string }) => {
  const values = data?.length ? data : ["-"];
  return (
    <>
      <tr>
        <th
          className={clsx(
            "bg-stone-100 text-center text-sm w-[75px]",
            borderClass,
          )}
          rowSpan={values.length}
        >
          {title}
        </th>
        <Cell>{values[0]}</Cell>
      </tr>
      {values.slice(1)?.map((value, idx) => (
        <tr key={idx}>
          <Cell>{value}</Cell>
        </tr>
      ))}
    </>
  );
};

const Table = ({ children }: PropsWithChildren) => (
  <table
    className={clsx("w-full border-collapse text-left font-kanji", borderClass)}
  >
    <tbody>{children}</tbody>
  </table>
);

export default Table;
