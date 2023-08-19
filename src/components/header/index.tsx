"use client";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import React from "react";
import { HiHome } from "react-icons/hi";

const Header = () => {
  return (
    <header className="bg-foreground shadow p-4 grid grid-cols-7">
      <Link as={NextLink} href="/" aria-label="Home">
        <div className="fill-background stroke-background">
          <HiHome style={{ fill: "white", width: 50, height: 50 }} />
        </div>
      </Link>
      <h1 className="text-center flex-1 col-span-5 col-start-2 sm:col-start-3 sm:col-span-3 text-xl self-center text-background">Plate Track</h1>
    </header>
  );
};

export default Header;
