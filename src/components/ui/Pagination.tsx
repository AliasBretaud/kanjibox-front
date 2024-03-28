"use client";

import { useEffect, useState } from "react";
import { Pagination as MuiPagination } from "@mui/material";
import type { SxProps } from "@mui/material";
import { useSearchParams } from "next/navigation";

import useLoadUrlParams from "@/hooks/useLoadUrlParams";

const Pagination = ({
  pagesCount,
  sx = {},
}: {
  pagesCount: number;
  sx?: SxProps;
}) => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const loadParams = useLoadUrlParams();
  const white = { color: "#ffffff" };

  useEffect(() => {
    loadParams({ page: page.toString() });
  }, [loadParams, page]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <MuiPagination
      color="primary"
      count={pagesCount}
      onChange={handleChange}
      page={page}
      sx={{
        button: white,
        div: white,
        ul: { justifyContent: "center" },
        ...sx,
      }}
    />
  );
};

export default Pagination;
