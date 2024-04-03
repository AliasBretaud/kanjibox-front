"use client";

import clsx from "clsx";
import type { ComponentProps } from "react";
import type { AppPathnames } from "@/config";
import { Link } from "@/navigation";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("@mui/material/Button"));

type NavLinkProps = {
  button?: boolean;
  className?: string;
};

const NavigationLink = <Pathname extends AppPathnames>({
  button = false,
  children,
  className,
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>> & NavLinkProps) => {
  const content = (
    <div className={clsx("text-white", className)}>{children}</div>
  );
  return (
    <Link href={href} {...rest}>
      {button ? <Button>{content}</Button> : content}
    </Link>
  );
};

export default NavigationLink;
