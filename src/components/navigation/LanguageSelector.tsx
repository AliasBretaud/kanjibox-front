"use client";

import { locales } from "@/locale-config";
import { usePathname, useRouter } from "@/navigation";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Translate from "@mui/icons-material/Translate";
import { Button, Menu, MenuItem } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useLocale } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import type { MouseEvent } from "react";
import { useState, useTransition } from "react";

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const locale = useLocale();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const open = Boolean(anchorEl);
  const query = Object.fromEntries(searchParams.entries());

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLangSelect = (lang: string) => {
    startTransition(() => {
      replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, query, params },
        { locale: lang },
      );
      handleClose();
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        sx={{ color: "white", height: "100%" }}
        startIcon={<Translate />}
        endIcon={<KeyboardArrowDown />}
        variant="outlined"
        onClick={handleClick}
      >
        {locale.toUpperCase()}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        disableScrollLock
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        slotProps={{
          paper: {
            sx: {
              width: anchorEl && anchorEl.offsetWidth,
              color: "white",
              backgroundColor: indigo[500],
            },
          },
        }}
      >
        {locales
          .filter((l) => l !== locale)
          .map((l) => (
            <MenuItem
              key={l}
              sx={{ justifyContent: "center" }}
              onClick={() => onLangSelect(l)}
            >
              {l.toUpperCase()}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
