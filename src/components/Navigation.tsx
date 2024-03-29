import type { PropsWithChildren } from "react";
import { Button, Toolbar } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";

type NavLinkProps = PropsWithChildren<{
  button?: boolean;
  className?: string;
  href: string;
}>;

const NavLink = ({
  button = false,
  className,
  children,
  href,
}: NavLinkProps) => {
  const content = (
    <div className={clsx("text-white", className)}>{children}</div>
  );
  return (
    <Link href={href}>{button ? <Button>{content}</Button> : content}</Link>
  );
};

const Navigation = () => (
  <Toolbar className="bg-blue-navy">
    <NavLink className="text-xl mr-8 font-kanji" href="/">
      Floの漢字箱
    </NavLink>
    <div className="flex gap-4">
      <NavLink button href="/kanjis">
        Kanjis
      </NavLink>
      <NavLink button href="/words">
        Mots
      </NavLink>
      {/*
        <NavLink button href="/quiz">
          Quiz
        </NavLink>
      */}
    </div>
  </Toolbar>
);

export default Navigation;
