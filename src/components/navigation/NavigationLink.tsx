"use client";

import clsx from "clsx";
import type { ComponentProps } from "react";
import type { AppPathnames } from "@/locale-config";
import { Link } from "@/navigation";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";

const Badge = dynamic(() => import("@mui/material/Badge"));
const Button = dynamic(() => import("@mui/material/Button"));
const Typography = dynamic(() => import("@mui/material/Typography"));

type NavLinkProps = {
  badgeContent?: string;
  big?: boolean;
  button?: boolean;
  className?: string;
};

const NavigationLink = <Pathname extends AppPathnames>({
  badgeContent,
  big = false,
  button = false,
  children,
  className,
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>> & NavLinkProps) => {
  const locale = useLocale();
  const isJa = locale === "ja";
  const content = (
    <div
      className={clsx(className, "text-white", {
        "text-lg": isJa && !big,
        "text-xl": big,
        "font-kanji": isJa,
      })}
    >
      {children}
    </div>
  );
  const wrapper = (
    <Link href={href} {...rest}>
      {button ? <Button>{content}</Button> : content}
    </Link>
  );
  return badgeContent ? (
    <Badge
      badgeContent={<Typography fontSize="0.7rem">{badgeContent}</Typography>}
      color="secondary"
    >
      {wrapper}
    </Badge>
  ) : (
    wrapper
  );
};

export default NavigationLink;
