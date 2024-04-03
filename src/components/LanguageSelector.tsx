"use client";

import { locales } from "@/config";
import { usePathname, useRouter } from "@/navigation";
import { KeyboardArrowDown, Translate } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import type { MouseEvent } from "react";
import { useState, useTransition } from "react";

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const locale = useLocale();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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
        { pathname, params },
        { locale: lang },
      );
      handleClose();
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        sx={{ color: "white" }}
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
