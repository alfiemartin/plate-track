"use client";
import { useUserContext } from "@/providers/user/user-provider";
import { Link, User } from "@nextui-org/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";

const Header = () => {
  const [onScollClasses, setOnScrollClasses] = useState("");
  const [, setPrevScroll] = useState(0);

  const handleScroll = () => {
    setPrevScroll((prev) => {
      if (window.scrollY > prev) {
        setOnScrollClasses("translate-y-[-90px]");
      } else {
        setOnScrollClasses("");
      }
      return window.scrollY;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user } = useUserContext();

  return (
    <>
      <header
        className={`bg-foreground shadow transition-transform p-4 flex justify-between fixed h-[90px] z-50 left-0 right-0 ${onScollClasses}`}
      >
        <div className="flex gap-4">
          <Link as={NextLink} href="/" aria-label="Home">
            <div className="fill-background stroke-background">
              <HiHome style={{ fill: "white", width: 50, height: 50 }} />
            </div>
          </Link>
          <h1 className="text-center flex-1 text-xl self-center text-background">
            Plate Track
          </h1>
        </div>
        <User
          classNames={{ name: 'text-background' }}
          name={user?.displayName}
          avatarProps={{ src: user?.photoURL ?? undefined }}
        />
      </header>
      <div className="pb-[90px]"></div>
    </>
  );
};

export default Header;
