import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          Social App
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
};

export default NavBar;
