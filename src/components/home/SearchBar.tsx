"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import Image from "next/image";

import useLoadUrlParams from "@/hooks/useLoadUrlParams";

import searchIcon from "@/assets/icon_search.svg";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toString() || "";
  const [search, setSearch] = useState(query);
  const loadParams = useLoadUrlParams();

  useEffect(() => {
    if (!query) {
      setSearch("");
    }
  }, [query]);

  const handleSearch = () => {
    loadParams({ query: search });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center my-4 p-8 bg-neutral-500">
      <input
        type="text"
        name="search"
        className="w-full max-w-[770px] text-black text-[22px] py-[15px] px-[13px] border-gray-300 font-kanji rounded-l-md focus:outline-none"
        placeholder="キーワードを入力"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={handleKeyDown}
      />
      <Button
        className="!p-0 !rounded-r-md !rounded-s-none"
        color="primary"
        disableElevation
        variant="contained"
        onClick={handleSearch}
        data-testid="search"
      >
        <Image src={searchIcon} alt="Search" height={50} width={50} />
      </Button>
    </div>
  );
};

export default SearchBar;
